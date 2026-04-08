import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Play, Star } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Product, PageView, Language } from '../types';
import { FEATURED_PRODUCTS, HERO_PRODUCT, TRANSLATIONS } from '../constants';
import { ProductCard } from './ProductCard';

interface HomeProps {
  onNavigate: (page: PageView, product?: Product) => void;
  language: Language;
}

const CATEGORIES = [
  { id: 'men', name: 'Men', image: 'https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=800&auto=format&fit=crop' },
  { id: 'women', name: 'Women', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop' },
  { id: 'sports', name: 'Sports', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800&auto=format&fit=crop' },
  { id: 'casual', name: 'Casual', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop' },
];

export const Home: React.FC<HomeProps> = ({ onNavigate, language }) => {
  const t = TRANSLATIONS[language];
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yHeroImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-premium-white dark:bg-premium-black transition-colors duration-500"
    >
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 md:pt-0 overflow-hidden">
        {/* Background typographic texture */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03] dark:opacity-[0.1]">
             <div className="text-[20vw] font-black leading-none whitespace-nowrap animate-marquee dark:text-white">
                ZENITH PERFORMANCE / ZENITH PERFORMANCE / 
             </div>
             <div className="text-[20vw] font-black leading-none whitespace-nowrap animate-marquee dark:text-white" style={{ animationDirection: 'reverse' }}>
                FUTURE FOOTWEAR / FUTURE FOOTWEAR /
             </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            
            {/* Typography Left */}
            <motion.div style={{ y: yHeroText, opacity: opacityHero }} className="w-full md:w-1/2 z-20 pt-10 md:pt-0 relative">
               <motion.div variants={itemVariants} className="overflow-hidden mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-premium-accent animate-pulse"></span>
                  <span className="text-xs font-bold tracking-widest uppercase text-premium-black dark:text-white">{t.hero.newSeason}</span>
                </div>
               </motion.div>
               
               <motion.h1 variants={itemVariants} className="text-7xl md:text-[8rem] font-serif font-bold leading-[0.85] tracking-tight mb-8 text-premium-black dark:text-white whitespace-pre-line">
                 {t.hero.title}
               </motion.h1>
               
               <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-md leading-relaxed font-light">
                 {t.hero.desc}
               </motion.p>
               
               <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5">
                 <button 
                   onClick={() => onNavigate(PageView.PRODUCT, HERO_PRODUCT)}
                   className="group bg-premium-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full font-bold uppercase tracking-wider transition-all hover:bg-premium-accent dark:hover:bg-premium-accent hover:text-white hover:shadow-xl hover:shadow-premium-accent/30 flex items-center justify-center gap-3 relative overflow-hidden"
                 >
                   <span className="relative z-10">{t.hero.shopBtn}</span>
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform relative z-10" />
                   <div className="absolute inset-0 bg-white/10 dark:bg-black/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                 </button>
                 <button 
                    onClick={() => onNavigate(PageView.PRODUCT, HERO_PRODUCT)}
                    className="group px-10 py-5 rounded-full font-bold uppercase tracking-wider border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all flex items-center justify-center gap-3 bg-white dark:bg-transparent dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                 >
                   <Play className="w-5 h-5 fill-black dark:fill-white group-hover:scale-110 transition-transform" />
                   {t.hero.watchBtn}
                 </button>
               </motion.div>
            </motion.div>

            {/* Image Right */}
            <motion.div style={{ y: yHeroImage }} className="w-full md:w-1/2 relative mt-16 md:mt-0 h-[50vh] md:h-[85vh] flex items-center justify-center perspective-1000">
               {/* Decorative Background Elements */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-radial from-gray-100 to-transparent dark:from-gray-800 opacity-70"></div>
               
               {/* Hero Image */}
               <motion.div 
                className="relative z-10 w-full h-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8, rotate: -25 }}
                animate={{ opacity: 1, scale: 1, rotate: -15, y: [0, -15, 0] }}
                transition={{ 
                  opacity: { duration: 1 }, 
                  scale: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                  rotate: { duration: 1, ease: "easeOut" },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" } 
                }}
               >
                 <img 
                    src={HERO_PRODUCT.images[0]} 
                    alt="Zenith Stratus X" 
                    className="w-[120%] max-w-none md:w-full object-contain drop-shadow-2xl filter saturate-[1.1]"
                />
               </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="bg-premium-black dark:bg-black text-white py-5 overflow-hidden whitespace-nowrap border-y border-gray-800 relative z-20">
        <div className="inline-flex animate-marquee items-center">
          {[...Array(6)].map((_, i) => (
             <React.Fragment key={i}>
                <span className="mx-12 text-sm font-bold tracking-[0.2em] uppercase text-white flex items-center gap-4">
                   <Star className="w-5 h-5 text-premium-accent fill-current" />
                   {t.marquee.handcrafted}
                </span>
                <span className="mx-12 text-sm font-bold tracking-[0.2em] uppercase text-gray-500 flex items-center gap-4">
                   <Truck className="w-5 h-5" />
                   {t.marquee.shipping}
                </span>
             </React.Fragment>
          ))}
        </div>
      </div>

      {/* Categories Section (New) */}
      <section className="py-24 bg-white dark:bg-premium-black relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
                onClick={() => onNavigate(PageView.PRODUCT, FEATURED_PRODUCTS[0])} // Mock
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-white font-serif font-bold text-xl md:text-2xl">{category.name}</h3>
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white origin-center"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,1)', color: 'black' }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-16"
          >
            <div>
              <span className="text-premium-accent font-bold tracking-widest text-xs uppercase mb-2 block">{t.featured.curration}</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold dark:text-white capitalize leading-tight">{t.featured.title}</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 border-b border-black dark:border-white pb-1 hover:text-premium-accent hover:border-premium-accent transition-colors font-bold uppercase text-sm tracking-widest dark:text-white">
              {t.featured.viewAll} <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {FEATURED_PRODUCTS.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index} 
                onNavigate={onNavigate}
                isFeatured={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-32 bg-white dark:bg-black">
         <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[ 
               { icon: ShieldCheck, title: t.values.auth, desc: t.values.authDesc },
               { icon: Truck, title: t.values.global, desc: t.values.globalDesc },
               { icon: RotateCcw, title: t.values.returns, desc: t.values.returnsDesc }
             ].map((val, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.2, duration: 0.8 }}
                 className="p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-500 group"
               >
                 <div className="w-14 h-14 bg-white dark:bg-black text-black dark:text-white border border-gray-200 dark:border-gray-700 flex items-center justify-center rounded-full mb-6 group-hover:bg-premium-accent group-hover:border-premium-accent group-hover:text-white transition-colors duration-300">
                    <val.icon className="w-7 h-7" />
                 </div>
                 <h4 className="font-bold text-xl mb-4 font-serif dark:text-white">{val.title}</h4>
                 <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{val.desc}</p>
               </motion.div>
             ))}
           </div>
         </div>
      </section>

      {/* Editorial Section */}
      <section id="story" className="py-40 bg-premium-black dark:bg-gray-950 text-white relative overflow-hidden group">
        <div className="absolute inset-0 opacity-40 transition-opacity duration-1000 group-hover:opacity-30">
           <img src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Workshop" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-premium-black via-premium-black/90 to-transparent dark:from-black dark:via-black/90"></div>
        
        <div className="container mx-auto px-6 relative z-10">
           <motion.div 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, ease: "easeOut" }}
             className="max-w-2xl"
           >
              <div className="flex items-center gap-4 mb-8">
                 <span className="w-12 h-[2px] bg-premium-accent"></span>
                 <span className="text-premium-accent font-bold tracking-widest text-xs uppercase">The Atelier</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-serif font-bold mb-8 leading-tight">Obsessive <br/><span className="text-gray-400 italic font-light">Craftsmanship.</span></h2>
              <p className="text-xl md:text-2xl text-gray-400 font-light mb-12 leading-relaxed">
                We reject mass production. Each Zenith silhouette is constructed from Italian calfskin and technical Japanese knits, 
                hand-finished in our solar-powered facility in Porto.
              </p>
              <motion.button 
                whileHover={{ gap: '1.5rem' }}
                className="inline-flex items-center gap-4 text-white border-b-2 border-white pb-3 hover:text-premium-accent hover:border-premium-accent transition-all font-bold uppercase tracking-widest text-sm"
              >
                Read the Story <ArrowRight className="w-5 h-5" />
              </motion.button>
           </motion.div>
        </div>
      </section>
    </motion.div>
  );
};