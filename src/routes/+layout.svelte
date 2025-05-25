<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import LanguageSwitcher from '$lib/components/layout/LanguageSwitcher.svelte';
	import ProfileSwitcher from '$lib/components/layout/ProfileSwitcher.svelte';
	import { initializeTranslations, t, translationsStore } from '$lib/i18n/utils';
	import { currentLanguage } from '$lib/i18n/store';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	let isLoading = true;

	onMount(async () => {
		try {
			await initializeTranslations();
			isLoading = false;
		} catch (e) {
			console.error('Failed to initialize translations:', e);
			isLoading = false;
		}
		// Call the SvelteKit-specific injectSpeedInsights function
		injectSpeedInsights();
		// Dynamically import and inject Vercel analytics
		try {
			// @ts-expect-error Vercel package is not a module
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
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center py-4">
				<h1 class="text-2xl font-bold text-gray-900">
					{#if isLoading}
						<span>Loading...</span>
					{:else}
						<a href="/" class="hover:text-indigo-600 transition-colors duration-200">{t('nav.portfolio')}</a>
					{/if}
				</h1>
				<nav class="flex items-center space-x-4" aria-label="Site navigation">
					<ProfileSwitcher />
					<LanguageSwitcher />
				</nav>
			</div>
		</div>
	</header>

	<main class="flex-grow">
		<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			{#if isLoading}
				<div class="text-center">Loading translations...</div>
			{:else}
				<slot />
			{/if}
		</div>
	</main>
</div>

