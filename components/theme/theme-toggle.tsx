"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-8 w-14 items-center justify-center rounded-ios-full bg-ios-gray-5 dark:bg-ios-dark-3 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ios-blue"
      type="button"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <motion.span
        initial={false}
        animate={{
          x: theme === "dark" ? "calc(100% - 2px)" : "2px",
          backgroundColor: theme === "dark" ? "#007AFF" : "#ffffff",
        }}
        className="absolute left-0 h-6 w-6 rounded-full shadow-sm flex items-center justify-center"
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {theme === "dark" ? (
          <FiMoon className="h-3 w-3 text-white" />
        ) : (
          <FiSun className="h-3 w-3 text-ios-orange" />
        )}
      </motion.span>
    </motion.button>
  );
} 