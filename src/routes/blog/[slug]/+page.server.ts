import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPostBySlug, getAllPosts } from '$lib/server/blog';

// Generate all blog post slugs for prerendering
export async function entries() {
	const posts = await getAllPosts();
	return posts.map((post) => ({ slug: post.slug }));
}

export const load: PageServerLoad = async ({ params }) => {
	try {
		const post = await getPostBySlug(params.slug);

		if (!post) {
			throw error(404, 'Post not found');
		}

		return {
			post
		};
	} catch (e) {
		console.error('Error loading blog post:', e);
		if (e && typeof e === 'object' && 'status' in e) {
			throw e; // Re-throw SvelteKit errors
		}
		throw error(500, `Failed to load blog post: ${e instanceof Error ? e.message : 'Unknown error'}`);
	}
};
