import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPostBySlug, getAllPosts } from '$lib/server/blog';
import { parseBlogFromParams, buildBlogListQuery } from '$lib/blog-config';

// Generate all blog post slugs for prerendering
export async function entries() {
	const posts = await getAllPosts();
	return posts.map((post) => ({ slug: post.slug }));
}

export const load: PageServerLoad = async ({ params, url }) => {
	try {
		const post = await getPostBySlug(params.slug);

		if (!post) {
			throw error(404, 'Post not found');
		}

		let selectedTags: string[] = [];
		let searchQuery = '';
		try {
			const parsed = parseBlogFromParams(url);
			selectedTags = parsed.selectedTags;
			searchQuery = parsed.searchQuery;
		} catch {
			// During prerender, url.searchParams may be unavailable
		}
		const backToBlogQuery = buildBlogListQuery(selectedTags, searchQuery);

		return {
			post,
			backToBlogQuery,
			fromTags: selectedTags,
			fromSearch: searchQuery
		};
	} catch (e) {
		console.error('Error loading blog post:', e);
		if (e && typeof e === 'object' && 'status' in e) {
			throw e; // Re-throw SvelteKit errors
		}
		throw error(500, `Failed to load blog post: ${e instanceof Error ? e.message : 'Unknown error'}`);
	}
};
