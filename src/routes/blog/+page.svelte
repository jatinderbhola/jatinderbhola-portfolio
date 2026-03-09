<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const posts = $derived(data.posts || []);
	const tags = $derived(data.tags || []);
	
	// Get selected tag from URL params (works in browser, defaults to null during prerender)
	const selectedTag = $derived.by(() => {
		if (!browser) return null;
		try {
			return $page.url.searchParams.get('tag') || null;
		} catch {
			return null;
		}
	});
	
	const filteredPosts = $derived(
		selectedTag ? posts.filter((post) => post.tags.includes(selectedTag)) : posts
	);

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
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

	<!-- Tag Filter -->
	{#if tags.length > 0}
		<div class="mb-8 flex flex-wrap gap-2">
			<a
				href="/blog"
				class="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 {selectedTag === null
					? 'bg-indigo-600 text-white'
					: 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
			>
				All
			</a>
			{#each tags as tag}
				<a
					href="/blog?tag={encodeURIComponent(tag)}"
					class="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 {selectedTag === tag
						? 'bg-indigo-600 text-white'
						: 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
				>
					{tag}
				</a>
			{/each}
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
							href="/blog/{post.slug}"
							class="transition-colors duration-200 hover:text-indigo-600"
						>
							{post.title}
						</a>
					</h2>

					<p class="mb-4 text-gray-600">{post.description}</p>

					<div class="flex flex-wrap items-center gap-2">
						{#each post.tags as tag}
							<a
								href="/blog?tag={encodeURIComponent(tag)}"
								class="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition-colors duration-200 hover:bg-indigo-100 hover:text-indigo-800"
							>
								{tag}
							</a>
						{/each}
					</div>

					<div class="mt-4">
						<a
							href="/blog/{post.slug}"
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
				{#if selectedTag}
					No posts found with tag "{selectedTag}".
				{:else}
					No blog posts available yet.
				{/if}
			</p>
		</div>
	{/if}
</div>
