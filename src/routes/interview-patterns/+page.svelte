<script lang="ts">
	import { onMount } from 'svelte';
	import {
		patterns,
		patternDetails,
		communicationTips,
		patternKeywords
	} from '$lib/data/interview-patterns';

	onMount(() => {
		document.title = 'Technical Interview Patterns';
	});
</script>

<svelte:head>
	<title>Technical Interview Patterns</title>
	<meta
		name="description"
		content="Quick Reference Guide for Coding Interviews. Explore common coding interview patterns, when to use them, and example problems."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://www.jatinderbhola.com/interview-patterns" />
	<meta property="og:title" content="Technical Interview Patterns" />
	<meta
		property="og:description"
		content="Quick Reference Guide for Coding Interviews. Explore common coding interview patterns, when to use them, and example problems."
	/>
	<meta property="og:image" content="/og/technical_interview_patterns.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://www.jatinderbhola.com/interview-patterns" />
	<meta property="twitter:title" content="Technical Interview Patterns" />
	<meta
		property="twitter:description"
		content="Quick Reference Guide for Coding Interviews. Explore common coding interview patterns, when to use them, and example problems."
	/>
	<meta property="twitter:image" content="/og/technical_interview_patterns.png" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<header class="header mb-8">
		<h1 class="text-4xl font-bold text-white">Technical Interview Patterns</h1>
		<p class="text-lg text-white opacity-90">Quick Reference Guide for Coding Interviews</p>
	</header>

	<div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each patterns as pattern}
			<div class="pattern-card rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
				<div class="mb-4 flex items-center">
					<span class="mr-3 text-3xl">{pattern.emoji}</span>
					<h2 class="border-b-2 border-indigo-600 pb-2 text-xl font-semibold text-indigo-600">
						{pattern.title}
					</h2>
				</div>

				<div class="when-to-use mb-4">
					<h3 class="mb-2 text-sm font-semibold text-blue-700">When to Use:</h3>
					<ul class="list-inside list-disc text-gray-600">
						{#each pattern.whenToUse as useCase}
							<li>{useCase}</li>
						{/each}
					</ul>
				</div>

				<div class="code-snippet mb-4">
					<h3 class="mb-2 text-sm font-semibold text-gray-700">Code Pattern:</h3>
					<pre class="overflow-x-auto rounded bg-gray-50 p-3 text-sm"><code
							>{pattern.codeSnippet}</code
						></pre>
				</div>

				<div class="complexity mb-4">
					<h3 class="mb-2 text-sm font-semibold text-gray-700">Complexity:</h3>
					<div class="text-sm text-gray-600">
						<p>Time: {pattern.complexity.time}</p>
						<p>Space: {pattern.complexity.space}</p>
					</div>
				</div>

				<div class="example-problems">
					<h3 class="mb-2 text-sm font-semibold text-green-700">Example Problems:</h3>
					<ul class="list-inside list-disc text-gray-600">
						{#each pattern.exampleProblems as problem}
							<li>{problem}</li>
						{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>

	<div class="page-break"></div>

	<div class="pattern-list mb-12 rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-6 text-2xl font-bold text-gray-900">🎯 Expanded Pattern Recognition Guide</h2>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each patternDetails as detail}
				<div class="pattern-item">
					<h3 class="mb-4 text-xl font-semibold text-indigo-600">{detail.title}</h3>
					<ul class="space-y-3">
						{#each detail.problems as problem}
							<li class="rounded bg-gray-50 p-3">
								<h4 class="font-medium text-gray-900">{problem.name}</h4>
								<p class="text-sm text-gray-600">{problem.description}</p>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>

	<div class="communication-section mb-12 rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-6 text-2xl font-bold text-purple-600">
			🗣️ How to Communicate During Technical Interviews
		</h2>
		<div class="space-y-6">
			{#each communicationTips as tip}
				<div class="step">
					<div class="mb-3 flex items-center justify-between">
						<h3 class="text-xl font-semibold text-indigo-600">{tip.title}</h3>
						<span class="text-sm text-gray-500">{tip.duration}</span>
					</div>
					<ul class="space-y-3">
						{#each tip.points as point}
							<li class="rounded bg-gray-50 p-3">
								<p class="font-medium text-gray-900">{point.action}</p>
								<p class="text-sm text-gray-600 italic">{point.example}</p>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>

	<div class="communication-section rounded-lg bg-white p-6 shadow-md">
		<h2 class="mb-6 text-2xl font-bold text-purple-600">🧠 Pattern Recognition Tips</h2>
		<div class="step">
			<h3 class="mb-4 text-xl font-semibold text-indigo-600">
				Quick Pattern Identification Keywords
			</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				{#each patternKeywords as keyword}
					<div class="rounded bg-gray-50 p-3">
						<p class="font-medium text-gray-900">{keyword.keyword}</p>
						<p class="text-sm text-gray-600">→ {keyword.pattern}</p>
					</div>
				{/each}
			</div>
		</div>
		<div class="tip mt-6">
			Practice recognizing these keywords in problem statements. They're strong hints about which
			pattern to apply!
		</div>
	</div>
</div>

<style>
	pre {
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	/* Header Styles */
	.header {
		text-align: center;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 2rem;
		border-radius: 0.5rem;
	}

	/* Download Instructions */
	.download-instructions {
		background: #e0e7ff;
		border: 2px dashed #667eea;
		padding: 1.5rem;
		border-radius: 0.5rem;
		text-align: center;
	}

	/* Pattern Card Styles */
	.pattern-card {
		transition: transform 0.2s ease-in-out;
	}

	.pattern-card:hover {
		transform: translateY(-5px);
	}

	/* When to Use Section */
	.when-to-use {
		background: #e8f4f8;
		padding: 1rem;
		border-radius: 0.5rem;
		height: 180px;
		overflow-y: auto;
	}

	/* Code Snippet Section */
	.code-snippet pre {
		background: #f8f8f8;
		border: 1px solid #e1e1e1;
		border-radius: 0.5rem;
		padding: 1rem;
		font-family: 'Courier New', monospace;
		font-size: 0.9em;
		line-height: 1.4;
		height: 300px;
		overflow-y: auto;
	}

	/* Complexity Section */
	.complexity {
		width: 100%;
		display: inline-block;
		background: #fef3c7;
		color: #92400e;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		font-size: 0.85em;
	}

	/* Example Problems Section */
	.example-problems {
		background: #f0fdf4;
		padding: 1rem;
		border-radius: 0.5rem;
		height: 180px;
		overflow-y: auto;
	}

	/* Pattern List Styles */
	.pattern-item {
		background: #f9fafb;
		border-left: 4px solid #667eea;
		padding: 1rem;
		margin: 1rem 0;
	}

	/* Communication Section Styles */
	.step {
		background: #f9fafb;
		border-left: 4px solid #667eea;
		padding: 1rem;
		margin: 1rem 0;
	}

	.tip {
		background: #fef3c7;
		border-left: 4px solid #f59e0b;
		padding: 1rem;
		margin: 1rem 0;
	}

	.tip::before {
		content: '💡 TIP: ';
		font-weight: bold;
		color: #d97706;
	}

	/* List Styles */
	ul {
		margin: 0.5rem 0;
		padding-left: 1.25rem;
	}

	li {
		margin: 0.5rem 0;
	}

	/* Page Break */
	.page-break {
		margin: 2.5rem 0;
	}

	@media print {
		body {
			margin: 0;
			background: white;
		}

		.container {
			max-width: none;
			padding: 0;
		}

		.shadow-md {
			box-shadow: none;
			border: 1px solid #e5e7eb;
		}

		.hover\:shadow-lg:hover {
			box-shadow: none;
		}

		.no-print {
			display: none;
		}

		/* Ensure proper page breaks */
		.mb-12 {
			page-break-inside: avoid;
			margin-bottom: 2rem;
		}

		/* Adjust colors for better printing */
		.text-gray-600 {
			color: #4b5563;
		}

		.text-gray-700 {
			color: #374151;
		}

		.text-gray-900 {
			color: #111827;
		}

		.bg-gray-50 {
			background-color: #f9fafb;
		}

		/* Ensure code blocks are readable */
		pre {
			background-color: #f3f4f6;
			border: 1px solid #e5e7eb;
			padding: 1rem;
			margin: 0.5rem 0;
		}

		/* Adjust grid for printing */
		@media print {
			.grid {
				display: block;
			}

			.grid > * {
				margin-bottom: 1rem;
			}
		}

		/* Print-specific section styles */
		.when-to-use,
		.example-problems,
		.complexity {
			background: #f9fafb;
			border: 1px solid #e5e7eb;
		}

		.header {
			background: none;
			color: black;
		}

		.header h1,
		.header p {
			color: black;
		}
	}

	/* Additional styles for better readability */
	code {
		font-family:
			ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
			monospace;
		font-size: 0.875em;
	}

	/* Smooth transitions */
	.transition-shadow {
		transition: box-shadow 0.2s ease-in-out;
	}

	/* Better list styling */
	.list-disc li {
		margin: 0.25rem 0;
	}

	/* Improved card hover effect */
	.hover\:shadow-lg:hover {
		transform: translateY(-2px);
		transition: transform 0.2s ease-in-out;
	}
</style>
