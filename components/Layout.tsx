import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, Search, Instagram, Twitter, Facebook, Trash2, ArrowRight, Sun, Moon, Globe, ChevronRight, User } from 'lucide-react';
import { PageView, CartItem, Language } from '../types';
import { TRANSLATIONS, HERO_PRODUCT, FEATURED_PRODUCTS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: PageView, product?: any) => void;
  cart: CartItem[];
  currentView: PageView;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  removeFromCart: (id: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  onNavigate, 
  cart, 
  currentView,
  isCartOpen,
  setIsCartOpen,
  removeFromCart,
  language,
  setLanguage,
  isDarkMode,
  toggleTheme
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const t = TRANSLATIONS[language];
  const allProducts = [HERO_PRODUCT, ...FEATURED_PRODUCTS];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus search input when overlay opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const handleNavClick = (sectionId?: string) => {
    if (sectionId) {
      if (currentView !== PageView.HOME) {
        onNavigate(PageView.HOME);
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(PageView.HOME);
    }
    setIsMobileMenuOpen(false);
  };

  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-premium-white text-premium-black dark:bg-premium-black dark:text-premium-white transition-colors duration-500">
      {/* Navigation */}
      <nav 
        className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-out-expo ${
          isScrolled ? 'top-4 py-0' : 'top-0 py-6'
        }`}
      >
        <div 
          className={`mx-auto transition-all duration-700 ease-out-expo ${
            isScrolled 
              ? 'w-[95%] md:w-[85%] max-w-7xl glass-nav rounded-full shadow-lg shadow-black/5 dark:shadow-white/5 px-8 py-3' 
              : 'w-full bg-transparent px-8 md:px-12'
          }`}
        >
          <div className="flex justify-between items-center">
            {/* Left Links */}
            <div className="hidden md:flex space-x-10 items-center text-xs font-bold tracking-[0.1em] uppercase">
              <button onClick={() => handleNavClick()} className="hover:text-premium-accent transition-colors relative group py-2">
                {t.nav.men}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-premium-accent transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button onClick={() => handleNavClick()} className="hover:text-premium-accent transition-colors relative group py-2">
                {t.nav.women}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-premium-accent transition-all duration-300 group-hover:w-full"></span>
              </button>
              
              {/* Language Selector */}
              <div className="flex items-center gap-2 border-l border-gray-300 dark:border-gray-700 pl-6 ml-4">
                 <button onClick={() => setLanguage('EN')} className={`transition-colors ${language === 'EN' ? 'text-premium-accent' : 'hover:text-premium-accent'}`}>EN</button>
                 <button onClick={() => setLanguage('FR')} className={`transition-colors ${language === 'FR' ? 'text-premium-accent' : 'hover:text-premium-accent'}`}>FR</button>
                 <button onClick={() => setLanguage('ES')} className={`transition-colors ${language === 'ES' ? 'text-premium-accent' : 'hover:text-premium-accent'}`}>ES</button>
                 <button onClick={() => setLanguage('AR')} className={`transition-colors ${language === 'AR' ? 'text-premium-accent' : 'hover:text-premium-accent'}`}>AR</button>
              </div>
            </div>

            {/* Logo */}
            <button 
              onClick={() => handleNavClick()}
              className={`font-serif font-black tracking-tighter transition-all duration-500 absolute left-1/2 -translate-x-1/2 ${isScrolled ? 'text-2xl' : 'text-4xl'}`}
            >
              ZENITH
            </button>

            {/* Right Icons */}
            <div className="flex items-center space-x-6 md:space-x-8">
              <button onClick={() => toggleTheme()} className="hover:text-premium-accent transition-colors">
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              <button onClick={() => handleNavClick('story')} className="hidden md:block text-xs font-bold tracking-[0.1em] uppercase hover:text-premium-accent transition-colors">
                {t.nav.journal}
              </button>
              <button onClick={() => setIsSearchOpen(true)} className="hover:text-premium-accent transition-colors">
                <Search className="w-6 h-6" />
              </button>
              <button 
                onClick={() => {
                  onNavigate(PageView.LOGIN);
                  setIsMobileMenuOpen(false);
                }} 
                className="hover:text-premium-accent transition-colors"
                title="Account"
              >
                <User className="w-6 h-6" />
              </button>
              <div 
                className="relative cursor-pointer hover:text-premium-accent transition-colors group"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-premium-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <button 
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[80] bg-premium-white dark:bg-premium-black animate-fade-in flex flex-col">
          {/* Close Button */}
          <button 
            onClick={() => setIsSearchOpen(false)} 
            className="absolute top-8 right-8 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-8 h-8 dark:text-white" />
          </button>

          {/* Search Input Container */}
          <div className="container mx-auto px-6 pt-32 pb-8">
             <div className="relative border-b-2 border-gray-200 dark:border-gray-800 focus-within:border-premium-accent transition-colors">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400" />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full bg-transparent text-4xl md:text-6xl font-serif font-bold py-6 pl-12 md:pl-16 outline-none dark:text-white placeholder-gray-300 dark:placeholder-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto container mx-auto px-6 py-8">
             {searchQuery && (
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
                    {filteredProducts.length} Result{filteredProducts.length !== 1 ? 's' : ''} Found
                  </p>
                  
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredProducts.map(product => (
                        <div 
                          key={product.id}
                          onClick={() => {
                            onNavigate(PageView.PRODUCT, product);
                            setIsSearchOpen(false);
                          }}
                          className="flex gap-4 p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:border-black dark:hover:border-white transition-colors cursor-pointer group"
                        >
                           <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                           </div>
                           <div className="flex flex-col justify-center">
                              <h4 className="font-serif font-bold text-xl dark:text-white group-hover:text-premium-accent transition-colors">{product.name}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.tagline}</p>
                              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider dark:text-gray-300">
                                View Details <ArrowRight className="w-3 h-3" />
                              </div>
                           </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 opacity-50">
                       <p className="text-xl font-medium dark:text-white">No products found matching "{searchQuery}"</p>
                    </div>
                  )}
                </div>
             )}
             
             {!searchQuery && (
                <div className="text-center py-20">
                   <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Type to search the collection</p>
                </div>
             )}
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <div className={`fixed inset-0 z-[60] pointer-events-none ${isCartOpen ? 'pointer-events-auto' : ''}`}>
        {/* Backdrop */}
        <div 
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsCartOpen(false)}
        ></div>
        
        {/* Drawer */}
        <div className={`absolute top-0 right-0 rtl:left-0 rtl:right-auto h-full w-full md:w-[480px] bg-white dark:bg-premium-charcoal shadow-2xl transform transition-transform duration-500 ease-out-expo flex flex-col ${isCartOpen ? 'translate-x-0' : 'ltr:translate-x-full rtl:-translate-x-full'}`}>
            <div className="p-8 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-2xl font-serif font-bold dark:text-white">{t.nav.bag} ({cartCount})</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors dark:text-white">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50 dark:text-white">
                        <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                        <p className="text-xl font-medium">{t.cart.empty}</p>
                        <button onClick={() => setIsCartOpen(false)} className="text-sm font-bold border-b border-black dark:border-white pb-1">{t.cart.continue}</button>
                    </div>
                ) : (
                    cart.map((item) => (
                        <div key={`${item.id}-${item.selectedColor}`} className="flex gap-6 animate-fade-in dark:text-white">
                            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shrink-0">
                                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg">{item.name}</h3>
                                    <p className="font-medium">${item.price}</p>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{item.tagline} {item.selectedColor && `• ${item.selectedColor}`}</p>
                                <div className="flex justify-between items-center">
                                    <div className="text-sm border border-gray-200 dark:border-gray-700 rounded px-2 py-1">Qty: {item.quantity}</div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {cart.length > 0 && (
                <div className="p-8 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-premium-black">
                    <div className="flex justify-between items-center mb-6 dark:text-white">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">{t.cart.subtotal}</span>
                        <span className="text-2xl font-bold font-serif">${cartTotal}</span>
                    </div>
                    <button className="w-full bg-premium-black dark:bg-white text-white dark:text-black py-5 rounded-lg font-bold uppercase tracking-wider hover:bg-premium-accent dark:hover:bg-premium-accent transition-colors flex items-center justify-center gap-2 group">
                        {t.cart.checkout}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </button>
                </div>
            )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-premium-white dark:bg-premium-black z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'ltr:translate-x-full rtl:-translate-x-full'}`}>
        <button onClick={() => handleNavClick()} className="text-4xl font-serif font-medium hover:text-premium-accent transition-colors dark:text-white">{t.nav.men}</button>
        <button onClick={() => handleNavClick()} className="text-4xl font-serif font-medium hover:text-premium-accent transition-colors dark:text-white">{t.nav.women}</button>
        <button onClick={() => handleNavClick('story')} className="text-4xl font-serif font-medium hover:text-premium-accent transition-colors dark:text-white">{t.nav.journal}</button>
        <button 
          onClick={() => {
            onNavigate(PageView.LOGIN);
            setIsMobileMenuOpen(false);
          }} 
          className="text-4xl font-serif font-medium hover:text-premium-accent transition-colors dark:text-white"
        >
          Sign In
        </button>
        
        {/* Mobile Language & Theme */}
        <div className="flex gap-4 mt-8">
           <button onClick={() => setLanguage('EN')} className={`text-xl ${language === 'EN' ? 'text-premium-accent' : 'text-gray-400'}`}>EN</button>
           <button onClick={() => setLanguage('FR')} className={`text-xl ${language === 'FR' ? 'text-premium-accent' : 'text-gray-400'}`}>FR</button>
           <button onClick={() => setLanguage('ES')} className={`text-xl ${language === 'ES' ? 'text-premium-accent' : 'text-gray-400'}`}>ES</button>
           <button onClick={() => setLanguage('AR')} className={`text-xl ${language === 'AR' ? 'text-premium-accent' : 'text-gray-400'}`}>AR</button>
        </div>
        <button onClick={() => toggleTheme()} className="mt-4 p-4 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
             {isDarkMode ? <Sun className="w-8 h-8" /> : <Moon className="w-8 h-8" />}
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-premium-black dark:bg-black text-white py-24 border-t border-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-20">
            <h3 className="text-[12vw] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent tracking-tighter select-none pointer-events-none leading-none">
              ZENITH
            </h3>
            <p className="text-gray-400 max-w-md mt-[-2vw] text-sm relative z-10">
              Forging the future of footwear through design, technology, and sustainable craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-16">
             <div>
              <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Shop</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                <li><a href="#" className="hover:text-premium-accent transition-colors">New Releases</a></li>
                <li><a href="#" className="hover:text-premium-accent transition-colors">Men</a></li>
                <li><a href="#" className="hover:text-premium-accent transition-colors">Women</a></li>
                <li><a href="#" className="hover:text-premium-accent transition-colors">Collaborations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Support</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                <li><a href="#" className="hover:text-premium-accent transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-premium-accent transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-premium-accent transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-premium-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                <li><a href="#" className="hover:text-premium-accent transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-premium-accent transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-premium-accent transition-colors">Accessibility</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Connect</h4>
              <div className="flex space-x-6">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-premium-accent transition-colors">
                  <Instagram className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-premium-accent transition-colors">
                  <Twitter className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-premium-accent transition-colors">
                  <Facebook className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-white/10 flex justify-between items-center text-xs text-gray-600 font-medium uppercase tracking-wider">
             <p>&copy; 2024 ZENITH Footwear. {t.marquee.handcrafted}.</p>
             <p>Designed with Intent.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};