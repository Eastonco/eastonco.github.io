'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { typography } from '../../lib/design-system';

type TextShadowProps = {
  text: string;
};

const TextShadow: React.FC<TextShadowProps> = ({ text }) => {
  return (
    <motion.div
      className="absolute top-1 left-1 -z-10 h-full w-full opacity-50 blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ delay: 0.4, duration: 1 }}
    >
      <span
        className={`${typography.heading.h1} bg-gradient-to-r from-[#4f46e5]/60 via-[#ec4899]/60 to-[#0ea5e9]/60 bg-clip-text text-transparent`}
      >
        {text}
      </span>
    </motion.div>
  );
};

export default TextShadow;
