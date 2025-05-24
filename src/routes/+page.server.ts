import type { PageServerLoad } from './$types';
import type { Resume } from '$lib/types/resume';

export const load: PageServerLoad = async ({ fetch, url }) => {
  try {
    // Get profile from URL query parameter, default to 'default'
    const profile = url.searchParams.get('profile') || 'default';
    const response = await fetch(`/profiles/${profile}.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to load resume: ${response.statusText}`);
    }
    
    const resume: Resume = await response.json();

    // Generate structured data for SEO
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: resume.personalInfo.name,
      jobTitle: resume.personalInfo.title,
      description: resume.summary,
      email: resume.personalInfo.email,
      telephone: resume.personalInfo.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: resume.personalInfo.location
      },
      sameAs: [
        resume.personalInfo.linkedin,
        resume.personalInfo.github
      ],
      worksFor: resume.experience.map(exp => ({
        '@type': 'Organization',
        name: exp.company,
        position: exp.position,
        startDate: exp.duration.split(' - ')[0],
        endDate: exp.duration.split(' - ')[1] === 'Present' ? new Date().toISOString() : exp.duration.split(' - ')[1]
      })),
      alumniOf: resume.education.map(edu => ({
        '@type': 'EducationalOrganization',
        name: edu.institution,
        degree: edu.degree
      }))
    };

    return {
      resume,
      structuredData: JSON.stringify(structuredData),
      currentProfile: profile
    };
  } catch (error) {
    console.error('Error loading resume:', error);
    return {
      resume: null,
      structuredData: null,
      currentProfile: 'default'
    };
  }
}; 