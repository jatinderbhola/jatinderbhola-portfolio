import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import type { Post, PostMeta, PostFrontmatter } from './types/blog';

// Simple reading time calculation (client-compatible)
// Average reading speed: 200 words per minute
function calculateReadingTime(content: string): { text: string } {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);

    if (minutes === 1) {
        return { text: '1 min read' };
    }
    return { text: `${minutes} min read` };
}

// Get posts directory - handle both build time and preview time
// Only resolve at runtime and only in server environment
function getPostsDirectory(): string {
    // Check if we're in a Node.js environment
    if (typeof process === 'undefined' || !process.cwd) {
        throw new Error('getPostsDirectory can only be called in a Node.js environment');
    }

    // During build/preview, try multiple possible locations
    const possiblePaths = [
        path.join(process.cwd(), 'static', 'posts'),
        path.join(process.cwd(), '..', 'static', 'posts'),
        path.join(process.cwd(), '..', '..', 'static', 'posts')
    ];

    for (const dirPath of possiblePaths) {
        if (fs.existsSync(dirPath)) {
            return dirPath;
        }
    }

    // Default fallback
    return path.join(process.cwd(), 'static', 'posts');
}

// Lazy initialization - only resolve when needed (server-side only)
let postsDirectory: string | null = null;
function getPostsDirectoryLazy(): string {
    if (!postsDirectory) {
        postsDirectory = getPostsDirectory();
    }
    return postsDirectory;
}

function validateFrontmatter(data: Record<string, unknown>): PostFrontmatter {
    if (
        typeof data.title !== 'string' ||
        typeof data.description !== 'string' ||
        typeof data.date !== 'string' ||
        !Array.isArray(data.tags) ||
        typeof data.published !== 'boolean' ||
        typeof data.author !== 'string'
    ) {
        throw new Error('Invalid frontmatter format');
    }

    return {
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags,
        published: data.published,
        featured: typeof data.featured === 'boolean' ? data.featured : false,
        author: data.author,
        slug: '' // Will be set by the calling function
    };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        const postsDir = getPostsDirectoryLazy();
        const fullPath = path.join(postsDir, `${slug}.md`);

        if (!fs.existsSync(fullPath)) {
            console.error(`Blog post not found: ${fullPath}`);
            console.error(`Posts directory: ${postsDir}`);
            console.error(`Looking for slug: ${slug}`);
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        if (typeof content !== 'string') {
            console.error(`Blog: Content for slug '${slug}' is not a string`);
            return null;
        }

        // Process markdown to HTML
        const processedContent = await remark().use(remarkGfm).use(remarkHtml).process(content);
        const contentHtml = processedContent.toString();

        const frontmatter = validateFrontmatter(data);
        frontmatter.slug = slug;
        const readingTime = calculateReadingTime(content);

        return {
            ...frontmatter,
            content: contentHtml,
            readingTime
        };
    } catch (e) {
        console.error(`Error loading blog post '${slug}':`, e);
        return null;
    }
}

export async function getAllPosts(): Promise<PostMeta[]> {
    const postsDir = getPostsDirectoryLazy();
    if (!fs.existsSync(postsDir)) {
        return [];
    }

    const filenames = fs.readdirSync(postsDir);

    const posts = await Promise.all(
        filenames
            .filter((filename) => filename.endsWith('.md'))
            .map(async (filename) => {
                const slug = filename.replace(/\.md$/, '');
                const fullPath = path.join(postsDir, filename);
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const { data, content } = matter(fileContents);
                const readingTime = calculateReadingTime(content);
                const frontmatter = validateFrontmatter(data);

                return {
                    title: frontmatter.title,
                    description: frontmatter.description,
                    date: frontmatter.date,
                    slug,
                    tags: frontmatter.tags,
                    author: frontmatter.author,
                    published: frontmatter.published,
                    featured: frontmatter.featured ?? false,
                    readingTime
                } as PostMeta;
            })
    );

    // Filter only published posts and sort by date in descending order
    return posts
        .filter((post) => post.published)
        .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
    const posts = await getAllPosts();
    return posts.filter((post) => post.tags.includes(tag));
}

export function getAllTags(): string[] {
    const postsDir = getPostsDirectoryLazy();
    if (!fs.existsSync(postsDir)) {
        return [];
    }

    const posts = fs
        .readdirSync(postsDir)
        .filter((filename) => filename.endsWith('.md'))
        .map((filename) => {
            const fileContents = fs.readFileSync(path.join(postsDir, filename), 'utf8');
            const { data } = matter(fileContents);
            return validateFrontmatter(data).tags;
        });

    // Get unique tags
    return Array.from(new Set(posts.flat()));
}

export async function getFeaturedPosts(): Promise<PostMeta[]> {
    const posts = await getAllPosts();
    return posts.filter((post) => post.featured);
}
