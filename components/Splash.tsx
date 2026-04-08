import React from 'react';
import { motion } from 'framer-motion';

export const Splash: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-premium-black dark:bg-black"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-serif font-bold text-white tracking-widest uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Zenith
        </motion.h1>
        <motion.div 
          className="h-[2px] bg-premium-accent"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
        />
        <motion.p
          className="text-gray-400 mt-4 tracking-[0.3em] text-sm uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Future Footwear
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
