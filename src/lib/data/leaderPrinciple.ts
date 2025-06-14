export interface LeaderNode {
	id: string;
	name: string;
	title: string;
	description: string;
	details: string[];
	overview: {
		text: string;
		icon: string;
		color: string;
	};
	keyFocusAreas: {
		text: string;
		icon: string;
		color: string;
	}[];
	commonMistakes: {
		text: string;
		icon: string;
		color: string;
	}[];
	successIndicators: {
		text: string;
		icon: string;
		color: string;
	}[];
}

export const leaderNodes: LeaderNode[] = [
	{
		id: 'L',
		name: 'L',
		title: 'Learn the Problem',
		description: 'Understanding the requirements and constraints',
		details: [
			'Functional requirements',
			'Non-functional requirements',
			'User stories and use cases',
			'Constraints and limitations',
			'Success criteria'
		],
		overview: {
			text: "This foundational step establishes the business context and technical requirements for your system design. As an EM, you're demonstrating collaborative leadership by treating the interviewer as a stakeholder and showing you understand that great technical solutions must align with business objectives.",
			icon: '📋',
			color: 'blue'
		},
		keyFocusAreas: [
			{
				text: 'Business objectives and success metrics definition',
				icon: '🎯',
				color: 'indigo'
			},
			{
				text: 'User personas and usage patterns identification',
				icon: '👥',
				color: 'indigo'
			},
			{
				text: 'Technical and business constraints clarification',
				icon: '⚖️',
				color: 'indigo'
			},
			{
				text: 'Integration requirements with existing systems',
				icon: '🔄',
				color: 'indigo'
			}
		],
		commonMistakes: [
			{
				text: 'Jumping into technical solutions without understanding the problem',
				icon: '⚠️',
				color: 'red'
			},
			{
				text: 'Forgetting to ask about team size, budget, and timeline constraints',
				icon: '⚠️',
				color: 'red'
			},
			{
				text: 'Assuming requirements instead of clarifying them with stakeholders',
				icon: '⚠️',
				color: 'red'
			}
		],
		successIndicators: [
			{
				text: 'Interviewer feels heard and engaged in collaborative discussion',
				icon: '✅',
				color: 'green'
			},
			{
				text: "You've identified both functional and non-functional requirements",
				icon: '✅',
				color: 'green'
			},
			{
				text: 'Business context is clearly understood and can guide technical decisions',
				icon: '✅',
				color: 'green'
			}
		]
	},
	{
		id: 'E',
		name: 'E',
		title: 'Estimate Scale',
		description: 'Quantifying system requirements and capacity',
		details: [
			'Traffic estimates (QPS)',
			'Data storage requirements',
			'Read vs Write ratio',
			'Network bandwidth needs',
			'Growth projections'
		],
		overview: {
			text: "This step demonstrates your ability to think strategically about system capacity and resource planning. As an EM, you're showing cost consciousness and growth planning skills that directly impact team hiring, infrastructure budgets, and project timelines.",
			icon: '📊',
			color: 'blue'
		},
		keyFocusAreas: [
			{
				text: 'User growth projections and traffic patterns analysis',
				icon: '📈',
				color: 'indigo'
			},
			{
				text: 'Data volume calculations and storage requirements',
				icon: '💾',
				color: 'indigo'
			},
			{
				text: 'Performance requirements and SLA definitions',
				icon: '⚡',
				color: 'indigo'
			},
			{
				text: 'Infrastructure cost implications and budgeting',
				icon: '💰',
				color: 'indigo'
			}
		],
		commonMistakes: [
			{
				text: 'Providing estimates without explaining assumptions or showing your work',
				icon: '⚠️',
				color: 'red'
			},
			{
				text: 'Forgetting to consider growth over time (1-3 year projections)',
				icon: '⚠️',
				color: 'red'
			},
			{
				text: 'Not connecting scale estimates to team size and development timeline',
				icon: '⚠️',
				color: 'red'
			}
		],
		successIndicators: [
			{
				text: 'Calculations are reasonable and clearly explained',
				icon: '✅',
				color: 'green'
			},
			{
				text: 'Growth scenarios are considered with business context',
				icon: '✅',
				color: 'green'
			},
			{
				text: 'Cost implications are discussed in terms leadership can understand',
				icon: '✅',
				color: 'green'
			}
		]
	},
	{
		id: 'A',
		name: 'A',
		title: 'APIs & Interfaces',
		description: 'Designing system interfaces and contracts',
		details: [
			'API endpoints and methods',
			'Request/Response formats',
			'Authentication/Authorization',
			'Rate limiting and quotas',
			'API versioning strategy'
		],
		overview: {
			text: "This step showcases your ability to design systems that enable team collaboration and external partnerships. As an EM, you're demonstrating how technical decisions impact team productivity, cross-functional collaboration, and business partnerships.",
			icon: '🔌',
			color: 'blue'
		},
		keyFocusAreas: [
			{
				text: 'Core business operations and user journey mapping',
				icon: '🗺️',
				color: 'indigo'
			},
			{
				text: 'Internal vs external API boundary definitions',
				icon: '🌐',
				color: 'indigo'
			},
			{
				text: 'Authentication, authorization, and security protocols',
				icon: '🔒',
				color: 'indigo'
			},
			{
				text: 'API evolution strategy and backward compatibility',
				icon: '🔄',
				color: 'indigo'
			}
		],
		commonMistakes: [
			{
				text: 'Designing APIs without considering how different teams will integrate',
				icon: '⚠️',
				color: 'red'
			},
			{
				text: 'Over-engineering interfaces before understanding core use cases',
				icon: '⚠️',
				color: 'red'
			},
			{
				text: 'Forgetting to plan for API versioning and deprecation strategies',
				icon: '⚠️',
				color: 'red'
			}
		],
		successIndicators: [
			{
				text: 'APIs clearly support identified business operations',
				icon: '✅',
				color: 'green'
			},
			{
				text: 'Integration patterns consider team boundaries and responsibilities',
				icon: '✅',
				color: 'green'
			},
			{
				text: 'Security and scalability concerns are addressed upfront',
				icon: '✅',
				color: 'green'
			}
		]
	},
	{
		id: 'D',
		name: 'D',
		title: 'Data Modeling',
		description: 'Designing data structures and relationships',
		details: [
			'Database schema design',
			'Data relationships',
			'Indexing strategy',
			'Data partitioning',
			'Caching strategy'
		],
		overview: {
			text: "Data modeling decisions have long-term implications for team productivity, system performance, and business intelligence capabilities. As an EM, you're showing how data architecture affects team organization, feature development velocity, and the company's ability to make data-driven decisions.",
			icon: '🗄️',
			color: 'blue'
		},
		keyFocusAreas: [
			{
				text: 'Core business entities and relationship mapping',
				icon: '🔗',
				color: 'indigo'
			},
			{
				text: 'Consistency requirements and CAP theorem trade-offs',
				icon: '⚖️',
				color: 'indigo'
			},
			{
				text: 'Data partitioning strategy for scale and team ownership',
				icon: '📦',
				color: 'indigo'
			},
			{
				text: 'Analytics and business intelligence requirements',
				icon: '📊',
				color: 'indigo'
			}
		],
		commonMistakes: [
			{
				text: 'Choosing database technology without considering team expertise',
				icon: '⚠️',
				color: 'red'
			},
			{
				text: 'Over-normalizing or under-normalizing without business context',
				icon: '⚠️',
				color: 'red'
			},
			{
				text: 'Ignoring data migration complexity and operational requirements',
				icon: '⚠️',
				color: 'red'
			}
		],
		successIndicators: [
			{
				text: 'Data model supports current requirements and anticipated growth',
				icon: '✅',
				color: 'green'
			},
			{
				text: 'Database choices align with team skills and operational capabilities',
				icon: '✅',
				color: 'green'
			},
			{
				text: 'Business intelligence and analytics needs are considered',
				icon: '✅',
				color: 'green'
			}
		]
	},
	{
		id: 'E2',
		name: 'E',
		title: 'Engineer Architecture',
		description: 'Designing the system architecture and components',
		details: [
			'System components',
			'Service boundaries',
			'Data flow',
			'Team structure',
			'Technology choices'
		],
		overview: {
			text: "This step demonstrates your ability to translate requirements into a scalable architecture. As an EM, you're showing how to balance technical excellence with team productivity and business needs.",
			icon: '🏗️',
			color: 'blue'
		},
		keyFocusAreas: [
			{
				text: 'Service boundaries and team alignment',
				icon: '👥',
				color: 'indigo'
			},
			{
				text: 'Data flow and consistency patterns',
				icon: '🔄',
				color: 'indigo'
			},
			{
				text: 'Technology stack selection and justification',
				icon: '🛠️',
				color: 'indigo'
			},
			{
				text: 'Scalability and performance considerations',
				icon: '📈',
				color: 'indigo'
			}
		],
		commonMistakes: [
			{
				text: 'Over-engineering the architecture',
				icon: '⚠️',
				color: 'red'
			},
			{
				text: 'Not considering team size and expertise',
				icon: '⚠️',
				color: 'red'
			},
			{
				text: 'Choosing technologies without proper justification',
				icon: '⚠️',
				color: 'red'
			}
		],
		successIndicators: [
			{
				text: 'Architecture supports team productivity',
				icon: '✅',
				color: 'green'
			},
			{
				text: 'Clear service boundaries and responsibilities',
				icon: '✅',
				color: 'green'
			},
			{
				text: 'Technology choices are well-justified',
				icon: '✅',
				color: 'green'
			}
		]
	},
	{
		id: 'R',
		name: 'R',
		title: 'Refine Components',
		description: 'Optimizing individual components',
		details: [
			'Component interactions',
			'Error handling',
			'Logging and monitoring',
			'Security measures',
			'Performance optimization'
		],
		overview: {
			text: "This deep-dive step shows your ability to identify and prioritize technical risks while making resource allocation decisions. As an EM, you're demonstrating how to focus engineering effort on highest-impact areas and how to communicate technical complexity to stakeholders.",
			icon: '🔍',
			color: 'blue'
		},
		keyFocusAreas: [
			{
				text: 'Critical path identification and risk assessment',
				icon: '🎯',
				color: 'indigo'
			},
			{
				text: 'Algorithm and data structure choices for performance',
				icon: '⚡',
				color: 'indigo'
			},
			{
				text: 'Error handling and system resilience patterns',
				icon: '🛡️',
				color: 'indigo'
			},
			{
				text: 'Security considerations and compliance requirements',
				icon: '🔒',
				color: 'indigo'
			}
		],
		commonMistakes: [
			{
				text: "Deep-diving into areas that aren't critical to business success",
				icon: '⚠️',
				color: 'red'
			},
			{
				text: 'Getting lost in implementation details instead of architectural decisions',
				icon: '⚠️',
				color: 'red'
			},
			{
				text: 'Not explaining why certain components deserve more engineering attention',
				icon: '⚠️',
				color: 'red'
			}
		],
		successIndicators: [
			{
				text: 'Deep-dive areas are clearly justified by business impact or technical risk',
				icon: '✅',
				color: 'green'
			},
			{
				text: 'Solutions demonstrate appropriate engineering rigor without over-engineering',
				icon: '✅',
				color: 'green'
			},
			{
				text: 'Trade-offs between complexity and functionality are well-articulated',
				icon: '✅',
				color: 'green'
			}
		]
	},
	{
		id: 'S',
		name: 'S',
		title: 'Scale the System',
		description: 'Ensuring system scalability and performance',
		details: [
			'Load balancing',
			'Horizontal scaling',
			'Vertical scaling',
			'Performance bottlenecks',
			'Cost optimization'
		],
		overview: {
			text: "This final step demonstrates your ability to plan for growth while managing technical debt and operational complexity. As an EM, you're showing how scaling decisions affect team hiring, infrastructure costs, and product development velocity.",
			icon: '📈',
			color: 'blue'
		},
		keyFocusAreas: [
			{
				text: 'Bottleneck identification and scaling strategy prioritization',
				icon: '🔍',
				color: 'indigo'
			},
			{
				text: 'Monitoring and alerting strategy for operational excellence',
				icon: '📊',
				color: 'indigo'
			},
			{
				text: 'Performance optimization ROI and engineering resource allocation',
				icon: '💰',
				color: 'indigo'
			},
			{
				text: 'Disaster recovery and business continuity planning',
				icon: '🛡️',
				color: 'indigo'
			}
		],
		commonMistakes: [
			{
				text: 'Optimizing everything instead of focusing on actual bottlenecks',
				icon: '⚠️',
				color: 'red'
			},
			{
				text: 'Ignoring operational complexity and team capacity in scaling plans',
				icon: '⚠️',
				color: 'red'
			},
			{
				text: 'Not connecting scaling strategy to business growth and hiring plans',
				icon: '⚠️',
				color: 'red'
			}
		],
		successIndicators: [
			{
				text: 'Scaling priorities are clearly tied to business growth scenarios',
				icon: '✅',
				color: 'green'
			},
			{
				text: 'Operational excellence and team sustainability are considered',
				icon: '✅',
				color: 'green'
			},
			{
				text: 'Performance optimizations show clear ROI and business impact',
				icon: '✅',
				color: 'green'
			}
		]
	}
];
