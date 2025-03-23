"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  attribute?: string;
  disableTransitionOnChange?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme?: Theme;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  attribute = "data-theme",
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<Theme>();

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    
    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
        
      root.classList.add(systemTheme);
      setResolvedTheme(systemTheme);
    } else {
      root.classList.add(theme);
      setResolvedTheme(theme);
    }

    if (attribute === "class") {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(theme);
    } else {
      document.body.removeAttribute("data-theme");
      if (theme !== "system" || !enableSystem) {
        document.body.setAttribute(attribute, theme);
      }
    }
  }, [theme, enableSystem, attribute]);

  const setTheme = React.useCallback((newTheme: Theme) => {
    if (disableTransitionOnChange) {
      document.documentElement.classList.add("disable-transition");
      setTimeout(() => {
        document.documentElement.classList.remove("disable-transition");
      }, 0);
    }
    setThemeState(newTheme);
  }, [disableTransitionOnChange]);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      if (theme === "system") {
        setResolvedTheme(mediaQuery.matches ? "dark" : "light");
        
        if (attribute === "class") {
          document.documentElement.classList.remove("light", "dark");
          document.documentElement.classList.add(
            mediaQuery.matches ? "dark" : "light"
          );
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, attribute, enableSystem]);

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        setTheme,
        resolvedTheme,
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
    
  return context;
}; 