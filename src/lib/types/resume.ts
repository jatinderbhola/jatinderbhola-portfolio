export interface SeoTags {
	leadership: string[];
	technicalSkills: string[];
	cloudDevOps: string[];
	databases: string[];
	aiMachineLearning: string[];
	testing: string[];
	businessImpact: string[];
	industries: string[];
	methodologies: string[];
	softSkills: string[];
	location: string[];
}

export interface PersonalInfo {
	name: string;
	title: string;
	email: string;
	phone: string;
	location: string;
	avatar: string;
	socialLinks: Array<{
		platform: string;
		url: string;
	}>;
}

export interface Initiative {
	name: string;
	description: string;
	link?: string;
}

export interface LatestAiProduct {
	title: string;
	description: string;
	initiatives: Initiative[];
	impact: string;
}

export interface CoreCompetencies {
	leadership: string[];
	technical: string[];
}

export interface TechnicalSkills {
	cloudDevOps: {
		aws: string[];
		gcp: string[];
		tools: string[];
	};
	backendApis: {
		languages: string[];
		architecture: string[];
		practices: string[];
	};
	frontend: {
		frameworks: string[];
		tools: string[];
	};
	testingObservability: {
		testing: string[];
		monitoring: string[];
	};
	databases: {
		sql: string[];
		nosql: string[];
	};
	developmentTools: {
		versionControl: string[];
		cicd: string[];
		others: string[];
	};
}

export interface Experience {
	company: string;
	position: string;
	location: string;
	duration: string;
	achievements: string[];
	techStack?: string[];
}

export interface Education {
	institution: string;
	degree: string;
	location: string;
	duration: string;
}

export interface ImpactSummary {
	revenueImpact: string;
	teamPerformance: string;
	systemReliability: string;
	developerProductivity: string;
	scalability: string;
}

export interface Resume {
	seoTags: {
		technicalSkills: string[];
	};
	personalInfo: PersonalInfo;
	summary: string;
	latestAiProducts: LatestAiProduct[];
	coreCompetencies: string[];
	technicalSkills: string[];
	experience: Experience[];
	education: Education[];
	impactSummary: ImpactSummary;
}
