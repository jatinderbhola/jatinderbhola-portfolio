<script lang="ts">
	import { resume } from '$lib/stores/resume';
	import { t } from '$lib/i18n/utils';
</script>

{#if $resume}
	<div class="rounded-lg bg-white p-6 shadow">
		<h3 class="mb-4 text-xl font-semibold text-gray-900">{$resume.latestAiProduct.title}</h3>
		<p class="mb-6 text-gray-600">{$resume.latestAiProduct.description}</p>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			{#each $resume.latestAiProduct.initiatives as initiative}
				<div class="rounded-lg bg-gray-50 p-4">
					<h4 class="mb-2 font-semibold text-gray-900">{initiative.name}</h4>
					<p class="text-gray-600">{initiative.description}</p>
				</div>
			{/each}
		</div>

		<p class="mt-6 text-gray-600 italic">{$resume.latestAiProduct.impact}</p>
	</div>
{/if}
