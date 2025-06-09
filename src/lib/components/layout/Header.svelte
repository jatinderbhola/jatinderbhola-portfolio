<script lang="ts">
	import { loadResume } from '$lib/stores/resume';
	import { onMount } from 'svelte';

	let availableProfiles = ['default', 'test'];
	let selectedProfile = 'default';

	onMount(async () => {
		// In a real app, you might want to fetch this list from an API
		// For now, we'll just use the default profile
		await loadResume(selectedProfile);
	});

	async function handleProfileChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		selectedProfile = target.value;
		await loadResume(selectedProfile);
	}
</script>

<header class="bg-white shadow-sm">
	<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<div class="flex">
				<div class="flex flex-shrink-0 items-center">
					<a href="/" class="text-xl font-bold text-gray-900"> Portfolio </a>
				</div>
			</div>

			<div class="flex items-center">
				<select
					bind:value={selectedProfile}
					on:change={handleProfileChange}
					class="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
				>
					{#each availableProfiles as profile}
						<option value={profile}>{profile}</option>
					{/each}
				</select>
			</div>
		</div>
	</nav>
</header>
