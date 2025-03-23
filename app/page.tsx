import { FiCpu, FiSmartphone, FiCode, FiHardDrive } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const categories = [
    {
      title: "Phone Repair",
      description: "Expert guides on repairing modern smartphones and tablets.",
      icon: <FiSmartphone className="h-8 w-8 text-ios-blue" />,
      href: "/blog/category/phone-repair",
      gradient: "from-ios-blue to-ios-cyan",
    },
    {
      title: "Electronics",
      description: "Circuit analysis, component guides, and troubleshooting tips.",
      icon: <FiCpu className="h-8 w-8 text-ios-purple" />,
      href: "/blog/category/electronics",
      gradient: "from-ios-purple to-ios-pink",
    },
    {
      title: "Firmware Dev",
      description: "Tutorials on embedded systems and firmware development.",
      icon: <FiCode className="h-8 w-8 text-ios-green" />,
      href: "/blog/category/firmware",
      gradient: "from-ios-green to-ios-mint",
    },
    {
      title: "Hardware Design",
      description: "PCB layout, design principles, and DIY hardware projects.",
      icon: <FiHardDrive className="h-8 w-8 text-ios-orange" />,
      href: "/blog/category/hardware-design",
      gradient: "from-ios-orange to-ios-yellow",
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 md:pt-32 pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ios-blue/10 via-white to-ios-purple/10 dark:from-ios-blue/20 dark:via-ios-dark-1 dark:to-ios-purple/20 z-0" />
        <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] bg-no-repeat bg-cover opacity-[0.03] dark:opacity-[0.05] z-0" />
        
        <div className="relative container mx-auto z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-ios-blue to-ios-purple bg-clip-text text-transparent">
                Modern Tech Insights
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
              Expert guides on phone repair, electronics, firmware development, and hardware design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="rounded-ios-full bg-ios-blue hover:bg-ios-blue/90 text-white px-8 py-3 font-medium transition-colors"
              >
                Explore Blog
              </Link>
              <Link
                href="/guides"
                className="rounded-ios-full bg-white dark:bg-ios-dark-2 border border-gray-200 dark:border-ios-dark-3 hover:bg-gray-50 dark:hover:bg-ios-dark-3 text-gray-900 dark:text-white px-8 py-3 font-medium transition-colors"
              >
                View Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-ios-gray-6 dark:bg-ios-dark-2">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.title} href={category.href}>
                <div className="bg-white dark:bg-ios-dark-3 rounded-ios p-6 h-full shadow-ios-sm hover:shadow-ios transition-all duration-300 border border-gray-100 dark:border-ios-dark-4">
                  <div className="bg-gradient-to-br w-16 h-16 rounded-ios-full flex items-center justify-center mb-4 p-3" 
                       style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                       className={`bg-gradient-to-br ${category.gradient}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600 dark:text-ios-gray-2">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Recent Articles</h2>
            <Link href="/blog" className="text-ios-blue hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <Link href={post.slug} key={index}>
                <article className="bg-white dark:bg-ios-dark-3 rounded-ios-lg overflow-hidden shadow-ios-sm hover:shadow-ios border border-gray-100 dark:border-ios-dark-4 transition-all duration-300 h-full">
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-ios-blue/20 to-ios-purple/20 dark:from-ios-blue/30 dark:to-ios-purple/30 flex items-center justify-center">
                    <div className="text-4xl opacity-30 dark:opacity-40">
                      {post.category === "Electronics" && <FiCpu />}
                      {post.category === "Phone Repair" && <FiSmartphone />}
                      {post.category === "Hardware Design" && <FiHardDrive />}
                      {post.category === "Firmware" && <FiCode />}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-ios-gray-3 mb-3">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                    <p className="text-gray-600 dark:text-ios-gray-2 mb-4">{post.excerpt}</p>
                    <div className="inline-block text-sm font-medium text-ios-blue">
                      Read article →
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-ios-blue to-ios-indigo text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
            <p className="text-white/90 mb-8">
              Subscribe to our newsletter for the latest tech repair guides, electronics tutorials, and hardware tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-ios-full px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button
                type="submit"
                className="rounded-ios-full bg-white text-ios-blue hover:bg-white/90 px-6 py-3 font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
