"use client";

import { useEffect, useRef } from "react";
import { 
  RiCpuLine, 
  RiSmartphoneLine, 
  RiCodeSSlashLine, 
  RiHardDriveLine, 
  RiArrowRightLine, 
  RiMailLine
} from "react-icons/ri";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function Home() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: false });
  
  const categories = [
    {
      title: "Phone Repair",
      description: "Expert guides on repairing modern smartphones and tablets.",
      icon: <RiSmartphoneLine className="h-8 w-8" />,
      href: "/blog/category/phone-repair",
      gradient: "from-glass-primary to-glass-secondary",
    },
    {
      title: "Electronics",
      description: "Circuit analysis, component guides, and troubleshooting tips.",
      icon: <RiCpuLine className="h-8 w-8" />,
      href: "/blog/category/electronics",
      gradient: "from-glass-secondary to-glass-accent",
    },
    {
      title: "Firmware Dev",
      description: "Tutorials on embedded systems and firmware development.",
      icon: <RiCodeSSlashLine className="h-8 w-8" />,
      href: "/blog/category/firmware",
      gradient: "from-glass-accent to-glass-primary",
    },
    {
      title: "Hardware Design",
      description: "PCB layout, design principles, and DIY hardware projects.",
      icon: <RiHardDriveLine className="h-8 w-8" />,
      href: "/blog/category/hardware-design",
      gradient: "from-glass-primary/80 to-glass-accent/80",
    },
  ];

  const recentPosts = [
    {
      title: "Understanding USB-C Power Delivery",
      excerpt: "A comprehensive look at USB-C PD protocols and how to implement them in your designs.",
      date: "Mar 15, 2025",
      readTime: "6 min read",
      slug: "/blog/understanding-usb-c-power-delivery",
      category: "Electronics",
    },
    {
      title: "iPhone 16 Pro Display Replacement Guide",
      excerpt: "Step-by-step instructions for safely replacing the display on the latest iPhone model.",
      date: "Mar 10, 2025",
      readTime: "12 min read",
      slug: "/blog/iphone-16-pro-display-replacement",
      category: "Phone Repair",
    },
    {
      title: "Building a Custom Mechanical Keyboard",
      excerpt: "From PCB design to firmware and assembly - create your perfect typing experience.",
      date: "Mar 5, 2025",
      readTime: "15 min read",
      slug: "/blog/custom-mechanical-keyboard",
      category: "Hardware Design",
    },
  ];
  
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

  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    categoryRefs.current = categoryRefs.current.slice(0, categories.length);
    postRefs.current = postRefs.current.slice(0, recentPosts.length);
  }, [categories.length, recentPosts.length]);

  return (
    <div className="min-h-screen" ref={scrollRef}>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative px-6 pt-36 md:pt-44 pb-40 md:pb-60 overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-glass-gradient-radial opacity-10 dark:opacity-20 z-0" />
        <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] bg-no-repeat bg-cover opacity-[0.04] dark:opacity-[0.06] z-0" />
        
        {/* Premium Glass Particles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, index) => (
            <motion.div
              key={index}
              className={`absolute rounded-full opacity-20 mix-blend-screen bg-glass-${index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}`}
              style={{
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [0.2, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
        {/* Floating glass shapes with enhanced effects */}
        <motion.div 
          className="absolute top-20 left-[5%] w-60 h-60 rounded-full bg-gradient-to-br from-glass-primary/15 to-glass-secondary/15 dark:from-glass-primary/25 dark:to-glass-secondary/25 blur-3xl z-0"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, 15, 0], 
            scale: [1, 1.05, 1],
            rotate: [0, 10, 0] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-40 right-[10%] w-72 h-72 rounded-full bg-gradient-to-tr from-glass-secondary/15 to-glass-accent/15 dark:from-glass-secondary/25 dark:to-glass-accent/25 blur-3xl z-0"
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 20, 0], 
            scale: [1, 1.1, 1],
            rotate: [0, -15, 0]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-[25%] w-80 h-80 rounded-full bg-gradient-to-bl from-glass-accent/15 to-glass-primary/15 dark:from-glass-accent/25 dark:to-glass-primary/25 blur-3xl z-0"
          animate={{ 
            x: [0, 25, 0], 
            y: [0, -15, 0], 
            scale: [1, 0.95, 1],
            rotate: [0, 20, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: 2
          }}
        />
        
        {/* Enhanced hero content with backdrop glassmorphism */}
        <motion.div 
          className="relative container mx-auto z-10"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              className="inline-block mb-4 px-5 py-2 rounded-full bg-glass-card border border-glass-border text-sm font-medium backdrop-blur-xl shadow-glass-sm relative overflow-hidden group"
              initial={{ opacity: 0, y: -20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-glass-gradient from-glass-primary/10 via-glass-secondary/10 to-glass-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10">The ultimate electronics and repair resource</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="text-gradient font-display animate-glass-gradient bg-[length:300%_auto]">
                Modern Tech Insights
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-10 text-foreground/80"
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Expert guides on phone repair, electronics, firmware development, and hardware design.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href="/blog"
                className="glass-button-primary group px-8 py-4 text-base relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-glass-gradient from-glass-primary/80 to-glass-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 flex items-center">
                  Explore Blog
                  <RiArrowRightLine className="ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/guides"
                className="glass-button-secondary group px-8 py-4 text-base relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-glass-gradient from-glass-primary/10 via-glass-secondary/10 to-glass-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10">View Guides</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Enhanced hero bottom decoration with animated gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-glass-border to-transparent z-[2]">
          <div className="absolute inset-0 animate-glass-gradient bg-[length:200%_auto] bg-glass-gradient opacity-50"></div>
        </div>
      </section>

      {/* Categories Section with enhanced glass effects */}
      <section className="py-24 bg-opacity-90 dark:bg-glass-dark-gradient bg-gradient-to-b from-white/80 to-gray-100/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] bg-no-repeat bg-cover opacity-[0.02] dark:opacity-[0.03] z-0" />
        <div className="absolute top-0 left-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-glass-border to-transparent z-[2]">
          <div className="absolute inset-0 animate-glass-gradient bg-[length:200%_auto] bg-glass-gradient opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Topics</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">Dive into our carefully curated collection of tutorials, guides, and insights across various technology domains.</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {categories.map((category, i) => (
              <motion.div 
                key={category.title} 
                variants={itemVariants}
                ref={(el) => { categoryRefs.current[i] = el; }}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3 } 
                }}
              >
                <Link href={category.href} className="block h-full relative group">
                  {/* Animated gradient border */}
                  <div className="absolute -inset-0.5 rounded-glass-lg bg-glass-gradient from-glass-primary/30 via-glass-secondary/30 to-glass-accent/30 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-glass-gradient bg-[length:200%_auto]"></div>
                  
                  <div className="glass-card h-full p-6 relative bg-opacity-90 backdrop-blur-xl shadow-glass-sm z-10 group-hover:shadow-glass group-hover:border-glass-highlight transition-all duration-500">
                    {/* Improved icon area with animated gradient */}
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-5 p-3 relative overflow-hidden group`}>
                      {/* Base gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} transition-opacity duration-500`}></div>
                      
                      {/* Animated hover gradient */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-glass-gradient animate-glass-gradient bg-[length:200%_auto] opacity-70"></div>
                      </div>
                      
                      {/* Radial glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Icon */}
                      <span className="relative text-white transition-transform duration-500 group-hover:scale-110">{category.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-glass-primary transition-colors duration-300 relative">
                      {category.title}
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-glass-primary/0 via-glass-primary to-glass-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
                    </h3>
                    
                    <p className="text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">{category.description}</p>
                    
                    {/* Explore badge */}
                    <div className="mt-4 inline-flex items-center text-sm font-medium text-glass-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span>Explore</span>
                      <RiArrowRightLine className="ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Posts Section with premium glass cards */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Recent Articles</h2>
              <p className="text-foreground/70 max-w-md">Get the latest insights and tutorials from our expert contributors.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/blog" className="glass-button-text group">
                <span>View all articles</span>
                <RiArrowRightLine className="ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {recentPosts.map((post, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                ref={(el) => { postRefs.current[index] = el; }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={post.slug} className="block h-full relative group">
                  {/* Animated gradient border */}
                  <div className="absolute -inset-0.5 rounded-glass-lg bg-glass-gradient from-glass-primary/20 via-glass-secondary/20 to-glass-accent/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-glass-gradient bg-[length:200%_auto]"></div>
                  
                  <article className="glass-card overflow-hidden h-full shadow-glass-sm group-hover:shadow-glass relative bg-opacity-90 backdrop-blur-xl border-glass-border group-hover:border-glass-highlight transition-all duration-500 z-10">
                    <div className="relative h-56 overflow-hidden">
                      {/* Background gradient base */}
                      <div className="absolute inset-0 bg-gradient-to-br from-glass-primary/10 to-glass-accent/10 dark:from-glass-primary/20 dark:to-glass-accent/20"></div>
                      
                      {/* Animated hover gradient */}
                      <div className="absolute inset-0 bg-glass-gradient opacity-0 group-hover:opacity-100 animate-glass-gradient bg-[length:200%_auto] transition-opacity duration-700"></div>
                      
                      {/* Cool diagonal line design */}
                      <div className="absolute inset-0 overflow-hidden">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div 
                            key={i} 
                            className="absolute h-px bg-white/10 dark:bg-white/20"
                            style={{ 
                              left: 0,
                              right: 0,
                              top: `${20 + i * 15}%`,
                              transform: 'rotate(-45deg) scale(1.5)',
                              transformOrigin: 'center',
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Icon with glow effect */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-5xl text-glass-primary/30 group-hover:text-glass-primary/50 transition-all duration-500 transform group-hover:scale-110 relative">
                          <div className="absolute inset-0 blur-xl bg-glass-primary/20 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-500 rounded-full"></div>
                          <span className="relative">
                            {post.category === "Electronics" && <RiCpuLine />}
                            {post.category === "Phone Repair" && <RiSmartphoneLine />}
                            {post.category === "Hardware Design" && <RiHardDriveLine />}
                            {post.category === "Firmware" && <RiCodeSSlashLine />}
                          </span>
                        </div>
                      </div>
                      
                      {/* Overlay gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-glass-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    <div className="p-6">
                      {/* Category badge */}
                      <div className="mb-3 inline-flex px-3 py-1 rounded-full bg-glass-card text-xs font-medium border border-glass-border">
                        {post.category}
                      </div>
                      
                      <div className="flex items-center text-sm text-foreground/60 mb-3">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-glass-primary transition-colors duration-300">{post.title}</h3>
                      
                      <p className="text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300 mb-4">{post.excerpt}</p>
                      
                      <div className="inline-flex items-center text-sm font-medium text-glass-primary transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                        Read article
                        <RiArrowRightLine className="ml-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section with premium glassmorphism */}
      <section className="py-24 bg-gradient-to-r from-glass-primary/5 via-glass-secondary/5 to-glass-accent/5 dark:from-glass-primary/20 dark:via-glass-secondary/15 dark:to-glass-accent/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] bg-no-repeat bg-cover opacity-[0.02] dark:opacity-[0.04] z-0" />
        <div className="absolute top-0 left-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-glass-border to-transparent z-[2]">
          <div className="absolute inset-0 animate-glass-gradient bg-[length:200%_auto] bg-glass-gradient opacity-50"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-glass-border to-transparent z-[2]">
          <div className="absolute inset-0 animate-glass-gradient bg-[length:200%_auto] bg-glass-gradient opacity-50"></div>
        </div>
        
        {/* Floating glass particles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, index) => (
            <motion.div
              key={index}
              className={`absolute rounded-full opacity-20 mix-blend-screen bg-glass-${index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}`}
              style={{
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -80 - 40],
                x: [0, (Math.random() - 0.5) * 40],
                opacity: [0.2, 0]
              }}
              transition={{
                duration: Math.random() * 8 + 8,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
        {/* Floating glass shapes */}
        <motion.div 
          className="absolute top-0 left-[15%] w-64 h-64 rounded-full bg-gradient-to-br from-glass-primary/10 to-glass-secondary/10 dark:from-glass-primary/20 dark:to-glass-secondary/20 blur-3xl z-0"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, 15, 0],
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-[10%] w-80 h-80 rounded-full bg-gradient-to-tr from-glass-secondary/10 to-glass-accent/10 dark:from-glass-secondary/20 dark:to-glass-accent/20 blur-3xl z-0"
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 20, 0],
            scale: [1, 0.95, 1],
            rotate: [0, -8, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto glass-card p-10 md:p-14 text-center relative overflow-hidden border-glass-highlight shadow-glass"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Inner highlight effects */}
            <div className="absolute -inset-0.5 rounded-glass-lg bg-glass-gradient from-glass-primary/20 via-glass-secondary/20 to-glass-accent/20 blur-sm z-0"></div>
            <div className="absolute inset-0 bg-glass-card bg-opacity-95 backdrop-blur-xl rounded-glass-lg z-10"></div>
            
            {/* Content wrapper */}
            <div className="relative z-20">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="w-20 h-20 mx-auto mb-8 rounded-full relative"
              >
                {/* Animated border */}
                <div className="absolute inset-0 rounded-full bg-glass-gradient from-glass-primary via-glass-secondary to-glass-accent animate-glass-gradient bg-[length:200%_auto]"></div>
                
                {/* Inner content */}
                <div className="absolute inset-0.5 rounded-full bg-glass-dark flex items-center justify-center overflow-hidden backdrop-blur-xl">
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-glass-primary/20 to-glass-accent/5 opacity-60"></div>
                  <RiMailLine className="w-8 h-8 text-white relative z-10" />
                </div>
                
                {/* Glow effect */}
                <div className="absolute -inset-2 rounded-full bg-glass-primary/20 blur-xl opacity-50 animate-pulse"></div>
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Stay Updated
              </motion.h2>
              
              <motion.p 
                className="text-foreground/80 mb-8 max-w-xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Subscribe to our newsletter for the latest tech repair guides, electronics tutorials, and hardware tips.
              </motion.p>
              
              <motion.form 
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex-1 relative group">
                  <div className="absolute -inset-0.5 rounded-glass bg-glass-gradient from-glass-primary/30 via-glass-secondary/30 to-glass-accent/30 opacity-0 group-focus-within:opacity-100 blur-sm transition-opacity duration-300"></div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="glass-input flex-1 px-5 py-3.5 w-full relative z-10 backdrop-blur-xl border-glass-border focus:border-transparent group-focus-within:shadow-glass-sm transition-all duration-300"
                    required
                  />
                </div>
                
                <div className="relative group">
                  <div className="absolute -inset-0.5 rounded-glass-full bg-glass-gradient from-glass-primary/50 via-glass-secondary/50 to-glass-accent/50 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
                  <button
                    type="submit"
                    className="glass-button-primary px-6 py-3.5 whitespace-nowrap w-full sm:w-auto relative z-10 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-glass-gradient from-glass-primary/80 to-glass-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      Subscribe
                      <RiArrowRightLine className="ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </div>
              </motion.form>
              
              {/* Privacy note */}
              <motion.p
                className="text-xs text-foreground/60 mt-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
              >
                By subscribing, you agree to our Privacy Policy. We respect your privacy and will never share your information.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
