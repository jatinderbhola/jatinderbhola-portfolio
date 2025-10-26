<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { initializeTranslations, t, translationsStore } from '$lib/i18n/utils';
	import { currentLanguage } from '$lib/i18n/store';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	let isLoading = true;
	$: isHomePage = $page.url.pathname === '/';

	onMount(async () => {
		try {
			if (isHomePage) {
				await initializeTranslations();
			} else {
				// For non-home pages, set language to English
				currentLanguage.set('en');
			}
			isLoading = false;
		} catch (e) {
			console.error('Failed to initialize translations:', e);
			isLoading = false;
		}
		// Call the SvelteKit-specific injectSpeedInsights function
		injectSpeedInsights();
		// Dynamically import and inject Vercel analytics
		try {
			const analytics = await import('@vercel/analytics');
			if (typeof analytics.inject === 'function') analytics.inject();
		} catch (e) {
			console.warn('Analytics not loaded:', e);
		}
	});

</script>

<div class="min-h-screen bg-gray-50">
	<header class="bg-white shadow">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between py-4">
				<h1 class="text-2xl font-bold text-gray-900">
					{#if isLoading && isHomePage}
						<span>Loading...</span>
					{:else}
						<a href="/" class="transition-colors duration-200 hover:text-indigo-600"
							>{!isHomePage ? 'Portfolio' : t('nav.portfolio')}</a
						>
					{/if}
				</h1>
				<nav class="flex items-center space-x-4" aria-label="Site navigation">
					<div class="group relative">
						<button
							class="flex items-center space-x-1 text-gray-600 transition-colors duration-200 hover:text-indigo-600"
							aria-expanded="false"
						>
							<span>Interview Prep</span>
							<svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>
						<div
							class="ring-opacity-5 invisible absolute left-0 z-50 mt-2 w-48 rounded-md bg-white opacity-0 shadow-lg ring-1 ring-black transition-all duration-200 group-hover:visible group-hover:opacity-100"
						>
							<div class="py-1" role="menu" aria-orientation="vertical">
								<a
									href="/interview-patterns"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									role="menuitem"
								>
									Interview Patterns
								</a>
								<a
									href="/system-design"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									role="menuitem"
								>
									System Design
								</a>
							</div>
						</div>
					</div>
					<a
						href="https://blog.jatinderbhola.com"
						class="text-gray-600 transition-colors duration-200 hover:text-indigo-600"
						target="_blank"
						rel="noopener noreferrer"
					>
						Blog
					</a>
					{#if isHomePage}
						<!-- <ProfileSwitcher /> -->
						<!-- <LanguageSwitcher /> -->
					{/if}
				</nav>
			</div>
		</div>
	</header>

	<main class="flex-grow">
		<div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
			{#if isLoading && isHomePage}
				<div class="text-center">Loading translations...</div>
			{:else}
				<slot />
			{/if}
		</div>
	</main>
</div>
