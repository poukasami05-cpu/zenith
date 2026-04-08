import React, { useState } from 'react';
import { Star, Check, Shield, Truck, RotateCcw, ChevronRight, Share2, Heart, Ruler, Info, CreditCard, Banknote, MessageCircle, Instagram, Lock, ArrowRight } from 'lucide-react';
import { Product, Review, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { GeminiAssistant } from './GeminiAssistant';

interface ProductPageProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  language: Language;
}

type PaymentMethod = 'online' | 'cod';

export const ProductPage: React.FC<ProductPageProps> = ({ product, onAddToCart, language }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const t = TRANSLATIONS[language];

  const sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'];

  const handleCheckout = () => {
    if (!selectedSize) return;
    
    // If Online, add to cart drawer
    if (paymentMethod === 'online') {
        onAddToCart(product, selectedSize);
    } else {
        // If COD, simulate quick order
        alert(`Order Placed (COD)! Size: ${selectedSize}. Please prepare $${product.price} cash.`);
    }
  };

  const handleSupportClick = (platform: string) => {
    alert(`Redirecting to Zenith Support on ${platform}...`);
  };

  return (
    <div className="pt-24 bg-white dark:bg-premium-black min-h-screen transition-colors duration-500">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Left: Editorial Gallery (Masonry Style) */}
          <div className="lg:w-[60%] space-y-4">
             {/* Hero Image */}
             <div className="w-full aspect-[4/5] bg-gray-100 dark:bg-gray-900 relative overflow-hidden group">
                 <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                 />
                 <div className="absolute top-6 left-6 bg-white/90 dark:bg-black/80 backdrop-blur px-4 py-2 text-xs font-bold uppercase tracking-widest dark:text-white">
                    {t.product.newSeason}
                 </div>
             </div>

             {/* Split Grid */}
             <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-gray-100 dark:bg-gray-900 overflow-hidden group">
                    <img src={product.images[1]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Detail" />
                </div>
                
                {/* Video Loop or Alt Image */}
                <div className="aspect-square bg-gray-100 dark:bg-gray-900 overflow-hidden relative group">
                    {product.videoUrl ? (
                        <video 
                            src={product.videoUrl}
                            className="w-full h-full object-cover"
                            autoPlay muted loop playsInline
                        />
                    ) : (
                         <img src={product.images[2]} className="w-full h-full object-cover" alt="Detail" />
                    )}
                    {product.videoUrl && (
                        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur text-white px-2 py-1 text-[10px] font-bold uppercase rounded">
                            Motion
                        </div>
                    )}
                </div>
             </div>

             {/* Full Width Detail */}
             <div className="aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden group">
                <img src={product.images[3] || product.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Lifestyle" />
             </div>

             {/* Editorial Text Block for Desktop */}
             <div className="hidden lg:block py-16 pr-12">
                 <h3 className="font-serif text-3xl font-bold mb-6 dark:text-white">{t.product.designNotes}</h3>
                 <p className="text-xl text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-12">
                    {product.description} Constructed to bridge the gap between high-performance athletics and avant-garde street fashion.
                 </p>
                 <div className="grid grid-cols-2 gap-y-8 gap-x-12 border-t border-gray-100 dark:border-gray-800 pt-8">
                     {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key}>
                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{key}</span>
                            <span className="font-serif text-lg dark:text-white">{value}</span>
                        </div>
                     ))}
                 </div>
             </div>
          </div>

          {/* Right: Sticky Details Panel */}
          <div className="lg:w-[40%] relative">
             <div className="sticky top-32 animate-slide-up">
                {/* Breadcrumbs */}
                <div className="mb-6 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Shop</span> <ChevronRight className="w-4 h-4" />
                    <span className="text-black dark:text-white">{product.name}</span>
                </div>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 leading-none dark:text-white">{product.name}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-medium mb-6">{product.tagline}</p>
                    <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-6">
                        <span className="text-3xl font-bold dark:text-white">${product.price}</span>
                        <div className="flex items-center gap-2">
                             <div className="flex text-premium-accent">
                               {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                             </div>
                             <span className="text-xs font-bold underline cursor-pointer hover:text-premium-accent dark:text-gray-300">{product.reviews} {t.product.reviews}</span>
                        </div>
                    </div>
                </div>

                {/* Size Selection */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold uppercase tracking-widest dark:text-gray-300">{t.product.selectSize} (US)</span>
                        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors underline">
                            <Ruler className="w-4 h-4" /> Size Guide
                        </button>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {sizes.map((size) => (
                           <button 
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`h-12 border transition-all duration-300 flex items-center justify-center text-sm font-bold
                              ${selectedSize === size 
                                ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' 
                                : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black dark:bg-gray-900 dark:border-gray-700 dark:hover:border-white dark:hover:text-white'}`}
                           >
                             {size}
                           </button>
                         ))}
                    </div>
                </div>

                {/* Payment Selector */}
                <div className="bg-gray-50 dark:bg-gray-900 p-1 rounded-lg flex mb-8">
                    <button 
                        onClick={() => setPaymentMethod('online')}
                        className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2
                        ${paymentMethod === 'online' ? 'bg-white dark:bg-black shadow-sm text-black dark:text-white' : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white'}`}
                    >
                        <CreditCard className="w-5 h-5" /> Secure Card
                    </button>
                    <button 
                        onClick={() => setPaymentMethod('cod')}
                        className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2
                        ${paymentMethod === 'cod' ? 'bg-white dark:bg-black shadow-sm text-black dark:text-white' : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white'}`}
                    >
                        <Banknote className="w-5 h-5" /> {t.product.payCod}
                    </button>
                </div>

                {/* Main Action */}
                <button 
                     onClick={handleCheckout}
                     disabled={!selectedSize}
                     className={`w-full py-6 text-white font-bold uppercase tracking-widest text-sm transition-all duration-300 relative overflow-hidden group mb-6
                       ${selectedSize ? 'bg-premium-black hover:bg-premium-accent dark:bg-white dark:text-black dark:hover:bg-premium-accent dark:hover:text-white' : 'bg-gray-200 dark:bg-gray-800 cursor-not-allowed text-gray-400'}`}
                >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        {selectedSize 
                            ? (paymentMethod === 'cod' ? t.product.codBtn : t.product.addCart) 
                            : t.product.selectSize}
                        {selectedSize && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />}
                    </span>
                </button>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                    {product.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <Check className="w-5 h-5 text-premium-accent" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Concierge */}
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                    <h4 className="font-serif font-bold text-lg mb-2 dark:text-white">{t.product.concierge}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{t.product.help}</p>
                    <div className="flex gap-3">
                         <button onClick={() => handleSupportClick('WhatsApp')} className="flex-1 border border-gray-200 dark:border-gray-700 py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-black dark:hover:border-white transition-all dark:text-white">
                            <MessageCircle className="w-5 h-5" /> WhatsApp
                         </button>
                         <button onClick={() => handleSupportClick('Instagram')} className="flex-1 border border-gray-200 dark:border-gray-700 py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-black dark:hover:border-white transition-all dark:text-white">
                            <Instagram className="w-5 h-5" /> DM Us
                         </button>
                    </div>
                </div>
             </div>
          </div>

          {/* Mobile Description Block (Visible only on mobile) */}
          <div className="lg:hidden mt-12 border-t border-gray-100 dark:border-gray-800 pt-12">
             <h3 className="font-serif text-3xl font-bold mb-6 dark:text-white">{t.product.designNotes}</h3>
             <p className="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-8">
                {product.description}
             </p>
             <div className="grid grid-cols-1 gap-6">
                 {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{key}</span>
                        <span className="font-medium dark:text-white">{value}</span>
                    </div>
                 ))}
             </div>
          </div>

        </div>
      </div>
      <GeminiAssistant product={product} />
    </div>
  );
};