import { render, screen } from '@testing-library/svelte';
import { resume } from '$lib/stores/resume';
import PersonalInfo from './PersonalInfo.svelte';
import type { Resume } from '$lib/types/resume';
import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach } from 'vitest';

describe('PersonalInfo', () => {
  const mockResume: Resume = {
    seoTags: {
      leadership: [],
      technicalSkills: [],
      cloudDevOps: [],
      databases: [],
      aiMachineLearning: [],
      testing: [],
      businessImpact: [],
      industries: [],
      methodologies: [],
      softSkills: [],
      location: []
    },
    personalInfo: {
      name: 'John Doe',
      title: 'Software Engineer',
      subtitle: 'Full Stack Developer',
      location: 'Toronto, ON',
      phone: '+1 234 567 8900',
      email: 'john@example.com',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe'
    },
    summary: '',
    latestAiProduct: {
      title: '',
      description: '',
      initiatives: [],
      impact: ''
    },
    coreCompetencies: {
      leadership: [],
      technical: []
    },
    technicalSkills: {
      cloudDevOps: {
        aws: [],
        gcp: [],
        tools: []
      },
      backendApis: {
        languages: [],
        architecture: [],
        practices: []
      },
      frontend: {
        frameworks: [],
        tools: []
      },
      testingObservability: {
        testing: [],
        monitoring: []
      },
      databases: {
        sql: [],
        nosql: []
      },
      developmentTools: {
        versionControl: [],
        cicd: [],
        others: []
      }
    },
    experience: [],
    education: [],
    impactSummary: {
      revenueImpact: '',
      teamPerformance: '',
      systemReliability: '',
      developerProductivity: '',
      scalability: ''
    }
  };

  beforeEach(() => {
    resume.set(mockResume);
  });

  it('renders personal information correctly', () => {
    render(PersonalInfo);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
    expect(screen.getByText('Toronto, ON')).toBeInTheDocument();
    expect(screen.getByText('+1 234 567 8900')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('renders social links correctly', () => {
    render(PersonalInfo);

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const githubLink = screen.getByRole('link', { name: /github/i });

    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/johndoe');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe');
  });
}); 