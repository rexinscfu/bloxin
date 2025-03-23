"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  RiGithubLine, 
  RiTwitterXLine, 
  RiInstagramLine, 
  RiYoutubeLine,
  RiRocketLine,
  RiUserLine,
  RiLayoutMasonryLine,
  RiMapPinLine
} from "react-icons/ri";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { 
      section: "Resources", 
      icon: <RiRocketLine className="h-4 w-4" />,
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Guides", href: "/guides" },
        { name: "Tools", href: "/tools" },
      ]
    },
    { 
      section: "About Me", 
      icon: <RiUserLine className="h-4 w-4" />,
      links: [
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Privacy", href: "/privacy" },
      ]
    },
    { 
      section: "Topics", 
      icon: <RiLayoutMasonryLine className="h-4 w-4" />,
      links: [
        { name: "Phone Repair", href: "/blog/category/phone-repair" },
        { name: "Electronics", href: "/blog/category/electronics" },
        { name: "Firmware", href: "/blog/category/firmware" },
        { name: "Hardware Design", href: "/blog/category/hardware-design" },
      ]
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

  return (
    <footer className="relative overflow-hidden bg-glass-dark-gradient border-t border-glass-border-dark">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] bg-no-repeat bg-cover opacity-[0.01] dark:opacity-[0.02] z-0" />
      <motion.div 
        className="absolute -top-64 -left-24 w-96 h-96 rounded-full bg-glass-primary/5 dark:bg-glass-primary/10 blur-3xl z-0"
        animate={{ 
          x: [0, 20, 0], 
          scale: [1, 1.05, 1] 
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute -bottom-80 -right-24 w-[30rem] h-[30rem] rounded-full bg-glass-accent/5 dark:bg-glass-accent/10 blur-3xl z-0"
        animate={{ 
          x: [0, -30, 0],
          scale: [1, 0.95, 1]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2 
        }}
      />
      
      <div className="container mx-auto px-6 py-16 md:py-20 relative z-10">
        <motion.div 
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={itemVariants}>
            <Link href="/" className="inline-block mb-6 group">
              <div className="flex items-center">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-glass-gradient from-glass-primary via-glass-secondary to-glass-accent p-[1px] mr-3">
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
              </div>
            </Link>
            <p className="text-sm text-foreground/70 mb-6 max-w-xs">
              Expert insights on phone repair, electronics, firmware development, and hardware design. Created by Fayssal CHOKRI <span className="inline-flex items-center mt-1"><RiMapPinLine className="h-3 w-3 mr-1 text-glass-primary" /> Casablanca, Morocco</span>
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-button-icon flex items-center justify-center"
                aria-label="GitHub"
              >
                <RiGithubLine className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-button-icon flex items-center justify-center"
                aria-label="Twitter"
              >
                <RiTwitterXLine className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-button-icon flex items-center justify-center"
                aria-label="Instagram"
              >
                <RiInstagramLine className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-button-icon flex items-center justify-center"
                aria-label="YouTube"
              >
                <RiYoutubeLine className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
          
          {footerLinks.map((section) => (
            <motion.div key={section.section} variants={itemVariants}>
              <h3 className="font-medium flex items-center space-x-2 mb-5">
                <span className="text-glass-primary">{section.icon}</span>
                <span>{section.section}</span>
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/70 hover:text-glass-primary transition-colors relative group flex items-center"
                    >
                      <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-glass-primary group-hover:w-full transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 pt-8 border-t border-glass-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="text-sm text-center text-foreground/50 backdrop-blur-sm">
            &copy; {currentYear} Bloxin by Fayssal CHOKRI. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
} 