/**
 * Skills Component
 * Creates an interactive constellation of technical skills
 */

class SkillsComponent {
    constructor() {
        this.container = document.getElementById('skills-content');
        this.skillNodes = [];
        this.skillConnections = [];
        this.selectedCategory = null;
        this.animationFrame = null;
        
        // Bind methods
        this.handleResize = this.handleResize.bind(this);
        
        // Initialize
        window.addEventListener('resize', this.handleResize);
    }

    /**
     * Initialize skills component
     */
    async init() {
        try {
            const data = window.dataLoader.getCurrentProfile();
            if (data) {
                this.render(data);
            }
            
            this.setupAnimations();
            this.setupInteractions();
            
            console.log('✅ Skills component initialized');
        } catch (error) {
            console.error('❌ Skills component initialization failed:', error);
        }
    }

    /**
     * Render skills constellation
     * @param {Object} data - Profile data
     */
    render(data) {
        if (!data || !data.technicalSkills) return;

        this.container.innerHTML = '';

        // Create skills constellation container
        const constellation = document.createElement('div');
        constellation.className = 'skills-constellation';
        constellation.innerHTML = `
            <div class="constellation-center">
                <div class="center-core">
                    <i class="fas fa-user-astronaut"></i>
                    <span>Technical Universe</span>
                </div>
            </div>
            <svg class="skill-connections" viewBox="0 0 1200 800">
                <!-- Connections will be drawn here -->
            </svg>
            <div class="skill-categories" id="skill-categories">
                <!-- Categories will be populated -->
            </div>
        `;

        this.container.appendChild(constellation);

        // Create category selector
        this.createCategorySelector(data.technicalSkills);

        // Create skill nodes
        this.createSkillNodes(data.technicalSkills);

        // Create detailed view
        this.createDetailedView(data.technicalSkills);

        // Draw connections
        setTimeout(() => this.drawConnections(), 100);

        // Setup animations and interactions
        this.setupAnimations();
        this.setupInteractions();
    }

    /**
     * Create category selector
     * @param {Object} technicalSkills - Technical skills data
     */
    createCategorySelector(technicalSkills) {
        const selector = document.createElement('div');
        selector.className = 'category-selector';
        
        const categories = Object.keys(technicalSkills);
        const categoryIcons = {
            cloudDevOps: 'fas fa-cloud',
            backendApis: 'fas fa-server',
            frontend: 'fas fa-laptop-code',
            testingObservability: 'fas fa-microscope',
            databases: 'fas fa-database',
            developmentTools: 'fas fa-tools'
        };

        selector.innerHTML = `
            <h4>Navigate the Cosmos</h4>
            <div class="category-buttons">
                <button class="category-btn active" data-category="all">
                    <i class="fas fa-globe"></i>
                    <span>All Systems</span>
                </button>
                ${categories.map(category => `
                    <button class="category-btn" data-category="${category}">
                        <i class="${categoryIcons[category] || 'fas fa-star'}"></i>
                        <span>${this.formatCategoryName(category)}</span>
                    </button>
                `).join('')}
            </div>
        `;

        this.container.appendChild(selector);

        // Add category selection handlers
        selector.addEventListener('click', (e) => {
            const btn = e.target.closest('.category-btn');
            if (btn) {
                this.selectCategory(btn.dataset.category);
                
                // Update active state
                selector.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    }

    /**
     * Create skill nodes in constellation pattern
     * @param {Object} technicalSkills - Technical skills data
     */
    createSkillNodes(technicalSkills) {
        const categoriesContainer = document.getElementById('skill-categories');
        const categories = Object.entries(technicalSkills);
        
        categories.forEach(([categoryKey, categoryData], categoryIndex) => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'skill-category-cluster';
            categoryElement.dataset.category = categoryKey;
            
            // Calculate position in constellation (circular arrangement)
            const angle = (categoryIndex / categories.length) * 2 * Math.PI;
            const radius = 300;
            const x = Math.cos(angle) * radius + 600; // Center at 600,400
            const y = Math.sin(angle) * radius + 400;
            
            categoryElement.style.left = x + 'px';
            categoryElement.style.top = y + 'px';

            // Create category title
            const categoryTitle = document.createElement('div');
            categoryTitle.className = 'category-title';
            categoryTitle.innerHTML = `
                <h4>${this.formatCategoryName(categoryKey)}</h4>
                <div class="category-glow"></div>
            `;
            categoryElement.appendChild(categoryTitle);

            // Create skill nodes for this category
            this.createCategorySkills(categoryElement, categoryData, categoryKey);
            
            categoriesContainer.appendChild(categoryElement);
        });
    }

    /**
     * Create skill nodes for a specific category
     * @param {HTMLElement} categoryElement - Category container
     * @param {Object} categoryData - Category skills data
     * @param {string} categoryKey - Category key
     */
    createCategorySkills(categoryElement, categoryData, categoryKey) {
        const skillsContainer = document.createElement('div');
        skillsContainer.className = 'category-skills';

        // Flatten skills from category data
        const skills = this.flattenSkills(categoryData);
        
        skills.forEach((skill, index) => {
            const skillNode = document.createElement('div');
            skillNode.className = 'skill-node';
            skillNode.dataset.skill = skill;
            skillNode.dataset.category = categoryKey;
            
            // Position skills in orbit around category
            const skillAngle = (index / skills.length) * 2 * Math.PI;
            const skillRadius = 80 + Math.random() * 40;
            const skillX = Math.cos(skillAngle) * skillRadius;
            const skillY = Math.sin(skillAngle) * skillRadius;
            
            skillNode.style.transform = `translate(${skillX}px, ${skillY}px)`;
            skillNode.style.animationDelay = `${index * 0.1}s`;
            
            skillNode.innerHTML = `
                <div class="skill-core">
                    <span class="skill-name">${skill}</span>
                    <div class="skill-pulse"></div>
                </div>
            `;

            // Add interaction handlers
            skillNode.addEventListener('mouseenter', () => {
                this.highlightSkill(skillNode);
            });

            skillNode.addEventListener('mouseleave', () => {
                this.unhighlightSkill(skillNode);
            });

            skillNode.addEventListener('click', () => {
                this.showSkillDetails(skill, categoryKey);
            });

            skillsContainer.appendChild(skillNode);
            this.skillNodes.push({
                element: skillNode,
                skill: skill,
                category: categoryKey,
                x: skillX,
                y: skillY
            });
        });

        categoryElement.appendChild(skillsContainer);
    }

    /**
     * Flatten skills from nested category structure
     * @param {Object} categoryData - Category data
     * @returns {Array} Flattened skills array
     */
    flattenSkills(categoryData) {
        let skills = [];
        
        if (Array.isArray(categoryData)) {
            skills = categoryData;
        } else if (typeof categoryData === 'object') {
            Object.values(categoryData).forEach(value => {
                if (Array.isArray(value)) {
                    skills = skills.concat(value);
                } else if (typeof value === 'string') {
                    skills.push(value);
                }
            });
        }
        
        return skills.filter(skill => typeof skill === 'string' && skill.trim());
    }

    /**
     * Create detailed skills view
     * @param {Object} technicalSkills - Technical skills data
     */
    createDetailedView(technicalSkills) {
        const detailView = document.createElement('div');
        detailView.className = 'skills-detail-view';
        detailView.innerHTML = `
            <div class="detail-header">
                <h4>Skill Details</h4>
                <div class="detail-stats">
                    <div class="stat">
                        <span class="stat-number">${this.getTotalSkillCount(technicalSkills)}</span>
                        <span class="stat-label">Technologies Mastered</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${Object.keys(technicalSkills).length}</span>
                        <span class="stat-label">Skill Domains</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">10+</span>
                        <span class="stat-label">Years Experience</span>
                    </div>
                </div>
            </div>
            <div class="detail-content" id="skill-detail-content">
                <div class="detail-placeholder">
                    <i class="fas fa-mouse-pointer"></i>
                    <p>Hover over skills to explore the technical universe</p>
                </div>
            </div>
        `;

        this.container.appendChild(detailView);
    }

    /**
     * Get total count of all skills
     * @param {Object} technicalSkills - Technical skills data
     * @returns {number} Total skill count
     */
    getTotalSkillCount(technicalSkills) {
        let total = 0;
        Object.values(technicalSkills).forEach(category => {
            const skills = this.flattenSkills(category);
            total += skills.length;
        });
        return total;
    }

    /**
     * Draw connections between skill nodes
     */
    drawConnections() {
        const svg = this.container.querySelector('.skill-connections');
        if (!svg) return;

        // Clear existing connections
        svg.innerHTML = '';

        // Create connections between related skills
        this.skillNodes.forEach((nodeA, indexA) => {
            this.skillNodes.forEach((nodeB, indexB) => {
                if (indexA >= indexB) return;

                // Check if skills are related
                if (this.areSkillsRelated(nodeA.skill, nodeB.skill) || 
                    nodeA.category === nodeB.category) {
                    
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    const rectA = nodeA.element.getBoundingClientRect();
                    const rectB = nodeB.element.getBoundingClientRect();
                    const svgRect = svg.getBoundingClientRect();
                    
                    line.setAttribute('x1', rectA.left - svgRect.left + rectA.width / 2);
                    line.setAttribute('y1', rectA.top - svgRect.top + rectA.height / 2);
                    line.setAttribute('x2', rectB.left - svgRect.left + rectB.width / 2);
                    line.setAttribute('y2', rectB.top - svgRect.top + rectB.height / 2);
                    line.classList.add('skill-connection');
                    
                    // Add opacity based on relationship strength
                    const opacity = nodeA.category === nodeB.category ? 0.6 : 0.3;
                    line.style.opacity = opacity;
                    
                    svg.appendChild(line);
                    this.skillConnections.push(line);
                }
            });
        });
    }

    /**
     * Check if two skills are related
     * @param {string} skillA - First skill
     * @param {string} skillB - Second skill
     * @returns {boolean} Whether skills are related
     */
    areSkillsRelated(skillA, skillB) {
        const relatedPairs = [
            ['React', 'JavaScript'], ['React', 'TypeScript'], ['Node.js', 'JavaScript'],
            ['Docker', 'Kubernetes'], ['AWS', 'Docker'], ['PostgreSQL', 'SQL'],
            ['MongoDB', 'NoSQL'], ['Jest', 'JavaScript'], ['GraphQL', 'API']
        ];

        return relatedPairs.some(pair => 
            (pair.includes(skillA) && pair.includes(skillB))
        );
    }

    /**
     * Select and filter by category
     * @param {string} category - Category to show
     */
    selectCategory(category) {
        this.selectedCategory = category;

        const clusters = this.container.querySelectorAll('.skill-category-cluster');
        const connections = this.container.querySelectorAll('.skill-connection');

        if (category === 'all') {
            // Show all
            clusters.forEach(cluster => {
                cluster.style.opacity = '1';
                cluster.style.transform = 'scale(1)';
            });
            connections.forEach(conn => conn.style.opacity = '0.3');
        } else {
            // Filter by category
            clusters.forEach(cluster => {
                if (cluster.dataset.category === category) {
                    cluster.style.opacity = '1';
                    cluster.style.transform = 'scale(1.1)';
                    cluster.classList.add('category-focused');
                } else {
                    cluster.style.opacity = '0.3';
                    cluster.style.transform = 'scale(0.8)';
                    cluster.classList.remove('category-focused');
                }
            });

            // Highlight relevant connections
            connections.forEach(conn => {
                conn.style.opacity = '0.1';
            });
        }
    }

    /**
     * Highlight skill on hover
     * @param {HTMLElement} skillNode - Skill node element
     */
    highlightSkill(skillNode) {
        const skill = skillNode.dataset.skill;
        const category = skillNode.dataset.category;

        // Enhance the hovered skill
        skillNode.classList.add('skill-highlighted');

        // Show skill details
        this.showSkillInfo(skill, category);

        // Dim other skills
        this.skillNodes.forEach(node => {
            if (node.element !== skillNode) {
                node.element.style.opacity = '0.4';
            }
        });

        // Highlight related connections
        this.highlightRelatedConnections(skillNode);
    }

    /**
     * Remove skill highlight
     * @param {HTMLElement} skillNode - Skill node element
     */
    unhighlightSkill(skillNode) {
        skillNode.classList.remove('skill-highlighted');

        // Restore all skills
        this.skillNodes.forEach(node => {
            node.element.style.opacity = '1';
        });

        // Reset connections
        this.skillConnections.forEach(conn => {
            conn.style.opacity = '0.3';
            conn.classList.remove('connection-highlighted');
        });
    }

    /**
     * Highlight connections related to a skill
     * @param {HTMLElement} skillNode - Skill node element
     */
    highlightRelatedConnections(skillNode) {
        const skill = skillNode.dataset.skill;
        
        this.skillNodes.forEach(node => {
            if (this.areSkillsRelated(skill, node.skill) || 
                node.category === skillNode.dataset.category) {
                node.element.style.opacity = '1';
            }
        });

        // Highlight specific connections
        this.skillConnections.forEach(conn => {
            const x1 = parseFloat(conn.getAttribute('x1'));
            const y1 = parseFloat(conn.getAttribute('y1'));
            const x2 = parseFloat(conn.getAttribute('x2'));
            const y2 = parseFloat(conn.getAttribute('y2'));
            
            const skillRect = skillNode.getBoundingClientRect();
            const skillX = skillRect.left + skillRect.width / 2;
            const skillY = skillRect.top + skillRect.height / 2;
            
            // Check if connection is related to the hovered skill
            if (this.isConnectionRelated(conn, skillNode)) {
                conn.style.opacity = '0.8';
                conn.classList.add('connection-highlighted');
            } else {
                conn.style.opacity = '0.1';
            }
        });
    }

    /**
     * Check if a connection is related to a skill node
     * @param {SVGElement} connection - SVG line element
     * @param {HTMLElement} skillNode - Skill node element
     * @returns {boolean} Whether the connection is related
     */
    isConnectionRelated(connection, skillNode) {
        const skillRect = skillNode.getBoundingClientRect();
        const skillX = skillRect.left + skillRect.width / 2;
        const skillY = skillRect.top + skillRect.height / 2;
        
        const x1 = parseFloat(connection.getAttribute('x1'));
        const y1 = parseFloat(connection.getAttribute('y1'));
        const x2 = parseFloat(connection.getAttribute('x2'));
        const y2 = parseFloat(connection.getAttribute('y2'));
        
        // Check if either end of the connection is near the skill node
        const distance1 = Math.sqrt(Math.pow(x1 - skillX, 2) + Math.pow(y1 - skillY, 2));
        const distance2 = Math.sqrt(Math.pow(x2 - skillX, 2) + Math.pow(y2 - skillY, 2));
        
        return distance1 < 50 || distance2 < 50;
    }

    /**
     * Show skill information in detail panel
     * @param {string} skill - Skill name
     * @param {string} category - Skill category
     */
    showSkillInfo(skill, category) {
        const detailContent = document.getElementById('skill-detail-content');
        if (!detailContent) return;

        const skillInfo = this.getSkillInfo(skill, category);
        
        detailContent.innerHTML = `
            <div class="skill-info-card">
                <div class="skill-info-header">
                    <h5>${skill}</h5>
                    <span class="skill-category-badge">${this.formatCategoryName(category)}</span>
                </div>
                <div class="skill-info-body">
                    <div class="skill-description">
                        <p>${skillInfo.description}</p>
                    </div>
                    <div class="skill-experience">
                        <div class="experience-bar">
                            <div class="experience-fill" style="width: ${skillInfo.proficiency}%"></div>
                        </div>
                        <span class="experience-label">${skillInfo.experienceLevel}</span>
                    </div>
                    <div class="skill-projects">
                        <h6>Recent Projects</h6>
                        <ul>
                            ${skillInfo.projects.map(project => `<li>${project}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Get detailed information about a skill
     * @param {string} skill - Skill name
     * @param {string} category - Skill category
     * @returns {Object} Skill information
     */
    getSkillInfo(skill, category) {
        // This would typically come from a more detailed data source
        const skillDatabase = {
            'React': {
                description: 'Advanced proficiency in React.js for building dynamic user interfaces with hooks, context, and modern patterns.',
                proficiency: 95,
                experienceLevel: 'Expert',
                projects: ['SSENSE Shipping Platform', 'RugSimple Customer Portal', 'COVID-19 Testing Platform']
            },
            'TypeScript': {
                description: 'Strong typing system expertise for scalable JavaScript applications with advanced type inference.',
                proficiency: 90,
                experienceLevel: 'Expert',
                projects: ['SSENSE Backend APIs', 'Microservices Architecture', 'GraphQL Schema Design']
            },
            'AWS': {
                description: 'Cloud infrastructure management with Lambda, EC2, SQS, SNS, and comprehensive AWS ecosystem.',
                proficiency: 85,
                experienceLevel: 'Advanced',
                projects: ['Event-Driven Architecture', 'Serverless Functions', 'Auto-scaling Systems']
            },
            'Docker': {
                description: 'Containerization and orchestration for consistent deployment environments and scalable systems.',
                proficiency: 88,
                experienceLevel: 'Advanced',
                projects: ['CI/CD Pipelines', 'Microservices Deployment', 'Development Environment Setup']
            }
        };

        return skillDatabase[skill] || {
            description: `Experienced in ${skill} with practical application in enterprise environments.`,
            proficiency: 80,
            experienceLevel: 'Proficient',
            projects: ['Various Production Systems', 'Team Collaborations', 'Technical Implementations']
        };
    }

    /**
     * Show detailed skill modal
     * @param {string} skill - Skill name
     * @param {string} category - Skill category
     */
    showSkillDetails(skill, category) {
        const skillInfo = this.getSkillInfo(skill, category);
        
        const modal = document.createElement('div');
        modal.className = 'skill-detail-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${skill}</h3>
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="skill-proficiency-chart">
                        <div class="proficiency-circle" data-percentage="${skillInfo.proficiency}">
                            <svg viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="50" class="circle-bg"/>
                                <circle cx="60" cy="60" r="50" class="circle-progress"
                                        stroke-dasharray="${2 * Math.PI * 50}"
                                        stroke-dashoffset="${2 * Math.PI * 50 * (1 - skillInfo.proficiency / 100)}"/>
                            </svg>
                            <div class="percentage-text">${skillInfo.proficiency}%</div>
                        </div>
                        <p class="proficiency-label">${skillInfo.experienceLevel}</p>
                    </div>
                    
                    <div class="skill-details-content">
                        <div class="skill-description">
                            <h4>Technical Expertise</h4>
                            <p>${skillInfo.description}</p>
                        </div>
                        
                        <div class="skill-timeline">
                            <h4>Project Applications</h4>
                            <div class="timeline-items">
                                ${skillInfo.projects.map((project, index) => `
                                    <div class="timeline-item" style="animation-delay: ${index * 0.1}s">
                                        <div class="timeline-marker"></div>
                                        <div class="timeline-content">${project}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);

        // Handle close
        const closeBtn = modal.querySelector('.modal-close');
        const backdrop = modal.querySelector('.modal-backdrop');
        
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        };

        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);
    }

    /**
     * Format category name for display
     * @param {string} categoryKey - Category key
     * @returns {string} Formatted name
     */
    formatCategoryName(categoryKey) {
        const nameMap = {
            cloudDevOps: 'Cloud & DevOps',
            backendApis: 'Backend & APIs',
            frontend: 'Frontend',
            testingObservability: 'Testing & Observability',
            databases: 'Databases',
            developmentTools: 'Development Tools'
        };
        
        return nameMap[categoryKey] || categoryKey.replace(/([A-Z])/g, ' $1').trim();
    }

    /**
     * Setup animations
     */
    setupAnimations() {
        // Orbit animation for skill nodes
        this.startOrbitAnimation();

        // Intersection observer for constellation reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('constellation-visible');
                    this.animateSkillNodes();
                }
            });
        }, { threshold: 0.3 });

        const constellation = this.container.querySelector('.skills-constellation');
        if (constellation) {
            observer.observe(constellation);
        }
    }

    /**
     * Start orbit animation for skill nodes
     */
    startOrbitAnimation() {
        let time = 0;
        
        const animate = () => {
            time += 0.01;
            
            this.skillNodes.forEach((node, index) => {
                const orbitSpeed = 0.001 + (index % 3) * 0.0005;
                const orbitRadius = 2;
                
                const offsetX = Math.cos(time * orbitSpeed) * orbitRadius;
                const offsetY = Math.sin(time * orbitSpeed) * orbitRadius;
                
                node.element.style.transform = `translate(${node.x + offsetX}px, ${node.y + offsetY}px)`;
            });
            
            this.animationFrame = requestAnimationFrame(animate);
        };
        
        animate();
    }

    /**
     * Animate skill nodes entrance
     */
    animateSkillNodes() {
        this.skillNodes.forEach((node, index) => {
            setTimeout(() => {
                node.element.classList.add('skill-node-visible');
            }, index * 50);
        });
    }

    /**
     * Setup interactions
     */
    setupInteractions() {
        // Constellation rotation based on mouse position
        let mouseX = 0;
        let mouseY = 0;
        
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            mouseX = (e.clientX - rect.left) / rect.width - 0.5;
            mouseY = (e.clientY - rect.top) / rect.height - 0.5;
            
            const constellation = this.container.querySelector('.skills-constellation');
            if (constellation) {
                constellation.style.transform = `rotateX(${mouseY * 5}deg) rotateY(${mouseX * 5}deg)`;
            }
        });

        // Reset on mouse leave
        this.container.addEventListener('mouseleave', () => {
            const constellation = this.container.querySelector('.skills-constellation');
            if (constellation) {
                constellation.style.transform = 'rotateX(0deg) rotateY(0deg)';
            }
        });
    }

    /**
     * Update component with new data
     * @param {Object} data - New profile data
     */
    update(data) {
        // Stop current animations
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Clear arrays
        this.skillNodes = [];
        this.skillConnections = [];
        
        // Re-render
        this.render(data);
        this.setupAnimations();
    }

    /**
     * Handle component visibility
     */
    onVisible() {
        // Restart orbit animation
        if (!this.animationFrame) {
            this.startOrbitAnimation();
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Redraw connections with new positions
        setTimeout(() => this.drawConnections(), 100);
    }

    /**
     * Dispose component
     */
    dispose() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

// Export to global scope
window.SkillsComponent = SkillsComponent;