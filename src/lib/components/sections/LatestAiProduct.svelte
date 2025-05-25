<script lang="ts">
  import { resume } from '$lib/stores/resume';
  import { t } from '$lib/i18n/utils';
</script>

{#if $resume}
  <div class="bg-white shadow rounded-lg p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-4">{$resume.latestAiProduct.title}</h3>
    <p class="text-gray-600 mb-6">{$resume.latestAiProduct.description}</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each $resume.latestAiProduct.initiatives as initiative}
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="font-semibold text-gray-900 mb-2">{initiative.name}</h4>
          <p class="text-gray-600">{initiative.description}</p>
        </div>
      {/each}
    </div>
    
    <p class="mt-6 text-gray-600 italic">{$resume.latestAiProduct.impact}</p>
  </div>
{/if} 