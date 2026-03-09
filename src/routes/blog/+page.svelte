<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import {
		BLOG_TOP_LEVEL_CATEGORIES,
		buildBlogFromQuery,
		buildBlogListQuery
	} from '$lib/blog-config';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const posts = $derived(data.posts || []);
	const allTags = $derived(data.tags || []);

	// URL-driven state (works in browser; during prerender use empty)
	const selectedTags = $derived.by(() => {
		if (!browser) return [] as string[];
		try {
			return $page.url.searchParams.getAll('tag').filter(Boolean);
		} catch {
			return [] as string[];
		}
	});

	const searchQuery = $derived.by(() => {
		if (!browser) return '';
		try {
			return $page.url.searchParams.get('search') || '';
		} catch {
			return '';
		}
	});

	// Search input: sync from URL when URL changes (e.g. back button); user typing updates local state then URL after debounce
	let searchInput = $state('');
	let searchDebounceId: ReturnType<typeof setTimeout> | null = null;

	// Only sync URL -> input when the URL's search param changes (don't overwrite while user is typing)
	$effect(() => {
		searchInput = searchQuery;
	});

	function onSearchInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const value = target.value;
		searchInput = value;
		if (searchDebounceId) clearTimeout(searchDebounceId);
		searchDebounceId = setTimeout(() => {
			const query = buildBlogListQuery(selectedTags, value);
			goto('/blog' + query, { replaceState: true, keepFocus: true });
		}, 300);
	}

	// Filter: post has ALL selected tags and matches search (title, description, tags). Use searchInput so list updates as user types.
	const filteredPosts = $derived.by(() => {
		let list = posts;
		for (const tag of selectedTags) {
			list = list.filter((post) => post.tags.includes(tag));
		}
		const q = (searchInput || '').trim().toLowerCase();
		if (q) {
			list = list.filter(
				(post) =>
					post.title.toLowerCase().includes(q) ||
					post.description.toLowerCase().includes(q) ||
					post.tags.some((t) => t.toLowerCase().includes(q))
			);
		}
		return list;
	});

	// Tags not in top-level (for "All tags" expandable)
	const topLevelIds = $derived(BLOG_TOP_LEVEL_CATEGORIES.map((c) => c.id));
	const otherTags = $derived(allTags.filter((t) => !topLevelIds.includes(t)));
	let showAllTags = $state(false);

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function postLink(slug: string): string {
		return '/blog/' + slug + buildBlogFromQuery(selectedTags, searchQuery);
	}

	function toggleTagHref(tagId: string): string {
		const next = selectedTags.includes(tagId)
			? selectedTags.filter((t) => t !== tagId)
			: [...selectedTags, tagId];
		return '/blog' + buildBlogListQuery(next, searchQuery);
	}

	function tagPillHref(tag: string): string {
		const next = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag)
			: [...selectedTags, tag];
		return '/blog' + buildBlogListQuery(next, searchQuery);
	}
</script>

<svelte:head>
	<title>Blog - Jatinder (Jay) Bhola</title>
	<meta name="description" content="Read the latest blog posts about software engineering, web development, and technology insights." />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://www.jatinderbhola.com/blog" />
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
	<header class="mb-8">
		<h1 class="mb-4 text-4xl font-bold text-gray-900">Blog</h1>
		<p class="text-lg text-gray-600">
			Exploring software engineering, web development, and technology insights.
		</p>
	</header>

	<!-- Search -->
	<div class="mb-6">
		<label for="blog-search" class="sr-only">Search posts</label>
		<input
			id="blog-search"
			type="search"
			placeholder="Search by title, description, or tag..."
			class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
			value={searchInput}
			oninput={onSearchInput}
			aria-label="Search posts"
		/>
	</div>

	<!-- Top-level category filters -->
	<div class="mb-6">
		<p class="mb-2 text-sm font-medium text-gray-600">Filter by topic</p>
		<div class="flex flex-wrap gap-2">
			<a
				href="/blog{buildBlogListQuery([], searchQuery)}"
				class="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 {selectedTags.length === 0
					? 'bg-indigo-600 text-white'
					: 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
			>
				All
			</a>
			{#each BLOG_TOP_LEVEL_CATEGORIES as category}
				{@const isSelected = selectedTags.includes(category.id)}
				<a
					href={toggleTagHref(category.id)}
					class="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 {isSelected
						? 'bg-indigo-600 text-white'
						: 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
				>
					{category.label}
				</a>
			{/each}
		</div>
		{#if selectedTags.length > 0}
			<p class="mt-2 text-xs text-gray-500">
				Showing posts with all of: {selectedTags.join(', ')}. Click again to remove.
			</p>
		{/if}
	</div>

	<!-- Optional: All tags (expandable) -->
	{#if otherTags.length > 0}
		<div class="mb-6">
			<button
				type="button"
				class="text-sm font-medium text-indigo-600 hover:text-indigo-800"
				onclick={() => (showAllTags = !showAllTags)}
			>
				{showAllTags ? 'Hide' : 'Show'} all tags ({otherTags.length})
			</button>
			{#if showAllTags}
				<div class="mt-2 flex flex-wrap gap-2">
					{#each otherTags as tag}
						{@const isSelected = selectedTags.includes(tag)}
						<a
							href={tagPillHref(tag)}
							class="rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200 {isSelected
								? 'bg-indigo-600 text-white'
								: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
						>
							{tag}
						</a>
					{/each}
				</div>
			{/if}
		</div>
	{/if}

	<!-- Blog Posts List -->
	{#if filteredPosts.length > 0}
		<div class="space-y-8">
			{#each filteredPosts as post}
				<article
					class="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
				>
					<div class="mb-4 flex items-center gap-4 text-sm text-gray-500">
						<time datetime={post.date}>{formatDate(post.date)}</time>
						<span>•</span>
						<span>{post.readingTime.text}</span>
						{#if post.featured}
							<span class="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800">
								Featured
							</span>
						{/if}
					</div>

					<h2 class="mb-2 text-2xl font-bold text-gray-900">
						<a
							href={postLink(post.slug)}
							class="transition-colors duration-200 hover:text-indigo-600"
						>
							{post.title}
						</a>
					</h2>

					<p class="mb-4 text-gray-600">{post.description}</p>

					<div class="flex flex-wrap items-center gap-2">
						{#each post.tags as tag}
							<a
								href={tagPillHref(tag)}
								class="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition-colors duration-200 hover:bg-indigo-100 hover:text-indigo-800"
							>
								{tag}
							</a>
						{/each}
					</div>

					<div class="mt-4">
						<a
							href={postLink(post.slug)}
							class="text-indigo-600 font-medium transition-colors duration-200 hover:text-indigo-800"
						>
							Read more →
						</a>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<div class="py-12 text-center">
			<p class="text-gray-600">
				{#if selectedTags.length > 0 || (searchInput && searchInput.trim())}
					No posts match
					{selectedTags.length > 0 ? `tags "${selectedTags.join('" and "')}"` : ''}
					{selectedTags.length > 0 && searchInput.trim() ? ' and ' : ''}
					{searchInput.trim() ? `search "${searchInput}"` : ''}.
					Try changing filters or search.
				{:else}
					No blog posts available yet.
				{/if}
			</p>
			<a
				href="/blog"
				class="mt-4 inline-block text-indigo-600 font-medium hover:text-indigo-800"
			>
				Clear filters
			</a>
		</div>
	{/if}
</div>
