import type { PageServerLoad } from './$types';
import { getAllPosts, getAllTags } from '$lib/server/blog';

export const load: PageServerLoad = async () => {
	const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

	return {
		posts,
		tags
	};
};
