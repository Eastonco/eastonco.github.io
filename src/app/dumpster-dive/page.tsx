'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';

export default function DumpsterDivePage() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Function to show notification
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Function to dump text to database
  const handleDump = async () => {
    if (!text.trim()) {
      showNotification('error', 'Cannot dump empty text!');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('dumpster_entries')
        .insert([
          {
            content: text.trim(),
            dumped_at: new Date().toISOString()
          }
        ]);

      if (error) {
        throw error;
      }

      setText('');
      showNotification('success', 'Text dumped successfully! 🗑️');
    } catch (error) {
      console.error('Error dumping text:', error);
      showNotification('error', 'Failed to dump text. Try again!');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to dive for random text
  const handleDive = async () => {
    setIsLoading(true);
    try {
      // Get a random entry from the database
      const { data, error } = await supabase
        .from('dumpster_entries')
        .select('*');

      console.log('Dive result:', { data, error }); // Debug log

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        showNotification('error', 'The dumpster is empty! Dump something first.');
        return;
      }

      // Pick a random entry
      const randomEntry = data[Math.floor(Math.random() * data.length)];
      console.log('Random entry selected:', randomEntry); // Debug log
      
      if (randomEntry && randomEntry.content) {
        setText(randomEntry.content); // Replace the main text content
        showNotification('success', 'Found something in the dumpster! 🔍');
      } else {
        showNotification('error', 'Found an entry but it seems to be empty.');
      }
    } catch (error) {
      console.error('Error diving:', error);
      showNotification('error', 'Failed to dive. Try again!');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get line numbers (always show 1-20)
  const getLineNumbers = () => {
    return Array.from({ length: 20 }, (_, index) => index + 1);
  };

  // Function to handle text change and limit to 20 lines
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const lines = newText.split('\n');
    
    if (lines.length <= 20) {
      setText(newText);
    } else {
      // If more than 20 lines, keep only the first 20
      const limitedText = lines.slice(0, 20).join('\n');
      setText(limitedText);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-8">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-6xl font-bold bg-gradient-to-r from-gray-300 via-slate-200 to-gray-400 bg-clip-text text-transparent mb-4"
          animate={{ 
            backgroundPosition: ['0%', '100%', '0%'] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🗑️ Dumpster Dive
        </motion.h1>
        <p className="text-xl text-gray-300">
          Dump your thoughts, dive for treasures
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Main text area with line numbers */}
        <motion.div 
          className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-slate-600 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex">
            {/* Line numbers */}
            <div className="pr-4 text-right text-sm text-slate-400 font-mono border-r border-slate-600 select-none min-w-[3rem]"
                 style={{ 
                   height: '500px',
                   padding: '16px 16px 16px 0', // More padding for comfort
                   overflow: 'hidden'
                 }}>
              {getLineNumbers().map((lineNum) => (
                <div key={lineNum} className="leading-6 h-6">
                  {lineNum}
                </div>
              ))}
            </div>
            
            {/* Text area */}
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Start typing to dump your thoughts into the digital dumpster..."
              className="flex-1 ml-4 text-lg font-mono leading-6 bg-transparent border-none outline-none resize-none text-slate-100 placeholder-slate-400 overflow-hidden"
              style={{ 
                height: '500px', // More space for 20 lines
                padding: '16px 0 16px 0', // More comfortable padding
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
              }}
              spellCheck={false}
              rows={20}
            />
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div 
          className="flex gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button
            onClick={handleDump}
            disabled={isLoading}
            className="px-8 py-4 bg-gradient-to-r from-slate-700 to-slate-600 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-slate-600 hover:to-slate-500"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(71, 85, 105, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {isLoading ? '🔄 Dumping...' : '🗑️ Dump'}
          </motion.button>

          <motion.button
            onClick={handleDive}
            disabled={isLoading}
            className="px-8 py-4 bg-gradient-to-r from-slate-600 to-gray-700 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-slate-500 hover:to-gray-600"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(55, 65, 81, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {isLoading ? '🔄 Diving...' : '🔍 Dive'}
          </motion.button>
        </motion.div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className={`fixed bottom-8 right-8 p-4 rounded-xl shadow-lg text-white font-medium ${
              notification.type === 'success' 
                ? 'bg-slate-600' 
                : 'bg-red-600'
            }`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}