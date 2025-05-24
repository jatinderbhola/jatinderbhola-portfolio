/**
 * Experience Component
 * Creates an interactive timeline of professional experience
 */

class ExperienceComponent {
    constructor() {
        this.container = document.getElementById('experience-content');
        this.timelineItems = [];
        this.currentActiveItem = null;
        this.scrollProgress = 0;
    }

    /**
     * Initialize experience component
     */
    async init() {
        try {
            const data = window.dataLoader.getCurrentProfile();
            if (data) {
                this.render(data);
            }
            
            this.setupAnimations();
            this.setupInteractions();
            
            console.log('✅ Experience component initialized');
        } catch (error) {
            console.error('❌ Experience component initialization failed:', error);
        }
    }

    /**
     * Render experience timeline
     * @param {Object} data - Profile data
     */
    render(data) {
        if (!data || !data.experience) return;

        this.container.innerHTML = '';

        // Create timeline container
        const timelineContainer = document.createElement('div');
        timelineContainer.className = 'experience-timeline-container';
        
        // Create timeline statistics
        this.createTimelineStats(data);

        // Create main timeline
        const timeline = document.createElement('div');
        timeline.className = 'experience-timeline';
        timeline.innerHTML = `
            <div class="timeline-line">
                <div class="timeline-progress" id="timeline-progress"></div>
                <div class="timeline-rocket">
                    <i class="fas fa-rocket"></i>
                </div>
            </div>
        `;

        // Create experience items
        data.experience.forEach((exp, index) => {
            const timelineItem = this.createTimelineItem(exp, index);
            timeline.appendChild(timelineItem);
        });

        timelineContainer.appendChild(timeline);
        this.container.appendChild(timelineContainer);

        // Create experience details panel
        this.createDetailsPanel();
    }

    /**
     * Create timeline statistics
     * @param {Object} data - Profile data
     */
    createTimelineStats(data) {
        const stats = this.calculateStats(data);
        
        const statsSection = document.createElement('div');
        statsSection.className = 'timeline-stats';
        statsSection.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <div class="stat-content">
                        <span class="stat-number">${stats.totalYears}+</span>
                        <span class="stat-label">Years Experience</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-building"></i>
                    </div>
                    <div class="stat-content">
                        <span class="stat-number">${stats.companies}</span>
                        <span class="stat-label">Companies</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="stat-content">
                        <span class="stat-number">$${(stats.revenueImpact / 1000).toFixed(1)}M+</span>
                        <span class="stat-label">Revenue Impact</span>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-content">
                        <span class="stat-number">${stats.teamSize}+</span>
                        <span class="stat-label">Team Members Led</span>
                    </div>
                </div>
            </div>
        `;

        this.container.appendChild(statsSection);
    }

    /**
     * Calculate experience statistics
     * @param {Object} data - Profile data
     * @returns {Object} Calculated statistics
     */
    calculateStats(data) {
        const currentYear = new Date().getFullYear();
        let totalYears = 0;
        let revenueImpact = 0;
        let teamSize = 0;

        data.experience.forEach(exp => {
            // Calculate years for each position
            const years = this.calculateYearsFromDuration(exp.duration, currentYear);
            totalYears += years;

            // Extract revenue impact from achievements
            exp.achievements.forEach(achievement => {
                const revenueMatch = achievement.match(/\$([0-9,]+)K/g);
                if (revenueMatch) {
                    revenueMatch.forEach(match => {
                        const amount = parseInt(match.replace(/\$|K|,/g, '')) * 1000;
                        revenueImpact += amount;
                    });
                }
            });

            // Extract team size
            const teamMatch = exp.achievements.join(' ').match(/team of (\d+)/i);
            if (teamMatch) {
                teamSize = Math.max(teamSize, parseInt(teamMatch[1]));
            }
        });

        return {
            totalYears: Math.floor(totalYears),
            companies: data.experience.length,
            revenueImpact: revenueImpact,
            teamSize: teamSize || 20 // Default from description
        };
    }

    /**
     * Calculate years from duration string
     * @param {string} duration - Duration string
     * @param {number} currentYear - Current year
     * @returns {number} Years
     */
    calculateYearsFromDuration(duration, currentYear) {
        if (duration.includes('Present')) {
            const startYear = parseInt(duration.match(/\d{4}/)?.[0]) || currentYear;
            return currentYear - startYear;
        }
        
        const years = duration.match(/\d{4}/g);
        if (years && years.length >= 2) {
            return parseInt(years[1]) - parseInt(years[0]);
        }
        
        return 1;
    }

    /**
     * Create timeline item
     * @param {Object} exp - Experience data
     * @param {number} index - Item index
     * @returns {HTMLElement} Timeline item element
     */
    createTimelineItem(exp, index) {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.dataset.index = index;
        
        // Determine item type styling
        const typeClass = this.getTypeClass(exp.type);
        const isLeft = index % 2 === 0;
        
        item.classList.add(isLeft ? 'timeline-left' : 'timeline-right');
        item.classList.add(typeClass);

        item.innerHTML = `
            <div class="timeline-marker">
                <div class="marker-core">
                    <i class="${this.getTypeIcon(exp.type)}"></i>
                </div>
                <div class="marker-glow"></div>
                <div class="marker-pulse"></div>
            </div>
            
            <div class="timeline-content">
                <div class="timeline-card">
                    <div class="card-header">
                        <div class="company-logo">
                            <span>${exp.company.charAt(0)}</span>
                        </div>
                        <div class="card-title">
                            <h4 class="position">${exp.position}</h4>
                            <h5 class="company">${exp.company}</h5>
                            <div class="duration">
                                <i class="fas fa-calendar"></i>
                                <span>${exp.duration}</span>
                            </div>
                            <div class="location">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${exp.location}</span>
                            </div>
                        </div>
                    </div>
                    
                    ${exp.highlights ? `
                        <div class="card-highlights">
                            ${exp.highlights.map(highlight => `
                                <span class="highlight-badge">${highlight}</span>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <div class="card-preview">
                        <p>${exp.achievements[0] ? exp.achievements[0].substring(0, 120) + '...' : ''}</p>
                        <button class="expand-btn" data-index="${index}">
                            <span>Explore Mission</span>
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    
                    <div class="card-tech-stack" ${exp.techStack ? '' : 'style="display: none;"'}>
                        <div class="tech-stack-label">Technologies:</div>
                        <div class="tech-stack-items">
                            ${exp.techStack ? exp.techStack.slice(0, 5).map(tech => `
                                <span class="tech-item">${tech}</span>
                            `).join('') : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add interaction handlers
        const expandBtn = item.querySelector('.expand-btn');
        expandBtn.addEventListener('click', () => {
            this.showExperienceDetails(exp, index);
        });

        // Add hover effects
        const card = item.querySelector('.timeline-card');
        card.addEventListener('mouseenter', () => {
            this.highlightTimelineItem(item);
        });

        card.addEventListener('mouseleave', () => {
            this.unhighlightTimelineItem(item);
        });

        this.timelineItems.push({
            element: item,
            data: exp,
            index: index
        });

        return item;
    }

    /**
     * Get CSS class for experience type
     * @param {string} type - Experience type
     * @returns {string} CSS class
     */
    getTypeClass(type) {
        const typeClasses = {
            leadership: 'timeline-leadership',
            technical: 'timeline-technical',
            engineering: 'timeline-engineering'
        };
        return typeClasses[type] || 'timeline-default';
    }

    /**
     * Get icon for experience type
     * @param {string} type - Experience type
     * @returns {string} Font Awesome icon class
     */
    getTypeIcon(type) {
        const typeIcons = {
            leadership: 'fas fa-crown',
            technical: 'fas fa-cogs',
            engineering: 'fas fa-code'
        };
        return typeIcons[type] || 'fas fa-briefcase';
    }

    /**
     * Create details panel
     */
    createDetailsPanel() {
        const panel = document.createElement('div');
        panel.className = 'experience-details-panel';
        panel.id = 'experience-details-panel';
        panel.innerHTML = `
            <div class="panel-header">
                <h4>Mission Details</h4>
                <button class="panel-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="panel-content" id="panel-content">
                <div class="panel-placeholder">
                    <i class="fas fa-rocket"></i>
                    <p>Select a mission to explore the journey</p>
                </div>
            </div>
        `;

        this.container.appendChild(panel);

        // Add close handler
        const closeBtn = panel.querySelector('.panel-close');
        closeBtn.addEventListener('click', () => {
            this.hideDetailsPanel();
        });
    }

    /**
     * Show experience details
     * @param {Object} exp - Experience data
     * @param {number} index - Experience index
     */
    showExperienceDetails(exp, index) {
        const panel = document.getElementById('experience-details-panel');
        const content = document.getElementById('panel-content');
        
        if (!panel || !content) return;

        content.innerHTML = `
            <div class="experience-detail-card">
                <div class="detail-header">
                    <div class="company-info">
                        <div class="company-logo-large">
                            <span>${exp.company.charAt(0)}</span>
                        </div>
                        <div class="company-details">
                            <h3>${exp.position}</h3>
                            <h4>${exp.company}</h4>
                            <div class="meta-info">
                                <span><i class="fas fa-calendar"></i> ${exp.duration}</span>
                                <span><i class="fas fa-map-marker-alt"></i> ${exp.location}</span>
                                <span><i class="fas fa-briefcase"></i> ${exp.type}</span>
                            </div>
                        </div>
                    </div>
                    
                    ${exp.highlights ? `
                        <div class="detail-highlights">
                            ${exp.highlights.map(highlight => `
                                <div class="highlight-metric">
                                    <span class="metric-value">${highlight}</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <div class="detail-achievements">
                    <h5>Key Achievements</h5>
                    <div class="achievements-list">
                        ${exp.achievements.map((achievement, idx) => `
                            <div class="achievement-item" style="animation-delay: ${idx * 0.1}s">
                                <div class="achievement-icon">
                                    <i class="fas fa-star"></i>
                                </div>
                                <div class="achievement-content">
                                    <p>${achievement}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                ${exp.techStack ? `
                    <div class="detail-tech-stack">
                        <h5>Technology Stack</h5>
                        <div class="tech-constellation-mini">
                            ${exp.techStack.map((tech, idx) => `
                                <span class="tech-node-mini" style="animation-delay: ${idx * 0.05}s">
                                    ${tech}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="detail-impact">
                    <h5>Mission Impact</h5>
                    <div class="impact-visualization">
                        <div class="impact-metrics">
                            ${this.extractImpactMetrics(exp.achievements).map(metric => `
                                <div class="impact-metric">
                                    <div class="metric-icon">
                                        <i class="${metric.icon}"></i>
                                    </div>
                                    <div class="metric-info">
                                        <span class="metric-number">${metric.value}</span>
                                        <span class="metric-label">${metric.label}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Show panel
        panel.classList.add('panel-visible');
        
        // Animate achievements
        setTimeout(() => {
            content.querySelectorAll('.achievement-item').forEach((item, idx) => {
                setTimeout(() => {
                    item.classList.add('achievement-visible');
                }, idx * 100);
            });
        }, 300);
    }

    /**
     * Extract impact metrics from achievements
     * @param {Array} achievements - Achievement strings
     * @returns {Array} Extracted metrics
     */
    extractImpactMetrics(achievements) {
        const metrics = [];
        const achievementText = achievements.join(' ');

        // Revenue metrics
        const revenueMatches = achievementText.match(/\$([0-9,]+)K/g);
        if (revenueMatches) {
            const totalRevenue = revenueMatches.reduce((sum, match) => {
                return sum + parseInt(match.replace(/\$|K|,/g, ''));
            }, 0);
            metrics.push({
                icon: 'fas fa-dollar-sign',
                value: `${totalRevenue}K+`,
                label: 'Revenue Generated'
            });
        }

        // Percentage improvements
        const percentMatches = achievementText.match(/(\d+)%/g);
        if (percentMatches) {
            const avgImprovement = percentMatches.reduce((sum, match) => {
                return sum + parseInt(match.replace('%', ''));
            }, 0) / percentMatches.length;
            metrics.push({
                icon: 'fas fa-chart-line',
                value: `${Math.round(avgImprovement)}%`,
                label: 'Avg Improvement'
            });
        }

        // Uptime metrics
        const uptimeMatch = achievementText.match(/(99\.9+)%/);
        if (uptimeMatch) {
            metrics.push({
                icon: 'fas fa-shield-alt',
                value: uptimeMatch[1] + '%',
                label: 'System Uptime'
            });
        }

        // Team size
        const teamMatch = achievementText.match(/team of (\d+)/);
        if (teamMatch) {
            metrics.push({
                icon: 'fas fa-users',
                value: teamMatch[1],
                label: 'Team Members'
            });
        }

        return metrics.length > 0 ? metrics : [
            {
                icon: 'fas fa-rocket',
                value: '100%',
                label: 'Mission Success'
            }
        ];
    }

    /**
     * Hide details panel
     */
    hideDetailsPanel() {
        const panel = document.getElementById('experience-details-panel');
        if (panel) {
            panel.classList.remove('panel-visible');
        }
    }

    /**
     * Highlight timeline item
     * @param {HTMLElement} item - Timeline item
     */
    highlightTimelineItem(item) {
        // Dim other items
        this.timelineItems.forEach(timelineItem => {
            if (timelineItem.element !== item) {
                timelineItem.element.style.opacity = '0.6';
            }
        });

        // Enhance current item
        item.classList.add('timeline-highlighted');
        
        // Animate marker
        const marker = item.querySelector('.timeline-marker');
        if (marker) {
            marker.classList.add('marker-active');
        }
    }

    /**
     * Remove timeline item highlight
     * @param {HTMLElement} item - Timeline item
     */
    unhighlightTimelineItem(item) {
        // Restore all items
        this.timelineItems.forEach(timelineItem => {
            timelineItem.element.style.opacity = '1';
        });

        item.classList.remove('timeline-highlighted');
        
        const marker = item.querySelector('.timeline-marker');
        if (marker) {
            marker.classList.remove('marker-active');
        }
    }

    /**
     * Setup animations
     */
    setupAnimations() {
        // Intersection observer for timeline items
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('timeline-visible');
                    
                    // Update progress line
                    this.updateTimelineProgress();
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '-50px 0px'
        });

        // Observe timeline items
        this.timelineItems.forEach(item => {
            observer.observe(item.element);
        });

        // Setup scroll-based timeline progress
        this.setupScrollProgress();
    }

    /**
     * Setup scroll progress tracking
     */
    setupScrollProgress() {
        let ticking = false;
        
        const updateProgress = () => {
            const section = document.getElementById('experience');
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const progress = Math.max(0, Math.min(1, 
                    (window.innerHeight - rect.top) / (rect.height + window.innerHeight)
                ));
                
                this.scrollProgress = progress;
                this.updateTimelineProgress();
                this.updateRocketPosition(progress);
            }
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    /**
     * Update timeline progress line
     */
    updateTimelineProgress() {
        const progressLine = document.getElementById('timeline-progress');
        if (!progressLine) return;

        // Calculate how many items are visible
        const visibleItems = this.timelineItems.filter(item => 
            item.element.classList.contains('timeline-visible')
        ).length;

        const totalItems = this.timelineItems.length;
        const progress = totalItems > 0 ? (visibleItems / totalItems) * 100 : 0;

        progressLine.style.height = `${progress}%`;
    }

    /**
     * Update rocket position based on scroll
     * @param {number} progress - Scroll progress (0-1)
     */
    updateRocketPosition(progress) {
        const rocket = this.container.querySelector('.timeline-rocket');
        if (!rocket) return;

        const rocketProgress = Math.min(progress * 1.2, 1); // Slightly faster than scroll
        rocket.style.top = `${rocketProgress * 100}%`;
        
        // Add boost effect when moving
        if (progress > 0.1) {
            rocket.classList.add('rocket-boosting');
        } else {
            rocket.classList.remove('rocket-boosting');
        }
    }

    /**
     * Setup interactions
     */
    setupInteractions() {
        // Timeline item click navigation
        this.timelineItems.forEach(item => {
            item.element.addEventListener('click', () => {
                this.showExperienceDetails(item.data, item.index);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideDetailsPanel();
            }
        });
    }

    /**
     * Update component with new data
     * @param {Object} data - New profile data
     */
    update(data) {
        this.timelineItems = [];
        this.render(data);
        this.setupAnimations();
    }

    /**
     * Handle component visibility
     */
    onVisible() {
        // Trigger rocket animation
        const rocket = this.container.querySelector('.timeline-rocket');
        if (rocket) {
            rocket.classList.add('rocket-launch');
        }

        // Start timeline progression
        this.updateTimelineProgress();
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Recalculate timeline positions
        this.updateTimelineProgress();
    }
}

// Export to global scope
window.ExperienceComponent = ExperienceComponent;