<script lang="ts">
	import { resume } from '$lib/stores/resume';
	import { t } from '$lib/i18n/utils';
</script>

{#if $resume}
	<div class="rounded-lg bg-white p-6 shadow">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div class="rounded-lg bg-gray-50 p-4">
				<h3 class="mb-2 font-semibold text-gray-900">{t('impact.revenueImpact')}</h3>
				<p class="text-gray-600">{$resume.impactSummary.revenueImpact}</p>
			</div>
			<div class="rounded-lg bg-gray-50 p-4">
				<h3 class="mb-2 font-semibold text-gray-900">{t('impact.teamPerformance')}</h3>
				<p class="text-gray-600">{$resume.impactSummary.teamPerformance}</p>
			</div>
			<div class="rounded-lg bg-gray-50 p-4">
				<h3 class="mb-2 font-semibold text-gray-900">{t('impact.systemReliability')}</h3>
				<p class="text-gray-600">{$resume.impactSummary.systemReliability}</p>
			</div>
			<div class="rounded-lg bg-gray-50 p-4">
				<h3 class="mb-2 font-semibold text-gray-900">{t('impact.developerProductivity')}</h3>
				<p class="text-gray-600">{$resume.impactSummary.developerProductivity}</p>
			</div>
			<div class="rounded-lg bg-gray-50 p-4">
				<h3 class="mb-2 font-semibold text-gray-900">{t('impact.scalability')}</h3>
				<p class="text-gray-600">{$resume.impactSummary.scalability}</p>
			</div>
		</div>
	</div>
{/if}
