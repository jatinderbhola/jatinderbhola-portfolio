
export interface SystemDesignExample {
    id: string;
    name: string;
    description: string;
    leaders: {
        [key: string]: {
            questions: Array<{
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
        };
    };
}

export const systemDesignExamples: SystemDesignExample[] = [
    {
        id: 'real-time-chat',
        name: 'Real-time Chat System',
        description: 'Design a Slack-like enterprise chat system for mid-size companies',
        leaders: {
            L: {
                questions: [
                    {
                        question: 'What type of chat system—consumer like WhatsApp or enterprise like Slack?',
                        answer: 'Enterprise chat system (Slack-like) for mid-size companies',
                        thoughtProcess:
                            'This helps define the feature set and compliance requirements. Enterprise systems need more security, compliance, and team collaboration features.'
                    },
                    {
                        question: "What's the business goal—user engagement, productivity, or monetization?",
                        answer: 'Focus on team productivity and collaboration',
                        thoughtProcess:
                            'This influences feature prioritization and success metrics. For enterprise tools, productivity is often more important than engagement metrics.'
                    },
                    {
                        question: 'How many users and what growth trajectory?',
                        answer: 'Target: 1K-10K employees per company',
                        thoughtProcess:
                            'This helps with capacity planning and scaling strategy. Mid-size companies have different needs than startups or large enterprises.'
                    },
                    {
                        question: 'Any compliance requirements like GDPR or HIPAA?',
                        answer: 'SOC2 compliance required',
                        thoughtProcess:
                            'Compliance requirements significantly impact architecture decisions, especially around data storage and access patterns.'
                    }
                ],
                details: [
                    'Type of chat system (WhatsApp vs Slack)',
                    'Business goals (engagement, productivity, monetization)',
                    'User base size and growth',
                    'Compliance requirements'
                ]
            },
            E: {
                questions: [
                    {
                        question: "What's the expected user base and daily active users?",
                        answer: '5,000 total users, 2,000 daily active',
                        thoughtProcess:
                            'This is a typical size for mid-size companies. Need to consider both total and active users for capacity planning.'
                    },
                    {
                        question: "What's the expected message volume per user?",
                        answer: '100 messages/user/day = 200K messages/day',
                        thoughtProcess:
                            'Based on typical enterprise chat usage patterns. This helps calculate storage and processing requirements.'
                    },
                    {
                        question: "What's the peak load factor?",
                        answer: '3x average = 7 messages/second',
                        thoughtProcess:
                            'Enterprise tools have more predictable usage patterns than consumer apps, but still need to handle peak loads.'
                    }
                ],
                calculations: [
                    {
                        description: 'Daily message volume',
                        value: '200K messages/day',
                        note: 'Based on 2,000 DAU × 100 messages/user'
                    },
                    {
                        description: 'Storage per message',
                        value: '200KB/message',
                        note: 'Includes metadata, attachments, and indexing'
                    },
                    {
                        description: 'Daily storage growth',
                        value: '40GB/day',
                        note: '200KB × 200K messages'
                    },
                    {
                        description: '3-year storage requirement',
                        value: '~45TB total',
                        note: '40GB × 365 days × 3 years'
                    }
                ],
                details: [
                    '5,000 total users, 2,000 daily active',
                    '100 messages/user/day = 200K messages/day',
                    'Peak: 3x average = 7 messages/second',
                    'Storage: 200KB/message * 200K = 40GB/day',
                    '3-year retention = ~45TB total'
                ]
            },
            A: {
                questions: [
                    {
                        question: 'What are the core operations needed?',
                        answer: 'Message sending, history retrieval, real-time updates, channel management',
                        thoughtProcess:
                            'Focus on essential operations first, then add features like reactions, threads, etc.'
                    },
                    {
                        question: 'What platforms need to be supported?',
                        answer: 'Web, mobile (iOS/Android), desktop',
                        thoughtProcess: 'Each platform needs its own SDK and may have different requirements.'
                    },
                    {
                        question: 'What are the real-time requirements?',
                        answer: 'Message delivery < 100ms, presence updates, typing indicators',
                        thoughtProcess:
                            'Real-time features are crucial for chat applications and influence the architecture significantly.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Use WebSocket for real-time updates',
                        rationale: 'Provides full-duplex communication and lower latency than polling',
                        implications: 'Need to handle connection management, reconnection, and message ordering'
                    },
                    {
                        decision: 'Separate REST and WebSocket endpoints',
                        rationale: 'Better separation of concerns and easier to scale independently',
                        implications: 'Need to maintain consistency between REST and WebSocket APIs'
                    }
                ],
                details: [
                    'POST /channels/{id}/messages - Send message',
                    'GET /channels/{id}/messages - Get message history',
                    'WebSocket /channels/{id}/live - Real-time updates',
                    'POST /channels - Create channel'
                ]
            },
            D: {
                questions: [
                    {
                        question: 'What are the core entities in the system?',
                        answer: 'Users, Organizations, Channels, Messages',
                        thoughtProcess:
                            'These form the foundation of the data model and influence all other decisions.'
                    },
                    {
                        question: 'What are the search requirements?',
                        answer: 'Full-text search across messages, user search, channel search',
                        thoughtProcess: 'Search is crucial for enterprise tools and affects database choices.'
                    },
                    {
                        question: 'What are the data isolation requirements?',
                        answer: 'Organization-level isolation for all data',
                        thoughtProcess: 'Enterprise systems need strong data isolation between organizations.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Use PostgreSQL for transactional data',
                        rationale: "Strong consistency, ACID compliance, and team's expertise",
                        implications: 'Need to handle scaling and replication'
                    },
                    {
                        decision: 'Use Redis for real-time presence',
                        rationale: 'Low latency, pub/sub capabilities, and in-memory performance',
                        implications: 'Need to handle persistence and failover'
                    },
                    {
                        decision: 'Use Elasticsearch for search',
                        rationale: 'Powerful full-text search capabilities and scalability',
                        implications: 'Need to handle data synchronization and indexing'
                    }
                ],
                details: [
                    'Users (auth, profile)',
                    'Organizations (tenant isolation)',
                    'Channels (public/private, members)',
                    'Messages (content, metadata, reactions)',
                    'PostgreSQL for transactional data',
                    'Redis for real-time presence',
                    'Elasticsearch for search'
                ]
            },
            E2: {
                questions: [
                    {
                        question: 'How should we structure the services?',
                        answer: 'API Gateway, Chat Service, WebSocket Service, Message Service',
                        thoughtProcess: 'Break down by functionality and scaling needs.'
                    },
                    {
                        question: 'How should we handle real-time message delivery?',
                        answer: 'WebSocket Service with message queue for reliability',
                        thoughtProcess: 'Need to ensure message delivery and handle high concurrency.'
                    },
                    {
                        question: 'How should we organize the team?',
                        answer: '3 service teams: API, Real-time, and Search',
                        thoughtProcess: 'Align team structure with service boundaries.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Use message queue for reliability',
                        rationale: 'Ensures message delivery and handles backpressure',
                        implications: 'Need to handle message ordering and deduplication'
                    },
                    {
                        decision: 'Separate WebSocket and Chat services',
                        rationale: 'Different scaling characteristics and failure domains',
                        implications: 'Need to handle service communication and consistency'
                    }
                ],
                details: [
                    '[Mobile/Web] → [Load Balancer] → [API Gateway] → [Chat Service]',
                    '[WebSocket Service] ← [Message Queue] ← [Message Service]',
                    '[Redis Cache] ← → [PostgreSQL] → [Elasticsearch]',
                    '3 service teams: API, Real-time, and Search',
                    '2 engineers per team initially'
                ]
            },
            R: {
                questions: [
                    {
                        question: 'What are the critical components?',
                        answer: 'WebSocket connection management, message delivery, presence tracking',
                        thoughtProcess: 'These are the most complex and failure-prone parts of the system.'
                    },
                    {
                        question: 'How do we ensure message delivery?',
                        answer: 'Message queue with acknowledgments and retries',
                        thoughtProcess: 'Need to handle various failure scenarios and ensure reliability.'
                    },
                    {
                        question: 'How do we handle offline users?',
                        answer: 'Message persistence and sync on reconnection',
                        thoughtProcess: 'Users need to receive messages when they come back online.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Use exponential backoff for retries',
                        rationale: 'Prevents overwhelming the system during failures',
                        implications: 'Need to handle message ordering and deduplication'
                    },
                    {
                        decision: 'Implement presence tracking in Redis',
                        rationale: 'Low latency and pub/sub capabilities',
                        implications: 'Need to handle Redis failover and data persistence'
                    }
                ],
                details: [
                    'WebSocket connection management',
                    'Message ordering and delivery guarantees',
                    'Presence tracking and user status',
                    'Connection recovery and offline sync',
                    'Message queue with delivery acknowledgments',
                    'Exponential backoff for retries'
                ]
            },
            S: {
                questions: [
                    {
                        question: 'How do we scale to 10x users?',
                        answer: 'Horizontal scaling of API servers, read replicas for database',
                        thoughtProcess: 'Focus on stateless services and read scaling first.'
                    },
                    {
                        question: 'How do we scale to 100x users?',
                        answer: 'Shard by organization, CDN for file uploads, message archiving',
                        thoughtProcess: 'Need to handle data partitioning and storage optimization.'
                    },
                    {
                        question: 'What metrics should we monitor?',
                        answer: 'Message delivery latency, connection counts, error rates',
                        thoughtProcess: 'Focus on user-impacting metrics and system health.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Implement organization-based sharding',
                        rationale: 'Natural partitioning boundary and isolation',
                        implications: 'Need to handle cross-organization features'
                    },
                    {
                        decision: 'Archive old messages to cold storage',
                        rationale: 'Reduce primary storage costs',
                        implications: 'Need to handle message retrieval from archive'
                    }
                ],
                details: [
                    '10x users: Horizontal scaling of API servers, read replicas',
                    '100x users: Shard by organization, CDN for files',
                    'Monitoring: Message delivery latency, connection counts',
                    'At 50K users: Dedicated platform team needed'
                ]
            }
        }
    },
    {
        id: 'ehr-system',
        name: 'Electronic Health Records (EHR) System',
        description:
            'Design an EHR system for a regional hospital network (5 hospitals, 200 providers, 500K patients)',
        leaders: {
            L: {
                questions: [
                    {
                        question:
                            'What type of healthcare provider—hospital, clinic network, or specialty practice?',
                        answer: 'Regional hospital network (5 hospitals)',
                        thoughtProcess:
                            'This defines the scale and complexity of the system, as well as integration requirements.'
                    },
                    {
                        question:
                            "What's the primary goal—patient care coordination, regulatory compliance, or operational efficiency?",
                        answer: 'Focus on care coordination and HIPAA compliance',
                        thoughtProcess:
                            'Healthcare systems must balance patient care with regulatory requirements.'
                    },
                    {
                        question: 'How many providers and patients will use the system?',
                        answer: '200 providers, 500K patients',
                        thoughtProcess: 'This helps with capacity planning and scaling strategy.'
                    },
                    {
                        question: 'What compliance requirements—HIPAA, HITECH, state regulations?',
                        answer: 'HIPAA compliance required',
                        thoughtProcess: 'Compliance requirements significantly impact architecture decisions.'
                    },
                    {
                        question:
                            'Do we need to integrate with existing systems like lab equipment or billing?',
                        answer: 'Yes, integration with lab and imaging systems required',
                        thoughtProcess: 'Integration requirements affect system architecture and API design.'
                    }
                ],
                details: [
                    'Regional hospital network (5 hospitals)',
                    '200 providers, 500K patients',
                    'Focus on care coordination',
                    'HIPAA compliance required',
                    'Integration with lab and imaging systems'
                ]
            },
            E: {
                questions: [
                    {
                        question: "What's the expected daily usage pattern?",
                        answer: '150 active providers daily, 50 patient interactions/provider',
                        thoughtProcess: "This helps calculate the system's load and storage requirements."
                    },
                    {
                        question: "What's the peak load factor?",
                        answer: '3x during shift changes = 6 records/second',
                        thoughtProcess: 'Healthcare systems have predictable peak times during shift changes.'
                    },
                    {
                        question: 'What are the storage requirements?',
                        answer: '10MB/patient average, 500MB/patient for documents',
                        thoughtProcess:
                            'Medical records require significant storage, especially for imaging data.'
                    }
                ],
                calculations: [
                    {
                        description: 'Daily records',
                        value: '7,500 daily records',
                        note: '150 providers × 50 interactions'
                    },
                    {
                        description: 'Peak load',
                        value: '6 records/second',
                        note: '3x during shift changes'
                    },
                    {
                        description: 'Patient data storage',
                        value: '5TB total',
                        note: '10MB × 500K patients'
                    },
                    {
                        description: 'Document storage',
                        value: '250TB',
                        note: '500MB × 500K patients'
                    },
                    {
                        description: '7-year retention',
                        value: '1.75PB total',
                        note: 'HIPAA requirement'
                    }
                ],
                details: [
                    '200 providers, 150 active daily',
                    '50 patient interactions/provider/day = 7,500 daily records',
                    'Peak: 3x during shift changes = 6 records/second',
                    'Patient data: 10MB/patient average = 5TB total',
                    'Document storage: 500MB/patient = 250TB',
                    '7-year retention requirement = 1.75PB total'
                ]
            },
            A: {
                questions: [
                    {
                        question: 'What are the core operations needed?',
                        answer: 'Patient records, prescriptions, lab results, provider schedules',
                        thoughtProcess: 'Focus on essential healthcare operations first.'
                    },
                    {
                        question: 'What are the integration requirements?',
                        answer: 'HL7 FHIR compliance for interoperability',
                        thoughtProcess: 'Healthcare systems need standardized protocols for integration.'
                    },
                    {
                        question: 'What are the security requirements?',
                        answer: 'HIPAA-compliant authentication and authorization',
                        thoughtProcess: 'Security is critical for healthcare systems.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Use HL7 FHIR for healthcare integration',
                        rationale: 'Industry standard for healthcare interoperability',
                        implications: 'Requires specialized healthcare integration expertise'
                    },
                    {
                        decision: 'Implement role-based access control',
                        rationale: 'HIPAA requires strict access controls',
                        implications: 'Complex permission management system needed'
                    }
                ],
                details: [
                    'POST /patients/{id}/records - Create medical record',
                    'GET /patients/{id}/timeline - Patient history',
                    'POST /prescriptions - E-prescribing integration',
                    'GET /providers/{id}/schedule - Provider availability',
                    'POST /labs/{id}/results - Lab results integration'
                ]
            },
            D: {
                questions: [
                    {
                        question: 'What are the core entities in the system?',
                        answer: 'Patients, Providers, Medical Records, Prescriptions, Lab Results',
                        thoughtProcess: 'These form the foundation of the healthcare data model.'
                    },
                    {
                        question: 'What are the data isolation requirements?',
                        answer: 'HIPAA requires strict data isolation and audit trails',
                        thoughtProcess: 'Healthcare data requires special handling for compliance.'
                    },
                    {
                        question: 'What are the performance requirements?',
                        answer: 'Fast access to patient records, real-time lab results',
                        thoughtProcess: 'Healthcare providers need quick access to critical information.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Use PostgreSQL for transactional data',
                        rationale: 'Strong consistency, ACID compliance, encryption at rest',
                        implications: 'Need to handle scaling and replication'
                    },
                    {
                        decision: 'Separate audit trail database',
                        rationale: 'HIPAA requires comprehensive audit trails',
                        implications: 'Additional storage and processing overhead'
                    },
                    {
                        decision: 'Use Redis for session management',
                        rationale: 'Fast access to active sessions',
                        implications: 'Need to handle persistence and failover'
                    }
                ],
                details: [
                    'Patients (demographics, insurance, emergency contacts)',
                    'Providers (credentials, specialties, schedules)',
                    'Medical Records (encounters, diagnoses, treatments)',
                    'Prescriptions (medications, dosages, interactions)',
                    'Lab Results (values, ranges, alerts)',
                    'PostgreSQL for transactional data with encryption at rest',
                    'Dedicated audit trail database',
                    'Redis for session management'
                ]
            },
            E2: {
                questions: [
                    {
                        question: 'How should we structure the services?',
                        answer: 'API Gateway, EHR Service, Lab Integration, Imaging Service',
                        thoughtProcess: 'Break down by functionality and integration requirements.'
                    },
                    {
                        question: 'How should we handle high availability?',
                        answer: 'Active-active deployment across data centers',
                        thoughtProcess: 'Healthcare requires 99.9% uptime and disaster recovery.'
                    },
                    {
                        question: 'How should we handle integrations?',
                        answer: 'Dedicated integration services for lab and imaging',
                        thoughtProcess: 'Healthcare systems need reliable integration with external systems.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Active-active deployment',
                        rationale: 'Healthcare requires 99.9% uptime',
                        implications: 'Higher infrastructure costs but necessary for reliability'
                    },
                    {
                        decision: 'Separate integration services',
                        rationale: 'Isolate integration complexity',
                        implications: 'Need to handle service communication and consistency'
                    }
                ],
                details: [
                    '[Provider Portal] → [API Gateway + Auth] → [EHR Service]',
                    '[Patient Portal]                              ↓',
                    '                  → [Audit Service] ← [Medical Records DB]',
                    '[Lab Systems] → [HL7 Integration] → [Lab Results Service]',
                    '[Imaging] → [DICOM Gateway] → [Image Storage (S3)]'
                ]
            },
            R: {
                questions: [
                    {
                        question: 'What are the critical components?',
                        answer: 'Prescription drug interaction checking, lab result processing',
                        thoughtProcess: 'These are the most complex and safety-critical parts.'
                    },
                    {
                        question: 'How do we ensure patient safety?',
                        answer: 'Multi-level checking with severity scoring',
                        thoughtProcess: 'Healthcare systems must prioritize patient safety.'
                    },
                    {
                        question: 'How do we handle provider overrides?',
                        answer: 'Allow overrides with justification logging',
                        thoughtProcess: 'Providers need flexibility while maintaining audit trail.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Multi-level drug interaction checking',
                        rationale: 'Patient safety is critical',
                        implications: 'Complex algorithm with multiple validation layers'
                    },
                    {
                        decision: 'Comprehensive audit logging',
                        rationale: 'HIPAA requires detailed audit trails',
                        implications: 'Significant storage and processing overhead'
                    }
                ],
                details: [
                    'Real-time interaction database queries',
                    'Allergy cross-reference checking',
                    'Dosage validation based on patient weight/age',
                    'Integration with pharmacy benefit management',
                    'Multi-level checking with severity scoring',
                    'Automatic alerts for critical interactions',
                    'Provider override with justification logging'
                ]
            },
            S: {
                questions: [
                    {
                        question: 'How do we handle growth?',
                        answer: 'Scale by adding hospitals and providers',
                        thoughtProcess: 'Healthcare systems grow through acquisitions.'
                    },
                    {
                        question: 'What are the performance requirements?',
                        answer: 'Response time <200ms, 99.9% uptime',
                        thoughtProcess: 'Healthcare systems need reliable performance.'
                    },
                    {
                        question: 'How do we handle disaster recovery?',
                        answer: 'Active-active deployment with automatic failover',
                        thoughtProcess: 'Healthcare systems must maintain uptime.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Read replicas for reporting',
                        rationale: 'Separate reporting load from transactional data',
                        implications: 'Need to handle replication lag'
                    },
                    {
                        decision: 'CDN for medical images',
                        rationale: 'Improve image delivery performance',
                        implications: 'Need to handle image security and access control'
                    }
                ],
                details: [
                    '5x providers: Read replicas for reporting, horizontal API scaling',
                    '10x providers: Regional database sharding, CDN for medical images',
                    'Monitoring: Response time <200ms, audit trail completeness, uptime SLA'
                ]
            }
        }
    },
    {
        id: 'ecommerce-marketplace',
        name: 'Multi-Vendor E-commerce Marketplace',
        description:
            'Design a B2C marketplace for local artisans and small businesses (10K vendors, 1M products)',
        leaders: {
            L: {
                questions: [
                    {
                        question: 'What type of marketplace—B2C like Amazon or B2B like Alibaba?',
                        answer: 'B2C marketplace for local artisans and small businesses',
                        thoughtProcess: 'This defines the user base and feature requirements.'
                    },
                    {
                        question: "What's the business model—commission, subscription, or listing fees?",
                        answer: 'Commission-based model',
                        thoughtProcess: 'This affects revenue streams and vendor relationships.'
                    },
                    {
                        question: 'How many vendors and products do we expect?',
                        answer: '10K vendors, 1M products',
                        thoughtProcess: 'This helps with capacity planning and scaling strategy.'
                    },
                    {
                        question: 'What geographical markets—local, national, or international?',
                        answer: 'Focus on local/regional markets',
                        thoughtProcess: 'This affects delivery logistics and payment processing.'
                    },
                    {
                        question: 'Do we handle payments and fulfillment or just facilitate connections?',
                        answer: 'Integrated payments and logistics',
                        thoughtProcess: "This defines the scope of the platform's responsibilities."
                    }
                ],
                details: [
                    'B2C marketplace for local artisans',
                    'Commission-based model',
                    '10K vendors, 1M products',
                    'Local/regional markets',
                    'Integrated payments and logistics'
                ]
            },
            E: {
                questions: [
                    {
                        question: "What's the expected daily usage?",
                        answer: '5K active vendors, 20K daily active customers',
                        thoughtProcess: "This helps calculate the system's load and storage requirements."
                    },
                    {
                        question: "What's the expected order volume?",
                        answer: '1,000 orders/day average, 5,000 peak (holidays)',
                        thoughtProcess: 'E-commerce has seasonal patterns that affect scaling.'
                    },
                    {
                        question: 'What are the storage requirements?',
                        answer: '2MB average per product, 50KB per order',
                        thoughtProcess: 'Product images and order history require significant storage.'
                    }
                ],
                calculations: [
                    {
                        description: 'Daily active users',
                        value: '5K vendors, 20K customers',
                        note: 'Based on typical marketplace engagement'
                    },
                    {
                        description: 'Order volume',
                        value: '1,000 orders/day average',
                        note: '5,000 peak during holidays'
                    },
                    {
                        description: 'Peak traffic',
                        value: '20 orders/second',
                        note: 'During holiday season'
                    },
                    {
                        description: 'Product catalog',
                        value: '2TB total',
                        note: '1M products × 2MB average'
                    },
                    {
                        description: 'Order history',
                        value: '18GB/year',
                        note: '365K orders × 50KB'
                    }
                ],
                details: [
                    '10K vendors, 5K active daily',
                    '100K customers, 20K daily active',
                    '1,000 orders/day average, 5,000 peak (holidays)',
                    '20 orders/second peak traffic',
                    'Product catalog: 1M products × 2MB average = 2TB',
                    'Order history: 365K orders/year × 50KB = 18GB/year'
                ]
            },
            A: {
                questions: [
                    {
                        question: 'What are the core operations needed?',
                        answer: 'Product search, cart management, order processing, vendor dashboard',
                        thoughtProcess: 'Focus on essential marketplace operations first.'
                    },
                    {
                        question: 'What are the integration requirements?',
                        answer: 'Payment processing, shipping, vendor self-service',
                        thoughtProcess: 'Marketplaces need reliable third-party integrations.'
                    },
                    {
                        question: 'What are the security requirements?',
                        answer: 'PCI compliance for payments, vendor data isolation',
                        thoughtProcess: 'Marketplaces handle sensitive financial data.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Vendor self-service APIs',
                        rationale: 'Reduces support burden and empowers sellers',
                        implications: 'Need to handle API versioning and documentation'
                    },
                    {
                        decision: 'Stripe for payment processing',
                        rationale: 'Industry standard, handles compliance',
                        implications: 'Need to handle webhooks and reconciliation'
                    }
                ],
                details: [
                    'GET /products/search - Product discovery with filters',
                    'POST /cart/{id}/items - Shopping cart management',
                    'POST /orders - Order placement and processing',
                    'GET /vendors/{id}/dashboard - Vendor analytics',
                    'POST /payments/process - Payment processing',
                    'GET /orders/{id}/tracking - Order tracking'
                ]
            },
            D: {
                questions: [
                    {
                        question: 'What are the core entities in the system?',
                        answer: 'Vendors, Products, Customers, Orders, Reviews',
                        thoughtProcess: 'These form the foundation of the marketplace data model.'
                    },
                    {
                        question: 'What are the search requirements?',
                        answer: 'Full-text search with filters, relevance ranking',
                        thoughtProcess: 'Product discovery is crucial for marketplace success.'
                    },
                    {
                        question: 'What are the data isolation requirements?',
                        answer: 'Vendor data isolation, customer data protection',
                        thoughtProcess: 'Marketplaces need strong data isolation between vendors.'
                    }
                ],
                decisions: [
                    {
                        decision: 'PostgreSQL for transactional data',
                        rationale: 'Strong consistency, ACID compliance',
                        implications: 'Need to handle scaling and replication'
                    },
                    {
                        decision: 'Elasticsearch for product search',
                        rationale: 'Powerful full-text search capabilities',
                        implications: 'Need to handle data synchronization'
                    },
                    {
                        decision: 'Redis for cart sessions',
                        rationale: 'Fast access to active carts',
                        implications: 'Need to handle persistence and failover'
                    }
                ],
                details: [
                    'Vendors (business info, payment details, ratings)',
                    'Products (catalog, inventory, pricing, images)',
                    'Customers (profiles, addresses, payment methods)',
                    'Orders (items, payment, fulfillment status)',
                    'Reviews (ratings, comments, verification)',
                    'PostgreSQL for transactional data',
                    'Elasticsearch for product search',
                    'Redis for cart sessions',
                    'S3 for product images'
                ]
            },
            E2: {
                questions: [
                    {
                        question: 'How should we structure the services?',
                        answer: 'API Gateway, Product Service, Order Service, Vendor Service',
                        thoughtProcess: 'Break down by functionality and scaling needs.'
                    },
                    {
                        question: 'How should we handle vendor isolation?',
                        answer: 'Multi-tenant architecture with data isolation',
                        thoughtProcess: 'Each vendor needs their own secure environment.'
                    },
                    {
                        question: 'How should we handle payments?',
                        answer: 'Stripe integration with webhook processing',
                        thoughtProcess: 'Payment processing needs to be reliable and secure.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Multi-tenant architecture',
                        rationale: 'Each vendor feels like they have their own platform',
                        implications: 'Need to handle data isolation and scaling'
                    },
                    {
                        decision: 'Separate search service',
                        rationale: 'Product search is our core differentiator',
                        implications: 'Need to handle search relevance and performance'
                    }
                ],
                details: [
                    '[Web/Mobile] → [CDN] → [Load Balancer] → [API Gateway]',
                    '                                              ↓',
                    '[Product Service] ← [Search Service (Elasticsearch)]',
                    '[Order Service] ← [Payment Service (Stripe)]',
                    '[Vendor Service] ← [Notification Service]',
                    '        ↓                    ↓',
                    '[PostgreSQL] → [Analytics DB] → [Vendor Dashboard]'
                ]
            },
            R: {
                questions: [
                    {
                        question: 'What are the critical components?',
                        answer: 'Real-time inventory management, payment processing',
                        thoughtProcess: 'These are the most complex and business-critical parts.'
                    },
                    {
                        question: 'How do we ensure inventory accuracy?',
                        answer: 'Optimistic locking with inventory reservations',
                        thoughtProcess: 'Prevent overselling while maintaining performance.'
                    },
                    {
                        question: 'How do we handle concurrent orders?',
                        answer: 'Event-driven updates with eventual consistency',
                        thoughtProcess: 'Balance consistency with performance.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Optimistic locking for inventory',
                        rationale: 'Prevent overselling while maintaining performance',
                        implications: 'Need to handle conflict resolution'
                    },
                    {
                        decision: 'Event-driven architecture',
                        rationale: 'Handle high concurrency and real-time updates',
                        implications: 'Need to handle event ordering and consistency'
                    }
                ],
                details: [
                    'Concurrent order processing without overselling',
                    'Vendor inventory updates during active shopping',
                    'Reserved inventory during checkout process',
                    'Automatic restock notifications',
                    'Optimistic locking with inventory reservations',
                    'Event-driven updates',
                    'Eventual consistency for non-critical data'
                ]
            },
            S: {
                questions: [
                    {
                        question: 'How do we handle growth?',
                        answer: 'Scale by adding vendors and products',
                        thoughtProcess: 'Marketplaces grow through vendor acquisition.'
                    },
                    {
                        question: 'What are the performance requirements?',
                        answer: 'Fast search, reliable payments, responsive vendor dashboard',
                        thoughtProcess: 'User experience is crucial for marketplace success.'
                    },
                    {
                        question: 'How do we handle seasonal peaks?',
                        answer: 'Auto-scaling with cost optimization during low periods',
                        thoughtProcess: 'E-commerce has predictable seasonal patterns.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Product catalog sharding',
                        rationale: 'Handle growing product catalog',
                        implications: 'Need to handle cross-shard queries'
                    },
                    {
                        decision: 'Geographic CDN distribution',
                        rationale: 'Improve global performance',
                        implications: 'Need to handle cache invalidation'
                    }
                ],
                details: [
                    '10x vendors: Product catalog sharding by category, dedicated search clusters',
                    '100x traffic: Geographic CDN distribution, database read replicas, auto-scaling API services',
                    'Monitoring: Search response time, conversion rates, payment success rates, vendor dashboard performance'
                ]
            }
        }
    },
    {
        id: 'traffic-management',
        name: 'Smart City Traffic Management System',
        description:
            'Design a traffic management system for a metropolitan area (2M population, 500K vehicles, 2,000 intersections)',
        leaders: {
            L: {
                questions: [
                    {
                        question: 'What size city—small town, metropolitan area, or mega-city?',
                        answer: 'Metropolitan area (2M population)',
                        thoughtProcess: 'This defines the scale and complexity of the system.'
                    },
                    {
                        question:
                            "What's the primary goal—congestion reduction, emergency response, or environmental impact?",
                        answer: 'Focus on congestion reduction and emergency response',
                        thoughtProcess: 'Multiple goals require different system priorities.'
                    },
                    {
                        question: 'What data sources do we have—traffic sensors, cameras, GPS data?',
                        answer: 'Traffic sensors, cameras, and vehicle GPS data',
                        thoughtProcess: 'Data sources affect system capabilities and accuracy.'
                    },
                    {
                        question:
                            'Do we need real-time control of traffic lights or just monitoring/analytics?',
                        answer: 'Real-time traffic light control required',
                        thoughtProcess: 'Real-time control requires more complex architecture.'
                    },
                    {
                        question:
                            "What's the integration requirement with emergency services and public transit?",
                        answer: 'Integration with police/fire/ambulance dispatch',
                        thoughtProcess: 'Emergency services need priority access.'
                    }
                ],
                details: [
                    'Metropolitan area (2M population)',
                    '500K vehicles, 2,000 intersections',
                    'Focus on congestion reduction and emergency response',
                    'Real-time traffic light control',
                    'Integration with emergency services'
                ]
            },
            E: {
                questions: [
                    {
                        question: "What's the expected data volume?",
                        answer: '2,000 intersections × 5-second updates',
                        thoughtProcess: "This helps calculate the system's load and storage requirements."
                    },
                    {
                        question: "What's the expected vehicle data?",
                        answer: '100K connected vehicles × 30-second updates',
                        thoughtProcess: 'Vehicle data provides real-time traffic patterns.'
                    },
                    {
                        question: 'What are the storage requirements?',
                        answer: '2TB/day video storage, 5-year retention',
                        thoughtProcess: 'Traffic cameras generate significant data.'
                    }
                ],
                calculations: [
                    {
                        description: 'Intersection updates',
                        value: '400 updates/second',
                        note: '2,000 intersections × 5-second updates'
                    },
                    {
                        description: 'Vehicle updates',
                        value: '3,333 updates/second',
                        note: '100K vehicles × 30-second updates'
                    },
                    {
                        description: 'Video storage',
                        value: '2TB/day',
                        note: '500 cameras × 720p × 24/7'
                    },
                    {
                        description: 'Historical data',
                        value: '3.6PB total',
                        note: '5 years retention'
                    },
                    {
                        description: 'Real-time processing',
                        value: '4,000 data points/second peak',
                        note: 'Combined sensor and vehicle data'
                    }
                ],
                details: [
                    '2,000 smart intersections sending data every 5 seconds = 400 updates/second',
                    '100K connected vehicles sending GPS data every 30 seconds = 3,333 updates/second',
                    'Traffic cameras: 500 cameras × 720p × 24/7 = 2TB/day video storage',
                    'Historical data: 5 years retention = 3.6PB total',
                    'Real-time processing: 4,000 data points/second peak'
                ]
            },
            A: {
                questions: [
                    {
                        question: 'What are the core operations needed?',
                        answer: 'Traffic data ingestion, signal control, incident management',
                        thoughtProcess: 'Focus on essential traffic management operations.'
                    },
                    {
                        question: 'What are the real-time requirements?',
                        answer: 'Millisecond response for emergency routing',
                        thoughtProcess: 'Emergency services need immediate response.'
                    },
                    {
                        question: 'What are the security requirements?',
                        answer: 'Secure access for emergency services, public API',
                        thoughtProcess: 'Different security models for different users.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Separate emergency services API',
                        rationale: 'Guaranteed access during system failures',
                        implications: 'Need to handle failover and redundancy'
                    },
                    {
                        decision: 'Public API for traffic conditions',
                        rationale: 'Enable third-party applications',
                        implications: 'Need to handle rate limiting and security'
                    }
                ],
                details: [
                    'POST /sensors/{id}/data - Traffic sensor data ingestion',
                    'GET /traffic/conditions - Real-time traffic conditions',
                    'POST /incidents/report - Incident reporting and response',
                    'PUT /signals/{id}/timing - Traffic light control',
                    'GET /analytics/congestion - Traffic pattern analytics',
                    'POST /emergency/priority - Emergency vehicle routing'
                ]
            },
            D: {
                questions: [
                    {
                        question: 'What are the core entities in the system?',
                        answer: 'Intersections, Vehicles, Incidents, Traffic Patterns',
                        thoughtProcess: 'These form the foundation of the traffic management data model.'
                    },
                    {
                        question: 'What are the data patterns?',
                        answer: 'Time-series data for sensors, real-time vehicle data',
                        thoughtProcess: 'Traffic data has specific patterns and requirements.'
                    },
                    {
                        question: 'What are the query patterns?',
                        answer: 'Real-time queries for current conditions, historical analysis',
                        thoughtProcess: 'Different types of queries need different optimizations.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Time-series database (InfluxDB)',
                        rationale: 'Optimized for sensor data patterns',
                        implications: 'Need to handle data retention and aggregation'
                    },
                    {
                        decision: 'Apache Kafka for event streaming',
                        rationale: 'Handle high-volume real-time data',
                        implications: 'Need to handle message ordering and persistence'
                    },
                    {
                        decision: 'Redis for real-time state',
                        rationale: 'Fast access to current conditions',
                        implications: 'Need to handle persistence and failover'
                    }
                ],
                details: [
                    'Intersections (location, signal configurations, sensors)',
                    'Vehicles (anonymous IDs, routes, speeds, types)',
                    'Incidents (location, severity, response status)',
                    'Traffic Patterns (historical flows, predictions)',
                    'Emergency Events (type, priority, routing requirements)',
                    'Time-series database (InfluxDB) for sensor data',
                    'PostgreSQL for configuration',
                    'Redis for real-time state',
                    'Apache Kafka for event streaming'
                ]
            },
            E2: {
                questions: [
                    {
                        question: 'How should we structure the services?',
                        answer: 'IoT Gateway, Real-time Processor, Traffic Control',
                        thoughtProcess: 'Break down by functionality and real-time requirements.'
                    },
                    {
                        question: 'How should we handle real-time processing?',
                        answer: 'Kafka Streams for real-time data processing',
                        thoughtProcess: 'Real-time systems need efficient data processing.'
                    },
                    {
                        question: 'How should we handle edge computing?',
                        answer: 'Local processing at intersections',
                        thoughtProcess: 'Edge computing reduces latency and bandwidth.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Kafka Streams for real-time processing',
                        rationale: 'Handle high-volume data streams',
                        implications: 'Need to handle stream processing and state management'
                    },
                    {
                        decision: 'Edge computing at intersections',
                        rationale: 'Reduce latency and bandwidth',
                        implications: 'Need to handle edge device management and updates'
                    }
                ],
                details: [
                    '[Traffic Sensors] → [IoT Gateway] → [Kafka Streams] → [Real-time Processor]',
                    '[Vehicle GPS]                                              ↓',
                    '[Traffic Cameras] → [Video Analytics] → [Incident Detection] → [Alert System]',
                    '                                              ↓                    ↓',
                    '[Emergency Dispatch] ← [Traffic Control] ← [InfluxDB] → [Analytics Engine]',
                    '        ↓                    ↓                           ↓',
                    '[Mobile Apps] ← [Public API] ← [PostgreSQL] → [Dashboard]'
                ]
            },
            R: {
                questions: [
                    {
                        question: 'What are the critical components?',
                        answer: 'Emergency vehicle routing, traffic signal control',
                        thoughtProcess: 'These are the most complex and safety-critical parts.'
                    },
                    {
                        question: 'How do we ensure emergency response?',
                        answer: 'Real-time signal preemption and route optimization',
                        thoughtProcess: 'Emergency vehicles need priority access.'
                    },
                    {
                        question: 'How do we handle multiple emergency vehicles?',
                        answer: 'Distributed coordination between intersections',
                        thoughtProcess: 'Multiple vehicles need coordinated priority.'
                    }
                ],
                decisions: [
                    {
                        decision: "Dijkstra's algorithm with dynamic weights",
                        rationale: 'Optimize routes based on current conditions',
                        implications: 'Need to handle real-time weight updates'
                    },
                    {
                        decision: 'Distributed intersection coordination',
                        rationale: 'Handle multiple emergency vehicles',
                        implications: 'Need to handle distributed consensus'
                    }
                ],
                details: [
                    'Real-time traffic signal preemption',
                    'Dynamic route optimization based on current conditions',
                    'Coordination between multiple emergency vehicles',
                    'Automatic restoration of normal traffic patterns',
                    "Dijkstra's algorithm with dynamic weights",
                    'Signal timing optimization',
                    'Distributed coordination between intersection controllers'
                ]
            },
            S: {
                questions: [
                    {
                        question: 'How do we handle growth?',
                        answer: 'Scale by adding intersections and districts',
                        thoughtProcess: 'Traffic systems grow with city expansion.'
                    },
                    {
                        question: 'What are the performance requirements?',
                        answer: 'Response time <100ms for emergency routing',
                        thoughtProcess: 'Emergency services need immediate response.'
                    },
                    {
                        question: 'How do we handle disaster recovery?',
                        answer: '24/7 operations team and disaster recovery planning',
                        thoughtProcess: 'Traffic systems are critical infrastructure.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Geographic partitioning by districts',
                        rationale: 'Handle city-wide expansion',
                        implications: 'Need to handle cross-district coordination'
                    },
                    {
                        decision: 'Edge computing at intersections',
                        rationale: 'Reduce latency and bandwidth',
                        implications: 'Need to handle edge device management'
                    }
                ],
                details: [
                    'City-wide expansion: Geographic partitioning by districts, edge computing at intersections',
                    'Regional network: Federation with neighboring cities, standardized data exchange protocols',
                    'Monitoring: Response time <100ms for emergency routing, 99.99% uptime for critical intersections'
                ]
            }
        }
    },
    {
        id: 'digital-banking',
        name: 'Digital Banking Platform',
        description:
            'Design a digital-first consumer banking platform for a mid-size regional bank (500K customers, $2B assets)',
        leaders: {
            L: {
                questions: [
                    {
                        question:
                            'What type of banking—full-service digital bank, neobank, or traditional bank going digital?',
                        answer: 'Digital-first consumer banking platform for mid-size regional bank',
                        thoughtProcess: 'This defines the scope and complexity of the system.'
                    },
                    {
                        question: "What's the primary focus—consumer banking, business banking, or both?",
                        answer: 'Focus on consumer banking with mobile-first experience',
                        thoughtProcess: 'This affects feature prioritization and user experience.'
                    },
                    {
                        question: 'What regulatory requirements—PCI DSS, SOX, regional banking regulations?',
                        answer: 'PCI DSS, SOX, FFIEC guidelines compliance required',
                        thoughtProcess: 'Compliance requirements significantly impact architecture.'
                    },
                    {
                        question: "Do we need real-time fraud detection and what's our risk tolerance?",
                        answer: 'Real-time fraud detection required with <100ms response time',
                        thoughtProcess: 'Fraud detection is critical for banking systems.'
                    },
                    {
                        question:
                            'Integration requirements with existing core banking systems or building from scratch?',
                        answer: 'Integration with existing core banking systems required',
                        thoughtProcess: 'This affects system architecture and data flow.'
                    }
                ],
                details: [
                    'Digital-first consumer banking platform',
                    '500K customers, $2B assets',
                    'Mobile-first experience',
                    'Real-time payments and fraud detection',
                    'PCI DSS, SOX, FFIEC compliance'
                ]
            },
            E: {
                questions: [
                    {
                        question: "What's the expected daily usage?",
                        answer: '200K monthly active users, 50K daily transactions',
                        thoughtProcess: "This helps calculate the system's load and storage requirements."
                    },
                    {
                        question: "What's the peak load factor?",
                        answer: '70 transactions/second during peak (paydays)',
                        thoughtProcess: 'Banking systems have predictable peak times.'
                    },
                    {
                        question: 'What are the storage requirements?',
                        answer: '1KB per transaction, 10KB per customer account',
                        thoughtProcess: 'Financial data requires significant storage and retention.'
                    }
                ],
                calculations: [
                    {
                        description: 'Daily transactions',
                        value: '50K daily, 200K peak (paydays)',
                        note: 'Based on typical banking patterns'
                    },
                    {
                        description: 'Peak load',
                        value: '70 transactions/second',
                        note: 'During payday periods'
                    },
                    {
                        description: 'Transaction data',
                        value: '18GB/year',
                        note: '1KB × 18M transactions/year'
                    },
                    {
                        description: 'Account data',
                        value: '5GB total',
                        note: '10KB × 500K customers'
                    },
                    {
                        description: '10-year retention',
                        value: '180GB + regulatory archives',
                        note: 'Compliance requirement'
                    }
                ],
                details: [
                    '500K customers, 200K monthly active users',
                    '50K daily transactions, 200K during peak (paydays)',
                    'Peak: 70 transactions/second',
                    'Transaction data: 1KB average × 18M/year = 18GB/year',
                    'Account data: 10KB/customer = 5GB total',
                    '10-year retention = 180GB + regulatory archives',
                    'Real-time fraud scoring: <100ms response time requirement'
                ]
            },
            A: {
                questions: [
                    {
                        question: 'What are the core operations needed?',
                        answer: 'Account management, transactions, fraud detection, KYC',
                        thoughtProcess: 'Focus on essential banking operations first.'
                    },
                    {
                        question: 'What are the security requirements?',
                        answer: 'PCI DSS compliance, encryption, audit trails',
                        thoughtProcess: 'Banking systems require high security.'
                    },
                    {
                        question: 'What are the integration requirements?',
                        answer: 'Core banking systems, payment networks, KYC providers',
                        thoughtProcess: 'Banking systems need reliable integrations.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Idempotent API design',
                        rationale: 'Prevent duplicate transactions',
                        implications: 'Need to handle transaction deduplication'
                    },
                    {
                        decision: 'Real-time fraud detection',
                        rationale: 'Prevent fraudulent transactions',
                        implications: 'Need low-latency processing'
                    }
                ],
                details: [
                    'POST /accounts/{id}/transactions - Fund transfers and payments',
                    'GET /accounts/{id}/balance - Real-time balance inquiry',
                    'POST /loans/applications - Loan origination workflow',
                    'GET /transactions/history - Transaction history with filtering',
                    'POST /fraud/score - Real-time fraud detection',
                    'PUT /profiles/{id}/kyc - Know Your Customer updates'
                ]
            },
            D: {
                questions: [
                    {
                        question: 'What are the core entities in the system?',
                        answer: 'Customers, Accounts, Transactions, Fraud Patterns',
                        thoughtProcess: 'These form the foundation of the banking data model.'
                    },
                    {
                        question: 'What are the data isolation requirements?',
                        answer: 'PCI DSS requires strict data isolation',
                        thoughtProcess: 'Financial data requires special handling.'
                    },
                    {
                        question: 'What are the performance requirements?',
                        answer: 'Real-time balance updates, fast fraud detection',
                        thoughtProcess: 'Banking systems need reliable performance.'
                    }
                ],
                decisions: [
                    {
                        decision: 'PostgreSQL for transactional data',
                        rationale: 'ACID compliance, encryption at rest',
                        implications: 'Need to handle scaling and replication'
                    },
                    {
                        decision: 'Redis for fraud scoring',
                        rationale: 'Fast access to fraud patterns',
                        implications: 'Need to handle persistence and failover'
                    },
                    {
                        decision: 'Immutable ledger for audit trails',
                        rationale: 'Regulatory compliance requirement',
                        implications: 'Significant storage overhead'
                    }
                ],
                details: [
                    'Customers (KYC data, risk profiles, authentication)',
                    'Accounts (checking, savings, loans, investment)',
                    'Transactions (debits, credits, holds, reversals)',
                    'Fraud Patterns (rules, scores, historical behavior)',
                    'Regulatory Reports (compliance data, audit trails)',
                    'PostgreSQL with ACID compliance for transactions',
                    'Encrypted data warehouse for analytics',
                    'Redis for fraud scoring cache',
                    'Immutable ledger for audit trails'
                ]
            },
            E2: {
                questions: [
                    {
                        question: 'How should we structure the services?',
                        answer: 'API Gateway, Banking Services, Fraud Detection',
                        thoughtProcess: 'Break down by functionality and security requirements.'
                    },
                    {
                        question: 'How should we handle security?',
                        answer: 'Zero-trust architecture with air-gapped environments',
                        thoughtProcess: 'Banking requires high security.'
                    },
                    {
                        question: 'How should we handle integrations?',
                        answer: 'Secure API gateways with rate limiting',
                        thoughtProcess: 'External integrations need security.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Zero-trust architecture',
                        rationale: 'Security is foundational',
                        implications: 'Complex authentication and authorization'
                    },
                    {
                        decision: 'Air-gapped environments',
                        rationale: 'Prevent unauthorized access',
                        implications: 'Need to handle data synchronization'
                    }
                ],
                details: [
                    '[Mobile App] → [WAF] → [API Gateway + OAuth] → [Banking Services]',
                    '[Web Portal]              ↓                        ↓',
                    '                [Fraud Detection] ← [Transaction Engine] → [Core Banking]',
                    '                        ↓                    ↓                ↓',
                    '[Regulatory Reports] ← [Audit Trail] ← [Encrypted DB] → [Payment Rails]',
                    '        ↓                                   ↓              ↓',
                    '[Compliance Dashboard] ← [Analytics] ← [Data Warehouse] → [ACH/Wire/RTP]'
                ]
            },
            R: {
                questions: [
                    {
                        question: 'What are the critical components?',
                        answer: 'Real-time fraud detection, transaction processing',
                        thoughtProcess: 'These are the most complex and security-critical parts.'
                    },
                    {
                        question: 'How do we ensure fraud detection accuracy?',
                        answer: 'Machine learning models with multiple data sources',
                        thoughtProcess: 'Fraud detection needs to be accurate and fast.'
                    },
                    {
                        question: 'How do we handle model updates?',
                        answer: 'Automatic retraining with accuracy monitoring',
                        thoughtProcess: 'Models need to stay current.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Ensemble ML models',
                        rationale: 'Improve forecast accuracy',
                        implications: 'Need ML expertise and training data'
                    },
                    {
                        decision: 'Real-time prediction serving',
                        rationale: 'Enable real-time forecasting',
                        implications: 'Need to handle model versioning'
                    }
                ],
                details: [
                    'Machine learning models using historical sales data',
                    'External factor integration (weather, events, trends)',
                    'Multi-level forecasting (SKU, category, region)',
                    'Automatic model retraining and accuracy monitoring',
                    'Time series forecasting with ARIMA and LSTM neural networks',
                    'Feature engineering from multiple data sources',
                    'Ensemble models for accuracy',
                    'Real-time prediction serving with model versioning'
                ]
            },
            S: {
                questions: [
                    {
                        question: 'How do we handle growth?',
                        answer: 'Scale by adding customers and transaction volume',
                        thoughtProcess: 'Banking systems grow with customer base.'
                    },
                    {
                        question: 'What are the performance requirements?',
                        answer: '99.99% transaction success, <200ms API response',
                        thoughtProcess: 'Banking systems need reliable performance.'
                    },
                    {
                        question: 'How do we handle regulatory reporting?',
                        answer: 'Dedicated compliance engineering team',
                        thoughtProcess: 'Regulatory requirements increase with scale.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Database sharding by customer segments',
                        rationale: 'Handle growing transaction volume',
                        implications: 'Need to handle cross-shard transactions'
                    },
                    {
                        decision: 'Dedicated fraud detection cluster',
                        rationale: 'Scale fraud detection independently',
                        implications: 'Need to handle data synchronization'
                    }
                ],
                details: [
                    '2x customers: Read replicas for reporting, horizontal API scaling with sticky sessions',
                    '10x transaction volume: Database sharding by customer segments, dedicated fraud detection cluster',
                    'Monitoring: Transaction success rate 99.99%, fraud detection accuracy >95%, API response time <200ms'
                ]
            }
        }
    },
    {
        id: 'lms',
        name: 'Learning Management System (EdTech)',
        description:
            'Design an LMS for higher education institutions (50 universities, 500K students, 25K faculty)',
        leaders: {
            L: {
                questions: [
                    {
                        question: 'What educational level—K-12, higher education, or corporate training?',
                        answer: 'Higher education institutions',
                        thoughtProcess: 'This defines the user base and feature requirements.'
                    },
                    {
                        question:
                            "What's the primary goal—remote learning, hybrid education, or skill certification?",
                        answer: 'Focus on hybrid learning with real-time collaboration',
                        thoughtProcess: 'This affects feature prioritization and user experience.'
                    },
                    {
                        question: 'How many students, instructors, and institutions?',
                        answer: '50 universities, 500K students, 25K faculty',
                        thoughtProcess: 'This helps with capacity planning and scaling strategy.'
                    },
                    {
                        question: 'Do we need real-time collaboration tools like virtual classrooms?',
                        answer: 'Yes, real-time collaboration required',
                        thoughtProcess: 'This affects system architecture and bandwidth requirements.'
                    },
                    {
                        question: 'What compliance requirements—FERPA, COPPA, accessibility standards?',
                        answer: 'FERPA compliance required for student privacy',
                        thoughtProcess: 'Compliance requirements affect data handling.'
                    }
                ],
                details: [
                    'Higher education institutions',
                    '50 universities, 500K students, 25K faculty',
                    'Hybrid learning focus',
                    'Real-time collaboration tools',
                    'FERPA compliance required'
                ]
            },
            E: {
                questions: [
                    {
                        question: "What's the expected daily usage?",
                        answer: '300K active students during semester',
                        thoughtProcess: "This helps calculate the system's load and storage requirements."
                    },
                    {
                        question: "What's the peak load factor?",
                        answer: '100K concurrent users during exam periods',
                        thoughtProcess: 'Education systems have predictable peak times.'
                    },
                    {
                        question: 'What are the storage requirements?',
                        answer: '1GB per course, 500MB per hour of video',
                        thoughtProcess: 'Educational content requires significant storage.'
                    }
                ],
                calculations: [
                    {
                        description: 'Active users',
                        value: '300K students, 20K faculty daily',
                        note: 'During semester'
                    },
                    {
                        description: 'Peak concurrent users',
                        value: '100K during exam periods',
                        note: '5x normal load'
                    },
                    {
                        description: 'Course content',
                        value: '10TB total',
                        note: '1GB × 10K courses'
                    },
                    {
                        description: 'Video lectures',
                        value: '25TB total',
                        note: '500MB × 50K hours'
                    },
                    {
                        description: 'Student submissions',
                        value: '50TB per semester',
                        note: '100MB × 500K students'
                    }
                ],
                details: [
                    '500K students, 300K active during semester',
                    '25K faculty, 20K active daily',
                    'Peak concurrent users: 100K (during exam periods)',
                    'Course content: 1GB/course × 10K courses = 10TB',
                    'Video lectures: 500MB/hour × 50K hours = 25TB',
                    'Student submissions: 100MB/student/semester = 50TB/semester',
                    '5-year retention = 200TB total'
                ]
            },
            A: {
                questions: [
                    {
                        question: 'What are the core operations needed?',
                        answer: 'Course management, assignments, grades, discussions',
                        thoughtProcess: 'Focus on essential educational operations.'
                    },
                    {
                        question: 'What are the real-time requirements?',
                        answer: 'Virtual classrooms, live discussions',
                        thoughtProcess: 'Real-time features need special handling.'
                    },
                    {
                        question: 'What are the security requirements?',
                        answer: 'FERPA compliance, role-based access',
                        thoughtProcess: 'Student data requires protection.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Role-based access control',
                        rationale: 'Different permissions for different roles',
                        implications: 'Complex permission management'
                    },
                    {
                        decision: 'Real-time collaboration APIs',
                        rationale: 'Enable virtual classrooms',
                        implications: 'Need to handle WebRTC and scaling'
                    }
                ],
                details: [
                    'GET /courses/{id}/content - Course material delivery',
                    'POST /assignments/{id}/submissions - Student assignment uploads',
                    'GET /grades/{student_id} - Grade book access',
                    'POST /discussions/{id}/posts - Course discussion forums',
                    'PUT /courses/{id}/live - Virtual classroom sessions',
                    'GET /analytics/engagement - Learning analytics'
                ]
            },
            D: {
                questions: [
                    {
                        question: 'What are the core entities in the system?',
                        answer: 'Users, Courses, Assignments, Content',
                        thoughtProcess: 'These form the foundation of the LMS data model.'
                    },
                    {
                        question: 'What are the data isolation requirements?',
                        answer: 'FERPA requires strict data isolation',
                        thoughtProcess: 'Student data requires special handling.'
                    },
                    {
                        question: 'What are the content requirements?',
                        answer: 'Flexible content types, version control',
                        thoughtProcess: 'Educational content needs flexibility.'
                    }
                ],
                decisions: [
                    {
                        decision: 'PostgreSQL for transactional data',
                        rationale: 'Strong consistency, ACID compliance',
                        implications: 'Need to handle scaling and replication'
                    },
                    {
                        decision: 'MongoDB for content storage',
                        rationale: 'Flexible schema for different content types',
                        implications: 'Need to handle data consistency'
                    },
                    {
                        decision: 'Redis for session management',
                        rationale: 'Fast access to active sessions',
                        implications: 'Need to handle persistence and failover'
                    }
                ],
                details: [
                    'Users (students, faculty, staff with institutional roles)',
                    'Courses (content, schedules, enrollment, prerequisites)',
                    'Assignments (descriptions, rubrics, submissions, grades)',
                    'Content (lectures, readings, multimedia, assessments)',
                    'Analytics (engagement, performance, learning outcomes)',
                    'PostgreSQL for transactional data',
                    'MongoDB for flexible content storage',
                    'Redis for session management',
                    'CDN for video content delivery'
                ]
            },
            E2: {
                questions: [
                    {
                        question: 'How should we structure the services?',
                        answer: 'API Gateway, LMS Core, Content Delivery',
                        thoughtProcess: 'Break down by functionality and scaling needs.'
                    },
                    {
                        question: 'How should we handle real-time features?',
                        answer: 'WebRTC for video, WebSocket for chat',
                        thoughtProcess: 'Real-time features need special architecture.'
                    },
                    {
                        question: 'How should we handle offline access?',
                        answer: 'Progressive Web App with sync',
                        thoughtProcess: 'Students need offline access.'
                    }
                ],
                decisions: [
                    {
                        decision: 'WebRTC for video conferencing',
                        rationale: 'Enable virtual classrooms',
                        implications: 'Need to handle bandwidth and scaling'
                    },
                    {
                        decision: 'Progressive Web App',
                        rationale: 'Enable offline access',
                        implications: 'Need to handle data synchronization'
                    }
                ],
                details: [
                    '[Student Portal] → [Load Balancer] → [API Gateway + SSO] → [LMS Core]',
                    '[Faculty Portal]                                              ↓',
                    '[Mobile App] → [CDN] → [Content Delivery] ← [Course Engine] → [Grade Book]',
                    '                                ↓                ↓              ↓',
                    '[Video Platform] ← [Live Sessions] ← [Collaboration] → [Analytics Engine]',
                    '        ↓                  ↓              ↓              ↓',
                    '[Storage] ← [Assignment Engine] ← [PostgreSQL] → [Reporting]'
                ]
            },
            R: {
                questions: [
                    {
                        question: 'What are the critical components?',
                        answer: 'Virtual classroom, assignment submission',
                        thoughtProcess: 'These are the most complex and user-critical parts.'
                    },
                    {
                        question: 'How do we ensure video quality?',
                        answer: 'Adaptive bitrate streaming, SFU architecture',
                        thoughtProcess: 'Video quality affects learning experience.'
                    },
                    {
                        question: 'How do we handle engagement?',
                        answer: 'Interactive features, analytics tracking',
                        thoughtProcess: 'Engagement is crucial for learning.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Selective forwarding unit (SFU)',
                        rationale: 'Scale video conferencing',
                        implications: 'Need to handle bandwidth and server resources'
                    },
                    {
                        decision: 'Adaptive bitrate streaming',
                        rationale: 'Handle varying network conditions',
                        implications: 'Need to handle multiple quality levels'
                    }
                ],
                details: [
                    'Video conferencing with screen sharing',
                    'Interactive whiteboard and breakout rooms',
                    'Real-time chat and Q&A management',
                    'Recording and playback functionality',
                    'Attendance tracking and engagement metrics',
                    'WebRTC for peer-to-peer video',
                    'Selective forwarding unit (SFU) for scalability',
                    'Adaptive bitrate streaming',
                    'Automatic recording with cloud storage'
                ]
            },
            S: {
                questions: [
                    {
                        question: 'How do we handle growth?',
                        answer: 'Scale by adding institutions and students',
                        thoughtProcess: 'Education systems grow with institutions.'
                    },
                    {
                        question: 'What are the performance requirements?',
                        answer: 'Fast video delivery, reliable assignment submission',
                        thoughtProcess: 'User experience is crucial for learning.'
                    },
                    {
                        question: 'How do we handle global expansion?',
                        answer: 'Regional CDNs, timezone-aware scheduling',
                        thoughtProcess: 'Global access needs special handling.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Multi-tenancy with data isolation',
                        rationale: 'Handle multiple institutions',
                        implications: 'Need to handle data separation'
                    },
                    {
                        decision: 'Regional CDNs',
                        rationale: 'Improve global performance',
                        implications: 'Need to handle content distribution'
                    }
                ],
                details: [
                    'Institution growth: Multi-tenancy with institutional data isolation, federated authentication',
                    'Global expansion: Regional content delivery networks, timezone-aware scheduling',
                    'Monitoring: Video quality metrics, assignment submission success rates, user engagement analytics'
                ]
            }
        }
    },
    {
        id: 'supply-chain',
        name: 'Supply Chain Management Platform',
        description:
            'Design a supply chain visibility platform for a mid-size manufacturer (500 suppliers, 50 facilities worldwide, 10K SKUs)',
        leaders: {
            L: {
                questions: [
                    {
                        question: 'What type of supply chain—manufacturing, retail, or logistics/3PL?',
                        answer: 'Manufacturing supply chain',
                        thoughtProcess: 'This defines the scope and complexity of the system.'
                    },
                    {
                        question: "What's the primary goal—cost optimization, visibility, or risk management?",
                        answer: 'Focus on real-time tracking, demand forecasting, and risk management',
                        thoughtProcess: 'This affects feature prioritization and system design.'
                    },
                    {
                        question: 'How many suppliers, facilities, and SKUs do we need to track?',
                        answer: '500 suppliers, 50 facilities, 10K SKUs',
                        thoughtProcess: 'This helps with capacity planning and scaling strategy.'
                    },
                    {
                        question: 'Do we need real-time tracking or is batch processing sufficient?',
                        answer: 'Real-time tracking required',
                        thoughtProcess: 'This affects system architecture and data processing.'
                    },
                    {
                        question:
                            'What integration requirements with ERP, WMS, and external logistics providers?',
                        answer: 'Integration with SAP ERP and multiple logistics providers',
                        thoughtProcess: 'This affects system architecture and data flow.'
                    }
                ],
                details: [
                    'Manufacturing supply chain',
                    '500 suppliers, 50 facilities worldwide',
                    '10K SKUs to track',
                    'Real-time tracking and forecasting',
                    'SAP ERP integration'
                ]
            },
            E: {
                questions: [
                    {
                        question: "What's the expected data volume?",
                        answer: '3K supplier updates/day, 200 facility updates/minute',
                        thoughtProcess: "This helps calculate the system's load and storage requirements."
                    },
                    {
                        question: "What's the expected tracking volume?",
                        answer: '1K shipments/day × 10 tracking events',
                        thoughtProcess: 'This affects real-time processing requirements.'
                    },
                    {
                        question: 'What are the storage requirements?',
                        answer: '3 years of historical data, 4M events/year',
                        thoughtProcess: 'Supply chain data requires significant storage.'
                    }
                ],
                calculations: [
                    {
                        description: 'Supplier updates',
                        value: '3K updates/day',
                        note: '500 suppliers × 4-hour updates'
                    },
                    {
                        description: 'Facility updates',
                        value: '200 updates/minute',
                        note: '50 facilities with real-time inventory'
                    },
                    {
                        description: 'Inventory records',
                        value: '500K records',
                        note: '10K SKUs × 50 locations'
                    },
                    {
                        description: 'Shipment tracking',
                        value: '10K events/day',
                        note: '1K shipments × 10 tracking events'
                    },
                    {
                        description: 'Historical data',
                        value: '12M records',
                        note: '3 years × 4M events/year'
                    }
                ],
                details: [
                    '500 suppliers sending updates every 4 hours = 3K updates/day',
                    '50 facilities with real-time inventory = 200 updates/minute',
                    '10K SKUs × 50 locations = 500K inventory records',
                    'Shipment tracking: 1K shipments/day × 10 tracking events = 10K events/day',
                    'Historical data: 3 years × 4M events/year = 12M records',
                    'Demand forecasting: Daily calculations on 500K SKUs'
                ]
            },
            A: {
                questions: [
                    {
                        question: 'What are the core operations needed?',
                        answer: 'Inventory tracking, shipment visibility, demand forecasting',
                        thoughtProcess: 'Focus on essential supply chain operations.'
                    },
                    {
                        question: 'What are the real-time requirements?',
                        answer: 'Real-time inventory updates, shipment tracking',
                        thoughtProcess: 'Real-time features need special handling.'
                    },
                    {
                        question: 'What are the integration requirements?',
                        answer: 'ERP, WMS, logistics providers',
                        thoughtProcess: 'External integrations need reliability.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Robust retry logic',
                        rationale: 'Handle unreliable external connections',
                        implications: 'Need to handle message queuing'
                    },
                    {
                        decision: 'Offline queuing',
                        rationale: 'Handle connection failures',
                        implications: 'Need to handle data consistency'
                    }
                ],
                details: [
                    'PUT /inventory/{location}/{sku} - Real-time inventory updates',
                    'GET /shipments/{id}/tracking - Shipment visibility',
                    'POST /demand/forecast - Demand planning calculations',
                    'GET /suppliers/{id}/performance - Supplier scorecards',
                    'POST /alerts/risk - Supply chain risk notifications',
                    'GET /analytics/optimization - Cost and efficiency analytics'
                ]
            },
            D: {
                questions: [
                    {
                        question: 'What are the core entities in the system?',
                        answer: 'Suppliers, Products, Inventory, Shipments',
                        thoughtProcess: 'These form the foundation of the supply chain data model.'
                    },
                    {
                        question: 'What are the data patterns?',
                        answer: 'Time-series data, real-time updates',
                        thoughtProcess: 'Supply chain data has specific patterns.'
                    },
                    {
                        question: 'What are the query patterns?',
                        answer: 'Real-time inventory, historical analysis',
                        thoughtProcess: 'Different types of queries need different optimizations.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Time-series database (InfluxDB)',
                        rationale: 'Optimized for sensor data patterns',
                        implications: 'Need to handle data retention and aggregation'
                    },
                    {
                        decision: 'Apache Kafka for event streaming',
                        rationale: 'Handle high-volume real-time data',
                        implications: 'Need to handle message ordering and persistence'
                    },
                    {
                        decision: 'Elasticsearch for supplier search',
                        rationale: 'Enable fast supplier discovery',
                        implications: 'Need to handle data synchronization'
                    }
                ],
                details: [
                    'Suppliers (contact info, capabilities, performance metrics)',
                    'Products (SKUs, specifications, costs, lead times)',
                    'Inventory (locations, quantities, movements, forecasts)',
                    'Shipments (tracking, status, carriers, delivery estimates)',
                    'Demand (historical sales, forecasts, seasonality patterns)',
                    'PostgreSQL for transactional data',
                    'InfluxDB for time-series inventory tracking',
                    'Elasticsearch for supplier search',
                    'Hadoop for demand forecasting analytics'
                ]
            },
            E2: {
                questions: [
                    {
                        question: 'How should we structure the services?',
                        answer: 'API Gateway, Supply Chain Core, Integration Layer',
                        thoughtProcess: 'Break down by functionality and integration needs.'
                    },
                    {
                        question: 'How should we handle real-time processing?',
                        answer: 'Kafka Streams for real-time data processing',
                        thoughtProcess: 'Real-time systems need efficient processing.'
                    },
                    {
                        question: 'How should we handle integrations?',
                        answer: 'Message queues with retry logic',
                        thoughtProcess: 'External integrations need reliability.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Kafka Streams for real-time processing',
                        rationale: 'Handle high-volume data streams',
                        implications: 'Need to handle stream processing and state management'
                    },
                    {
                        decision: 'ETL pipeline for ERP integration',
                        rationale: 'Handle data synchronization with SAP',
                        implications: 'Need to handle data transformation'
                    }
                ],
                details: [
                    '[Supplier Portals] → [API Gateway] → [Integration Layer] → [Supply Chain Core]',
                    '[Mobile Apps]                              ↓                      ↓',
                    '[IoT Sensors] → [Message Queue] → [Real-time Processor] → [Inventory Engine]',
                    '                      ↓                    ↓                ↓',
                    '[ERP Systems] → [ETL Pipeline] → [Data Warehouse] → [Demand Forecasting]',
                    '        ↓              ↓              ↓              ↓',
                    '[External APIs] → [Risk Engine] → [Analytics] → [Dashboard]'
                ]
            },
            R: {
                questions: [
                    {
                        question: 'What are the critical components?',
                        answer: 'Demand forecasting, inventory optimization',
                        thoughtProcess: 'These are the most complex and business-critical parts.'
                    },
                    {
                        question: 'How do we ensure forecast accuracy?',
                        answer: 'Machine learning models with multiple data sources',
                        thoughtProcess: 'Forecasting accuracy affects inventory costs.'
                    },
                    {
                        question: 'How do we handle model updates?',
                        answer: 'Automatic retraining with accuracy monitoring',
                        thoughtProcess: 'Models need to stay current.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Ensemble ML models',
                        rationale: 'Improve forecast accuracy',
                        implications: 'Need ML expertise and training data'
                    },
                    {
                        decision: 'Real-time prediction serving',
                        rationale: 'Enable real-time forecasting',
                        implications: 'Need to handle model versioning'
                    }
                ],
                details: [
                    'Machine learning models using historical sales data',
                    'External factor integration (weather, events, trends)',
                    'Multi-level forecasting (SKU, category, region)',
                    'Automatic model retraining and accuracy monitoring',
                    'Time series forecasting with ARIMA and LSTM neural networks',
                    'Feature engineering from multiple data sources',
                    'Ensemble models for accuracy',
                    'Real-time prediction serving with model versioning'
                ]
            },
            S: {
                questions: [
                    {
                        question: 'How do we handle growth?',
                        answer: 'Scale by adding partners and complexity',
                        thoughtProcess: 'Supply chain systems grow with partners.'
                    },
                    {
                        question: 'What are the performance requirements?',
                        answer: 'Data freshness SLAs, forecast accuracy',
                        thoughtProcess: 'Supply chain needs reliable performance.'
                    },
                    {
                        question: 'How do we handle global expansion?',
                        answer: 'Regional data centers, local compliance',
                        thoughtProcess: 'Global operations need special handling.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Event-driven architecture',
                        rationale: 'Handle loose coupling between services',
                        implications: 'Need to handle event ordering and consistency'
                    },
                    {
                        decision: 'Regional data centers',
                        rationale: 'Handle global operations',
                        implications: 'Need to handle data synchronization'
                    }
                ],
                details: [
                    'Global expansion: Regional data centers for latency, local compliance requirements',
                    'Supplier growth: Event-driven architecture for loose coupling, API rate limiting',
                    'Monitoring: Data freshness SLAs, forecast accuracy metrics, integration health dashboards'
                ]
            }
        }
    },
    {
        id: 'media-streaming',
        name: 'Media Streaming Platform',
        description:
            'Design a hybrid streaming platform combining live gaming streams with on-demand creator content (10M users globally)',
        leaders: {
            L: {
                questions: [
                    {
                        question:
                            'What type of content—live streaming like Twitch, on-demand like Netflix, or user-generated like YouTube?',
                        answer: 'Hybrid platform combining live gaming streams with on-demand creator content',
                        thoughtProcess: 'This defines the content delivery model and technical requirements.'
                    },
                    {
                        question:
                            "What's the business model—subscription, advertising, or creator monetization?",
                        answer: 'Combination of subscription and advertising revenue',
                        thoughtProcess: 'This affects monetization features and payment processing.'
                    },
                    {
                        question: "What's our target audience size and geographic distribution?",
                        answer: '10M users globally',
                        thoughtProcess: 'This helps with capacity planning and CDN strategy.'
                    },
                    {
                        question: 'Do we need content creation tools or just consumption?',
                        answer: 'Both content creation and consumption tools required',
                        thoughtProcess: 'This affects the feature set and user experience.'
                    },
                    {
                        question: 'What quality requirements—4K, HDR, adaptive bitrate streaming?',
                        answer: 'Support for 4K streaming with adaptive bitrate',
                        thoughtProcess: 'This affects bandwidth requirements and CDN costs.'
                    }
                ],
                details: [
                    'Hybrid streaming platform (Twitch + YouTube)',
                    '10M users globally',
                    'Subscription + advertising revenue model',
                    '4K streaming support',
                    'Creator monetization tools'
                ]
            },
            E: {
                questions: [
                    {
                        question: "What's the expected daily usage?",
                        answer: '2M daily active users, 100K concurrent live streams',
                        thoughtProcess: "This helps calculate the system's load and storage requirements."
                    },
                    {
                        question: "What's the peak load factor?",
                        answer: '5M concurrent viewers during major events',
                        thoughtProcess: 'This affects CDN capacity planning.'
                    },
                    {
                        question: 'What are the storage requirements?',
                        answer: '1M hours of video uploaded daily',
                        thoughtProcess: 'This affects storage costs and management.'
                    }
                ],
                calculations: [
                    {
                        description: 'Daily active users',
                        value: '2M users',
                        note: '10M registered users'
                    },
                    {
                        description: 'Live streams',
                        value: '100K concurrent streams',
                        note: '500K watching'
                    },
                    {
                        description: 'Video upload',
                        value: '2TB/day',
                        note: '1M hours compressed'
                    },
                    {
                        description: 'Peak bandwidth',
                        value: '25Tbps',
                        note: '5M × 5Mbps average'
                    },
                    {
                        description: 'Annual storage',
                        value: '3.6PB',
                        note: '730TB raw × 5 transcoded versions'
                    }
                ],
                details: [
                    '10M registered users, 2M daily active users',
                    '100K concurrent live streams peak, 500K watching',
                    '1M hours of video uploaded daily = 2TB/day (compressed)',
                    'Peak concurrent viewers: 5M during major events',
                    'CDN bandwidth: 5M × 5Mbps average = 25Tbps peak',
                    'Storage: 365 × 2TB = 730TB/year raw content',
                    'Transcoded versions (multiple qualities): 3.6PB/year total'
                ]
            },
            A: {
                questions: [
                    {
                        question: 'What are the core operations needed?',
                        answer: 'Live streaming, video playback, content upload',
                        thoughtProcess: 'Focus on essential streaming operations.'
                    },
                    {
                        question: 'What are the real-time requirements?',
                        answer: 'Live streaming, chat, viewer counts',
                        thoughtProcess: 'Real-time features need special handling.'
                    },
                    {
                        question: 'What are the integration requirements?',
                        answer: 'CDN, payment processing, analytics',
                        thoughtProcess: 'External services need reliable integration.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Global edge deployment',
                        rationale: 'Minimize streaming latency',
                        implications: 'Need to handle CDN configuration'
                    },
                    {
                        decision: 'Adaptive bitrate streaming',
                        rationale: 'Handle varying network conditions',
                        implications: 'Need to handle multiple quality levels'
                    }
                ],
                details: [
                    'POST /streams/live/start - Initiate live streaming',
                    'GET /content/{id}/manifest - Video playback manifests',
                    'POST /content/upload - Video upload and processing',
                    'GET /discovery/trending - Content discovery and recommendations',
                    'POST /monetization/ads - Ad insertion and tracking',
                    'GET /analytics/creators - Creator dashboard analytics'
                ]
            },
            D: {
                questions: [
                    {
                        question: 'What are the core entities in the system?',
                        answer: 'Users, Content, Streams, Monetization',
                        thoughtProcess: 'These form the foundation of the streaming data model.'
                    },
                    {
                        question: 'What are the data patterns?',
                        answer: 'Time-series data, real-time updates',
                        thoughtProcess: 'Streaming data has specific patterns.'
                    },
                    {
                        question: 'What are the query patterns?',
                        answer: 'Content discovery, user recommendations',
                        thoughtProcess: 'Different types of queries need different optimizations.'
                    }
                ],
                decisions: [
                    {
                        decision: 'PostgreSQL for metadata',
                        rationale: 'Strong consistency for user data',
                        implications: 'Need to handle scaling and replication'
                    },
                    {
                        decision: 'Cassandra for analytics',
                        rationale: 'Handle time-series data',
                        implications: 'Need to handle data retention'
                    },
                    {
                        decision: 'Redis for live state',
                        rationale: 'Fast access to stream status',
                        implications: 'Need to handle persistence and failover'
                    }
                ],
                details: [
                    'Users (viewers, creators, preferences, subscriptions)',
                    'Content (videos, metadata, transcoding status, analytics)',
                    'Streams (live sessions, chat, viewer counts, recordings)',
                    'Monetization (ads, subscriptions, creator payments)',
                    'Recommendations (viewing history, preferences, ML features)',
                    'PostgreSQL for user/content metadata',
                    'Cassandra for time-series analytics',
                    'Redis for live stream state',
                    'S3/CDN for video storage',
                    'Elasticsearch for content search'
                ]
            },
            E2: {
                questions: [
                    {
                        question: 'How should we structure the services?',
                        answer: 'API Gateway, Content Service, Stream Processor',
                        thoughtProcess: 'Break down by functionality and scaling needs.'
                    },
                    {
                        question: 'How should we handle real-time features?',
                        answer: 'WebRTC/RTMP for streaming, WebSocket for chat',
                        thoughtProcess: 'Real-time features need special architecture.'
                    },
                    {
                        question: 'How should we handle video processing?',
                        answer: 'Transcoding pipeline with multiple qualities',
                        thoughtProcess: 'Video processing needs efficient handling.'
                    }
                ],
                decisions: [
                    {
                        decision: 'RTMP ingestion',
                        rationale: 'Industry standard for live streaming',
                        implications: 'Need to handle failover'
                    },
                    {
                        decision: 'Real-time transcoding',
                        rationale: 'Support multiple quality levels',
                        implications: 'Need to handle processing load'
                    }
                ],
                details: [
                    '[Creator Tools] → [Upload Service] → [Transcoding Pipeline] → [CDN Storage]',
                    '[Mobile/Web] → [API Gateway] → [Content Service] ← [Recommendation Engine]',
                    '        ↓              ↓              ↓                    ↓',
                    '[Live Streams] → [WebRTC/RTMP] → [Stream Processor] → [Chat Service]',
                    '        ↓              ↓              ↓              ↓',
                    '[Ad Server] ← [Analytics] ← [User Service] → [Payment Service]',
                    '        ↓              ↓              ↓              ↓',
                    '[Global CDN] ← [Video Storage] ← [PostgreSQL] → [ML Pipeline]'
                ]
            },
            R: {
                questions: [
                    {
                        question: 'What are the critical components?',
                        answer: 'Live streaming, chat, transcoding',
                        thoughtProcess: 'These are the most complex and user-critical parts.'
                    },
                    {
                        question: 'How do we ensure low latency?',
                        answer: 'Edge computing, optimized protocols',
                        thoughtProcess: 'Latency affects user experience.'
                    },
                    {
                        question: 'How do we handle chat scaling?',
                        answer: 'WebSocket clusters, spam filtering',
                        thoughtProcess: 'Chat needs to handle high concurrency.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Adaptive bitrate streaming',
                        rationale: 'Handle varying network conditions',
                        implications: 'Need to handle multiple quality levels'
                    },
                    {
                        decision: 'Edge caching',
                        rationale: 'Reduce latency and bandwidth',
                        implications: 'Need to handle cache invalidation'
                    }
                ],
                details: [
                    'RTMP ingestion with automatic failover',
                    'Real-time transcoding to multiple bitrates',
                    'Sub-second latency for interactive streams',
                    'Global edge distribution with intelligent routing',
                    'Chat integration with spam filtering',
                    'Adaptive bitrate streaming with HLS/DASH protocols',
                    'Edge caching with TTL optimization',
                    'Real-time chat using WebSocket clusters',
                    'ML-based spam detection'
                ]
            },
            S: {
                questions: [
                    {
                        question: 'How do we handle growth?',
                        answer: 'Scale by adding users and content',
                        thoughtProcess: 'Streaming platforms grow with content.'
                    },
                    {
                        question: 'What are the performance requirements?',
                        answer: '99.9% uptime, <1% buffering',
                        thoughtProcess: 'Streaming needs reliable performance.'
                    },
                    {
                        question: 'How do we handle global expansion?',
                        answer: 'Multi-region CDN, local compliance',
                        thoughtProcess: 'Global access needs special handling.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Multi-region CDN',
                        rationale: 'Handle global traffic',
                        implications: 'Need to handle content distribution'
                    },
                    {
                        decision: 'Edge computing',
                        rationale: 'Improve personalization',
                        implications: 'Need to handle data synchronization'
                    }
                ],
                details: [
                    '10x users: Multi-region CDN deployment, edge computing for personalization',
                    'Global expansion: Regional compliance (GDPR, content restrictions), local CDN partnerships',
                    'Monitoring: Stream uptime 99.9%, buffering ratio <1%, chat latency <100ms'
                ]
            }
        }
    },
    {
        id: 'iot-monitoring',
        name: 'Industrial IoT Monitoring Platform',
        description:
            'Design an IoT platform for manufacturing predictive maintenance (1,000 factories, 100K machines, 1M sensors)',
        leaders: {
            L: {
                questions: [
                    {
                        question: 'What industry—manufacturing, energy, agriculture, or smart buildings?',
                        answer: 'Manufacturing industry focus',
                        thoughtProcess: 'This defines the scope and complexity of the system.'
                    },
                    {
                        question:
                            "What's the primary goal—predictive maintenance, energy optimization, or safety monitoring?",
                        answer:
                            'Focus on equipment failure prediction, energy optimization, and safety compliance',
                        thoughtProcess: 'This affects feature prioritization and system design.'
                    },
                    {
                        question: 'How many devices and what types of sensors?',
                        answer: '1,000 factories, 100K machines, 1M sensors',
                        thoughtProcess: 'This helps with capacity planning and scaling strategy.'
                    },
                    {
                        question: 'Do we need real-time alerts or is batch analysis sufficient?',
                        answer: 'Real-time alerts required for critical failures',
                        thoughtProcess: 'This affects system architecture and data processing.'
                    },
                    {
                        question: 'What integration requirements with existing SCADA or MES systems?',
                        answer: 'Integration with existing industrial control systems',
                        thoughtProcess: 'This affects system architecture and data flow.'
                    }
                ],
                details: [
                    'Manufacturing IoT platform',
                    '1,000 factories, 100K machines',
                    '1M sensors to monitor',
                    'Predictive maintenance focus',
                    'Industrial control system integration'
                ]
            },
            E: {
                questions: [
                    {
                        question: "What's the expected data volume?",
                        answer: '100K messages/second from sensors',
                        thoughtProcess: "This helps calculate the system's load and storage requirements."
                    },
                    {
                        question: "What's the peak load factor?",
                        answer: '150K messages/second during shift changes',
                        thoughtProcess: 'This affects real-time processing requirements.'
                    },
                    {
                        question: 'What are the storage requirements?',
                        answer: '2 years of historical data',
                        thoughtProcess: 'IoT data requires significant storage.'
                    }
                ],
                calculations: [
                    {
                        description: 'Sensor messages',
                        value: '100K messages/second',
                        note: '1M sensors × 10-second intervals'
                    },
                    {
                        description: 'Data volume',
                        value: '8.6TB/day',
                        note: '100K × 1KB × 86400 seconds'
                    },
                    {
                        description: 'Peak load',
                        value: '150K messages/second',
                        note: 'During shift changes'
                    },
                    {
                        description: 'Historical data',
                        value: '6.3PB total',
                        note: '2 years × 8.6TB/day'
                    },
                    {
                        description: 'Alert latency',
                        value: '<5 seconds',
                        note: 'For critical failures'
                    }
                ],
                details: [
                    '1M sensors sending data every 10 seconds = 100K messages/second',
                    'Each message: 1KB average = 100MB/second = 8.6TB/day',
                    'Machine learning training: Daily batch on 30 days rolling window',
                    'Alert processing: <5 second latency for critical failures',
                    'Historical data: 2 years retention = 6.3PB total',
                    'Peak during shift changes: 150K messages/second'
                ]
            },
            A: {
                questions: [
                    {
                        question: 'What are the core operations needed?',
                        answer: 'Sensor data ingestion, health monitoring, alerts',
                        thoughtProcess: 'Focus on essential IoT operations.'
                    },
                    {
                        question: 'What are the real-time requirements?',
                        answer: 'Real-time alerts, equipment control',
                        thoughtProcess: 'Real-time features need special handling.'
                    },
                    {
                        question: 'What are the integration requirements?',
                        answer: 'SCADA, MES, control systems',
                        thoughtProcess: 'External systems need reliable integration.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Robust retry logic',
                        rationale: 'Handle unreliable connections',
                        implications: 'Need to handle message queuing'
                    },
                    {
                        decision: 'Offline queuing',
                        rationale: 'Handle connection failures',
                        implications: 'Need to handle data consistency'
                    }
                ],
                details: [
                    'POST /sensors/{id}/data - Sensor data ingestion (high volume)',
                    'GET /machines/{id}/health - Equipment health status',
                    'POST /alerts/critical - Critical failure notifications',
                    'GET /analytics/predictive - Maintenance predictions',
                    'PUT /controls/{id}/command - Remote equipment control',
                    'GET /energy/optimization - Energy usage analytics'
                ]
            },
            D: {
                questions: [
                    {
                        question: 'What are the core entities in the system?',
                        answer: 'Facilities, Equipment, Sensor Data, Maintenance',
                        thoughtProcess: 'These form the foundation of the IoT data model.'
                    },
                    {
                        question: 'What are the data patterns?',
                        answer: 'Time-series data, real-time updates',
                        thoughtProcess: 'IoT data has specific patterns.'
                    },
                    {
                        question: 'What are the query patterns?',
                        answer: 'Real-time monitoring, historical analysis',
                        thoughtProcess: 'Different types of queries need different optimizations.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Time-series database (InfluxDB)',
                        rationale: 'Optimized for sensor data',
                        implications: 'Need to handle data retention'
                    },
                    {
                        decision: 'Apache Kafka for streaming',
                        rationale: 'Handle high-volume data',
                        implications: 'Need to handle message ordering'
                    },
                    {
                        decision: 'PostgreSQL for metadata',
                        rationale: 'Strong consistency for equipment data',
                        implications: 'Need to handle scaling'
                    }
                ],
                details: [
                    'Facilities (locations, equipment hierarchies, operational schedules)',
                    'Equipment (machines, sensors, maintenance history, specifications)',
                    'Sensor Data (timestamps, values, quality indicators, metadata)',
                    'Maintenance (schedules, work orders, parts inventory, costs)',
                    'Alerts (severity levels, escalation rules, response tracking)',
                    'InfluxDB for time-series sensor data',
                    'PostgreSQL for equipment metadata',
                    'Redis for real-time alerts',
                    'Apache Kafka for data streaming',
                    'Hadoop for ML training data'
                ]
            },
            E2: {
                questions: [
                    {
                        question: 'How should we structure the services?',
                        answer: 'Edge Gateways, Stream Processor, Analytics Engine',
                        thoughtProcess: 'Break down by functionality and reliability needs.'
                    },
                    {
                        question: 'How should we handle real-time processing?',
                        answer: 'Kafka Streams for real-time data',
                        thoughtProcess: 'Real-time systems need efficient processing.'
                    },
                    {
                        question: 'How should we handle edge computing?',
                        answer: 'Local processing for critical systems',
                        thoughtProcess: 'Edge computing improves reliability.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Edge computing',
                        rationale: 'Handle network failures',
                        implications: 'Need to handle data synchronization'
                    },
                    {
                        decision: 'Kafka Streams',
                        rationale: 'Process real-time data',
                        implications: 'Need to handle stream processing'
                    }
                ],
                details: [
                    '[Industrial Sensors] → [Edge Gateways] → [Message Queue] → [Stream Processor]',
                    '[SCADA Systems]                              ↓                  ↓',
                    '[Control Systems] ← [Command Processor] ← [Real-time Engine] → [Alert Manager]',
                    '        ↓                    ↓                  ↓              ↓',
                    '[Safety Systems] ← [Analytics Engine] ← [Time-Series DB] → [ML Pipeline]',
                    '        ↓                    ↓                  ↓              ↓',
                    '[Operator Dashboard] ← [Reporting] ← [Data Warehouse] → [Predictive Models]'
                ]
            },
            R: {
                questions: [
                    {
                        question: 'What are the critical components?',
                        answer: 'Predictive maintenance, anomaly detection',
                        thoughtProcess: 'These are the most complex and business-critical parts.'
                    },
                    {
                        question: 'How do we ensure prediction accuracy?',
                        answer: 'Machine learning models with multiple data sources',
                        thoughtProcess: 'Accuracy affects maintenance costs.'
                    },
                    {
                        question: 'How do we handle model updates?',
                        answer: 'Automatic retraining with accuracy monitoring',
                        thoughtProcess: 'Models need to stay current.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Ensemble ML models',
                        rationale: 'Improve prediction accuracy',
                        implications: 'Need ML expertise and training data'
                    },
                    {
                        decision: 'Real-time prediction serving',
                        rationale: 'Enable real-time forecasting',
                        implications: 'Need to handle model versioning'
                    }
                ],
                details: [
                    'Anomaly detection using statistical models',
                    'Equipment failure prediction with machine learning',
                    'Maintenance schedule optimization based on predictions',
                    'Integration with spare parts inventory and technician scheduling',
                    'Isolation Forest for anomaly detection',
                    'LSTM neural networks for failure prediction',
                    'Genetic algorithms for maintenance optimization',
                    'Ensemble models for accuracy improvement'
                ]
            },
            S: {
                questions: [
                    {
                        question: 'How do we handle growth?',
                        answer: 'Scale by adding facilities and equipment',
                        thoughtProcess: 'IoT systems grow with facilities.'
                    },
                    {
                        question: 'What are the performance requirements?',
                        answer: 'Data freshness, prediction accuracy',
                        thoughtProcess: 'IoT needs reliable performance.'
                    },
                    {
                        question: 'How do we handle global expansion?',
                        answer: 'Regional data processing, local compliance',
                        thoughtProcess: 'Global operations need special handling.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Edge computing clusters',
                        rationale: 'Handle facility growth',
                        implications: 'Need to handle data aggregation'
                    },
                    {
                        decision: 'Regional data processing',
                        rationale: 'Handle global operations',
                        implications: 'Need to handle data synchronization'
                    }
                ],
                details: [
                    'Factory expansion: Edge computing clusters, hierarchical data aggregation',
                    'Global manufacturing: Regional data processing, local compliance requirements',
                    'Monitoring: Data ingestion rate, prediction accuracy, alert response time'
                ]
            }
        }
    },
    {
        id: 'social-media',
        name: 'Social Media Platform',
        description:
            'Design a professional networking platform with community features (50M professionals)',
        leaders: {
            L: {
                questions: [
                    {
                        question:
                            'What type of social platform—professional like LinkedIn, visual like Instagram, or general like Facebook?',
                        answer: 'Professional networking platform with community features',
                        thoughtProcess: 'This defines the scope and complexity of the system.'
                    },
                    {
                        question:
                            "What's the primary engagement model—content sharing, networking, or communities?",
                        answer: 'Focus on industry discussions, knowledge sharing, and career development',
                        thoughtProcess: 'This affects feature prioritization and system design.'
                    },
                    {
                        question: "What's our target user base and growth expectations?",
                        answer: '50M professionals globally',
                        thoughtProcess: 'This helps with capacity planning and scaling strategy.'
                    },
                    {
                        question: 'Do we need real-time features like live streaming or messaging?',
                        answer: 'Real-time messaging required',
                        thoughtProcess: 'This affects system architecture and data processing.'
                    },
                    {
                        question: 'What content moderation and safety requirements do we have?',
                        answer: 'Content moderation and safety features required',
                        thoughtProcess: 'This affects system architecture and user experience.'
                    }
                ],
                details: [
                    'Professional networking platform',
                    '50M professionals globally',
                    'Industry discussions and knowledge sharing',
                    'Real-time messaging features',
                    'Content moderation and safety'
                ]
            },
            E: {
                questions: [
                    {
                        question: "What's the expected daily usage?",
                        answer: '10M daily active users',
                        thoughtProcess: "This helps calculate the system's load and storage requirements."
                    },
                    {
                        question: "What's the peak load factor?",
                        answer: '1M concurrent users during peak hours',
                        thoughtProcess: 'This affects real-time processing requirements.'
                    },
                    {
                        question: 'What are the storage requirements?',
                        answer: '5B posts/year, 500K concurrent conversations',
                        thoughtProcess: 'Social media data requires significant storage.'
                    }
                ],
                calculations: [
                    {
                        description: 'Daily active users',
                        value: '10M users',
                        note: '50M registered users'
                    },
                    {
                        description: 'Posts per year',
                        value: '5B posts',
                        note: '100 posts/user/month'
                    },
                    {
                        description: 'Feed items',
                        value: '500M items/day',
                        note: '10M × 50 posts'
                    },
                    {
                        description: 'Content storage',
                        value: '60TB/year',
                        note: '10TB text + 50TB media'
                    },
                    {
                        description: 'Search index',
                        value: '110GB',
                        note: '100GB posts + 10GB profiles'
                    }
                ],
                details: [
                    '50M registered users, 10M daily active users',
                    '100 posts/user/month = 5B posts/year',
                    '1M concurrent users during peak hours',
                    'News feed generation: 10M × 50 posts = 500M feed items/day',
                    'Real-time messaging: 500K concurrent conversations',
                    'Content storage: 2KB/post × 5B = 10TB/year text, 50TB images/videos',
                    'Search index: 100GB for posts, 10GB for user profiles'
                ]
            },
            A: {
                questions: [
                    {
                        question: 'What are the core operations needed?',
                        answer: 'Post creation, feed generation, messaging',
                        thoughtProcess: 'Focus on essential social operations.'
                    },
                    {
                        question: 'What are the real-time requirements?',
                        answer: 'Real-time messaging, feed updates',
                        thoughtProcess: 'Real-time features need special handling.'
                    },
                    {
                        question: 'What are the security requirements?',
                        answer: 'Content moderation, privacy controls',
                        thoughtProcess: 'Social platforms need strong security.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Rate limiting',
                        rationale: 'Prevent spam and abuse',
                        implications: 'Need to handle high-engagement users'
                    },
                    {
                        decision: 'Content moderation',
                        rationale: 'Ensure platform safety',
                        implications: 'Need to handle moderation queue'
                    }
                ],
                details: [
                    'POST /posts - Create posts with media attachments',
                    'GET /feed/{user_id} - Personalized news feed generation',
                    'POST /connections/request - Professional networking requests',
                    'GET /search/content - Content and people search',
                    'POST /messages - Real-time messaging',
                    'PUT /moderation/report - Content reporting and moderation'
                ]
            },
            D: {
                questions: [
                    {
                        question: 'What are the core entities in the system?',
                        answer: 'Users, Posts, Connections, Communities',
                        thoughtProcess: 'These form the foundation of the social data model.'
                    },
                    {
                        question: 'What are the data patterns?',
                        answer: 'Social graph, time-series data',
                        thoughtProcess: 'Social data has specific patterns.'
                    },
                    {
                        question: 'What are the query patterns?',
                        answer: 'Feed generation, network analysis',
                        thoughtProcess: 'Different types of queries need different optimizations.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Graph database (Neo4j)',
                        rationale: 'Handle social connections',
                        implications: 'Need to handle graph queries'
                    },
                    {
                        decision: 'Cassandra for posts',
                        rationale: 'Handle high write volume',
                        implications: 'Need to handle data consistency'
                    },
                    {
                        decision: 'Redis for real-time',
                        rationale: 'Fast access to active data',
                        implications: 'Need to handle persistence'
                    }
                ],
                details: [
                    'Users (profiles, professional info, privacy settings, connections)',
                    'Posts (content, media, engagement metrics, visibility rules)',
                    'Connections (relationships, endorsements, mutual connections)',
                    'Communities (groups, topics, moderation rules, membership)',
                    'Messages (conversations, threads, read status, attachments)',
                    'PostgreSQL for user data and connections',
                    'Cassandra for posts and feeds',
                    'Redis for real-time features',
                    'Elasticsearch for search',
                    'Graph database (Neo4j) for network analysis'
                ]
            },
            E2: {
                questions: [
                    {
                        question: 'How should we structure the services?',
                        answer: 'API Gateway, User Service, Content Service',
                        thoughtProcess: 'Break down by functionality and scaling needs.'
                    },
                    {
                        question: 'How should we handle real-time features?',
                        answer: 'WebSocket for chat, feed updates',
                        thoughtProcess: 'Real-time features need special architecture.'
                    },
                    {
                        question: 'How should we handle personalization?',
                        answer: 'ML-based recommendation engine',
                        thoughtProcess: 'Personalization affects user engagement.'
                    }
                ],
                decisions: [
                    {
                        decision: 'WebSocket clusters',
                        rationale: 'Handle real-time features',
                        implications: 'Need to handle scaling'
                    },
                    {
                        decision: 'ML pipeline',
                        rationale: 'Enable personalization',
                        implications: 'Need to handle model training'
                    }
                ],
                details: [
                    '[Mobile/Web] → [CDN] → [API Gateway] → [User Service]',
                    '        ↓              ↓              ↓              ↓',
                    '[Real-time Chat] → [WebSocket] → [Message Service] → [Notification Service]',
                    '        ↓              ↓              ↓              ↓',
                    '[Feed Generator] ← [Post Service] ← [Graph Engine] → [Search Service]',
                    '        ↓              ↓              ↓              ↓',
                    '[Content Store] ← [Media Storage] ← [PostgreSQL] → [Analytics Pipeline]',
                    '        ↓              ↓              ↓              ↓',
                    '[ML Pipeline] ← [Moderation] ← [Recommendation] → [A/B Testing]'
                ]
            },
            R: {
                questions: [
                    {
                        question: 'What are the critical components?',
                        answer: 'Feed generation, content moderation',
                        thoughtProcess: 'These are the most complex and user-critical parts.'
                    },
                    {
                        question: 'How do we ensure feed quality?',
                        answer: 'ML-based ranking and personalization',
                        thoughtProcess: 'Feed quality affects user engagement.'
                    },
                    {
                        question: 'How do we handle content moderation?',
                        answer: 'ML + human moderation pipeline',
                        thoughtProcess: 'Moderation affects platform safety.'
                    }
                ],
                decisions: [
                    {
                        decision: 'ML ranking models',
                        rationale: 'Improve feed quality',
                        implications: 'Need ML expertise and training data'
                    },
                    {
                        decision: 'A/B testing framework',
                        rationale: 'Optimize algorithms',
                        implications: 'Need to handle experiment data'
                    }
                ],
                details: [
                    'Content ranking based on engagement prediction',
                    'Social graph analysis for content relevance',
                    'Real-time updates without overwhelming users',
                    'A/B testing framework for algorithm optimization',
                    'Machine learning ranking models (collaborative filtering + content-based)',
                    'Graph algorithms for social signals',
                    'Online learning for real-time optimization',
                    'Multi-armed bandit for A/B testing'
                ]
            },
            S: {
                questions: [
                    {
                        question: 'How do we handle growth?',
                        answer: 'Scale by adding users and content',
                        thoughtProcess: 'Social platforms grow with users.'
                    },
                    {
                        question: 'What are the performance requirements?',
                        answer: 'Feed generation latency, user engagement',
                        thoughtProcess: 'Performance affects user experience.'
                    },
                    {
                        question: 'How do we handle global expansion?',
                        answer: 'Regional data centers, content localization',
                        thoughtProcess: 'Global access needs special handling.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Feed pre-computation',
                        rationale: 'Improve feed generation',
                        implications: 'Need to handle cache invalidation'
                    },
                    {
                        decision: 'Graph database sharding',
                        rationale: 'Handle social graph growth',
                        implications: 'Need to handle cross-shard queries'
                    }
                ],
                details: [
                    '100M users: Feed pre-computation and caching, graph database sharding',
                    'Global expansion: Regional data centers, content localization, compliance (GDPR, local laws)',
                    'Monitoring: Feed generation latency, user engagement metrics, content moderation accuracy'
                ]
            }
        }
    },
    {
        id: 'real-estate',
        name: 'Real Estate Marketplace Platform',
        description:
            'Design a comprehensive residential real estate platform (buy/sell/rent) for national market',
        leaders: {
            L: {
                questions: [
                    {
                        question:
                            'What type of real estate—residential sales, rentals, commercial, or multi-purpose?',
                        answer: 'Comprehensive residential platform (buy/sell/rent)',
                        thoughtProcess: 'This defines the scope and complexity of the system.'
                    },
                    {
                        question: 'Are we connecting buyers/sellers directly or working with agents/brokers?',
                        answer: 'Connecting consumers with agents',
                        thoughtProcess: 'This affects feature prioritization and system design.'
                    },
                    {
                        question: 'What geographic markets—local, national, or international?',
                        answer: 'National market focus',
                        thoughtProcess: 'This helps with capacity planning and scaling strategy.'
                    },
                    {
                        question: 'Do we need virtual tours, mortgage integration, or just listings?',
                        answer: 'Virtual tours and mortgage pre-approval integration',
                        thoughtProcess: 'This affects system architecture and data processing.'
                    },
                    {
                        question: "What's our revenue model—commissions, subscriptions, or lead generation?",
                        answer: 'Commission-based revenue model',
                        thoughtProcess: 'This affects monetization features and payment processing.'
                    }
                ],
                details: [
                    'Comprehensive residential platform',
                    'National market coverage',
                    'Agent-consumer connection model',
                    'Virtual tours and mortgage integration',
                    'Commission-based revenue'
                ]
            },
            E: {
                questions: [
                    {
                        question: "What's the expected daily usage?",
                        answer: '1M property searches/day',
                        thoughtProcess: "This helps calculate the system's load and storage requirements."
                    },
                    {
                        question: "What's the peak load factor?",
                        answer: '3x normal load during weekends',
                        thoughtProcess: 'This affects capacity planning.'
                    },
                    {
                        question: 'What are the storage requirements?',
                        answer: '5M property listings, 50 photos per listing',
                        thoughtProcess: 'Real estate data requires significant storage.'
                    }
                ],
                calculations: [
                    {
                        description: 'Property listings',
                        value: '5M listings',
                        note: '500K new listings/month'
                    },
                    {
                        description: 'Property searches',
                        value: '1M searches/day',
                        note: 'Peak during weekends'
                    },
                    {
                        description: 'Virtual tours',
                        value: '10K sessions/day',
                        note: 'Peak during weekends'
                    },
                    {
                        description: 'Image storage',
                        value: '2.5PB total',
                        note: '5M × 50 photos × 10MB'
                    },
                    {
                        description: 'Market data',
                        value: '250M data points',
                        note: '50 years × 5M properties'
                    }
                ],
                details: [
                    '10M users (buyers/sellers/renters), 100K real estate agents',
                    '5M property listings nationwide, 500K new listings/month',
                    '1M property searches/day, 10K virtual tour sessions/day',
                    'Peak traffic during weekends: 3x normal load',
                    'Property images: 50 photos/listing × 10MB = 500MB/listing',
                    'Total storage: 5M × 500MB = 2.5PB for images',
                    'Market data: 50 years × 5M properties = 250M data points'
                ]
            },
            A: {
                questions: [
                    {
                        question: 'What are the core operations needed?',
                        answer: 'Property search, listing management, virtual tours',
                        thoughtProcess: 'Focus on essential real estate operations.'
                    },
                    {
                        question: 'What are the integration requirements?',
                        answer: 'MLS data, mortgage lenders, CRM systems',
                        thoughtProcess: 'External systems need reliable integration.'
                    },
                    {
                        question: 'What are the security requirements?',
                        answer: 'User data protection, transaction security',
                        thoughtProcess: 'Real estate platforms need strong security.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Geographic search optimization',
                        rationale: 'Improve property search',
                        implications: 'Need to handle spatial queries'
                    },
                    {
                        decision: 'MLS integration',
                        rationale: 'Access property data',
                        implications: 'Need to handle data synchronization'
                    }
                ],
                details: [
                    'GET /properties/search - Property search with complex filters',
                    'POST /listings - Property listing creation and management',
                    'GET /market/analytics - Market trends and pricing analysis',
                    'POST /tours/virtual/schedule - Virtual tour booking',
                    'GET /mortgage/preapproval - Mortgage calculator and pre-approval',
                    'POST /leads/agent - Lead generation and agent matching'
                ]
            },
            D: {
                questions: [
                    {
                        question: 'What are the core entities in the system?',
                        answer: 'Properties, Users, Transactions, Market Data',
                        thoughtProcess: 'These form the foundation of the real estate data model.'
                    },
                    {
                        question: 'What are the data patterns?',
                        answer: 'Geographic data, time-series data',
                        thoughtProcess: 'Real estate data has specific patterns.'
                    },
                    {
                        question: 'What are the query patterns?',
                        answer: 'Location-based search, market analysis',
                        thoughtProcess: 'Different types of queries need different optimizations.'
                    }
                ],
                decisions: [
                    {
                        decision: 'PostgreSQL with PostGIS',
                        rationale: 'Handle geographic queries',
                        implications: 'Need to handle spatial indexing'
                    },
                    {
                        decision: 'Elasticsearch for search',
                        rationale: 'Enable property search',
                        implications: 'Need to handle data synchronization'
                    },
                    {
                        decision: 'ClickHouse for analytics',
                        rationale: 'Handle market analysis',
                        implications: 'Need to handle data aggregation'
                    }
                ],
                details: [
                    'Properties (listings, specifications, pricing, location, status)',
                    'Users (buyers, sellers, agents, preferences, search history)',
                    'Transactions (offers, contracts, closing status, commission)',
                    'Market Data (pricing trends, neighborhood analytics, comparables)',
                    'Tours (virtual/physical scheduling, availability, feedback)',
                    'PostgreSQL with PostGIS for geographic queries',
                    'Elasticsearch for property search',
                    'Redis for session data',
                    'S3 for media storage',
                    'ClickHouse for analytics'
                ]
            },
            E2: {
                questions: [
                    {
                        question: 'How should we structure the services?',
                        answer: 'API Gateway, Property Service, Search Engine',
                        thoughtProcess: 'Break down by functionality and scaling needs.'
                    },
                    {
                        question: 'How should we handle integrations?',
                        answer: 'MLS data pipeline, mortgage API integration',
                        thoughtProcess: 'External integrations need reliability.'
                    },
                    {
                        question: 'How should we handle virtual tours?',
                        answer: 'Video streaming, scheduling system',
                        thoughtProcess: 'Virtual tours need special handling.'
                    }
                ],
                decisions: [
                    {
                        decision: 'MLS data pipeline',
                        rationale: 'Access property data',
                        implications: 'Need to handle data transformation'
                    },
                    {
                        decision: 'Virtual tour system',
                        rationale: 'Enable remote viewing',
                        implications: 'Need to handle video streaming'
                    }
                ],
                details: [
                    '[Consumer App] → [CDN] → [API Gateway] → [Property Service]',
                    '[Agent Portal]              ↓              ↓              ↓',
                    '[MLS Integration] → [Data Pipeline] → [Search Engine] → [Recommendation]',
                    '        ↓              ↓              ↓              ↓',
                    '[Virtual Tours] ← [Media Service] ← [Geographic DB] → [Market Analytics]',
                    '        ↓              ↓              ↓              ↓',
                    '[Mortgage APIs] ← [Lead Engine] ← [User Service] → [CRM Integration]',
                    '        ↓              ↓              ↓              ↓',
                    '[Payment] ← [Transaction] ← [PostgreSQL] → [Analytics Pipeline]'
                ]
            },
            R: {
                questions: [
                    {
                        question: 'What are the critical components?',
                        answer: 'Property search, recommendation engine',
                        thoughtProcess: 'These are the most complex and user-critical parts.'
                    },
                    {
                        question: 'How do we ensure search quality?',
                        answer: 'Geographic optimization, ML-based ranking',
                        thoughtProcess: 'Search quality affects user experience.'
                    },
                    {
                        question: 'How do we handle recommendations?',
                        answer: 'Hybrid recommendation system',
                        thoughtProcess: 'Recommendations affect user engagement.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Hybrid recommendation system',
                        rationale: 'Improve property recommendations',
                        implications: 'Need ML expertise and training data'
                    },
                    {
                        decision: 'Geospatial clustering',
                        rationale: 'Enable neighborhood analysis',
                        implications: 'Need to handle spatial queries'
                    }
                ],
                details: [
                    'Machine learning using search history and preferences',
                    'Collaborative filtering based on similar user behavior',
                    'Market trend analysis for investment recommendations',
                    'Real-time price change notifications and alerts',
                    'Hybrid recommendation system (collaborative + content-based filtering)',
                    'Price prediction using regression models',
                    'Geospatial clustering for neighborhood analysis',
                    'Real-time notification system with user preference weighting'
                ]
            },
            S: {
                questions: [
                    {
                        question: 'How do we handle growth?',
                        answer: 'Scale by adding markets and property types',
                        thoughtProcess: 'Real estate platforms grow with markets.'
                    },
                    {
                        question: 'What are the performance requirements?',
                        answer: 'Fast search, reliable image delivery',
                        thoughtProcess: 'Performance affects user experience.'
                    },
                    {
                        question: 'How do we handle national expansion?',
                        answer: 'Regional MLS integrations, local market data',
                        thoughtProcess: 'National coverage needs special handling.'
                    }
                ],
                decisions: [
                    {
                        decision: 'Regional MLS integrations',
                        rationale: 'Access local property data',
                        implications: 'Need to handle multiple data sources'
                    },
                    {
                        decision: 'Local market data partnerships',
                        rationale: 'Access market insights',
                        implications: 'Need to handle data integration'
                    }
                ],
                details: [
                    'National expansion: Regional MLS integrations, local market data partnerships',
                    'Feature expansion: Commercial real estate, international properties, property management tools',
                    'Monitoring: Search response time <200ms, image load time <2s, lead conversion rates'
                ]
            }
        }
    }
];
