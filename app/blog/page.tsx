"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  RiSearch2Line, 
  RiArticleLine, 
  RiArrowRightLine, 
  RiLayoutGridLine, 
  RiListUnordered, 
  RiFilter3Line 
} from "react-icons/ri";

// Mock data - in a real app, this would come from the server component
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  coverImage?: string;
}

const CATEGORIES = [
  "All Posts",
  "Electronics",
  "Phone Repair",
  "Firmware",
  "Hardware Design",
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);

  // Simulating data fetching
  useEffect(() => {
    // In a real app, this would be fetched from the server
    const fetchedPosts: BlogPost[] = [
      {
        slug: "understanding-usb-c-power-delivery",
        title: "Understanding USB-C Power Delivery",
        excerpt: "A comprehensive look at USB-C PD protocols and how to implement them in your designs.",
        date: "Mar 15, 2025",
        readTime: "6 min read",
        category: "Electronics",
        author: "Fayssal CHOKRI",
        coverImage: "/images/blog/usb-c-pd.jpg"
      },
      {
        slug: "iphone-16-pro-display-replacement",
        title: "iPhone 16 Pro Display Replacement Guide",
        excerpt: "Step-by-step instructions for safely replacing the display on the latest iPhone model.",
        date: "Mar 10, 2025",
        readTime: "12 min read",
        category: "Phone Repair",
        author: "Fayssal CHOKRI",
        coverImage: "/images/blog/iphone-16-display.jpg"
      },
      {
        slug: "custom-mechanical-keyboard",
        title: "Building a Custom Mechanical Keyboard",
        excerpt: "From PCB design to firmware and assembly - create your perfect typing experience.",
        date: "Mar 5, 2025",
        readTime: "15 min read",
        category: "Hardware Design",
        author: "Fayssal CHOKRI",
        coverImage: "/images/blog/mechanical-keyboard.jpg"
      },
      {
        slug: "esp32-firmware-development",
        title: "ESP32 Firmware Development for IoT Devices",
        excerpt: "Best practices for developing reliable firmware for ESP32-based IoT projects.",
        date: "Feb 28, 2025",
        readTime: "8 min read",
        category: "Firmware",
        author: "Fayssal CHOKRI",
        coverImage: "/images/blog/esp32-firmware.jpg"
      },
      {
        slug: "samsung-galaxy-battery-replacement",
        title: "Samsung Galaxy S25 Battery Replacement",
        excerpt: "Complete guide to safely replacing the battery in the latest Samsung Galaxy smartphones.",
        date: "Feb 22, 2025",
        readTime: "10 min read",
        category: "Phone Repair",
        author: "Fayssal CHOKRI",
        coverImage: "/images/blog/galaxy-battery.jpg"
      },
      {
        slug: "circuit-design-fundamentals",
        title: "Circuit Design Fundamentals for Beginners",
        excerpt: "Essential concepts and practical tips for those starting with electronic circuit design.",
        date: "Feb 15, 2025",
        readTime: "9 min read",
        category: "Electronics",
        author: "Fayssal CHOKRI",
        coverImage: "/images/blog/circuit-design.jpg"
      },
    ];

    setPosts(fetchedPosts);
    setFilteredPosts(fetchedPosts);
    setIsLoading(false);
  }, []);

  // Filter posts by category and search query
  useEffect(() => {
    let result = posts;
    
    // Filter by category
    if (selectedCategory !== "All Posts") {
      result = result.filter(post => post.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        post => 
          post.title.toLowerCase().includes(query) || 
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredPosts(result);
  }, [selectedCategory, searchQuery, posts]);

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
              <span className="text-gradient font-display animate-glass-gradient bg-[length:300%_auto]">Bloxin Blog</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-8 text-foreground/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Expert insights and guides on electronics, repairs, firmware development, and hardware design.
            </motion.p>
            
            {/* Search bar */}
            <motion.div 
              className="relative max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 rounded-glass-full bg-glass-gradient from-glass-primary/20 via-glass-secondary/20 to-glass-accent/20 opacity-0 group-focus-within:opacity-100 blur-sm transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <RiSearch2Line className="absolute left-4 text-foreground/60 group-focus-within:text-glass-primary transition-colors duration-300" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="glass-input w-full py-3 pl-11 pr-4 rounded-glass-full bg-glass-card/70 backdrop-blur-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Main content */}
      <div className="container mx-auto px-6">
        {/* Filters and view mode controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          {/* Categories tabs */}
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-glass-full text-sm font-medium backdrop-blur-md transition-all duration-300 relative overflow-hidden ${
                  selectedCategory === category
                    ? "glass-card shadow-glass-sm text-glass-primary"
                    : "bg-glass-card/50 hover:bg-glass-card hover:shadow-glass-sm"
                }`}
              >
                {selectedCategory === category && (
                  <div className="absolute inset-0 bg-glass-gradient from-glass-primary/10 via-glass-secondary/10 to-glass-accent/10 opacity-70 animate-glass-gradient bg-[length:200%_auto]"></div>
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </motion.div>
          
          {/* View mode toggle */}
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="glass-card p-1 rounded-glass-full flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full transition-all ${
                  viewMode === "grid" 
                    ? "bg-glass-primary text-white" 
                    : "hover:bg-glass-card-hover text-foreground/70"
                }`}
                aria-label="Grid view"
              >
                <RiLayoutGridLine />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-full transition-all ${
                  viewMode === "list" 
                    ? "bg-glass-primary text-white" 
                    : "hover:bg-glass-card-hover text-foreground/70"
                }`}
                aria-label="List view"
              >
                <RiListUnordered />
              </button>
            </div>
            <span className="text-sm text-foreground/60">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            </span>
          </motion.div>
        </div>
        
        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="glass-card p-5 inline-flex items-center rounded-glass">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-glass-primary"></div>
              <span className="ml-3">Loading posts...</span>
            </div>
          </div>
        )}
        
        {/* No results state */}
        {!isLoading && filteredPosts.length === 0 && (
          <div className="glass-card p-8 text-center rounded-glass-lg">
            <RiArticleLine className="text-4xl mx-auto mb-4 text-foreground/30" />
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-foreground/70 mb-4">
              We couldn't find any posts matching your current filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Posts");
                setSearchQuery("");
              }}
              className="glass-button-primary px-4 py-2"
            >
              Reset filters
            </button>
          </div>
        )}
        
        {/* Posts grid */}
        {!isLoading && filteredPosts.length > 0 && viewMode === "grid" && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.map((post) => (
              <motion.div 
                key={post.slug}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/blog/${post.slug}`} className="block h-full relative group">
                  {/* Animated gradient border */}
                  <div className="absolute -inset-0.5 rounded-glass-lg bg-glass-gradient from-glass-primary/20 via-glass-secondary/20 to-glass-accent/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-glass-gradient bg-[length:200%_auto]"></div>
                  
                  <article className="glass-card overflow-hidden h-full shadow-glass-sm group-hover:shadow-glass relative bg-opacity-90 backdrop-blur-xl border-glass-border group-hover:border-glass-highlight transition-all duration-500 z-10">
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-glass-primary/10 to-glass-accent/10 dark:from-glass-primary/20 dark:to-glass-accent/20"></div>
                      <div className="absolute inset-0 bg-glass-gradient opacity-0 group-hover:opacity-100 animate-glass-gradient bg-[length:200%_auto] transition-opacity duration-700"></div>
                      
                      {/* Category badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass-card text-xs font-medium backdrop-blur-xl z-10">
                        {post.category}
                      </div>
                      
                      {/* Content preview icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-5xl text-glass-primary/30 group-hover:text-glass-primary/50 transition-all duration-500 transform group-hover:scale-110 relative">
                          <div className="absolute inset-0 blur-xl bg-glass-primary/20 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-500 rounded-full"></div>
                          <RiArticleLine className="relative" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center text-sm text-foreground/60 mb-3">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-glass-primary transition-colors duration-300">{post.title}</h3>
                      
                      <p className="text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300 mb-4">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-glass-border/50">
                        <div className="text-sm font-medium">{post.author}</div>
                        <div className="inline-flex items-center text-sm font-medium text-glass-primary transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                          Read more
                          <RiArrowRightLine className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Posts list */}
        {!isLoading && filteredPosts.length > 0 && viewMode === "list" && (
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.map((post) => (
              <motion.div 
                key={post.slug}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/blog/${post.slug}`} className="block relative group">
                  {/* Animated gradient border */}
                  <div className="absolute -inset-0.5 rounded-glass-lg bg-glass-gradient from-glass-primary/20 via-glass-secondary/20 to-glass-accent/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-glass-gradient bg-[length:200%_auto]"></div>
                  
                  <article className="glass-card overflow-hidden shadow-glass-sm group-hover:shadow-glass relative bg-opacity-90 backdrop-blur-xl border-glass-border group-hover:border-glass-highlight transition-all duration-500 z-10 flex flex-col md:flex-row">
                    <div className="relative md:w-48 h-48 md:h-auto overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-glass-primary/10 to-glass-accent/10 dark:from-glass-primary/20 dark:to-glass-accent/20"></div>
                      <div className="absolute inset-0 bg-glass-gradient opacity-0 group-hover:opacity-100 animate-glass-gradient bg-[length:200%_auto] transition-opacity duration-700"></div>
                      
                      {/* Content preview icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-5xl text-glass-primary/30 group-hover:text-glass-primary/50 transition-all duration-500 transform group-hover:scale-110 relative">
                          <div className="absolute inset-0 blur-xl bg-glass-primary/20 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-500 rounded-full"></div>
                          <RiArticleLine className="relative" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="px-3 py-1 rounded-full glass-card text-xs font-medium backdrop-blur-xl">
                          {post.category}
                        </div>
                        <div className="text-sm text-foreground/60">
                          <span>{post.date}</span>
                          <span className="mx-2">•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-glass-primary transition-colors duration-300">{post.title}</h3>
                      
                      <p className="text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300 mb-4">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="text-sm font-medium">{post.author}</div>
                        <div className="inline-flex items-center text-sm font-medium text-glass-primary transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                          Read more
                          <RiArrowRightLine className="ml-1" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Pagination - Static for now */}
        {!isLoading && filteredPosts.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="glass-card inline-flex rounded-glass-full overflow-hidden">
              <button className="px-4 py-2 border-r border-glass-border hover:bg-glass-card-hover transition-colors">
                Previous
              </button>
              <button className="px-3 py-2 bg-glass-primary text-white">1</button>
              <button className="px-3 py-2 hover:bg-glass-card-hover transition-colors">2</button>
              <button className="px-3 py-2 hover:bg-glass-card-hover transition-colors">3</button>
              <button className="px-4 py-2 border-l border-glass-border hover:bg-glass-card-hover transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 