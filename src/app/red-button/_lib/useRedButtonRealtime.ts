import { useCallback, useEffect, useRef, useState } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// Counter ID - use this same ID in your Supabase table
const COUNTER_ID = 'global-button-counter';
// Crossing a multiple of this is a global milestone everyone on the page sees.
export const MILESTONE_STEP = 1000;
const HEAT_WINDOW_MS = 3000;

export type RemotePress = { combo: number; tier: number };

type Options = {
  onRemotePress: (press: RemotePress) => void;
  onMilestone: (count: number) => void;
};

export function useRedButtonRealtime({ onRemotePress, onMilestone }: Options) {
  const [count, setCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // Presses in the last few seconds: everyone's, and just other people's.
  const [heat, setHeat] = useState({ total: 0, remote: 0 });

  const channelRef = useRef<RealtimeChannel | null>(null);
  const subscribedRef = useRef(false);
  const lastServerCountRef = useRef<number | null>(null);
  const localPressTimes = useRef<number[]>([]);
  const remotePressTimes = useRef<number[]>([]);
  const callbacksRef = useRef({ onRemotePress, onMilestone });

  useEffect(() => {
    callbacksRef.current = { onRemotePress, onMilestone };
  }, [onRemotePress, onMilestone]);

  // Every authoritative count (initial fetch, realtime, RPC result) goes through here.
  const receiveServerCount = useCallback((value: number) => {
    const last = lastServerCountRef.current;
    if (last !== null && value <= last) return;
    lastServerCountRef.current = value;
    // Never move the display backwards when an older value arrives after an optimistic bump.
    setCount(prev => Math.max(prev, value));
    if (last !== null && Math.floor(value / MILESTONE_STEP) > Math.floor(last / MILESTONE_STEP)) {
      callbacksRef.current.onMilestone(Math.floor(value / MILESTONE_STEP) * MILESTONE_STEP);
    }
  }, []);

  // Fetch initial counter value
  useEffect(() => {
    const fetchCounter = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from('counters')
        .select('count')
        .eq('id', COUNTER_ID)
        .single();

      if (error) {
        console.error('Error fetching counter:', error);
        // If the counter doesn't exist, create it
        if (error.code === 'PGRST116') {
          await supabase.from('counters').insert({ id: COUNTER_ID, count: 0 });
          receiveServerCount(0);
        }
      } else if (data) {
        receiveServerCount(data.count);
      }

      setIsLoading(false);
    };

    fetchCounter();
  }, [receiveServerCount]);

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase.channel('red-button-page', {
      config: {
        presence: {
          key: `user-${Math.random().toString(36).substring(7)}`,
          // Self-hosted Realtime defaults presence to disabled per-tenant
          // (supabase/realtime PR #1739); the client can force it on per-channel.
          enabled: true,
        },
      },
    });
    channelRef.current = channel;

    channel
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'counters',
          filter: `id=eq.${COUNTER_ID}`,
        },
        payload => {
          if (payload.new && typeof payload.new.count === 'number') {
            receiveServerCount(payload.new.count);
          }
        }
      )
      .on('broadcast', { event: 'press' }, ({ payload }) => {
        remotePressTimes.current.push(performance.now());
        callbacksRef.current.onRemotePress({
          combo: Number(payload?.combo) || 1,
          tier: Number(payload?.tier) || 0,
        });
      })
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        setOnlineUsers(Object.keys(presenceState).length);
      })
      .subscribe(async status => {
        if (status === 'SUBSCRIBED') {
          subscribedRef.current = true;
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      subscribedRef.current = false;
      channelRef.current = null;
      supabase.removeChannel(channel);
    };
  }, [receiveServerCount]);

  // Recompute crowd heat a few times a second from the rolling press windows.
  useEffect(() => {
    const interval = setInterval(() => {
      const cutoff = performance.now() - HEAT_WINDOW_MS;
      localPressTimes.current = localPressTimes.current.filter(t => t > cutoff);
      remotePressTimes.current = remotePressTimes.current.filter(t => t > cutoff);
      const remote = remotePressTimes.current.length;
      const total = remote + localPressTimes.current.length;
      setHeat(prev => (prev.total === total && prev.remote === remote ? prev : { total, remote }));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  // Sends one press live: an immediate RPC plus a broadcast so others see it right away.
  // Resolves to the global count this press landed on, or null if it failed.
  const press = useCallback(
    async (info: RemotePress): Promise<number | null> => {
      localPressTimes.current.push(performance.now());
      setCount(prev => prev + 1);

      if (subscribedRef.current) {
        void channelRef.current?.send({ type: 'broadcast', event: 'press', payload: info });
      }

      const { data, error } = await supabase.rpc('increment_counter', {
        counter_id: COUNTER_ID,
      });

      if (error) {
        console.error('Error incrementing counter:', error);
        setCount(prev => prev - 1);
        return null;
      }
      if (typeof data === 'number') {
        receiveServerCount(data);
        return data;
      }
      return null;
    },
    [receiveServerCount]
  );

  return { count, onlineUsers, isLoading, heat, press };
}
