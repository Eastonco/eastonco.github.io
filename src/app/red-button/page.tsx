'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

// Counter ID - use this same ID in your Supabase table
const COUNTER_ID = 'global-button-counter';

export default function RedButtonPage() {
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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
    // Subscribe to changes on the counters table
    const subscription = supabase
      .channel('counters-channel')
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
          if (payload.new && payload.new.count) {
            setCounter(payload.new.count);
          }
        }
      )
      .subscribe();

    setSubscription(subscription);

    // Clean up the subscription when component unmounts
    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
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
      console.error('Error incrementing counter:', error);
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
      </div>
    </div>
  );
}
