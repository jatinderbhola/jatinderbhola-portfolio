/**
 * AI Showcase Component
 * Displays AI innovation projects and achievements
 */

class AiShowcaseComponent {
    constructor() {
        this.container = document.getElementById('ai-content');
        this.animatedElements = [];
        this.metrics = new Map();
        this.currentSlide = 0;
    }

    /**
     * Initialize AI showcase component
     */
    async init() {
        try {
            const data = window.dataLoader.getCurrentProfile();
            if (data) {
                this.render(data);
            }
            
            this.setupAnimations();
            this.setupInteractions();
            
            console.log('✅ AI Showcase component initialized');
        } catch (error) {
            console.error('❌ AI Showcase component initialization failed:', error);
        }
    }

    /**
     * Render AI showcase content
     * @param {Object} data - Profile data
     */
    render(data) {
        if (!data || !data.latestAiProduct) return;

        const aiProduct = data.latestAiProduct;
        this.container.innerHTML = '';

        // Create main showcase structure
        const showcase = document.createElement('div');
        showcase.className = 'ai-showcase-main';
        showcase.innerHTML = `
            <div class="ai-hero">
                <div class="ai-brain-visual">
                    <div class="brain-core"></div>
                    <div class="neural-paths"></div>
                    <div class="data-streams"></div>
                </div>
                <div class="ai-hero-content">
                    <h3 class="ai-title">${aiProduct.title}</h3>
                    <p class="ai-tagline">${aiProduct.tagline || ''}</p>
                    <p class="ai-description">${aiProduct.description}</p>
                    <div class="ai-vision">
                        <i class="fas fa-lightbulb"></i>
                        <span>${aiProduct.futureVision || 'Shaping the future of development'}</span>
                    </div>
                </div>
            </div>
        `;

        this.container.appendChild(showcase);

        // Create initiatives grid
        this.createInitiativesGrid(aiProduct.initiatives);

        // Create metrics dashboard
        this.createMetricsDashboard(aiProduct);

        // Create technology stack
        this.createTechnologyStack(aiProduct.technologies);

        // Create impact section
        this.createImpactSection(aiProduct.impact);
    }

    /**
     * Create initiatives grid
     * @param {Array} initiatives - AI initiatives
     */
    createInitiativesGrid(initiatives) {
        if (!initiatives || initiatives.length === 0) return;

        const gridContainer = document.createElement('div');
        gridContainer.className = 'ai-initiatives-grid';

        initiatives.forEach((initiative, index) => {
            const card = document.createElement('div');
            card.className = 'ai-initiative-card';
            card.style.animationDelay = `${index * 0.2}s`;
            
            card.innerHTML = `
                <div class="initiative-header">
                    <div class="initiative-icon">
                        <i class="${initiative.icon || 'fas fa-brain'}"></i>
                    </div>
                    <h4 class="initiative-name">${initiative.name}</h4>
                </div>
                <p class="initiative-description">${initiative.description}</p>
                <div class="initiative-metrics">
                    ${initiative.metrics ? initiative.metrics.map(metric => 
                        `<span class="metric-badge">${metric}</span>`
                    ).join('') : ''}
                </div>
                <div class="neural-connection-line"></div>
            `;

            // Add hover effects
            card.addEventListener('mouseenter', () => {
                this.animateCard(card, 'enter');
            });

            card.addEventListener('mouseleave', () => {
                this.animateCard(card, 'leave');
            });

            // Add click interaction
            card.addEventListener('click', () => {
                this.showInitiativeDetails(initiative, index);
            });

            gridContainer.appendChild(card);
        });

        this.container.appendChild(gridContainer);
    }

    /**
     * Create metrics dashboard
     * @param {Object} aiProduct - AI product data
     */
    createMetricsDashboard(aiProduct) {
        const dashboard = document.createElement('div');
        dashboard.className = 'ai-metrics-dashboard';
        
        dashboard.innerHTML = `
            <h4 class="dashboard-title">
                <i class="fas fa-chart-line"></i>
                Neural Performance Metrics
            </h4>
            <div class="metrics-grid" id="metrics-grid">
                <!-- Metrics will be populated by animation -->
            </div>
        `;

        this.container.appendChild(dashboard);

        // Extract and animate metrics
        this.extractAndAnimateMetrics(aiProduct);
    }

    /**
     * Extract and animate metrics from AI product data
     * @param {Object} aiProduct - AI product data
     */
    extractAndAnimateMetrics(aiProduct) {
        const metricsGrid = document.getElementById('metrics-grid');
        if (!metricsGrid) return;

        // Extract metrics from initiatives
        const allMetrics = [];
        if (aiProduct.initiatives) {
            aiProduct.initiatives.forEach(initiative => {
                if (initiative.metrics) {
                    initiative.metrics.forEach(metric => {
                        const match = metric.match(/(\d+)%?\s*(.+)/);
                        if (match) {
                            allMetrics.push({
                                value: parseInt(match[1]),
                                unit: metric.includes('%') ? '%' : '',
                                label: match[2] || metric,
                                category: initiative.name
                            });
                        }
                    });
                }
            });
        }

        // Add impact metrics
        if (aiProduct.impact) {
            const impactMatches = aiProduct.impact.match(/(\d+)%/g);
            if (impactMatches) {
                impactMatches.forEach((match, index) => {
                    const value = parseInt(match);
                    const labels = ['time-to-merge reduction', 'build failure decrease'];
                    allMetrics.push({
                        value: value,
                        unit: '%',
                        label: labels[index] || 'improvement',
                        category: 'Overall Impact'
                    });
                });
            }
        }

        // Create metric cards
        allMetrics.forEach((metric, index) => {
            const metricCard = document.createElement('div');
            metricCard.className = 'metric-card';
            metricCard.innerHTML = `
                <div class="metric-value">
                    <span class="metric-number" data-target="${metric.value}">0</span>
                    <span class="metric-unit">${metric.unit}</span>
                </div>
                <div class="metric-label">${metric.label}</div>
                <div class="metric-category">${metric.category}</div>
                <div class="metric-progress">
                    <div class="progress-bar" data-progress="${metric.value}"></div>
                </div>
            `;

            metricsGrid.appendChild(metricCard);

            // Animate metric when visible
            setTimeout(() => {
                this.animateMetric(metricCard, metric.value);
            }, index * 200);
        });
    }

    /**
     * Animate individual metric
     * @param {HTMLElement} card - Metric card element
     * @param {number} targetValue - Target value to animate to
     */
    animateMetric(card, targetValue) {
        const numberElement = card.querySelector('.metric-number');
        const progressBar = card.querySelector('.progress-bar');
        
        let currentValue = 0;
        const increment = targetValue / 60; // 60 frames for 1 second animation
        
        const animateValue = () => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                numberElement.textContent = Math.round(currentValue);
                progressBar.style.width = `${(currentValue / 100) * 100}%`;
                return;
            }
            
            numberElement.textContent = Math.round(currentValue);
            progressBar.style.width = `${(currentValue / 100) * 100}%`;
            requestAnimationFrame(animateValue);
        };

        animateValue();
    }

    /**
     * Create technology stack visualization
     * @param {Array} technologies - Technology array
     */
    createTechnologyStack(technologies) {
        if (!technologies || technologies.length === 0) return;

        const stackContainer = document.createElement('div');
        stackContainer.className = 'ai-tech-stack';
        
        stackContainer.innerHTML = `
            <h4 class="stack-title">
                <i class="fas fa-cogs"></i>
                Neural Technology Stack
            </h4>
            <div class="tech-constellation">
                ${technologies.map((tech, index) => `
                    <div class="tech-node" style="--delay: ${index * 0.1}s">
                        <span class="tech-name">${tech}</span>
                        <div class="tech-glow"></div>
                    </div>
                `).join('')}
            </div>
        `;

        this.container.appendChild(stackContainer);

        // Add connection lines between tech nodes
        this.createTechConnections(stackContainer);
    }

    /**
     * Create connections between technology nodes
     * @param {HTMLElement} container - Tech stack container
     */
    createTechConnections(container) {
        const nodes = container.querySelectorAll('.tech-node');
        const constellation = container.querySelector('.tech-constellation');
        
        // Create SVG overlay for connections
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('tech-connections');
        constellation.appendChild(svg);

        // Calculate and draw connections
        setTimeout(() => {
            const nodePositions = Array.from(nodes).map(node => {
                const rect = node.getBoundingClientRect();
                const containerRect = constellation.getBoundingClientRect();
                return {
                    x: rect.left - containerRect.left + rect.width / 2,
                    y: rect.top - containerRect.top + rect.height / 2
                };
            });

            // Draw connections between nearby nodes
            for (let i = 0; i < nodePositions.length; i++) {
                for (let j = i + 1; j < nodePositions.length; j++) {
                    const distance = Math.sqrt(
                        Math.pow(nodePositions[i].x - nodePositions[j].x, 2) +
                        Math.pow(nodePositions[i].y - nodePositions[j].y, 2)
                    );

                    if (distance < 200) { // Only connect nearby nodes
                        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                        line.setAttribute('x1', nodePositions[i].x);
                        line.setAttribute('y1', nodePositions[i].y);
                        line.setAttribute('x2', nodePositions[j].x);
                        line.setAttribute('y2', nodePositions[j].y);
                        line.classList.add('tech-connection');
                        svg.appendChild(line);
                    }
                }
            }
        }, 100);
    }

    /**
     * Create impact section
     * @param {string} impact - Impact description
     */
    createImpactSection(impact) {
        if (!impact) return;

        const impactSection = document.createElement('div');
        impactSection.className = 'ai-impact-section';
        
        impactSection.innerHTML = `
            <div class="impact-visual">
                <div class="impact-waves">
                    <div class="wave wave-1"></div>
                    <div class="wave wave-2"></div>
                    <div class="wave wave-3"></div>
                </div>
                <div class="impact-core">
                    <i class="fas fa-rocket"></i>
                </div>
            </div>
            <div class="impact-content">
                <h4 class="impact-title">Global Impact Achieved</h4>
                <p class="impact-description">${impact}</p>
                <div class="impact-stats">
                    <div class="stat">
                        <span class="stat-number">10+</span>
                        <span class="stat-label">Services Enhanced</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">100+</span>
                        <span class="stat-label">Developers Empowered</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">∞</span>
                        <span class="stat-label">Future Possibilities</span>
                    </div>
                </div>
            </div>
        `;

        this.container.appendChild(impactSection);
    }

    /**
     * Animate card interactions
     * @param {HTMLElement} card - Card element
     * @param {string} type - Animation type ('enter' or 'leave')
     */
    animateCard(card, type) {
        if (type === 'enter') {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 245, 255, 0.3)';
            
            // Animate neural connection
            const connection = card.querySelector('.neural-connection-line');
            if (connection) {
                connection.style.opacity = '1';
                connection.style.transform = 'scaleX(1)';
            }
        } else {
            card.style.transform = '';
            card.style.boxShadow = '';
            
            const connection = card.querySelector('.neural-connection-line');
            if (connection) {
                connection.style.opacity = '0.3';
                connection.style.transform = 'scaleX(0.8)';
            }
        }
    }

    /**
     * Show detailed view of an initiative
     * @param {Object} initiative - Initiative data
     * @param {number} index - Initiative index
     */
    showInitiativeDetails(initiative, index) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'ai-initiative-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-icon">
                        <i class="${initiative.icon || 'fas fa-brain'}"></i>
                    </div>
                    <h3>${initiative.name}</h3>
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <p class="initiative-detail-description">${initiative.description}</p>
                    
                    ${initiative.metrics ? `
                        <div class="detail-metrics">
                            <h4>Key Achievements</h4>
                            <div class="metrics-list">
                                ${initiative.metrics.map(metric => `
                                    <div class="metric-item">
                                        <i class="fas fa-check-circle"></i>
                                        <span>${metric}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="technical-details">
                        <h4>Technical Implementation</h4>
                        <div class="implementation-flow">
                            <div class="flow-step">
                                <div class="step-number">1</div>
                                <div class="step-content">
                                    <h5>Analysis & Planning</h5>
                                    <p>Identified optimization opportunities and defined success metrics</p>
                                </div>
                            </div>
                            <div class="flow-step">
                                <div class="step-number">2</div>
                                <div class="step-content">
                                    <h5>Implementation</h5>
                                    <p>Deployed AI-powered solutions with continuous monitoring</p>
                                </div>
                            </div>
                            <div class="flow-step">
                                <div class="step-number">3</div>
                                <div class="step-content">
                                    <h5>Optimization</h5>
                                    <p>Fine-tuned algorithms based on real-world performance data</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Add entrance animation
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        // Handle close events
        const closeBtn = modal.querySelector('.modal-close');
        const backdrop = modal.querySelector('.modal-backdrop');
        
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        };

        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);
        
        // Close on escape key
        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleKeydown);
            }
        };
        document.addEventListener('keydown', handleKeydown);
    }

    /**
     * Setup animations
     */
    setupAnimations() {
        // Intersection observer for AI showcase animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ai-animate-in');
                    
                    // Trigger specific animations based on element type
                    if (entry.target.classList.contains('ai-initiative-card')) {
                        this.animateInitiativeCard(entry.target);
                    }
                }
            });
        }, { threshold: 0.2 });

        // Observe animated elements
        setTimeout(() => {
            this.container.querySelectorAll('.ai-initiative-card, .metric-card, .tech-node').forEach(el => {
                observer.observe(el);
            });
        }, 100);
    }

    /**
     * Animate initiative card
     * @param {HTMLElement} card - Card to animate
     */
    animateInitiativeCard(card) {
        const metrics = card.querySelectorAll('.metric-badge');
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                metric.classList.add('metric-reveal');
            }, index * 100);
        });
    }

    /**
     * Setup interactions
     */
    setupInteractions() {
        // Add scroll-based parallax effect
        let ticking = false;
        
        const updateParallax = () => {
            const scrollY = window.scrollY;
            const aiSection = document.getElementById('ai');
            
            if (aiSection) {
                const rect = aiSection.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                    
                    // Update brain visual rotation
                    const brainCore = this.container.querySelector('.brain-core');
                    if (brainCore) {
                        brainCore.style.transform = `rotate(${progress * 360}deg)`;
                    }
                    
                    // Update neural paths
                    const neuralPaths = this.container.querySelector('.neural-paths');
                    if (neuralPaths) {
                        neuralPaths.style.opacity = Math.min(progress * 2, 1);
                    }
                }
            }
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    /**
     * Update component with new data
     * @param {Object} data - New profile data
     */
    update(data) {
        this.render(data);
        this.setupAnimations();
    }

    /**
     * Handle component visibility
     */
    onVisible() {
        // Restart AI brain animation
        const brainCore = this.container.querySelector('.brain-core');
        if (brainCore) {
            brainCore.classList.add('brain-pulse');
        }

        // Animate data streams
        const dataStreams = this.container.querySelector('.data-streams');
        if (dataStreams) {
            dataStreams.classList.add('streams-active');
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Recalculate tech connections
        const techStack = this.container.querySelector('.ai-tech-stack');
        if (techStack) {
            this.createTechConnections(techStack);
        }
    }
}

// Export to global scope
window.AiShowcaseComponent = AiShowcaseComponent;