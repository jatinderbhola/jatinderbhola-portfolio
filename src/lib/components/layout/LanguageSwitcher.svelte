<script lang="ts">
  import { goto } from '$app/navigation';
  import { currentLanguage } from '$lib/i18n/store';
  import { languages } from '$lib/i18n/config';
  import type { Language } from '$lib/i18n/config';

  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-switcher')) {
      isOpen = false;
    }
  }

  async function switchLanguage(lang: Language) {
    currentLanguage.set(lang);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    // Preserve the current profile if it exists
    const currentProfile = url.searchParams.get('profile');
    if (currentProfile) {
      url.searchParams.set('profile', currentProfile);
    }
    await goto(url.toString(), {
      replaceState: true,
      keepFocus: true,
      noScroll: true
    });
    isOpen = false;
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="language-switcher relative">
  <button
    type="button"
    class="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    on:click={toggleMenu}
    aria-expanded={isOpen}
    aria-haspopup="true"
  >
    <span>{languages[$currentLanguage].nativeName}</span>
    <svg 
      class="h-5 w-5 text-gray-400 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </button>

  {#if isOpen}
    <div
      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="language-menu"
    >
      {#each Object.entries(languages) as [code, lang]}
        <button
          class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 {code === $currentLanguage
            ? 'bg-gray-50 font-medium'
            : ''}"
          role="menuitem"
          on:click={() => switchLanguage(code as Language)}
        >
          {lang.nativeName}
        </button>
      {/each}
    </div>
  {/if}
</div> 