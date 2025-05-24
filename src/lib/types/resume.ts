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
  subtitle: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface LatestAiProduct {
  title: string;
  description: string;
  initiatives: {
    name: string;
    description: string;
  }[];
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
  position: string;
  company: string;
  location: string;
  duration: string;
  achievements: string[];
  techStack?: string[];
}

export interface Education {
  degree: string;
  institution: string;
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
  seoTags: SeoTags;
  personalInfo: PersonalInfo;
  summary: string;
  latestAiProduct: LatestAiProduct;
  coreCompetencies: CoreCompetencies;
  technicalSkills: TechnicalSkills;
  experience: Experience[];
  education: Education[];
  impactSummary: ImpactSummary;
} 