<script lang="ts">
  import { resume } from '$lib/stores/resume';
  import { t } from '$lib/i18n/utils';
</script>

{#if $resume}
  <div class="bg-white shadow rounded-lg p-6">
    <div class="space-y-6">
      {#each $resume.experience as job}
        <div class="border-l-4 border-indigo-500 pl-4">
          <h3 class="text-xl font-semibold text-gray-900">{job.position}</h3>
          <p class="text-gray-600">{job.company} • {job.location}</p>
          <p class="text-gray-500 text-sm mb-2">
            {job.duration.replace('Present', t('common.present'))}
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            {#each job.achievements as achievement}
              <li>{achievement}</li>
            {/each}
          </ul>
          {#if job.techStack}
            <div class="mt-2 flex flex-wrap gap-2">
              {#each job.techStack as tech}
                <span class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  {tech}
                </span>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/if} 