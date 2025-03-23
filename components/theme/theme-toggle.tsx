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
      className="relative inline-flex h-9 w-16 items-center justify-center rounded-glass-full bg-glass-card border border-glass-border backdrop-blur-md transition-colors duration-300"
      type="button"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <span className="absolute inset-0 overflow-hidden rounded-glass-full">
        <span className="absolute inset-0 bg-glass-gradient opacity-10"></span>
      </span>
      
      {/* Sun icon (Light mode) */}
      <span className={`absolute left-2.5 transition-all duration-300 transform ${theme === 'light' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <RiSunLine className="h-4 w-4 text-amber-600" />
      </span>
      
      {/* Moon icon (Dark mode) */}
      <span className={`absolute right-2.5 transition-all duration-300 transform ${theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <RiMoonClearLine className="h-4 w-4 text-indigo-200" />
      </span>
      
      {/* Toggle slider */}
      <span
        className={`absolute top-1 h-7 w-7 rounded-full transition-all duration-300 transform ${theme === 'dark' ? 'right-1 bg-purple-600' : 'left-1 bg-amber-400'}`}
      />
    </motion.button>
  );
} 