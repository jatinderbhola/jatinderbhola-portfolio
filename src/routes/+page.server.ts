import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getAvatarUrl, getAvatarFallback } from '$lib/utils/avatar';

export const load: PageServerLoad = async ({ url }) => {
	const lang = url.searchParams.get('lang') || 'en';
	const profile = url.searchParams.get('profile') || 'default';

	try {
		const resumeData = await import(`$lib/data/profiles/${profile}-resume.json`);
		const resume = resumeData.default;

		// Generate avatar URL if not provided
		const avatarUrl =
			resume.personalInfo.avatar ||
			getAvatarUrl(resume.personalInfo.name, resume.personalInfo.title);

		// Generate structured data for SEO
		const structuredData = {
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: resume.personalInfo.name,
			jobTitle: resume.personalInfo.title,
			description: resume.summary,
			image: avatarUrl,
			sameAs: [resume.personalInfo.linkedin, resume.personalInfo.github].filter(Boolean),
			worksFor: {
				'@type': 'Organization',
				name: resume.experience[0].company
			},
			alumniOf: resume.education.map((edu: { institution: string }) => ({
				'@type': 'EducationalOrganization',
				name: edu.institution
			}))
		};

		return {
			resume: {
				...resume,
				personalInfo: {
					...resume.personalInfo,
					avatar: avatarUrl
				}
			},
			structuredData,
			currentLanguage: lang,
			currentProfile: profile
		};
	} catch (e) {
		console.error('Error loading resume:', e);
		throw error(404, 'Resume not found');
	}
};
