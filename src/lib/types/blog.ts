export interface PostFrontmatter {
    title: string;
    description: string;
    date: string;
    tags: string[];
    published: boolean;
    featured?: boolean;
    author: string;
    slug: string;
}

export interface PostMeta extends PostFrontmatter {
    readingTime: {
        text: string;
    };
}

export interface Post extends PostMeta {
    content: string;
}
