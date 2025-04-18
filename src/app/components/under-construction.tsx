"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function UnderConstruction() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  
  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
      );
      
      const { error } = await supabase
        .from("subscribers")
        .insert([{ email }]);
      
      if (error) throw error;
      
      setIsSuccess(true);
      setEmail("");
    } catch (err: Error | unknown) {
      console.error("Error subscribing:", err);
      setError(err instanceof Error ? err.message : "Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-background p-4">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md flex flex-col items-center text-center">
        {/* Main Heading */}
        <motion.h1 
          className="text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Coming Soon
        </motion.h1>
        
        {/* Subheading */}
        <motion.p 
          className="text-xl text-muted-foreground mb-14 text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          In the meantime, sign up for my monthly newsletter. You never know what I might send!
        </motion.p>
        
        {/* Newsletter Form */}
        <motion.div
          className="w-full mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isSuccess ? (
            <p className="text-green-500 dark:text-green-400 text-center font-medium">
              Thanks for subscribing! We&apos;ll be in touch.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full gap-3">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 px-5 py-4 rounded-md bg-secondary/10 border border-input focus:outline-none focus:ring-2 focus:ring-ring text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-4 bg-[#222222] text-white rounded-md hover:brightness-110 transition-all disabled:opacity-50 whitespace-nowrap text-lg font-medium"
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          )}
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </motion.div>
      </div>
      
      {/* Social Media Icons */}
      <motion.footer
        className="mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex gap-8 justify-center">
          <a 
            href="https://github.com/eastonco" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#F2F2F2] hover:bg-[#E5E5E5] transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} className="text-[#222222]" />
          </a>
          <a 
            href="https://linkedin.com/in/eastonco" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#F2F2F2] hover:bg-[#E5E5E5] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} className="text-[#222222]" />
          </a>
          <a 
            href="https://instagram.com/eastonco" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#F2F2F2] hover:bg-[#E5E5E5] transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} className="text-[#222222]" />
          </a>
        </div>
      </motion.footer>
    </section>
  );
}
