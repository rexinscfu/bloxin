"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { RiSunLine, RiMoonClearLine } from "react-icons/ri";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-9 w-16 items-center justify-center rounded-glass-full bg-glass-card border border-glass-border backdrop-blur-md transition-colors duration-300"
      type="button"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <span className="absolute inset-0 overflow-hidden rounded-glass-full">
        <span className="absolute inset-0 bg-glass-gradient-radial opacity-10"></span>
      </span>
      <motion.span
        initial={false}
        animate={{
          x: theme === "dark" ? "calc(100% - 2px)" : "2px",
          backgroundColor: theme === "dark" ? "rgba(112, 0, 255, 0.9)" : "rgba(255, 255, 255, 0.9)",
          boxShadow: theme === "dark" 
            ? "0 0 10px rgba(112, 0, 255, 0.5)" 
            : "0 0 10px rgba(255, 255, 255, 0.3)",
        }}
        className="absolute left-0 h-7 w-7 rounded-full shadow-sm flex items-center justify-center"
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {theme === "dark" ? (
          <RiMoonClearLine className="h-4 w-4 text-white" />
        ) : (
          <RiSunLine className="h-4 w-4 text-glass-warning" />
        )}
      </motion.span>
    </motion.button>
  );
} 