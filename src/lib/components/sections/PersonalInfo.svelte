<script lang="ts">
  import { resume } from '$lib/stores/resume';
  import { t } from '$lib/i18n/utils';
</script>

{#if $resume}
  <div class="bg-white shadow rounded-lg p-6">
    <div class="flex items-center space-x-4">
      <img
        src={$resume.personalInfo.avatar}
        alt={$resume.personalInfo.name}
        class="w-24 h-24 rounded-full object-cover"
      />
      <div>
        <h1 class="text-3xl font-bold text-gray-900">{$resume.personalInfo.name}</h1>
        <p class="text-xl text-gray-600">{$resume.personalInfo.title}</p>
        <p class="text-gray-500 mt-2">
          <span class="inline-flex items-center">
            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {$resume.personalInfo.location}
          </span>
        </p>
      </div>
    </div>

    <div class="mt-6 flex flex-wrap gap-4">
      {#each $resume.personalInfo.socialLinks as link}
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {link.platform}
        </a>
      {/each}
    </div>

    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 class="text-lg font-semibold text-gray-900 mb-2">{t('common.contact')}</h2>
        <p class="text-gray-600">
          <a href="mailto:{$resume.personalInfo.email}" class="hover:text-indigo-600">
            {$resume.personalInfo.email}
          </a>
        </p>
        <p class="text-gray-600">
          <a href="tel:{$resume.personalInfo.phone}" class="hover:text-indigo-600">
            {$resume.personalInfo.phone}
          </a>
        </p>
      </div>
    </div>
  </div>
{/if} 