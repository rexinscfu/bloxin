"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { 
  RiCpuLine, 
  RiSmartphoneLine, 
  RiCodeSSlashLine, 
  RiHardDriveLine, 
  RiMenu4Line, 
  RiCloseLine,
  RiHomeSmileLine,
  RiArticleLine,
  RiUserLine
} from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on pathname change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Repairs", href: "/repairs" },
    { name: "Electronics", href: "/electronics" },
    { name: "Firmware", href: "/firmware" },
    { name: "Hardware", href: "/hardware" },
    { name: "About", href: "/about" },
  ];

  // Function to check if a link is active
  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Define animation variants for menu items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      }
    },
  };
  
  // Logo animation variants
  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    tap: { scale: 0.95 },
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-xl bg-white/60 dark:bg-glass-dark/50 shadow-glass-sm border-b border-glass-border/30"
          : "bg-transparent"
      }`}
    >
      {/* Animated gradient border on scroll */}
      <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-glass-primary/30 to-transparent transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileTap="tap"
            className="relative"
          >
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-glass-gradient from-glass-primary via-glass-secondary to-glass-accent p-[1px]">
                <div className="w-full h-full rounded-xl bg-glass-dark flex items-center justify-center overflow-hidden">
                  <span className="text-2xl font-bold text-transparent bg-glass-gradient from-glass-primary via-glass-secondary to-glass-accent bg-clip-text">B</span>
                </div>
                <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-glass-gradient from-glass-primary via-glass-secondary to-glass-accent opacity-20 animate-glass-gradient bg-[length:200%_auto]"></div>
                </div>
              </div>
              <span className="text-xl font-display text-gradient font-bold animate-glass-gradient bg-[length:200%_auto]">
                Bloxin
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center space-x-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <motion.div key={item.name} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 rounded-glass-lg text-sm font-medium transition-all group overflow-hidden ${
                      active 
                        ? 'bg-glass-card shadow-glass-sm text-glass-primary' 
                        : 'hover:bg-glass-card hover:shadow-glass-sm'
                    }`}
                  >
                    {/* Hover gradient effect */}
                    <div className={`absolute inset-0 bg-glass-gradient from-glass-primary/5 via-glass-secondary/5 to-glass-accent/5 dark:from-glass-primary/10 dark:via-glass-secondary/10 dark:to-glass-accent/10 transition-opacity duration-500 ${
                      active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100' 
                    }`}></div>
                    
                    {/* Active indicator dot */}
                    {active && (
                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-glass-primary"></span>
                    )}
                    
                    {/* Text with highlight effect */}
                    <span className="relative z-10 inline-flex items-center">
                      {item.name}
                      <span className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-glass-primary/0 via-glass-primary to-glass-primary/0 transition-transform duration-300 origin-center ${
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}></span>
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>

          {/* Right side items (Theme toggle & Menu button) */}
          <div className="flex items-center gap-5">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden relative overflow-hidden w-10 h-10 glass-card border border-glass-border rounded-xl flex items-center justify-center backdrop-blur-md group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-glass-gradient from-glass-primary/10 via-glass-secondary/10 to-glass-accent/10 dark:from-glass-primary/20 dark:via-glass-secondary/20 dark:to-glass-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-glass-gradient bg-[length:200%_auto]"></div>
              
              <motion.div 
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {isMobileMenuOpen ? (
                  <RiCloseLine className="h-5 w-5 text-glass-primary" />
                ) : (
                  <RiMenu4Line className="h-5 w-5 text-glass-primary" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu with Animations */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, height: 'auto', backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, height: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-opacity-85 dark:bg-glass-dark/80 bg-white/80 border-t border-glass-border-dark overflow-hidden relative"
          >
            {/* Mobile menu background decorations */}
            <div className="absolute inset-0 bg-[url('/images/glass-grid.svg')] bg-repeat opacity-[0.02] dark:opacity-[0.03] z-0"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-glass-primary/5 dark:bg-glass-primary/10 blur-3xl z-0"></div>
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-glass-accent/5 dark:bg-glass-accent/10 blur-3xl z-0"></div>
            
            <motion.div 
              className="container mx-auto px-6 py-6 space-y-2 relative z-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  custom={index}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center py-3.5 px-4 rounded-glass transition-all group relative overflow-hidden ${
                      isActive(item.href) 
                        ? 'bg-glass-card shadow-glass-sm' 
                        : 'hover:bg-glass-card hover:shadow-glass-sm'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {/* Item gradient hover effect */}
                    <div className={`absolute inset-0 bg-glass-gradient from-glass-primary/5 via-glass-secondary/5 to-glass-accent/5 dark:from-glass-primary/10 dark:via-glass-secondary/10 dark:to-glass-accent/10 transition-opacity duration-500 ${
                      isActive(item.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}></div>
                    
                    {/* Icon container with gradient */}
                    <div className={`mr-4 w-9 h-9 rounded-xl flex items-center justify-center bg-glass-card shadow-glass-sm relative ${
                      isActive(item.href) ? 'shadow-glass' : 'group-hover:shadow-glass'
                    }`}>
                      <div className={`absolute inset-0 rounded-xl bg-glass-gradient from-glass-primary/20 via-glass-secondary/20 to-glass-accent/20 transition-opacity duration-500 ${
                        isActive(item.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}></div>
                      <span className="text-glass-primary relative z-10">
                        {item.name === "Home" && <RiHomeSmileLine className="h-5 w-5" />}
                        {item.name === "Blog" && <RiArticleLine className="h-5 w-5" />}
                        {item.name === "Repairs" && <RiSmartphoneLine className="h-5 w-5" />}
                        {item.name === "Electronics" && <RiCpuLine className="h-5 w-5" />}
                        {item.name === "Firmware" && <RiCodeSSlashLine className="h-5 w-5" />}
                        {item.name === "Hardware" && <RiHardDriveLine className="h-5 w-5" />}
                        {item.name === "About" && <RiUserLine className="h-5 w-5" />}
                      </span>
                    </div>
                    
                    {/* Item label */}
                    <div className="flex flex-col">
                      <span className={`text-base font-medium transition-colors ${
                        isActive(item.href) ? 'text-glass-primary' : 'group-hover:text-glass-primary'
                      }`}>{item.name}</span>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive(item.href) && (
                      <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-glass-primary"></div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 