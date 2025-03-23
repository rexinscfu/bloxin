"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  RiUserLine,
  RiCircuitBoardLine
} from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Repairs", href: "/repairs" },
    { name: "Electronics", href: "/electronics" },
    { name: "Firmware", href: "/firmware" },
    { name: "Hardware", href: "/hardware" },
    { name: "About", href: "/about" },
  ];

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
          ? "backdrop-blur-lg bg-opacity-70 dark:bg-glass-dark/30 bg-white/70"
          : "bg-transparent"
      }`}
    >
      {/* Animated gradient border on scroll */}
      <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-glass-border to-transparent transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
      
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
            className="hidden md:flex items-center space-x-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => (
              <motion.div key={item.name} variants={itemVariants}>
                <Link
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-glass-primary relative group"
                >
                  {item.name}
                  <span className="absolute left-0 right-0 bottom-0 h-px bg-glass-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Right side items (Theme toggle & Menu button) */}
          <div className="flex items-center gap-5">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 text-foreground rounded-full hover:bg-glass-card-hover"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <RiCloseLine className="h-6 w-6" />
              ) : (
                <RiMenu4Line className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu with Animations */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, height: 'auto', backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, height: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-opacity-70 dark:bg-glass-card/90 bg-white/90 border-t border-glass-border-dark overflow-hidden"
          >
            <motion.div 
              className="container mx-auto px-6 py-5 space-y-1"
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
                    className="flex items-center py-3 px-3 my-1 text-base font-medium transition-all hover:bg-glass-card-hover rounded-glass"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3 text-glass-primary">
                      {item.name === "Home" && <RiHomeSmileLine className="h-5 w-5" />}
                      {item.name === "Blog" && <RiArticleLine className="h-5 w-5" />}
                      {item.name === "Repairs" && <RiSmartphoneLine className="h-5 w-5" />}
                      {item.name === "Electronics" && <RiCpuLine className="h-5 w-5" />}
                      {item.name === "Firmware" && <RiCodeSSlashLine className="h-5 w-5" />}
                      {item.name === "Hardware" && <RiCircuitBoardLine className="h-5 w-5" />}
                      {item.name === "About" && <RiUserLine className="h-5 w-5" />}
                    </span>
                    {item.name}
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