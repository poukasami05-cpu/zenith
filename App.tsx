import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ProductPage } from './components/ProductPage';
import { Auth } from './components/Auth';
import { Splash } from './components/Splash';
import { PageView, Product, CartItem, Language } from './types';
import { HERO_PRODUCT } from './constants';
import { CheckCircle } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>(PageView.HOME);
  const [currentProduct, setCurrentProduct] = useState<Product>(HERO_PRODUCT);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('EN');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  
  // Toast State
  const [toast, setToast] = useState<{ visible: boolean; message: string; subtext?: string } | null>(null);

  useEffect(() => {
    // Handle RTL for Arabic
    if (language === 'AR') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  useEffect(() => {
    // Splash screen timer
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Handle Dark Mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const showToast = (message: string, subtext?: string) => {
    setToast({ visible: true, message, subtext });
    setTimeout(() => setToast(null), 3000);
  };

  const handleNavigate = (page: PageView, product?: Product) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      setCurrentProduct(product);
    }
    setCurrentView(page);
  };

  const handleAddToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor === size);
      if (existing) {
        return prev.map(item => (item.id === product.id && item.selectedColor === size) ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedColor: size }];
    });
    
    setIsCartOpen(true);
    showToast(`Added to Bag`, `${product.name} - Size ${size}`);
  };

  const handleRemoveFromCart = (id: string) => {
      setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <Splash key="splash" />}
      </AnimatePresence>

      <Layout 
        onNavigate={handleNavigate} 
        cart={cart}
        currentView={currentView}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        removeFromCart={handleRemoveFromCart}
        language={language}
        setLanguage={setLanguage}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      >
        <AnimatePresence mode="wait">
          {currentView === PageView.HOME ? (
            <Home key="home" onNavigate={handleNavigate} language={language} />
          ) : currentView === PageView.PRODUCT ? (
            <ProductPage key="product" product={currentProduct} onAddToCart={handleAddToCart} language={language} />
          ) : (
            <Auth key={`auth-${currentView}`} type={currentView} onNavigate={handleNavigate} />
          )}
        </AnimatePresence>
      </Layout>

      {/* Custom Toast Notification */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out-expo ${
            toast?.visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        {toast && (
            <div className="bg-premium-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 min-w-[300px]">
                <div className="bg-green-500 rounded-full p-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                    <p className="font-bold text-sm">{toast.message}</p>
                    {toast.subtext && <p className="text-xs text-gray-400 dark:text-gray-600">{toast.subtext}</p>}
                </div>
            </div>
        )}
      </div>
    </>
  );
};

export default App;