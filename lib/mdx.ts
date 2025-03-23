import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");
const blogDirectory = path.join(contentDirectory, "blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  coverImage?: string;
  content: string;
  featured?: boolean;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  coverImage?: string;
  featured?: boolean;
}

/**
 * Get all blog posts metadata
 */
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  try {
    const files = fs.readdirSync(blogDirectory);
    
    const posts = files
      .filter((file) => path.extname(file) === ".mdx")
      .map((file) => {
        const filePath = path.join(blogDirectory, file);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);
        const slug = file.replace(/\.mdx$/, "");

        return {
          slug,
          title: data.title || "",
          date: data.date || "",
          excerpt: data.excerpt || "",
          author: data.author || "Bloxin Team",
          category: data.category || "Uncategorized",
          readTime: data.readTime || "5 min read",
          coverImage: data.coverImage,
          featured: data.featured || false,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error("Error getting all posts:", error);
    return [];
  }
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(blogDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      date: data.date || "",
      excerpt: data.excerpt || "",
      author: data.author || "Bloxin Team",
      category: data.category || "Uncategorized",
      readTime: data.readTime || "5 min read",
      coverImage: data.coverImage,
      content,
      featured: data.featured || false,
    };
  } catch (error) {
    console.error(`Error getting post by slug '${slug}':`, error);
    return null;
  }
}

/**
 * Calculate estimated reading time
 */
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
}

/**
 * Get recent posts (limited)
 */
export async function getRecentPosts(limit: number = 3): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.featured);
}

/**
 * Get related posts
 */
export async function getRelatedPosts(
  currentPostSlug: string,
  currentPostCategory: string,
  limit: number = 3
): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts();
  
  // Filter out the current post and posts with the same category
  const sameCategoryPosts = allPosts.filter(
    (post) => 
      post.slug !== currentPostSlug && 
      post.category.toLowerCase() === currentPostCategory.toLowerCase()
  );
  
  // If we have enough posts from the same category, return them
  if (sameCategoryPosts.length >= limit) {
    return sameCategoryPosts.slice(0, limit);
  }
  
  // Otherwise, add posts from other categories
  const otherPosts = allPosts.filter(
    (post) => 
      post.slug !== currentPostSlug && 
      post.category.toLowerCase() !== currentPostCategory.toLowerCase()
  );
  
  return [...sameCategoryPosts, ...otherPosts].slice(0, limit);
} 