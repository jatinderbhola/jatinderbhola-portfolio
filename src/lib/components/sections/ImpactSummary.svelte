<script lang="ts">
  import { resume } from '$lib/stores/resume';
  import { t } from '$lib/i18n/utils';
</script>

{#if $resume}
  <div class="bg-white shadow rounded-lg p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="font-semibold text-gray-900 mb-2">{t('impact.revenueImpact')}</h3>
        <p class="text-gray-600">{$resume.impactSummary.revenueImpact}</p>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="font-semibold text-gray-900 mb-2">{t('impact.teamPerformance')}</h3>
        <p class="text-gray-600">{$resume.impactSummary.teamPerformance}</p>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="font-semibold text-gray-900 mb-2">{t('impact.systemReliability')}</h3>
        <p class="text-gray-600">{$resume.impactSummary.systemReliability}</p>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="font-semibold text-gray-900 mb-2">{t('impact.developerProductivity')}</h3>
        <p class="text-gray-600">{$resume.impactSummary.developerProductivity}</p>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="font-semibold text-gray-900 mb-2">{t('impact.scalability')}</h3>
        <p class="text-gray-600">{$resume.impactSummary.scalability}</p>
      </div>
    </div>
  </div>
{/if} 