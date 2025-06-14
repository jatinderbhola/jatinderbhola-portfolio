<script lang="ts">
	import { resume } from '$lib/stores/resume';
</script>

{#if $resume}
	<div class="rounded-lg bg-white p-6 shadow">
		<p class="text-gray-600">{$resume.summary}</p>
	</div>
{/if}
