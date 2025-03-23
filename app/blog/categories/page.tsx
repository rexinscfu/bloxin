"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  RiLayoutGridLine, 
  RiFileListLine, 
  RiToolsFill, 
  RiCpuLine, 
  RiSmartphoneLine,
  RiCodeSSlashLine,
  RiArrowRightLine 
} from "react-icons/ri";

// Mock categories data with their respective icons
const CATEGORIES = [
  {
    id: "electronics",
    name: "Electronics",
    description: "Circuit design, components, testing, and electronic engineering principles.",
    icon: RiCpuLine,
    count: 10,
    color: "from-blue-500/20 to-cyan-500/20 dark:from-blue-500/40 dark:to-cyan-500/40"
  },
  {
    id: "phone-repair",
    name: "Phone Repair",
    description: "Repair guides for smartphones, tablets, and mobile device troubleshooting.",
    icon: RiSmartphoneLine,
    count: 8,
    color: "from-purple-500/20 to-pink-500/20 dark:from-purple-500/40 dark:to-pink-500/40"
  },
  {
    id: "firmware",
    name: "Firmware",
    description: "Embedded systems programming, firmware updates, and microcontroller development.",
    icon: RiCodeSSlashLine,
    count: 6,
    color: "from-amber-500/20 to-orange-500/20 dark:from-amber-500/40 dark:to-orange-500/40"
  },
  {
    id: "hardware-design",
    name: "Hardware Design",
    description: "PCB layout, product design, prototyping, and hardware engineering fundamentals.",
    icon: RiToolsFill,
    count: 9,
    color: "from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/40 dark:to-teal-500/40"
  }
];

export default function CategoriesPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen py-20 md:py-32">
      {/* Hero section */}
      <section className="relative mb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-glass-gradient opacity-10 dark:opacity-20"></div>
          <div className="absolute top-0 left-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-glass-border to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-glass-border to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-gradient font-display animate-glass-gradient bg-[length:300%_auto]">Blog Categories</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-8 text-foreground/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Browse our content by topic to find exactly what you're looking for
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link 
                href="/blog" 
                className="glass-button-primary px-5 py-2.5 inline-flex items-center"
              >
                <RiFileListLine className="mr-2" />
                View all posts
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Categories Grid */}
      <div className="container mx-auto px-6 mb-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            
            return (
              <motion.div 
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/blog?category=${category.id}`} className="block h-full relative group">
                  {/* Animated gradient border */}
                  <div className="absolute -inset-0.5 rounded-glass-lg bg-glass-gradient from-glass-primary/20 via-glass-secondary/20 to-glass-accent/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-glass-gradient bg-[length:200%_auto]"></div>
                  
                  <div className="glass-card overflow-hidden h-full shadow-glass-sm group-hover:shadow-glass relative bg-opacity-90 backdrop-blur-xl border-glass-border group-hover:border-glass-highlight transition-all duration-500 z-10 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      {/* Icon Container */}
                      <div className={`glass-card w-16 h-16 md:w-20 md:h-20 rounded-glass-lg flex items-center justify-center bg-gradient-to-br ${category.color} backdrop-blur-xl`}>
                        <Icon className="text-3xl md:text-4xl text-foreground/90" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h2 className="text-xl md:text-2xl font-semibold group-hover:text-glass-primary transition-colors duration-300">{category.name}</h2>
                          <span className="glass-card px-2 py-1 rounded-full text-xs font-medium">
                            {category.count} posts
                          </span>
                        </div>
                        
                        <p className="text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300 mb-4">
                          {category.description}
                        </p>
                        
                        <div className="inline-flex items-center text-sm font-medium text-glass-primary transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                          Browse {category.name}
                          <RiArrowRightLine className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
      
      {/* Additional Section */}
      <div className="container mx-auto px-6">
        <div className="glass-card bg-glass-gradient bg-opacity-5 p-8 md:p-12 rounded-glass-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-glass-primary/5 via-glass-secondary/5 to-glass-accent/5 dark:from-glass-primary/10 dark:via-glass-secondary/10 dark:to-glass-accent/10 opacity-70"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="text-lg mb-6 text-foreground/80">
              If you have a specific topic or question that isn't covered in our blog categories, feel free to reach out.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="glass-button-primary px-5 py-2.5">
                Contact Us
              </Link>
              <Link href="/request-topic" className="glass-button px-5 py-2.5">
                Request a Topic
              </Link>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-glass-primary/10 dark:bg-glass-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-glass-accent/10 dark:bg-glass-accent/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
} 