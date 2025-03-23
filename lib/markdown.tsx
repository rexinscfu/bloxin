"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Image from 'next/image';
import Link from 'next/link';

interface MarkdownProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownProps) {
  return (
    <ReactMarkdown
      className={`prose prose-lg dark:prose-invert max-w-none ${className}`}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // Override img with Next.js Image component
        img: ({ src, alt }) => {
          if (!src) return null;
          // For external images, use a regular img tag
          if (src.startsWith('http')) {
            return <img src={src} alt={alt || ''} className="rounded-glass-lg" />;
          }
          // For local images, use Next.js Image
          return (
            <div className="relative w-full h-auto min-h-[300px] my-6 rounded-glass-lg overflow-hidden">
              <Image 
                src={src} 
                alt={alt || ''} 
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-glass-lg"
              />
            </div>
          );
        },
        
        // Custom link component with Next.js Link for internal links
        a: ({ href, children }) => {
          if (!href) return null;
          // For internal links
          if (href.startsWith('/')) {
            return (
              <Link 
                href={href} 
                className="text-glass-primary hover:text-glass-primary/80 transition-colors duration-300"
              >
                {children}
              </Link>
            );
          }
          // For external links
          return (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-glass-primary hover:text-glass-primary/80 transition-colors duration-300"
            >
              {children}
            </a>
          );
        },
        
        // Enhanced code block with syntax highlighting
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          
          if (!inline && language) {
            return (
              <div className="relative group my-6 rounded-glass-lg overflow-hidden">
                <div className="absolute top-0 right-0 bg-glass-card/70 backdrop-blur-sm text-xs px-2 py-1 text-foreground/70 rounded-bl-md font-mono">
                  {language}
                </div>
                <SyntaxHighlighter
                  style={oneDark}
                  language={language}
                  PreTag="div"
                  className="!bg-glass-dark/90 !rounded-glass-lg !shadow-glass-sm !mt-0 !mb-0"
                  customStyle={{
                    padding: '2.5rem 1.5rem 1.5rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)', // Equivalent to bg-glass-dark/80
                    backdropFilter: 'blur(12px)',
                    borderRadius: '0.75rem',
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    className="text-xs bg-glass-primary/20 hover:bg-glass-primary/30 text-white p-1 rounded-md transition-colors"
                    onClick={() => navigator.clipboard.writeText(String(children))}
                    title="Copy code"
                  >
                    Copy
                  </button>
                </div>
              </div>
            );
          }
          
          // Inline code
          return (
            <code className="bg-glass-card/50 dark:bg-glass-dark/50 text-foreground/90 px-1.5 py-0.5 rounded-md font-mono text-sm" {...props}>
              {children}
            </code>
          );
        },
        
        // Custom heading styles
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mt-8 mb-4 text-gradient font-display animate-glass-gradient bg-[length:300%_auto]">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mt-6 mb-4 border-b border-glass-border/50 pb-2">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold mt-5 mb-3 text-glass-primary/90">{children}</h3>
        ),
        
        // Custom blockquote with glassmorphism
        blockquote: ({ children }) => (
          <blockquote className="glass-card !border-l-4 !border-l-glass-primary p-4 my-4 rounded-r-lg">
            {children}
          </blockquote>
        ),
        
        // Enhanced table
        table: ({ children }) => (
          <div className="overflow-x-auto glass-card p-2 rounded-glass-lg backdrop-blur-sm my-6">
            <table className="min-w-full divide-y divide-glass-border/30">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-glass-card/30">
            {children}
          </thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 text-left text-xs font-medium text-foreground/90 uppercase tracking-wider">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 whitespace-nowrap text-sm text-foreground/80 border-t border-glass-border/20">
            {children}
          </td>
        ),
        
        // Lists
        ul: ({ children }) => (
          <ul className="list-disc pl-6 space-y-2 my-4">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 space-y-2 my-4">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="pl-2">
            {children}
          </li>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// Function to extract reading time from markdown content
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return `${readingTime} min read`;
}

// Function to extract the first image from markdown content
export function extractFirstImage(content: string): string | null {
  const imageRegex = /!\[.*?\]\((.*?)\)/;
  const match = content.match(imageRegex);
  
  return match ? match[1] : null;
}

// Function to extract an excerpt from markdown content
export function extractExcerpt(content: string, length: number = 160): string {
  // Remove markdown formatting, headers, links, images, etc.
  const textOnly = content
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '$1') // Extract link text
    .replace(/#{1,6}\s(.*)/g, '$1') // Remove headers
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // Remove bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // Remove italic
    .replace(/`{1,3}.*?`{1,3}/g, '') // Remove code blocks
    .replace(/~~(.*?)~~/g, '$1') // Remove strikethrough
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
  
  // Extract the first [length] characters
  const excerpt = textOnly.substring(0, length);
  
  // Add ellipsis if the content was trimmed
  return textOnly.length > length ? `${excerpt}...` : excerpt;
} 