<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import LanguageSwitcher from '$lib/components/layout/LanguageSwitcher.svelte';
	import ProfileSwitcher from '$lib/components/layout/ProfileSwitcher.svelte';
	import { initializeTranslations, t, translationsStore } from '$lib/i18n/utils';
	import { currentLanguage } from '$lib/i18n/store';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	let isLoading = true;
	$: isInterviewPatternsPage = $page.url.pathname === '/interview-patterns';

	onMount(async () => {
		try {
			if (!isInterviewPatternsPage) {
				await initializeTranslations();
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

	// Subscribe to both language and translations changes
	$: currentLang = $currentLanguage;
	$: translations = $translationsStore;
</script>

<div class="min-h-screen bg-gray-50">
	<header class="bg-white shadow">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between py-4">
				<h1 class="text-2xl font-bold text-gray-900">
					{#if isLoading && !isInterviewPatternsPage}
						<span>Loading...</span>
					{:else}
						<a href="/" class="transition-colors duration-200 hover:text-indigo-600"
							>{isInterviewPatternsPage ? 'Portfolio' : t('nav.portfolio')}</a
						>
					{/if}
				</h1>
				<nav class="flex items-center space-x-4" aria-label="Site navigation">
					<a
						href="https://blog.jatinderbhola.com?utm_source=portfolio&utm_medium=referral"
						class="text-gray-600 transition-colors duration-200 hover:text-indigo-600"
						target="_blank"
						rel="noopener noreferrer">Blog</a
					>
					<a
						href="/interview-patterns"
						class="text-gray-600 transition-colors duration-200 hover:text-indigo-600"
						>Interview Patterns</a
					>
					{#if !isInterviewPatternsPage}
						<ProfileSwitcher />
						<LanguageSwitcher />
					{/if}
				</nav>
			</div>
		</div>
	</header>

	<main class="flex-grow">
		<div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
			{#if isLoading && !isInterviewPatternsPage}
				<div class="text-center">Loading translations...</div>
			{:else}
				<slot />
			{/if}
		</div>
	</main>
</div>
