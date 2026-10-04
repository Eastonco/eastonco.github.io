'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reportError } from '@/lib/report-error';
import { supabase } from '../../lib/supabase';

// Counter ID - use this same ID in your Supabase table
const COUNTER_ID = 'global-button-counter';

export default function RedButtonPage() {
  const [counter, setCounter] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial counter value
  useEffect(() => {
    const fetchCounter = async () => {
      setIsLoading(true);

      // Get current count from Supabase
      const { data, error } = await supabase
        .from('counters')
        .select('count')
        .eq('id', COUNTER_ID)
        .single();

      if (error) {
        // If the counter doesn't exist, create it
        if (error.code === 'PGRST116') {
          const { error: insertError } = await supabase
            .from('counters')
            .insert({ id: COUNTER_ID, count: 0 });
          if (insertError) reportError(insertError, 'red-button.create');
          setCounter(0);
        } else {
          reportError(error, 'red-button.fetch');
        }
      } else if (data) {
        setCounter(data.count);
      }

      setIsLoading(false);
    };

    fetchCounter();
  }, []);

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
          // Update our local state when the database changes
          if (payload.new && typeof payload.new.count === 'number') {
            setCounter(payload.new.count);
          }
        }
      )
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        const count = Object.keys(presenceState).length;
        setOnlineUsers(count);
      })
      .subscribe(async (status, err) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ online_at: new Date().toISOString() });
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          // CLOSED is skipped: it also fires on a normal unmount via removeChannel.
          reportError(err ?? new Error(`Realtime channel ${status}`), 'red-button.realtime', {
            status,
          });
        }
      });

    // Clean up the subscription when component unmounts
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  // Handle button click
  const incrementCounter = async () => {
    // Optimistically update the UI
    setCounter(prevCount => prevCount + 1);

    // Update the counter in Supabase
    const { error } = await supabase.rpc('increment_counter', {
      counter_id: COUNTER_ID,
    });

    if (error) {
      reportError(error, 'red-button.increment');
      // Revert the optimistic update if there was an error
      setCounter(prevCount => prevCount - 1);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center">
        <div className="mb-8 flex h-48 items-center justify-center">
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="h-12 w-12 rounded-full border-4 border-red-600 border-t-transparent"
            />
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.span
                key={counter}
                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.8 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  duration: 0.4,
                }}
                className="text-8xl font-bold text-gray-800 dark:text-gray-200"
              >
                {counter}
              </motion.span>
            </AnimatePresence>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.1 }}
          onClick={incrementCounter}
          disabled={isLoading}
          className={`rounded-full bg-red-600 px-8 py-4 text-xl font-bold text-white shadow-lg ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
          style={{ minWidth: '200px', minHeight: '80px' }}
        >
          Press me!
        </motion.button>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          This counter is synced across all users in real-time
        </p>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <p>{onlineUsers} user(s) currently online</p>
        </div>
      </div>
    </div>
  );
}
