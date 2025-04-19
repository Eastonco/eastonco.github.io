'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function UnderConstruction() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      );

      const { error } = await supabase.from('subscribers').insert([{ email }]);

      if (error) throw error;

      setIsSuccess(true);
      setEmail('');
    } catch (err: Error | unknown) {
      console.error('Error subscribing:', err);
      setError(err instanceof Error ? err.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-background flex h-screen flex-col items-center justify-center p-4">
      <div className="absolute top-1/2 left-1/2 flex w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform flex-col items-center text-center">
        {/* Main Heading */}
        <motion.h1
          className="text-foreground mb-10 text-6xl font-bold tracking-tight md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Coming Soon
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-muted-foreground mb-14 max-w-md text-center text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          In the meantime, sign up for my monthly newsletter. You never know what I might send!
        </motion.p>

        {/* Newsletter Form */}
        <motion.div
          className="mb-16 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isSuccess ? (
            <p className="text-center font-medium text-green-500 dark:text-green-400">
              Thanks for subscribing! We&apos;ll be in touch.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-secondary/10 border-input focus:ring-ring flex-1 rounded-md border px-5 py-4 text-lg focus:ring-2 focus:outline-none"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-[#222222] px-7 py-4 text-lg font-medium whitespace-nowrap text-white transition-all hover:brightness-110 disabled:opacity-50"
              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
          )}
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </motion.div>
      </div>

      {/* Social Media Icons */}
      <motion.footer
        className="mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex justify-center gap-8">
          <a
            href="https://github.com/eastonco"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#F2F2F2] p-3 transition-colors hover:bg-[#E5E5E5]"
            aria-label="GitHub"
          >
            <Github size={20} className="text-[#222222]" />
          </a>
          <a
            href="https://linkedin.com/in/eastonco"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#F2F2F2] p-3 transition-colors hover:bg-[#E5E5E5]"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} className="text-[#222222]" />
          </a>
          <a
            href="https://instagram.com/eastonco"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#F2F2F2] p-3 transition-colors hover:bg-[#E5E5E5]"
            aria-label="Instagram"
          >
            <Instagram size={20} className="text-[#222222]" />
          </a>
        </div>
      </motion.footer>
    </section>
  );
}
