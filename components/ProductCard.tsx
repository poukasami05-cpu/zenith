import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, PageView } from '../types';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProductCardProps {
  product: Product;
  index: number;
  onNavigate: (page: PageView, product: Product) => void;
  className?: string;
  isFeatured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index, onNavigate, className, isFeatured = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn("group cursor-pointer flex flex-col", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onNavigate(PageView.PRODUCT, product)}
    >
      <div className={cn(
          "relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg mb-6",
          isFeatured ? "aspect-[4/5]" : "aspect-square"
      )}>
        {/* Skeleton Loader */}
        <AnimatePresence>
          {!imageLoaded && (
            <motion.div
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"
            />
          )}
        </AnimatePresence>

        <motion.img
          src={product.images[0]}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover origin-center"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />

        {/* Overlay Info for Featured / Hover interaction */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
        
        <div className="absolute bottom-4 left-4 right-4 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 50, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/95 dark:bg-black/90 backdrop-blur-md px-5 py-3 flex justify-between items-center rounded-lg shadow-xl pointer-events-auto"
            onClick={(e) => {
               // Optional: Stop propagation if adding "Quick Add"
               // e.stopPropagation();
               // onNavigate(PageView.PRODUCT, product); 
            }}
          >
            <span className="font-bold uppercase tracking-widest text-[10px] sm:text-xs dark:text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Quick Shop
            </span>
            <ArrowRight className="w-4 h-4 dark:text-white" />
          </motion.div>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div className="pr-4">
          <h3 className="text-lg md:text-xl font-serif font-bold mb-1 group-hover:text-premium-accent transition-colors dark:text-white line-clamp-1">{product.name}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wide truncate">{product.tagline}</p>
        </div>
        <span className="font-bold text-base md:text-lg dark:text-white whitespace-nowrap">${product.price}</span>
      </div>
    </motion.div>
  );
};
