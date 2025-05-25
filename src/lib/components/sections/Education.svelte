<script lang="ts">
  import { resume } from '$lib/stores/resume';
  import { t } from '$lib/i18n/utils';
</script>

{#if $resume}
  <div class="bg-white shadow rounded-lg p-6">
    <div class="space-y-4">
      {#each $resume.education as edu}
        <div>
          <h3 class="font-semibold text-gray-900">{edu.degree}</h3>
          <p class="text-gray-600">{edu.institution}</p>
          <p class="text-gray-500 text-sm">
            {edu.location} • {edu.duration.replace('Present', t('common.present'))}
          </p>
        </div>
      {/each}
    </div>
  </div>
{/if} 