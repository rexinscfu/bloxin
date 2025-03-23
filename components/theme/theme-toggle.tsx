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
      <motion.div
        initial={false}
        animate={{
          x: theme === "dark" ? "calc(100% - 2rem)" : "0.25rem",
        }}
        className="absolute flex items-center justify-center w-7 h-7"
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full flex items-center justify-center"
          initial={false}
          animate={{
            backgroundColor: theme === "dark" ? "rgba(112, 0, 255, 0.9)" : "rgba(255, 215, 0, 0.9)",
            boxShadow: theme === "dark" 
              ? "0 0 10px rgba(112, 0, 255, 0.5)" 
              : "0 0 10px rgba(255, 215, 0, 0.3)",
          }}
        >
          {theme === "dark" ? (
            <RiMoonClearLine className="h-4 w-4 text-white absolute" />
          ) : (
            <RiSunLine className="h-4 w-4 text-amber-900 absolute" />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
} 