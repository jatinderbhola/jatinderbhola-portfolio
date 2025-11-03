<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	interface MediaItem {
		id: string;
		type: 'image' | 'video';
		src: string;
		thumbnail?: string;
		title: string;
		description?: string;
		category?: string;
	}

	// Get gallery items from server
	let galleryItems: MediaItem[] = [];
	$: galleryItems = ($page.data.galleryItems as MediaItem[]) || [];

	let selectedItem: MediaItem | null = null;
	let isModalOpen = false;
	let selectedCategory = 'All';
	let imageErrors: Set<string> = new Set();

	$: categories = [
		'All',
		...Array.from(new Set(galleryItems.map((item) => item.category || 'Uncategorized')))
	];

	$: filteredItems =
		selectedCategory === 'All'
			? galleryItems
			: galleryItems.filter((item) => (item.category || 'Uncategorized') === selectedCategory);

	function openModal(item: MediaItem) {
		selectedItem = item;
		isModalOpen = true;
		document.body.style.overflow = 'hidden';
	}

	function closeModal() {
		isModalOpen = false;
		selectedItem = null;
		document.body.style.overflow = '';
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isModalOpen) {
			closeModal();
		}
		if (event.key === 'ArrowRight' && isModalOpen && selectedItem) {
			navigateNext();
		}
		if (event.key === 'ArrowLeft' && isModalOpen && selectedItem) {
			navigatePrevious();
		}
	}

	function navigateNext() {
		if (!selectedItem) return;
		const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem?.id);
		const nextIndex = (currentIndex + 1) % filteredItems.length;
		selectedItem = filteredItems[nextIndex];
	}

	function navigatePrevious() {
		if (!selectedItem) return;
		const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem?.id);
		const prevIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
		selectedItem = filteredItems[prevIndex];
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<svelte:head>
	<title>Gallery - Jatinder (Jay) Bhola</title>
	<meta
		name="description"
		content="Media gallery showcasing projects, presentations, and achievements"
	/>
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://www.jatinderbhola.com/gallery" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<header class="mb-8 text-center">
		<h1 class="mb-4 text-4xl font-bold text-gray-900">Gallery</h1>
		<p class="text-lg text-gray-600">
			Showcasing projects, presentations, panel discussions, and achievements
		</p>
	</header>

	<!-- Category Filter -->
	{#if categories.length > 2}
		<div class="mb-8 flex flex-wrap justify-center gap-2">
			{#each categories as category}
				<button
					class="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 {selectedCategory ===
					category
						? 'bg-indigo-600 text-white'
						: 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
					on:click={() => (selectedCategory = category)}
				>
					{category}
				</button>
			{/each}
		</div>
	{/if}

	<!-- Gallery Grid -->
	{#if filteredItems.length > 0}
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each filteredItems as item}
				<div
					class="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
					on:click={() => openModal(item)}
					role="button"
					tabindex="0"
					on:keydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							openModal(item);
						}
					}}
				>
					<div class="relative aspect-square w-full overflow-hidden bg-gray-200">
						{#if item.type === 'image'}
							{#if imageErrors.has(item.id)}
								<div class="flex h-full w-full items-center justify-center bg-gray-300">
									<svg
										class="h-12 w-12 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
								</div>
							{:else}
								<img
									src={item.thumbnail || item.src}
									alt={item.title}
									class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
									loading="lazy"
									on:error={() => {
										imageErrors.add(item.id);
										imageErrors = imageErrors; // trigger reactivity
									}}
								/>
							{/if}
						{:else}
							<div class="flex h-full w-full items-center justify-center bg-gray-900">
								<svg
									class="h-16 w-16 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
						{/if}
						<div
							class="bg-opacity-0 group-hover:bg-opacity-60 absolute inset-0 flex items-center justify-center transition-all duration-300"
						>
							<div
								class="bg-opacity-90 rounded-full bg-white p-3 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100"
							>
								<svg
									class="h-8 w-8 text-gray-900"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									stroke-width="2.5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
									/>
								</svg>
							</div>
						</div>
					</div>
					<div class="p-4">
						<h3 class="font-semibold text-gray-900">{item.title}</h3>
						{#if item.description}
							<p class="mt-1 line-clamp-2 text-sm text-gray-600">{item.description}</p>
						{/if}
						{#if item.category}
							<span
								class="mt-2 inline-block rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800"
							>
								{item.category}
							</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="py-12 text-center">
			<p class="text-gray-600">No items found in this category.</p>
		</div>
	{/if}
</div>

<!-- Lightbox Modal -->
{#if isModalOpen && selectedItem}
	<div
		class="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-black"
		on:click={closeModal}
		on:keydown={(e) => {
			if (e.key === 'Escape') closeModal();
		}}
		role="dialog"
		aria-modal="true"
		aria-label="Media viewer"
		tabindex="-1"
	>
		<div
			class="relative max-h-[90vh] max-w-[90vw]"
			on:click|stopPropagation
			on:keydown|stopPropagation
			role="none"
		>
			<!-- Close Button -->
			<button
				class="absolute -top-10 right-0 text-white transition-opacity hover:opacity-70"
				on:click={closeModal}
				aria-label="Close"
			>
				<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			<!-- Navigation Buttons -->
			{#if filteredItems.length > 1}
				<button
					class="bg-opacity-20 hover:bg-opacity-30 absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white p-3 text-white transition-opacity"
					on:click|stopPropagation={navigatePrevious}
					aria-label="Previous"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<button
					class="bg-opacity-20 hover:bg-opacity-30 absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white p-3 text-white transition-opacity"
					on:click|stopPropagation={navigateNext}
					aria-label="Next"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			{/if}

			<!-- Media Content -->
			<div class="relative">
				{#if selectedItem.type === 'image'}
					<img
						src={selectedItem.src}
						alt={selectedItem.title}
						class="max-h-[90vh] max-w-full rounded-lg object-contain"
					/>
				{:else}
					<video
						src={selectedItem.src}
						controls
						class="max-h-[90vh] max-w-full rounded-lg"
						preload="metadata"
						aria-label={selectedItem.title}
					>
						<track kind="captions" src="" label="English" srclang="en" default />
						Your browser does not support the video tag.
					</video>
				{/if}
			</div>

			<!-- Media Info -->
			<div class="mt-4 text-center text-white">
				<h3 class="text-xl font-semibold">{selectedItem.title}</h3>
				{#if selectedItem.description}
					<p class="mt-2 text-sm opacity-90">{selectedItem.description}</p>
				{/if}
			</div>

			<!-- Item Counter -->
			{#if filteredItems.length > 1 && selectedItem}
				<div class="mt-2 text-center text-sm text-white opacity-70">
					{filteredItems.findIndex((item) => item.id === selectedItem!.id) + 1} / {filteredItems.length}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
