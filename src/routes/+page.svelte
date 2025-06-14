<script lang="ts">
	import { page } from '$app/stores';
	import { resume } from '$lib/stores/resume';
	import { t } from '$lib/i18n/utils';
	import PersonalInfo from '$lib/components/sections/PersonalInfo.svelte';
	import ProfessionalSummary from '$lib/components/sections/ProfessionalSummary.svelte';
	import LatestAiProduct from '$lib/components/sections/LatestAiProduct.svelte';
	import Experience from '$lib/components/sections/Experience.svelte';
	import Education from '$lib/components/sections/Education.svelte';
	import ImpactSummary from '$lib/components/sections/ImpactSummary.svelte';

	// Initialize the store with server-side data
	$: if ($page.data.resume) {
		resume.set($page.data.resume);
	}
</script>

<svelte:head>
	<title>JatinderBhola Portfolio Manager - Open Source</title>
	<meta
		name="description"
		content="Open Source Portfolio Manager. Manage your professional profile, projects, and more."
	/>
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://www.jatinderbhola.com/" />

	<!-- Favicons and Manifest -->
	<link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
	<link rel="manifest" href="/favicon_io/site.webmanifest" />
	<link rel="icon" type="image/x-icon" href="/favicon_io/favicon.ico" />
	<link rel="icon" type="image/png" sizes="192x192" href="/favicon_io/android-chrome-192x192.png" />
	<link rel="icon" type="image/png" sizes="512x512" href="/favicon_io/android-chrome-512x512.png" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://www.jatinderbhola.com/" />
	<meta property="og:title" content="JatinderBhola Portfolio Manager" />
	<meta
		property="og:description"
		content="Open Source Portfolio Manager. Manage your professional profile, projects, and more."
	/>
	<meta property="og:image" content="https://www.jatinderbhola.com/og/portfolio-manager.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://www.jatinderbhola.com/" />
	<meta property="twitter:title" content="JatinderBhola Portfolio Manager" />
	<meta
		property="twitter:description"
		content="Open Source Portfolio Manager. Manage your professional profile, projects, and more."
	/>
	<meta property="twitter:image" content="https://www.jatinderbhola.com/og/portfolio-manager.png" />

	<!-- Structured Data -->
	<script type="application/ld+json">
    {$page.data.structuredData}
	</script>
</svelte:head>

<div class="space-y-8">
	<PersonalInfo />

	<section>
		<h2 class="mb-4 text-2xl font-bold text-gray-900">{t('sections.professionalSummary')}</h2>
		<ProfessionalSummary />
	</section>

	<section>
		<h2 class="mb-4 text-2xl font-bold text-gray-900">{t('sections.latestAiProduct')}</h2>
		<LatestAiProduct />
	</section>

	<section>
		<h2 class="mb-4 text-2xl font-bold text-gray-900">{t('sections.experience')}</h2>
		<Experience />
	</section>

	<section>
		<h2 class="mb-4 text-2xl font-bold text-gray-900">{t('sections.education')}</h2>
		<Education />
	</section>

	<section>
		<h2 class="mb-4 text-2xl font-bold text-gray-900">{t('sections.impactSummary')}</h2>
		<ImpactSummary />
	</section>
</div>
