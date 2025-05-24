<script lang="ts">
  import { resume } from '$lib/stores/resume';
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
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <a href="/" class="text-xl font-bold text-gray-900">
            Portfolio
          </a>
        </div>
      </div>
      
      <div class="flex items-center">
        <select
          bind:value={selectedProfile}
          on:change={handleProfileChange}
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {#each availableProfiles as profile}
            <option value={profile}>{profile}</option>
          {/each}
        </select>
      </div>
    </div>
  </nav>
</header> 