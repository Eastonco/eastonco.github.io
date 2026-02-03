'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';
import Link from 'next/link';

// Counter ID - use this same ID in your Supabase table
const COUNTER_ID = 'global-button-counter';

export default function RedButtonPage() {
  const [counter, setCounter] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  // This subscription state is used for cleanup
  const [, setSubscription] = useState<RealtimeChannel | null>(null);

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
        console.error('Error fetching counter:', error);
        // If the counter doesn't exist, create it
        if (error.code === 'PGRST116') {
          await supabase.from('counters').insert({ id: COUNTER_ID, count: 0 });
          setCounter(0);
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
      .subscribe(async status => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    setSubscription(channel);

    // Clean up the subscription when component unmounts
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  // Handle button click
  const incrementCounter = async () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);

    // Optimistically update the UI
    setCounter(prevCount => prevCount + 1);

    // Update the counter in Supabase
    const { error } = await supabase.rpc('increment_counter', {
      counter_id: COUNTER_ID,
    });

    if (error) {
      console.error('Error incrementing counter:', error);
      // Revert the optimistic update if there was an error
      setCounter(prevCount => prevCount - 1);
    }
  };

  // Format counter with leading zeros for segment display effect
  const formatCounter = (num: number) => {
    return num.toString().padStart(8, '0');
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper paper-texture">
      {/* Header */}
      <header className="border-b-4 border-ink bg-paper py-4">
        <div className="framer-container flex items-center justify-between">
          <Link href="/" className="font-mono text-xs uppercase tracking-wide text-muted-foreground hover:text-ink transition-colors">
            &larr; Back to Home
          </Link>
          <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            Module 02.B
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="text-center">
          {/* Industrial panel frame */}
          <div className="bg-cardboard border-4 border-ink shadow-brutal-lg p-8 md:p-12">
            {/* Panel label */}
            <div className="border-b-2 border-ink pb-4 mb-8">
              <h1 className="font-mono text-lg md:text-xl font-bold uppercase tracking-wider text-ink">
                The Big Red Button
              </h1>
              <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground mt-1">
                Global Counter System
              </p>
            </div>

            {/* Counter display */}
            <div className="mb-8">
              <div className="bg-ink p-4 border-4 border-ink">
                <div className="bg-cream px-6 py-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-16">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="h-8 w-8 border-4 border-signal-red border-t-transparent"
                      />
                    </div>
                  ) : (
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={counter}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-mono text-4xl md:text-6xl font-bold text-ink tracking-wider"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {formatCounter(counter)}
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </div>
              <div className="font-mono text-xs uppercase tracking-wide text-muted-foreground mt-2">
                Total Presses
              </div>
            </div>

            {/* The big red button */}
            <div className="flex justify-center mb-8">
              <motion.button
                onClick={incrementCounter}
                disabled={isLoading}
                animate={{
                  y: isPressed ? 4 : 0,
                  boxShadow: isPressed
                    ? '0px 0px 0px #1A1A1A'
                    : '6px 6px 0px #1A1A1A',
                }}
                transition={{ duration: 0.1 }}
                className={`
                  relative
                  w-40 h-40 md:w-48 md:h-48
                  bg-signal-red
                  border-4 border-ink
                  font-mono text-cream text-lg md:text-xl font-bold uppercase tracking-wide
                  ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                `}
                style={{
                  boxShadow: isPressed ? '0px 0px 0px #1A1A1A' : '6px 6px 0px #1A1A1A',
                }}
              >
                {/* Button surface with beveled effect */}
                <div className="absolute inset-2 border-2 border-ink/20 flex items-center justify-center">
                  <span>Press</span>
                </div>
              </motion.button>
            </div>

            {/* Status indicators */}
            <div className="border-t-2 border-ink pt-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              {/* Online users indicator */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-signal-green animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  {onlineUsers} Online
                </span>
              </div>

              {/* Real-time sync indicator */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-signal-orange" />
                <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  Real-Time Sync
                </span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground mt-6">
            Counter synced across all users globally
          </p>
        </div>
      </main>
    </div>
  );
}
