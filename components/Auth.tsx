import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { PageView } from '../types';

interface AuthProps {
  onNavigate: (page: PageView) => void;
  type: 'LOGIN' | 'REGISTER';
}

export const Auth: React.FC<AuthProps> = ({ onNavigate, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isLogin = type === 'LOGIN';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login processing
    onNavigate(PageView.HOME);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-premium-white dark:bg-premium-black transition-colors duration-500 flex flex-col justify-center items-center px-6 pt-24 pb-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200 dark:bg-gray-800 rounded-full blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-lighten pointer-events-none animate-float"></div>
      
      <div className="w-full max-w-md relative z-10">
        <motion.div
          key={type}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-premium-black dark:text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {isLogin ? 'Sign in to access your Zenith account.' : 'Join Zenith for an elevated experience.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-premium-black dark:text-white mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-premium-black dark:text-white focus:ring-1 focus:ring-premium-black dark:focus:ring-white focus:border-premium-black dark:focus:border-white transition-colors"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-premium-black dark:text-white mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-premium-black dark:text-white focus:ring-1 focus:ring-premium-black dark:focus:ring-white focus:border-premium-black dark:focus:border-white transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-premium-black dark:text-white">Password</label>
                {isLogin && (
                  <button type="button" className="text-xs font-medium text-gray-500 hover:text-premium-black dark:text-gray-400 dark:hover:text-white transition-colors">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-premium-black dark:text-white focus:ring-1 focus:ring-premium-black dark:focus:ring-white focus:border-premium-black dark:focus:border-white transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-black dark:hover:text-white transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-black dark:hover:text-white transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-premium-black dark:bg-white text-white dark:text-black py-4 rounded-lg font-bold uppercase tracking-wider transition-all hover:bg-premium-accent dark:hover:bg-premium-accent hover:text-white flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <span className="relative z-10">{isLogin ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-transparent text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path fill="currentColor" fillRule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.11-5.112c3.415 0 5.485-2.298 5.76-5.419H12.01v2.336h3.407c-.147 1.054-1.077 2.15-3.41 2.15-2.04 0-3.69-1.637-3.69-3.791 0-2.153 1.65-3.832 3.69-3.832 1.542 0 2.502.66 3.076 1.229l1.83-1.8c-1.325-1.229-3.08-1.93-4.908-1.93-3.328 0-6.19 2.518-6.19 6.333 0 3.815 2.862 6.333 6.19 6.333z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Sign in with Google</span>
              </button>
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-transparent text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Sign in with Facebook</span>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-sm">
          <p className="text-gray-500 dark:text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => onNavigate(isLogin ? PageView.REGISTER : PageView.LOGIN)}
              className="font-bold text-premium-black dark:text-white hover:text-premium-accent dark:hover:text-premium-accent transition-colors underline underline-offset-4"
            >
               {isLogin ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
