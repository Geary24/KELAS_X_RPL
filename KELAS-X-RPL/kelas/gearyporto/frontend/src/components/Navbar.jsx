import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full z-50 glass-panel border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <a href="#" className="text-2xl font-bold tracking-tighter">
                <span className="text-white">GEARY</span>
                <span className="text-neon-blue"> ERAMUS</span>
              </a>
            </div>

            {/* Center Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Home', 'About', 'Portfolio', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white hover:text-neon-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Auth Status Actions */}
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-xs font-mono font-bold text-white tracking-wide">{user.name}</span>
                    <span className="text-[10px] font-mono text-neon-blue tracking-tighter">{user.email}</span>
                  </div>
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-neon-blue to-neon-purple p-[1px]">
                    <div className="h-full w-full bg-dark-bg rounded-xl flex items-center justify-center font-black text-xs text-white">
                      {user.name.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="px-4 py-2 border border-neon-purple/30 hover:border-neon-purple bg-transparent text-neon-purple hover:text-white hover:bg-neon-purple/10 text-[10px] font-mono font-bold tracking-widest rounded-xl transition-all duration-300 cursor-pointer uppercase"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-neon-blue to-neon-purple text-dark-bg text-xs font-black tracking-widest rounded-xl hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all cursor-pointer select-none uppercase hover:scale-[1.03] active:scale-[0.97]"
                >
                  Connect_Auth
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal Overlay */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Navbar;
