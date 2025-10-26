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

		// Generate keywords for SEO
		const primaryTags = [
			resume.personalInfo.name,
			...resume.seoTags.technicalSkills.slice(0, 10),
			...resume.seoTags.leadership.slice(0, 5),
			...resume.seoTags.cloudDevOps.slice(0, 8),
			...resume.seoTags.location.slice(0, 3)
		];
		// Generate structured data for SEO
		const structuredData = {
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: resume.personalInfo.name,
			jobTitle: resume.personalInfo.title,
			description: resume.summary,
			image: avatarUrl,
			sameAs: resume.personalInfo.socialLinks.filter(Boolean).map((link: { url: string }) => link.url),
			worksFor: {
				'@type': 'Organization',
				name: resume.experience[0].company,
				sameAs: resume.experience?.[0]?.companyWebsite || ''
			},
			alumniOf: resume.education.map((edu: { institution: string }) => ({
				'@type': 'EducationalOrganization',
				name: edu.institution
			})),
			performerIn: resume.latestAiProducts[0].initiatives.map(talk => ({
				'@type': 'Event',
				name: talk.name,
				description: talk.description,
				url: talk.link
			})),
			award: [
				'Generated $1.3M+ incremental revenue',
				'Achieved 99.99% uptime across critical services',
				'Reduced time-to-merge by 22%'
			],
			knowsAbout: primaryTags.join(', '),
			tags: primaryTags.join(', ')
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
