'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GradientText } from './layout';
import { typography } from '../../lib/design-system';

interface ShadowedGradientTextProps {
  children: React.ReactNode;
  gradient: string;
}

const ShadowedGradientText: React.FC<ShadowedGradientTextProps> = ({ children, gradient }) => {
  // Convert children to string and process for line breaks
  const text = React.Children.toArray(children).join('');
  const parts = text.split(',').map(part => part.trim());
  const contentWithBreaks = parts.reduce<React.ReactNode[]>((acc, part, index) => {
    if (index === 0) {
      return [part];
    }
    return [...acc, <br key={index} />, part];
  }, []);

  return (
    <div className="relative">
      <h1 className={`${typography.heading.h1} text-white drop-shadow-lg`}>
        <GradientText gradient={gradient}>
          {contentWithBreaks}
        </GradientText>
      </h1>
      <motion.div 
        className="absolute -z-10 w-full h-full left-1 top-1 opacity-50 blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <span className={`${typography.heading.h1} bg-clip-text text-transparent bg-gradient-to-r from-[#4f46e5]/60 via-[#ec4899]/60 to-[#0ea5e9]/60`}>
          {contentWithBreaks}
        </span>
      </motion.div>
    </div>
  );
};

export default ShadowedGradientText;
