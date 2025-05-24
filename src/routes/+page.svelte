<script lang="ts">
  import PersonalInfo from '$lib/components/sections/PersonalInfo.svelte';
  import { resume } from '$lib/stores/resume';
  import { page } from '$app/stores';

  // Initialize the store with server-side data
  $: if ($page.data.resume) {
    resume.set($page.data.resume);
  }
</script>

<svelte:head>
  {#if $resume}
    <title>{$resume.personalInfo.name} - {$resume.personalInfo.title}</title>
    <meta name="description" content={$resume.summary} />
    <meta name="keywords" content={$resume.seoTags.technicalSkills.join(', ')} />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content={$resume.personalInfo.name} />
    <meta property="og:description" content={$resume.summary} />
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={$resume.personalInfo.name} />
    <meta name="twitter:description" content={$resume.summary} />
    
    <!-- Structured Data -->
    {#if $page.data.structuredData}
      <script type="application/ld+json">
        {$page.data.structuredData}
      </script>
    {/if}
  {/if}
</svelte:head>

<div class="space-y-6">
  <PersonalInfo />
  
  {#if $resume}
    <!-- Summary Section -->
    <section class="bg-white shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Professional Summary</h2>
      <p class="text-gray-600">{$resume.summary}</p>
    </section>

    <!-- Latest AI Product Section -->
    <section class="bg-white shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">{$resume.latestAiProduct.title}</h2>
      <p class="text-gray-600 mb-4">{$resume.latestAiProduct.description}</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each $resume.latestAiProduct.initiatives as initiative}
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-2">{initiative.name}</h3>
            <p class="text-gray-600">{initiative.description}</p>
          </div>
        {/each}
      </div>
      
      <p class="mt-4 text-gray-600 italic">{$resume.latestAiProduct.impact}</p>
    </section>

    <!-- Experience Section -->
    <section class="bg-white shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Experience</h2>
      <div class="space-y-6">
        {#each $resume.experience as job}
          <div class="border-l-4 border-indigo-500 pl-4">
            <h3 class="text-xl font-semibold text-gray-900">{job.position}</h3>
            <p class="text-gray-600">{job.company} • {job.location}</p>
            <p class="text-gray-500 text-sm mb-2">{job.duration}</p>
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
    </section>

    <!-- Education Section -->
    <section class="bg-white shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Education</h2>
      <div class="space-y-4">
        {#each $resume.education as edu}
          <div>
            <h3 class="font-semibold text-gray-900">{edu.degree}</h3>
            <p class="text-gray-600">{edu.institution}</p>
            <p class="text-gray-500 text-sm">{edu.location} • {edu.duration}</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Impact Summary Section -->
    <section class="bg-white shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Impact Summary</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-semibold text-gray-900 mb-2">Revenue Impact</h3>
          <p class="text-gray-600">{$resume.impactSummary.revenueImpact}</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-semibold text-gray-900 mb-2">Team Performance</h3>
          <p class="text-gray-600">{$resume.impactSummary.teamPerformance}</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-semibold text-gray-900 mb-2">System Reliability</h3>
          <p class="text-gray-600">{$resume.impactSummary.systemReliability}</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-semibold text-gray-900 mb-2">Developer Productivity</h3>
          <p class="text-gray-600">{$resume.impactSummary.developerProductivity}</p>
        </div>
      </div>
    </section>
  {/if}
</div>
