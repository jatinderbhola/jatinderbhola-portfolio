<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const profiles = [
		{ id: 'default', name: 'My Resume' },
		{ id: 'sample', name: 'Sample Resume' }
	] as const;

	let isOpen = false;

	async function switchProfile(profileId: string) {
		const url = new URL(window.location.href);
		url.searchParams.set('profile', profileId);
		await goto(url.toString(), { replaceState: true });
		isOpen = false;
	}

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.profile-menu')) {
			isOpen = false;
		}
	}
</script>

<svelte:window on:click={handleClickOutside} />

<div class="profile-menu relative">
	<button
		class="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
		aria-expanded={isOpen}
		aria-haspopup="true"
		on:click={toggleMenu}
	>
		<span>{profiles.find((p) => p.id === $page.data.currentProfile)?.name || 'Select Profile'}</span
		>
		<svg
			class="h-5 w-5 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
		>
			<path
				fill-rule="evenodd"
				d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>

	{#if isOpen}
		<div
			class="ring-opacity-5 absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="profile-menu"
		>
			<div class="py-1" role="none">
				{#each profiles as profile}
					<button
						class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:outline-none"
						role="menuitem"
						on:click={() => switchProfile(profile.id)}
					>
						{profile.name}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
