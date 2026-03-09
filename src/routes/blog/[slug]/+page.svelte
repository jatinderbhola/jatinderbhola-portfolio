<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data?: PageData;
	}

	let { data }: Props = $props();

	const post = $derived(data?.post || null);

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
	{#if post}
		<title>{post.title} - Jatinder (Jay) Bhola</title>
		<meta name="description" content={post.description} />
		<meta name="robots" content="index, follow" />
		<meta property="og:title" content={post.title} />
		<meta property="og:description" content={post.description} />
		<meta property="og:type" content="article" />
		<meta property="article:published_time" content={post.date} />
		<meta property="article:author" content={post.author} />
		{#each post.tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
		<link rel="canonical" href="https://www.jatinderbhola.com/blog/{post.slug}" />
	{:else}
		<title>Post not found - Jatinder (Jay) Bhola</title>
	{/if}
</svelte:head>

{#if !post}
	<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="mb-4 text-2xl font-bold text-gray-900">Post not found</h1>
			<p class="mb-4 text-gray-600">The blog post you're looking for doesn't exist.</p>
			<a
				href="/blog"
				class="text-indigo-600 font-medium transition-colors duration-200 hover:text-indigo-800"
			>
				← Back to Blog
			</a>
		</div>
	</div>
{:else}
	<article class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Back to Blog -->
		<div class="mb-6">
			<a
				href="/blog"
				class="text-indigo-600 font-medium transition-colors duration-200 hover:text-indigo-800"
			>
				← Back to Blog
			</a>
		</div>

		<!-- Post Header -->
		<header class="mb-8">
			<h1 class="mb-4 text-4xl font-bold text-gray-900">{post.title}</h1>
		<p class="mb-4 text-xl text-gray-600">{post.description}</p>

		<div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
			<time datetime={post.date}>{formatDate(post.date)}</time>
			<span>•</span>
			<span>{post.readingTime.text}</span>
			<span>•</span>
			<span>By {post.author}</span>
			{#if post.featured}
				<span class="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800">
					Featured
				</span>
			{/if}
		</div>

		<!-- Tags -->
		{#if post.tags.length > 0}
			<div class="mt-4 flex flex-wrap gap-2">
				{#each post.tags as tag}
					<a
						href="/blog?tag={encodeURIComponent(tag)}"
						class="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition-colors duration-200 hover:bg-indigo-100 hover:text-indigo-800"
					>
						{tag}
					</a>
				{/each}
			</div>
		{/if}
	</header>

	<!-- Post Content -->
	<div
		class="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900"
	>
		{@html post.content}
	</div>

	<!-- Post Footer -->
	<footer class="mt-12 border-t border-gray-200 pt-8">
		<div class="flex items-center justify-between">
			<a
				href="/blog"
				class="text-indigo-600 font-medium transition-colors duration-200 hover:text-indigo-800"
			>
				← Back to Blog
			</a>
			<div class="text-sm text-gray-500">
				Published on {formatDate(post.date)}
			</div>
		</div>
	</footer>
</article>
{/if}

<style>
	:global(.prose) {
		line-height: 1.75;
	}

	:global(.prose h2) {
		margin-top: 2em;
		margin-bottom: 1em;
		font-size: 1.875rem;
		font-weight: 700;
	}

	:global(.prose h3) {
		margin-top: 1.5em;
		margin-bottom: 0.75em;
		font-size: 1.5rem;
		font-weight: 600;
	}

	:global(.prose p) {
		margin-bottom: 1.25em;
	}

	:global(.prose ul),
	:global(.prose ol) {
		margin-bottom: 1.25em;
		padding-left: 1.625em;
	}

	:global(.prose li) {
		margin-bottom: 0.5em;
	}

	:global(.prose blockquote) {
		border-left: 4px solid #6366f1;
		padding-left: 1em;
		margin: 1.5em 0;
		font-style: italic;
		color: #6b7280;
	}

	:global(.prose code) {
		font-size: 0.875em;
		color: #4f46e5; /* indigo-600 for inline code */
		background-color: #f3f4f6; /* gray-100 */
		padding: 0.125rem 0.25rem;
		border-radius: 0.25rem;
	}

	:global(.prose pre) {
		padding: 1em;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin-bottom: 1.5em;
		background-color: #1f2937 !important; /* gray-800 for better contrast */
		color: #f9fafb !important; /* gray-50 for text */
	}

	:global(.prose pre code) {
		background: transparent !important;
		padding: 0;
		color: #f9fafb !important; /* Ensure text is visible */
		font-size: 0.875em;
	}

	/* Style for code blocks that might not have prose classes */
	:global(.prose pre[class*="code"]),
	:global(.prose pre[class*="snippet"]),
	:global(.prose pre.overflow-x-auto) {
		background-color: #1f2937 !important;
		color: #f9fafb !important;
	}

	:global(.prose pre code[class*="language"]),
	:global(.prose pre code) {
		color: #f9fafb !important;
		background: transparent !important;
	}

	:global(.prose img) {
		border-radius: 0.5rem;
		margin: 1.5em 0;
	}

	/* Fix for code blocks with bg-gray-50 - ensure text is visible */
	:global(.prose pre.bg-gray-50),
	:global(.prose pre[class*="bg-gray-50"]) {
		background-color: #1f2937 !important;
		color: #f9fafb !important;
	}

	:global(.prose pre.bg-gray-50 code),
	:global(.prose pre[class*="bg-gray-50"] code) {
		color: #f9fafb !important;
		background: transparent !important;
	}

	/* Ensure all code elements inside pre have visible text */
	:global(.prose pre *) {
		color: #f9fafb !important;
	}

	/* Fix for code snippets that might be in divs */
	:global(.prose .code-snippet pre),
	:global(.prose [class*="code-snippet"] pre) {
		background-color: #1f2937 !important;
		color: #f9fafb !important;
	}

	:global(.prose .code-snippet pre code),
	:global(.prose [class*="code-snippet"] pre code) {
		color: #f9fafb !important;
		background: transparent !important;
	}
</style>
