"use client";

import Link from "next/link";
import { FiGithub, FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { section: "Resources", links: [
      { name: "Documentation", href: "/docs" },
      { name: "Guides", href: "/guides" },
      { name: "Tools", href: "/tools" },
    ]},
    { section: "Company", links: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy", href: "/privacy" },
    ]},
    { section: "Topics", links: [
      { name: "Phone Repair", href: "/blog/category/phone-repair" },
      { name: "Electronics", href: "/blog/category/electronics" },
      { name: "Firmware", href: "/blog/category/firmware" },
      { name: "Hardware Design", href: "/blog/category/hardware-design" },
    ]},
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-ios-dark-3 bg-ios-gray-6 dark:bg-ios-dark-2">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-ios-blue to-ios-indigo bg-clip-text text-transparent">
                Bloxin
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-ios-gray-2 mb-4">
              Expert insights on phone repair, electronics, firmware development, and hardware design.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-ios-blue dark:text-ios-gray-2 dark:hover:text-ios-blue transition-colors"
                aria-label="GitHub"
              >
                <FiGithub className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-ios-blue dark:text-ios-gray-2 dark:hover:text-ios-blue transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-ios-blue dark:text-ios-gray-2 dark:hover:text-ios-blue transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-ios-blue dark:text-ios-gray-2 dark:hover:text-ios-blue transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {footerLinks.map((section) => (
            <div key={section.section}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                {section.section}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-ios-blue dark:text-ios-gray-2 dark:hover:text-ios-blue transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-ios-dark-3">
          <p className="text-sm text-center text-gray-500 dark:text-ios-gray-3">
            &copy; {currentYear} Bloxin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 