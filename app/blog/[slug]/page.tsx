"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  RiArrowLeftLine, 
  RiCalendarLine, 
  RiTimerLine, 
  RiFileTextLine, 
  RiShareForwardLine, 
  RiTwitterXLine, 
  RiFacebookFill, 
  RiLinkedinFill, 
  RiLinkM 
} from "react-icons/ri";
import { MarkdownRenderer } from "@/lib/markdown";

// Mock data interfaces
interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  coverImage?: string;
  content: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulating data fetching
  useEffect(() => {
    // In a real app, this would be fetched from the server
    const mockPost: BlogPost = {
      slug,
      title: slug === "understanding-usb-c-power-delivery" 
        ? "Understanding USB-C Power Delivery" 
        : slug === "iphone-16-pro-display-replacement"
        ? "iPhone 16 Pro Display Replacement Guide"
        : "Building a Custom Mechanical Keyboard",
      date: "March 15, 2025",
      excerpt: "A comprehensive look at USB-C PD protocols and how to implement them in your designs.",
      author: "Fayssal CHOKRI",
      category: slug === "understanding-usb-c-power-delivery" 
        ? "Electronics" 
        : slug === "iphone-16-pro-display-replacement"
        ? "Phone Repair"
        : "Hardware Design",
      readTime: "6 min read",
      coverImage: `/images/blog/${slug}.jpg`,
      content: `
## Introduction

USB Type-C has revolutionized how we connect and power our devices. Unlike previous USB standards, USB-C with Power Delivery can supply up to 240W of power, allowing it to charge laptops, monitors, and other high-power devices. This makes it a versatile and future-proof connector for a wide range of applications.

USB Power Delivery (USB PD) is the protocol that enables this high-power capability, allowing devices to negotiate and adapt power requirements dynamically. This article will guide you through the fundamentals of USB PD and how to implement it in your designs.

## What is USB Power Delivery?

USB PD is an advanced protocol that extends the basic power capabilities of USB connections. Its key features include:

- Power delivery up to 240W (48V/5A) with USB PD 3.1
- Bidirectional power flow (a device can act as both power source and sink)
- Dynamic power allocation based on device needs
- Multiple power profiles for different device types
- Communication over dedicated Configuration Channel (CC) pins

### USB PD Power Profiles

| USB PD Revision | Maximum Power | Voltage/Current |
|-----------------|---------------|-----------------|
| USB PD 1.0/2.0  | 100W          | 20V/5A          |
| USB PD 3.0      | 100W          | 20V/5A          |
| USB PD 3.1      | 240W          | 48V/5A          |

## Communication Protocol

USB PD communication occurs over the CC lines using Biphase Mark Coding (BMC) for physical layer signaling. The protocol stack has several layers:

1. **Physical Layer**: BMC encoding, voltage levels, timing
2. **Protocol Layer**: Message formatting, sequencing, retries
3. **Policy Layer**: Rules for power negotiation and roles

## Implementing USB PD in Your Designs

### Hardware Requirements

To implement USB PD, you'll need:

- A USB Type-C connector with proper CC lines
- A USB PD controller chip (e.g., STUSB4500, FUSB302, etc.)
- Power management circuitry capable of the desired power levels
- A microcontroller for higher-level control (optional for fixed-function designs)

### Implementation Steps

#### Source Device Configuration

For a power source (e.g., charger or power adapter):

\`\`\`c
// Example code for initializing a USB PD source device
void initUsbPdSource(void) {
  // Configure GPIOs for USB PD controller
  gpio_config_t io_conf = {
    .pin_bit_mask = USB_PD_PIN_MASK,
    .mode = GPIO_MODE_OUTPUT,
    .pull_up_en = 1,
    .pull_down_en = 0,
    .intr_type = GPIO_INTR_DISABLE,
  };
  gpio_config(&io_conf);
  
  // Initialize I2C or SPI communication with PD controller
  pd_controller_init();
  
  // Set available PDOs (Power Data Objects)
  pd_controller_set_source_caps(pdos, num_pdos);
  
  // Enable PD communication
  pd_controller_enable();
}
\`\`\`

#### Sink Device Configuration

For a power sink (e.g., a device being charged):

\`\`\`c
// Example code for initializing a USB PD sink device
void initUsbPdSink(void) {
  // Configure GPIOs for USB PD controller
  gpio_config_t io_conf = {
    .pin_bit_mask = USB_PD_PIN_MASK,
    .mode = GPIO_MODE_INPUT,
    .pull_up_en = 0,
    .pull_down_en = 1,
    .intr_type = GPIO_INTR_POSEDGE,
  };
  gpio_config(&io_conf);
  
  // Initialize I2C or SPI communication with PD controller
  pd_controller_init();
  
  // Set sink capabilities and preferred power profiles
  pd_controller_set_sink_caps(sink_caps, num_caps);
  
  // Enable PD communication
  pd_controller_enable();
  
  // Register callback for power negotiations
  pd_controller_register_power_callback(handle_power_negotiation);
}
\`\`\`

#### Dual-Role Port (DRP) Configuration

For devices that can both provide and consume power:

\`\`\`c
// Example code for initializing a dual-role USB PD device
void initUsbPdDualRole(void) {
  // Configure GPIOs for USB PD controller
  gpio_config_t io_conf = {
    .pin_bit_mask = USB_PD_PIN_MASK,
    .mode = GPIO_MODE_INPUT_OUTPUT,
    .pull_up_en = 1,
    .pull_down_en = 0,
    .intr_type = GPIO_INTR_ANYEDGE,
  };
  gpio_config(&io_conf);
  
  // Initialize I2C or SPI communication with PD controller
  pd_controller_init();
  
  // Set both source and sink capabilities
  pd_controller_set_source_caps(source_pdos, num_source_pdos);
  pd_controller_set_sink_caps(sink_caps, num_sink_caps);
  
  // Configure as DRP
  pd_controller_set_drp_mode(true);
  
  // Enable PD communication
  pd_controller_enable();
}
\`\`\`

## PCB Layout Considerations

When designing PCBs with USB PD, consider these important aspects:

1. **CC line routing**: Keep them short, away from noise sources, and with controlled impedance
2. **VBUS handling**: Design for high current capacity with appropriate trace width and copper weight
3. **Thermal management**: Include sufficient cooling for power components
4. **ESD protection**: Add protection circuitry for all USB pins
5. **EMI considerations**: Follow best practices for high-frequency and high-power designs

## Common Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| Power negotiation failures | Ensure proper PD controller configuration and robust firmware implementation |
| Intermittent connections | Check CC line integrity and signal quality |
| Overheating | Improve thermal design and add temperature monitoring |
| Compatibility issues | Test with a wide range of devices and follow USB-IF specifications |

## Certification Considerations

For commercial products, consider:

- USB-IF certification for interoperability
- EMC/EMI testing for regulatory compliance
- Safety testing for high-power designs

## Future of USB PD

The USB PD standard continues to evolve, with recent developments including:

- Extended Power Range (EPR) up to 240W in PD 3.1
- Integration with USB4 for comprehensive data and power management
- Fast Role Swap (FRS) for quick source/sink transitions
- Programmable Power Supply (PPS) for fine-grained voltage control

## Conclusion

USB Type-C with Power Delivery offers tremendous flexibility and capability for modern electronic devices. By understanding the protocol and implementing it correctly, you can create designs that take full advantage of this powerful standard.

When implementing USB PD, always refer to the official USB-IF specifications and consult your controller documentation for device-specific details. Following best practices will ensure a robust and compliant design that works reliably with the growing ecosystem of USB-C devices.
`
    };

    const mockRelatedPosts: BlogPost[] = [
      {
        slug: "circuit-design-fundamentals",
        title: "Circuit Design Fundamentals for Beginners",
        excerpt: "Essential concepts and practical tips for those starting with electronic circuit design.",
        date: "Feb 15, 2025",
        readTime: "9 min read",
        category: "Electronics",
        author: "Fayssal CHOKRI",
        coverImage: "/images/blog/circuit-design.jpg",
        content: ""
      },
      {
        slug: "esp32-firmware-development",
        title: "ESP32 Firmware Development for IoT Devices",
        excerpt: "Best practices for developing reliable firmware for ESP32-based IoT projects.",
        date: "Feb 28, 2025",
        readTime: "8 min read",
        category: "Firmware",
        author: "Fayssal CHOKRI",
        coverImage: "/images/blog/esp32-firmware.jpg",
        content: ""
      },
      {
        slug: "custom-mechanical-keyboard",
        title: "Building a Custom Mechanical Keyboard",
        excerpt: "From PCB design to firmware and assembly - create your perfect typing experience.",
        date: "Mar 5, 2025",
        readTime: "15 min read",
        category: "Hardware Design",
        author: "Fayssal CHOKRI",
        coverImage: "/images/blog/mechanical-keyboard.jpg",
        content: ""
      },
    ];

    // Simulate a delay for loading effect
    setTimeout(() => {
      setPost(mockPost);
      setRelatedPosts(mockRelatedPosts);
      setIsLoading(false);
    }, 500);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 md:py-32 flex items-center justify-center">
        <div className="glass-card p-6 inline-flex items-center rounded-glass">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-glass-primary"></div>
          <span className="ml-3">Loading post...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen py-20 md:py-32 flex items-center justify-center">
        <div className="glass-card p-8 text-center rounded-glass-lg max-w-md">
          <RiFileTextLine className="text-4xl mx-auto mb-4 text-foreground/30" />
          <h3 className="text-xl font-semibold mb-2">Post not found</h3>
          <p className="text-foreground/70 mb-4">
            We couldn't find the blog post you're looking for.
          </p>
          <Link href="/blog" className="glass-button-primary px-4 py-2 inline-block">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 md:py-32">
      {/* Hero Section */}
      <section className="relative mb-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-glass-gradient opacity-10 dark:opacity-20"></div>
          <div className="absolute top-0 left-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-glass-border to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-glass-border to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 py-8">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/blog" 
              className="inline-flex items-center text-foreground/70 hover:text-glass-primary transition-colors duration-300 mb-6"
            >
              <RiArrowLeftLine className="mr-2" />
              Back to blog
            </Link>
            
            <div className="inline-block px-3 py-1 rounded-full glass-card text-sm font-medium backdrop-blur-xl mb-4">
              {post.category}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            <p className="text-xl mb-6 text-foreground/80">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between flex-wrap gap-y-4">
              <div className="flex items-center">
                <div className="glass-card w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-glass-card/70">
                  <span className="text-xl font-semibold">{post.author.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-medium">{post.author}</div>
                  <div className="text-sm text-foreground/60">Author</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm text-foreground/60">
                  <RiCalendarLine className="mr-1" />
                  {post.date}
                </div>
                <div className="flex items-center text-sm text-foreground/60">
                  <RiTimerLine className="mr-1" />
                  {post.readTime}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Content Section */}
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Article Content */}
          <motion.article 
            className="glass-card p-6 md:p-10 rounded-glass-lg relative overflow-hidden mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-glass-gradient from-glass-primary/5 via-glass-secondary/5 to-glass-accent/5 dark:from-glass-primary/10 dark:via-glass-secondary/10 dark:to-glass-accent/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-glass-gradient from-glass-accent/5 via-glass-secondary/5 to-glass-primary/5 dark:from-glass-accent/10 dark:via-glass-secondary/10 dark:to-glass-primary/10 rounded-full blur-2xl"></div>
            
            {/* Main content */}
            <div className="relative">
              <MarkdownRenderer content={post.content} />
            </div>
          </motion.article>
          
          {/* Share Section */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="glass-card p-6 rounded-glass-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <RiShareForwardLine className="mr-2" />
                Share this article
              </h3>
              
              <div className="flex flex-wrap gap-3">
                <button className="glass-button flex items-center px-4 py-2 rounded-glass-full text-sm">
                  <RiTwitterXLine className="mr-2" />
                  Twitter
                </button>
                <button className="glass-button flex items-center px-4 py-2 rounded-glass-full text-sm">
                  <RiFacebookFill className="mr-2" />
                  Facebook
                </button>
                <button className="glass-button flex items-center px-4 py-2 rounded-glass-full text-sm">
                  <RiLinkedinFill className="mr-2" />
                  LinkedIn
                </button>
                <button className="glass-button flex items-center px-4 py-2 rounded-glass-full text-sm">
                  <RiLinkM className="mr-2" />
                  Copy Link
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="block relative group">
                  {/* Animated gradient border */}
                  <div className="absolute -inset-0.5 rounded-glass bg-glass-gradient from-glass-primary/20 via-glass-secondary/20 to-glass-accent/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-glass-gradient bg-[length:200%_auto]"></div>
                  
                  <article className="glass-card overflow-hidden h-full shadow-glass-sm group-hover:shadow-glass relative bg-opacity-90 backdrop-blur-xl border-glass-border group-hover:border-glass-highlight transition-all duration-500 z-10">
                    <div className="relative h-32 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-glass-primary/10 to-glass-accent/10 dark:from-glass-primary/20 dark:to-glass-accent/20"></div>
                      <div className="absolute inset-0 bg-glass-gradient opacity-0 group-hover:opacity-100 animate-glass-gradient bg-[length:200%_auto] transition-opacity duration-700"></div>
                      
                      {/* Category badge */}
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full glass-card text-xs font-medium backdrop-blur-xl z-10">
                        {relatedPost.category}
                      </div>
                      
                      {/* Content preview icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-3xl text-glass-primary/30 group-hover:text-glass-primary/50 transition-all duration-500 transform group-hover:scale-110 relative">
                          <div className="absolute inset-0 blur-xl bg-glass-primary/20 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-500 rounded-full"></div>
                          <RiFileTextLine className="relative" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-sm font-semibold mb-2 line-clamp-2 group-hover:text-glass-primary transition-colors duration-300">{relatedPost.title}</h3>
                      
                      <div className="flex items-center justify-between text-xs text-foreground/60">
                        <span>{relatedPost.date}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 