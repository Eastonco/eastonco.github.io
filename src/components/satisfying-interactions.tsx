'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Soft color palette for stimming
const colors = {
  background: 'from-rose-50 via-purple-50 to-sky-50',
  shapes: [
    'from-rose-200 to-pink-300',
    'from-purple-200 to-violet-300', 
    'from-sky-200 to-blue-300',
    'from-emerald-200 to-green-300',
    'from-amber-200 to-yellow-300',
    'from-orange-200 to-red-300'
  ],
  text: 'text-slate-600',
  accent: 'from-pink-300 to-purple-400'
};

// Floating bubble component
const FloatingBubble = ({ delay = 0 }: { delay?: number }) => {
  const [isPopped, setIsPopped] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    });
  }, []);

  const handlePop = () => {
    setIsPopped(true);
    setTimeout(() => setIsPopped(false), 2000);
  };

  return (
    <AnimatePresence>
      {!isPopped && (
        <motion.div
          className="fixed pointer-events-auto cursor-pointer z-10"
          style={{ left: position.x, top: position.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 0.7,
            x: [0, 20, -20, 0],
            y: [0, -10, 10, 0]
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            delay,
            scale: { duration: 0.5 },
            opacity: { duration: 0.5 }
          }}
          whileHover={{ scale: 1.2, rotate: 15 }}
          whileTap={{ scale: 0.8 }}
          onClick={handlePop}
        >
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors.shapes[Math.floor(Math.random() * colors.shapes.length)]} shadow-lg backdrop-blur-sm`} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Morphing shape component
const MorphingShape = ({ index }: { index: number }) => {
  const [shape, setShape] = useState(0);
  
  return (
    <motion.div
      className={`w-16 h-16 bg-gradient-to-br ${colors.shapes[index % colors.shapes.length]} cursor-pointer shadow-lg`}
      animate={{ 
        borderRadius: shape * 20,
        rotate: shape * 90
      }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      onClick={() => setShape((prev) => (prev + 1) % 4)}
    />
  );
};

// Ripple effect component
const RippleArea = () => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const createRipple = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div 
      className="relative w-full h-48 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl cursor-pointer overflow-hidden border-2 border-purple-200"
      onClick={createRipple}
    >
      <div className="absolute inset-4 flex items-center justify-center">
        <p className={`text-lg font-medium ${colors.text}`}>Click anywhere for ripples</p>
      </div>
      
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ 
            width: 200, 
            height: 200, 
            opacity: 0 
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

// Satisfying text input
const SatisfyingInput = () => {
  const [text, setText] = useState('');
  const [letterCount, setLetterCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setLetterCount(e.target.value.length);
  };

  return (
    <div className="space-y-4">
      <motion.input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type something satisfying..."
        className="w-full p-4 text-lg rounded-2xl border-2 border-purple-200 bg-white/50 backdrop-blur-sm focus:border-purple-400 focus:outline-none transition-all duration-300"
        whileFocus={{ scale: 1.02 }}
      />
      
      <div className="flex space-x-2">
        {Array.from(text).map((letter, index) => (
          <motion.span
            key={index}
            className={`text-xl font-medium ${colors.text}`}
            initial={{ opacity: 0, y: 20, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.05,
              type: "spring",
              stiffness: 500,
              damping: 25
            }}
          >
            {letter === ' ' ? '·' : letter}
          </motion.span>
        ))}
      </div>
      
      <motion.div 
        className="flex space-x-1"
        animate={{ scale: letterCount > 0 ? 1 : 0 }}
      >
        {Array.from({ length: Math.min(letterCount, 20) }).map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors.shapes[index % colors.shapes.length]}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </motion.div>
    </div>
  );
};

// Breathing circle
const BreathingCircle = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        className={`w-32 h-32 rounded-full bg-gradient-to-br ${colors.accent} shadow-xl cursor-pointer`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
      />
      <p className={`text-sm ${colors.text}`}>Breathe with the circle</p>
    </div>
  );
};

export default function SatisfyingInteractions() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.background} p-8 overflow-hidden relative`}>
      {/* Floating bubbles */}
      {Array.from({ length: 8 }).map((_, index) => (
        <FloatingBubble key={index} delay={index * 0.5} />
      ))}

      {/* Main content */}
      <div className="max-w-4xl mx-auto space-y-12 relative z-20">
        {/* Header */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className={`text-5xl font-bold bg-gradient-to-r ${colors.accent} bg-clip-text text-transparent`}
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%'] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Satisfying Interactions
          </motion.h1>
          <p className={`text-xl ${colors.text}`}>
            A playground for delightful, calming interactions
          </p>
        </motion.div>

        {/* Interactive sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Morphing shapes */}
          <motion.div 
            className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-purple-200"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className={`text-2xl font-semibold mb-6 ${colors.text}`}>Shape Shifters</h3>
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <MorphingShape key={index} index={index} />
              ))}
            </div>
            <p className={`text-sm mt-4 ${colors.text} opacity-70`}>Click to morph!</p>
          </motion.div>

          {/* Breathing circle */}
          <motion.div 
            className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-purple-200 flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <BreathingCircle />
          </motion.div>
        </div>

        {/* Ripple area */}
        <motion.div 
          className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-purple-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className={`text-2xl font-semibold mb-6 ${colors.text}`}>Ripple Zone</h3>
          <RippleArea />
        </motion.div>

        {/* Satisfying input */}
        <motion.div 
          className="bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-purple-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className={`text-2xl font-semibold mb-6 ${colors.text}`}>Animated Typing</h3>
          <SatisfyingInput />
        </motion.div>
      </div>
    </div>
  );
}