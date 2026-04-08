import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, MessageSquare } from 'lucide-react';
import { Product } from '../types';
import { askProductAI } from '../services/geminiService';

interface GeminiAssistantProps {
  product: Product;
}

export const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: `Hi! I'm your Personal Stylist. Ask me about sizing, materials, or how to style the ${product.name}.` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const answer = await askProductAI(userMsg, product);
    
    setIsLoading(false);
    setMessages(prev => [...prev, { role: 'assistant', text: answer }]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 group ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Ask AI"
      >
        <Sparkles className="w-6 h-6" />
        <span className="absolute right-full mr-4 bg-white text-black px-3 py-1 rounded-lg text-sm font-medium shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Ask Stylist
        </span>
      </button>

      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-up">
          <div className="bg-gradient-to-r from-gray-900 to-black p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2 text-white">
              <Sparkles className="w-4 h-4 text-premium-accent" />
              <span className="font-medium text-sm">ZENITH Stylist</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-black text-white rounded-br-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fit, size..."
              className="flex-grow bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 bg-black text-white rounded-full disabled:opacity-50 hover:bg-gray-800 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};