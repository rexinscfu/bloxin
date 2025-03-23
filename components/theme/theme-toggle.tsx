"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { RiSunLine, RiMoonClearLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <div className="w-16 h-9 rounded-glass-full bg-glass-card border border-glass-border"></div>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative h-9 w-16 overflow-hidden rounded-glass-full glass-card border border-glass-border backdrop-blur-md transition-all duration-500"
      type="button"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 bg-glass-gradient from-glass-primary via-glass-secondary to-glass-accent opacity-${theme === 'dark' ? '20' : '10'} animate-glass-gradient bg-[length:300%_auto]`}></div>
      </div>
      
      {/* Track base */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[calc(100%-6px)] h-[calc(100%-6px)] rounded-full bg-glass-card/40"></div>
      </div>

      {/* Icon container */}
      <div className="absolute inset-0 flex items-center justify-between px-[9px]">
        {/* Sun icon with glow */}
        <div className={`relative transition-all duration-500 transform ${theme === 'light' ? 'opacity-100 scale-100' : 'opacity-30 scale-90'}`}>
          <div className={`absolute inset-0 rounded-full ${theme === 'light' ? 'bg-amber-500/20 blur-[5px]' : 'bg-transparent'}`}></div>
          <RiSunLine className={`h-4 w-4 ${theme === 'light' ? 'text-amber-500' : 'text-gray-400'} relative z-10`} />
        </div>
        
        {/* Moon icon with glow */}
        <div className={`relative transition-all duration-500 transform ${theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-30 scale-90'}`}>
          <div className={`absolute inset-0 rounded-full ${theme === 'dark' ? 'bg-indigo-400/20 blur-[5px]' : 'bg-transparent'}`}></div>
          <RiMoonClearLine className={`h-4 w-4 ${theme === 'dark' ? 'text-indigo-300' : 'text-gray-400'} relative z-10`} />
        </div>
      </div>
      
      {/* Sliding indicator */}
      <div 
        className={`absolute top-[4px] h-[28px] w-[28px] rounded-full transition-all duration-500 shadow-lg ${
          theme === 'dark' 
            ? 'right-[4px] translate-x-0' 
            : 'left-[4px] translate-x-0'
        }`}
      >
        {/* Dark theme slider */}
        <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
          theme === 'dark' ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600/80 to-purple-700/80 opacity-0 animate-pulse"></div>
          <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent rounded-full"></div>
          </div>
          <div className="absolute -inset-[4px] rounded-full opacity-50 blur-md bg-indigo-500/30"></div>
        </div>
        
        {/* Light theme slider */}
        <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
          theme === 'light' ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-500"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/80 to-orange-500/80 opacity-0 animate-pulse"></div>
          <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-amber-300 to-orange-400 overflow-hidden">
            <div className="absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent rounded-full"></div>
          </div>
          <div className="absolute -inset-[4px] rounded-full opacity-50 blur-md bg-amber-400/30"></div>
        </div>
      </div>
    </motion.button>
  );
} 