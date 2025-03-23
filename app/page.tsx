"use client";

import { useEffect, useRef } from "react";
import { 
  RiCpuLine, 
  RiSmartphoneLine, 
  RiCodeSSlashLine, 
  RiHardDriveLine, 
  RiArrowRightLine, 
  RiMailLine,
  RiTerminalBoxLine
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
      icon: <RiTerminalBoxLine className="h-8 w-8" />,
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
        
        {/* Floating glass shapes */}
        <motion.div 
          className="absolute top-20 left-[5%] w-60 h-60 rounded-full bg-glass-primary/10 dark:bg-glass-primary/20 blur-3xl z-0"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, 15, 0], 
            scale: [1, 1.05, 1] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-40 right-[10%] w-72 h-72 rounded-full bg-glass-accent/10 dark:bg-glass-accent/20 blur-3xl z-0"
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 20, 0], 
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-[25%] w-80 h-80 rounded-full bg-glass-secondary/10 dark:bg-glass-secondary/20 blur-3xl z-0"
          animate={{ 
            x: [0, 25, 0], 
            y: [0, -15, 0], 
            scale: [1, 0.95, 1] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: 2
          }}
        />
        
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
              className="inline-block mb-4 px-4 py-1.5 rounded-full bg-glass-card border border-glass-border text-sm font-medium backdrop-blur-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              The ultimate electronics and repair resource
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
                className="glass-button-primary group px-8 py-4 text-base"
              >
                <span>Explore Blog</span>
                <RiArrowRightLine className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/guides"
                className="glass-button-secondary px-8 py-4 text-base"
              >
                <span>View Guides</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Hero bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-glass-border to-transparent z-[2]" />
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gradient-to-b from-white/80 to-gray-100/80 dark:bg-glass-dark dark:from-transparent dark:to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] bg-no-repeat bg-cover opacity-[0.02] dark:opacity-[0.03] z-0" />
        <div className="absolute top-0 left-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-glass-border to-transparent z-[2]" />
        
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
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Link href={category.href}>
                  <div className="glass-card h-full p-6 group">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-5 p-3 bg-gradient-to-br ${category.gradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-glass-gradient animate-glass-gradient bg-[length:200%_auto] opacity-70"></div>
                      </div>
                      <span className="relative text-white">{category.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-glass-primary transition-colors">{category.title}</h3>
                    <p className="text-foreground/70">{category.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Posts Section */}
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
                <Link href={post.slug}>
                  <article className="glass-card overflow-hidden h-full group">
                    <div className="relative h-56 overflow-hidden bg-glass-gradient from-glass-primary/10 to-glass-accent/10 dark:from-glass-primary/20 dark:to-glass-accent/20 flex items-center justify-center">
                      <div className="absolute inset-0 bg-glass-gradient opacity-0 group-hover:opacity-100 animate-glass-gradient bg-[length:200%_auto] transition-opacity duration-700"></div>
                      <div className="text-5xl text-glass-primary/30 group-hover:text-glass-primary/50 transition-colors duration-500 relative z-10">
                        {post.category === "Electronics" && <RiCpuLine />}
                        {post.category === "Phone Repair" && <RiSmartphoneLine />}
                        {post.category === "Hardware Design" && <RiTerminalBoxLine />}
                        {post.category === "Firmware" && <RiCodeSSlashLine />}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-foreground/60 mb-3">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-glass-primary transition-colors">{post.title}</h3>
                      <p className="text-foreground/70 mb-4">{post.excerpt}</p>
                      <div className="inline-flex items-center text-sm font-medium text-glass-primary group-hover:translate-x-1 transition-transform">
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

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-r from-glass-primary/5 via-glass-secondary/5 to-glass-accent/5 dark:from-glass-primary/20 dark:via-glass-secondary/15 dark:to-glass-accent/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] bg-no-repeat bg-cover opacity-[0.02] dark:opacity-[0.04] z-0" />
        <div className="absolute top-0 left-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-glass-border to-transparent z-[2]" />
        <div className="absolute bottom-0 left-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-glass-border to-transparent z-[2]" />
        
        {/* Floating glass shapes */}
        <motion.div 
          className="absolute top-0 left-[15%] w-64 h-64 rounded-full bg-glass-primary/10 dark:bg-glass-primary/20 blur-3xl z-0"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, 15, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-[10%] w-80 h-80 rounded-full bg-glass-accent/10 dark:bg-glass-accent/20 blur-3xl z-0"
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 20, 0],
            scale: [1, 0.95, 1]
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
            className="max-w-3xl mx-auto glass-card p-10 md:p-14 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-glass-gradient from-glass-primary to-glass-accent p-[1px] backdrop-blur-lg"
            >
              <div className="w-full h-full rounded-full bg-glass-dark flex items-center justify-center">
                <RiMailLine className="w-8 h-8 text-white" />
              </div>
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
              <input
                type="email"
                placeholder="Enter your email"
                className="glass-input flex-1 px-5 py-3.5"
                required
              />
              <button
                type="submit"
                className="glass-button-primary px-6 py-3.5 whitespace-nowrap"
              >
                Subscribe
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
