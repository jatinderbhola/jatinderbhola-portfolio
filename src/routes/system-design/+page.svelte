<script lang="ts">
	import { leaderNodes } from '$lib/data/leaderPrinciple';
	import { systemDesignExamples } from '$lib/data/systemDesignExamples';
	import type { LeaderNode } from '$lib/data/leaderPrinciple';

	interface ExampleNode extends Omit<LeaderNode, 'details'> {
		questions?: Array<{
			question: string;
			answer: string;
			thoughtProcess: string;
		}>;
		calculations?: Array<{
			description: string;
			value: string;
			note?: string;
		}>;
		decisions?: Array<{
			decision: string;
			rationale: string;
			implications: string;
		}>;
		details: string[];
	}

	let selectedNode: ExampleNode | null = null;
	let selectedExample: string = '';

	function handleNodeClick(node: LeaderNode) {
		if (selectedExample) {
			const example = systemDesignExamples.find((e) => e.id === selectedExample);
			if (example?.leaders[node.id]) {
				// Merge the base node with example-specific data
				selectedNode = {
					...node,
					questions: example.leaders[node.id].questions,
					calculations: example.leaders[node.id].calculations,
					decisions: example.leaders[node.id].decisions,
					details: example.leaders[node.id].details
				};
			} else {
				selectedNode = node as ExampleNode;
			}
		} else {
			selectedNode = node as ExampleNode;
		}
	}

	function handleExampleChange() {
		if (selectedNode) {
			handleNodeClick(selectedNode);
		}
	}
</script>

<!-- Main Container -->
<div class="container mx-auto px-4 py-8">
	<h1 class="mb-6 text-3xl font-bold">System Design Examples</h1>

	<!-- Example Selection -->
	<div class="mb-6">
		<label for="example-select" class="mb-1 block text-sm font-medium text-gray-700"
			>Select System Design Example:</label
		>
		<select
			id="example-select"
			bind:value={selectedExample}
			on:change={handleExampleChange}
			class="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none md:w-96"
		>
			<option value="">Select an example...</option>
			{#each systemDesignExamples as example}
				<option value={example.id}>{example.name}</option>
			{/each}
		</select>
		{#if selectedExample}
			<p class="mt-2 text-sm text-gray-600">
				{systemDesignExamples.find((e) => e.id === selectedExample)?.description}
			</p>
		{/if}
	</div>

	<!-- Main Content Grid -->
	<div class="grid grid-cols-12 gap-4">
		<!-- Left Column - LEADERS Nodes -->
		<div class="col-span-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
			<h2 class="mb-3 text-lg font-semibold text-gray-800">LEADERS Framework</h2>
			<div class="space-y-1">
				{#each leaderNodes as node}
					<button
						class="w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors duration-150 {selectedNode?.id ===
						node.id
							? 'border border-blue-200 bg-blue-50 text-blue-700'
							: 'text-gray-700 hover:bg-gray-50'}"
						on:click={() => handleNodeClick(node)}
					>
						<strong>{node.name}</strong> - {node.title}
					</button>
				{/each}
			</div>
		</div>

		<!-- Right Column - Node Details -->
		<div class="col-span-9 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
			{#if selectedNode}
				<div class="space-y-4">
					<!-- Header -->
					<div class="border-b border-gray-200 pb-3">
						<h2 class="text-xl font-semibold text-gray-800">{selectedNode.title}</h2>
						<p class="mt-1 text-sm text-gray-600">{selectedNode.description}</p>
					</div>

					{#if selectedExample}
						<!-- Example-specific content -->
						<div class="space-y-4">
							<!-- Key Questions -->
							{#if selectedNode.questions?.length}
								<div class="rounded-md bg-gray-50 p-3">
									<h3 class="mb-2 text-sm font-semibold text-gray-700">Key Questions</h3>
									<div class="space-y-2">
										{#each selectedNode.questions as q}
											<div class="rounded border border-gray-200 bg-white p-2">
												<p class="mb-1 text-sm font-medium text-gray-800">Q: {q.question}</p>
												<p class="mb-1 text-sm text-gray-600">A: {q.answer}</p>
												{#if q.thoughtProcess}
													<p class="text-xs text-gray-500 italic">
														Thought Process: {q.thoughtProcess}
													</p>
												{/if}
											</div>
										{/each}
									</div>
								</div>
							{/if}

							<!-- Calculations -->
							{#if selectedNode.calculations}
								<div class="rounded-md bg-gray-50 p-3">
									<h3 class="mb-2 text-sm font-semibold text-gray-700">Calculations</h3>
									<div class="space-y-2">
										{#each selectedNode.calculations as calc}
											<div class="rounded border border-gray-200 bg-white p-2">
												<p class="mb-1 text-sm font-medium text-gray-800">{calc.description}</p>
												<p class="text-sm text-gray-600">{calc.value}</p>
												{#if calc.note}
													<p class="mt-1 text-xs text-gray-500">{calc.note}</p>
												{/if}
											</div>
										{/each}
									</div>
								</div>
							{/if}

							<!-- Key Decisions -->
							{#if selectedNode.decisions?.length}
								<div class="rounded-md bg-gray-50 p-3">
									<h3 class="mb-2 text-sm font-semibold text-gray-700">Key Decisions</h3>
									<div class="space-y-2">
										{#each selectedNode.decisions as decision}
											<div class="rounded border border-gray-200 bg-white p-2">
												<p class="mb-1 text-sm font-medium text-gray-800">{decision.decision}</p>
												<p class="mb-1 text-sm text-gray-600">Rationale: {decision.rationale}</p>
												<p class="text-sm text-gray-600">Implications: {decision.implications}</p>
											</div>
										{/each}
									</div>
								</div>
							{/if}

							<!-- Details -->
							{#if selectedNode.details?.length}
								<div class="rounded-md bg-gray-50 p-3">
									<h3 class="mb-2 text-sm font-semibold text-gray-700">Implementation Details</h3>
									<div class="space-y-2">
										{#each selectedNode.details as detail}
											<div class="rounded border border-gray-200 bg-white p-2">
												<p class="text-sm text-gray-600">{detail}</p>
											</div>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					{:else}
						<!-- Generic LEADERS framework content -->
						<div class="space-y-4">
							<!-- Overview -->
							<div class="rounded-md bg-gray-50 p-3">
								<h3 class="mb-2 text-sm font-semibold text-gray-700">Overview</h3>
								<p class="text-sm text-gray-600">{selectedNode.overview.text}</p>
							</div>

							<!-- Key Focus Areas -->
							<div class="rounded-md bg-gray-50 p-3">
								<h3 class="mb-2 text-sm font-semibold text-gray-700">Key Focus Areas</h3>
								<ul class="list-inside list-disc space-y-1">
									{#each selectedNode.keyFocusAreas as area}
										<li class="text-sm text-gray-600">{area.text}</li>
									{/each}
								</ul>
							</div>

							<!-- Common Mistakes -->
							<div class="rounded-md bg-gray-50 p-3">
								<h3 class="mb-2 text-sm font-semibold text-gray-700">Common Mistakes</h3>
								<ul class="list-inside list-disc space-y-1">
									{#each selectedNode.commonMistakes as mistake}
										<li class="text-sm text-gray-600">{mistake.text}</li>
									{/each}
								</ul>
							</div>

							<!-- Success Indicators -->
							<div class="rounded-md bg-gray-50 p-3">
								<h3 class="mb-2 text-sm font-semibold text-gray-700">Success Indicators</h3>
								<ul class="list-inside list-disc space-y-1">
									{#each selectedNode.successIndicators as indicator}
										<li class="text-sm text-gray-600">{indicator.text}</li>
									{/each}
								</ul>
							</div>
						</div>
					{/if}
				</div>
			{:else}
				<div class="py-8 text-center text-gray-500">Select a LEADERS node to view details</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.animate-fade-in {
		animation: fadeIn 0.3s ease-in-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
