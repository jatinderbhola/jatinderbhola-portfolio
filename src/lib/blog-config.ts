/**
 * Top-level blog categories shown as filter pills.
 * Each category maps to one primary tag used in frontmatter.
 */
export const BLOG_TOP_LEVEL_CATEGORIES: { id: string; label: string }[] = [
	{ id: 'gcp', label: 'Google Cloud' },
	{ id: 'ai-tools', label: 'AI & Tools' },
	{ id: 'career', label: 'Career' },
	{ id: 'interview', label: 'Interview' },
	{ id: 'leadership', label: 'Leadership' },
	{ id: 'tutorial', label: 'Tutorial' }
];

/**
 * Build query string for "Back to Blog" / from-params (e.g. ?fromTags=gcp,tutorial&fromSearch=foo)
 */
export function buildBlogFromQuery(selectedTags: string[], searchQuery: string): string {
	const params = new URLSearchParams();
	if (selectedTags.length > 0) params.set('fromTags', selectedTags.join(','));
	if (searchQuery.trim()) params.set('fromSearch', searchQuery.trim());
	const q = params.toString();
	return q ? `?${q}` : '';
}

/**
 * Build blog list URL with current filters (for Back to Blog and tag links)
 */
export function buildBlogListQuery(selectedTags: string[], searchQuery: string): string {
	const params = new URLSearchParams();
	selectedTags.forEach((t) => params.append('tag', t));
	if (searchQuery.trim()) params.set('search', searchQuery.trim());
	const q = params.toString();
	return q ? `?${q}` : '';
}

/**
 * Parse fromTags and fromSearch from URL (used on post page)
 */
export function parseBlogFromParams(url: URL): { selectedTags: string[]; searchQuery: string } {
	const fromTags = url.searchParams.get('fromTags');
	const fromSearch = url.searchParams.get('fromSearch') ?? '';
	const selectedTags = fromTags ? fromTags.split(',').filter(Boolean) : [];
	return { selectedTags, searchQuery: fromSearch };
}
