/**
 * Contact Component
 * Creates an interactive communication hub
 */

class ContactComponent {
    constructor() {
        this.container = document.getElementById('contact-content');
        this.communicationChannels = [];
        this.activeChannel = null;
        this.messageAnimation = null;
    }

    /**
     * Initialize contact component
     */
    async init() {
        try {
            const data = window.dataLoader.getCurrentProfile();
            if (data) {
                this.render(data);
            }
            
            this.setupAnimations();
            this.setupInteractions();
            
            console.log('✅ Contact component initialized');
        } catch (error) {
            console.error('❌ Contact component initialization failed:', error);
        }
    }

    /**
     * Render contact interface
     * @param {Object} data - Profile data
     */
    render(data) {
        if (!data || !data.personalInfo) return;

        const { personalInfo } = data;
        this.container.innerHTML = '';

        // Create communication hub
        const hub = document.createElement('div');
        hub.className = 'communication-hub';
        hub.innerHTML = `
            <div class="hub-core">
                <div class="signal-rings">
                    <div class="signal-ring ring-1"></div>
                    <div class="signal-ring ring-2"></div>
                    <div class="signal-ring ring-3"></div>
                </div>
                <div class="hub-avatar">
                    <div class="avatar-glow"></div>
                    <div class="avatar-initial">${personalInfo.name.charAt(0)}</div>
                </div>
                <div class="transmission-beam"></div>
            </div>
        `;

        this.container.appendChild(hub);

        // Create contact channels
        this.createContactChannels(personalInfo);

        // Create contact form
        this.createContactForm(personalInfo);

        // Create status indicators
        this.createStatusIndicators();

        // Create social proof
        this.createSocialProof(data);
    }

    /**
     * Create contact channels
     * @param {Object} personalInfo - Personal information
     */
    createContactChannels(personalInfo) {
        const channels = [
            {
                id: 'email',
                name: 'Neural Email',
                icon: 'fas fa-envelope',
                value: personalInfo.email,
                action: () => window.open(`mailto:${personalInfo.email}`, '_blank'),
                status: 'active',
                description: 'Direct quantum communication channel',
                color: '#00F5FF'
            },
            {
                id: 'linkedin',
                name: 'Professional Network',
                icon: 'fab fa-linkedin',
                value: 'Connect on LinkedIn',
                action: () => window.open(personalInfo.linkedin, '_blank'),
                status: 'active',
                description: 'Professional cosmic network',
                color: '#FF6B9D'
            },
            {
                id: 'github',
                name: 'Code Repository',
                icon: 'fab fa-github',
                value: 'Explore Code Universe',
                action: () => window.open(personalInfo.github, '_blank'),
                status: 'active',
                description: 'Open source neural pathways',
                color: '#8B5FBF'
            },
            {
                id: 'location',
                name: 'Physical Coordinates',
                icon: 'fas fa-map-marker-alt',
                value: personalInfo.location,
                action: () => this.showLocationDetails(personalInfo.location),
                status: 'info',
                description: 'Current dimensional location',
                color: '#FFD700'
            }
        ];

        const channelsGrid = document.createElement('div');
        channelsGrid.className = 'contact-channels-grid';

        channels.forEach((channel, index) => {
            const channelCard = this.createChannelCard(channel, index);
            channelsGrid.appendChild(channelCard);
            this.communicationChannels.push(channel);
        });

        this.container.appendChild(channelsGrid);
    }

    /**
     * Create individual channel card
     * @param {Object} channel - Channel data
     * @param {number} index - Channel index
     * @returns {HTMLElement} Channel card element
     */
    createChannelCard(channel, index) {
        const card = document.createElement('div');
        card.className = 'contact-channel-card';
        card.dataset.channel = channel.id;
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="channel-header">
                <div class="channel-icon" style="color: ${channel.color}">
                    <i class="${channel.icon}"></i>
                    <div class="icon-pulse" style="background: ${channel.color}20"></div>
                </div>
                <div class="channel-status ${channel.status}">
                    <div class="status-dot"></div>
                    <span>${channel.status.toUpperCase()}</span>
                </div>
            </div>
            
            <div class="channel-content">
                <h4 class="channel-name">${channel.name}</h4>
                <p class="channel-description">${channel.description}</p>
                <div class="channel-value">${channel.value}</div>
            </div>
            
            <div class="channel-footer">
                <button class="channel-connect-btn" data-channel="${channel.id}">
                    <span>Establish Link</span>
                    <i class="fas fa-satellite-dish"></i>
                </button>
                <div class="signal-strength">
                    <div class="signal-bar"></div>
                    <div class="signal-bar"></div>
                    <div class="signal-bar"></div>
                    <div class="signal-bar"></div>
                </div>
            </div>
            
            <div class="channel-particles">
                ${Array(5).fill().map(() => '<div class="particle"></div>').join('')}
            </div>
        `;

        // Add interaction handlers
        const connectBtn = card.querySelector('.channel-connect-btn');
        connectBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.activateChannel(channel);
        });

        card.addEventListener('mouseenter', () => {
            this.highlightChannel(card, channel);
        });

        card.addEventListener('mouseleave', () => {
            this.unhighlightChannel(card);
        });

        card.addEventListener('click', () => {
            this.activateChannel(channel);
        });

        return card;
    }

    /**
     * Create contact form
     * @param {Object} personalInfo - Personal information
     */
    createContactForm(personalInfo) {
        const formSection = document.createElement('div');
        formSection.className = 'contact-form-section';
        formSection.innerHTML = `
            <div class="form-header">
                <h3>Quantum Message Transmission</h3>
                <p>Send a message through the neural network</p>
            </div>
            
            <form class="contact-form" id="contact-form">
                <div class="form-group">
                    <label for="sender-name">Your Name</label>
                    <input type="text" id="sender-name" name="name" required 
                           placeholder="Enter your cosmic identifier">
                    <div class="input-glow"></div>
                </div>
                
                <div class="form-group">
                    <label for="sender-email">Your Email</label>
                    <input type="email" id="sender-email" name="email" required 
                           placeholder="your.email@universe.com">
                    <div class="input-glow"></div>
                </div>
                
                <div class="form-group">
                    <label for="message-subject">Subject</label>
                    <select id="message-subject" name="subject" required>
                        <option value="">Select transmission type</option>
                        <option value="collaboration">🤝 Collaboration Opportunity</option>
                        <option value="job-opportunity">💼 Job Opportunity</option>
                        <option value="consulting">🔧 Consulting Request</option>
                        <option value="speaking">🎤 Speaking Engagement</option>
                        <option value="mentorship">🧠 Mentorship Inquiry</option>
                        <option value="general">💭 General Inquiry</option>
                    </select>
                    <div class="input-glow"></div>
                </div>
                
                <div class="form-group">
                    <label for="message-content">Message</label>
                    <textarea id="message-content" name="message" required 
                              placeholder="Compose your quantum message..."
                              rows="6"></textarea>
                    <div class="input-glow"></div>
                    <div class="character-count">
                        <span id="char-count">0</span> / 1000 characters
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="submit-btn">
                        <span class="btn-text">Transmit Message</span>
                        <span class="btn-loading" style="display: none;">
                            <i class="fas fa-satellite-dish fa-spin"></i>
                            Transmitting...
                        </span>
                        <div class="btn-particles">
                            ${Array(6).fill().map(() => '<div class="btn-particle"></div>').join('')}
                        </div>
                    </button>
                    
                    <button type="button" class="clear-btn">
                        <i class="fas fa-trash"></i>
                        Clear All
                    </button>
                </div>
                
                <div class="form-status" id="form-status">
                    <!-- Status messages will appear here -->
                </div>
            </form>
        `;

        this.container.appendChild(formSection);
        this.setupFormHandlers(personalInfo);
    }

    /**
     * Setup form event handlers
     * @param {Object} personalInfo - Personal information
     */
    setupFormHandlers(personalInfo) {
        const form = document.getElementById('contact-form');
        const charCountElement = document.getElementById('char-count');
        const messageTextarea = document.getElementById('message-content');
        const submitBtn = form.querySelector('.submit-btn');
        const clearBtn = form.querySelector('.clear-btn');

        // Character counter
        messageTextarea.addEventListener('input', () => {
            const count = messageTextarea.value.length;
            charCountElement.textContent = count;
            charCountElement.style.color = count > 900 ? '#FF6B9D' : '#00F5FF';
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitContactForm(form, personalInfo);
        });

        // Clear form
        clearBtn.addEventListener('click', () => {
            this.clearForm(form);
        });

        // Input focus effects
        form.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('input-focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('input-focused');
            });
        });
    }

    /**
     * Submit contact form
     * @param {HTMLFormElement} form - Contact form
     * @param {Object} personalInfo - Personal information
     */
    async submitContactForm(form, personalInfo) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const statusDiv = document.getElementById('form-status');

        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'flex';
        submitBtn.disabled = true;
        submitBtn.classList.add('btn-loading-state');

        try {
            // Simulate form submission (in real app, you'd send to your backend)
            await this.simulateFormSubmission(data, personalInfo);
            
            // Show success message
            this.showFormStatus('success', 'Message transmitted successfully! Neural pathways are aligned.');
            
            // Clear form
            setTimeout(() => {
                this.clearForm(form);
            }, 2000);

            // Trigger success animation
            this.triggerTransmissionSuccess();

        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormStatus('error', 'Transmission failed. Please try alternative communication channels.');
        } finally {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-loading-state');
        }
    }

    /**
     * Simulate form submission
     * @param {Object} data - Form data
     * @param {Object} personalInfo - Personal information
     * @returns {Promise} Submission promise
     */
    async simulateFormSubmission(data, personalInfo) {
        // In a real application, you would send this to your backend
        // For now, we'll simulate the submission and create a mailto link
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Create email content
                const subject = `${data.subject.replace(/🤝|💼|🔧|🎤|🧠|💭/g, '').trim()} - Message from ${data.name}`;
                const body = `
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
Sent via Neural Resume Interface
                `.trim();

                // Open email client
                const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.open(mailtoLink);

                resolve();
            }, 2000); // Simulate network delay
        });
    }

    /**
     * Show form status message
     * @param {string} type - Status type ('success', 'error', 'info')
     * @param {string} message - Status message
     */
    showFormStatus(type, message) {
        const statusDiv = document.getElementById('form-status');
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        statusDiv.innerHTML = `
            <div class="status-message status-${type}">
                <i class="${icons[type]}"></i>
                <span>${message}</span>
            </div>
        `;

        statusDiv.classList.add('status-visible');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            statusDiv.classList.remove('status-visible');
        }, 5000);
    }

    /**
     * Clear contact form
     * @param {HTMLFormElement} form - Form to clear
     */
    clearForm(form) {
        form.reset();
        document.getElementById('char-count').textContent = '0';
        
        // Trigger clear animation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach((input, index) => {
            setTimeout(() => {
                input.parentElement.classList.add('input-clear-animation');
                setTimeout(() => {
                    input.parentElement.classList.remove('input-clear-animation');
                }, 300);
            }, index * 50);
        });
    }

    /**
     * Create status indicators
     */
    createStatusIndicators() {
        const statusSection = document.createElement('div');
        statusSection.className = 'status-indicators';
        statusSection.innerHTML = `
            <div class="status-grid">
                <div class="status-item">
                    <div class="status-icon online">
                        <i class="fas fa-circle"></i>
                    </div>
                    <div class="status-info">
                        <span class="status-label">Neural Status</span>
                        <span class="status-value">Online & Active</span>
                    </div>
                </div>
                
                <div class="status-item">
                    <div class="status-icon fast">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <div class="status-info">
                        <span class="status-label">Response Time</span>
                        <span class="status-value">< 24 Hours</span>
                    </div>
                </div>
                
                <div class="status-item">
                    <div class="status-icon secure">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="status-info">
                        <span class="status-label">Security</span>
                        <span class="status-value">Quantum Encrypted</span>
                    </div>
                </div>
                
                <div class="status-item">
                    <div class="status-icon global">
                        <i class="fas fa-globe"></i>
                    </div>
                    <div class="status-info">
                        <span class="status-label">Timezone</span>
                        <span class="status-value">EST (Toronto)</span>
                    </div>
                </div>
            </div>
        `;

        this.container.appendChild(statusSection);
    }

    /**
     * Create social proof section
     * @param {Object} data - Profile data
     */
    createSocialProof(data) {
        const socialProof = document.createElement('div');
        socialProof.className = 'social-proof-section';
        
        const stats = this.calculateContactStats(data);
        
        socialProof.innerHTML = `
            <div class="proof-header">
                <h4>Network Statistics</h4>
                <p>Current cosmic reach and influence</p>
            </div>
            
            <div class="proof-stats">
                <div class="proof-stat">
                    <div class="stat-value">${stats.connections}+</div>
                    <div class="stat-label">Professional Connections</div>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: 95%"></div>
                    </div>
                </div>
                
                <div class="proof-stat">
                    <div class="stat-value">${stats.projects}+</div>
                    <div class="stat-label">Collaborative Projects</div>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: 88%"></div>
                    </div>
                </div>
                
                <div class="proof-stat">
                    <div class="stat-value">${stats.companies}</div>
                    <div class="stat-label">Partner Organizations</div>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: 92%"></div>
                    </div>
                </div>
            </div>
            
            <div class="collaboration-preview">
                <h5>Recent Collaborations</h5>
                <div class="collab-list">
                    ${stats.recentCollabs.map(collab => `
                        <div class="collab-item">
                            <div class="collab-icon">
                                <i class="${collab.icon}"></i>
                            </div>
                            <div class="collab-info">
                                <span class="collab-name">${collab.name}</span>
                                <span class="collab-type">${collab.type}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        this.container.appendChild(socialProof);
    }

    /**
     * Calculate contact statistics
     * @param {Object} data - Profile data
     * @returns {Object} Contact statistics
     */
    calculateContactStats(data) {
        return {
            connections: 500, // Professional network size
            projects: 50,     // Number of collaborative projects
            companies: data.experience ? data.experience.length : 5,
            recentCollabs: [
                { name: 'AI Innovation Team', type: 'Technical Leadership', icon: 'fas fa-brain' },
                { name: 'Cloud Architecture', type: 'System Design', icon: 'fas fa-cloud' },
                { name: 'Developer Mentorship', type: 'Knowledge Sharing', icon: 'fas fa-graduation-cap' },
                { name: 'Open Source Projects', type: 'Community Contribution', icon: 'fab fa-github' }
            ]
        };
    }

    /**
     * Activate communication channel
     * @param {Object} channel - Channel to activate
     */
    activateChannel(channel) {
        this.activeChannel = channel;
        
        // Visual feedback
        const channelCard = document.querySelector(`[data-channel="${channel.id}"]`);
        if (channelCard) {
            channelCard.classList.add('channel-activating');
            
            // Show transmission effect
            this.showTransmissionEffect(channelCard);
            
            setTimeout(() => {
                channelCard.classList.remove('channel-activating');
                channel.action();
            }, 800);
        }
    }

    /**
     * Show transmission effect
     * @param {HTMLElement} element - Element to animate
     */
    showTransmissionEffect(element) {
        const particles = element.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            setTimeout(() => {
                particle.classList.add('particle-transmit');
                setTimeout(() => {
                    particle.classList.remove('particle-transmit');
                }, 1000);
            }, index * 100);
        });
    }

    /**
     * Highlight channel on hover
     * @param {HTMLElement} card - Channel card
     * @param {Object} channel - Channel data
     */
    highlightChannel(card, channel) {
        card.classList.add('channel-highlighted');
        
        // Enhance signal strength animation
        const signalBars = card.querySelectorAll('.signal-bar');
        signalBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.classList.add('signal-active');
            }, index * 100);
        });

        // Update hub transmission beam color
        const transmissionBeam = this.container.querySelector('.transmission-beam');
        if (transmissionBeam) {
            transmissionBeam.style.background = `linear-gradient(45deg, transparent, ${channel.color}50, transparent)`;
        }
    }

    /**
     * Remove channel highlight
     * @param {HTMLElement} card - Channel card
     */
    unhighlightChannel(card) {
        card.classList.remove('channel-highlighted');
        
        const signalBars = card.querySelectorAll('.signal-bar');
        signalBars.forEach(bar => {
            bar.classList.remove('signal-active');
        });

        // Reset transmission beam
        const transmissionBeam = this.container.querySelector('.transmission-beam');
        if (transmissionBeam) {
            transmissionBeam.style.background = '';
        }
    }

    /**
     * Show location details
     * @param {string} location - Location string
     */
    showLocationDetails(location) {
        const modal = document.createElement('div');
        modal.className = 'location-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Current Coordinates</h3>
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="location-info">
                        <div class="location-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="location-details">
                            <h4>${location}</h4>
                            <p>Available for remote collaboration worldwide</p>
                            <div class="timezone-info">
                                <i class="fas fa-clock"></i>
                                <span>Eastern Time Zone (UTC-5/-4)</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="availability-status">
                        <h5>Collaboration Availability</h5>
                        <div class="availability-grid">
                            <div class="availability-item">
                                <span class="availability-type">Remote Work</span>
                                <span class="availability-status">✅ Available</span>
                            </div>
                            <div class="availability-item">
                                <span class="availability-type">On-site Meetings</span>
                                <span class="availability-status">📍 Toronto Area</span>
                            </div>
                            <div class="availability-item">
                                <span class="availability-type">International Projects</span>
                                <span class="availability-status">🌍 Open to Discussion</span>
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
     * Trigger transmission success animation
     */
    triggerTransmissionSuccess() {
        const hub = this.container.querySelector('.hub-core');
        if (hub) {
            hub.classList.add('transmission-success');
            
            // Create success particles
            for (let i = 0; i < 12; i++) {
                const particle = document.createElement('div');
                particle.className = 'success-particle';
                particle.style.left = '50%';
                particle.style.top = '50%';
                particle.style.animationDelay = `${i * 0.1}s`;
                hub.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 2000);
            }
            
            setTimeout(() => {
                hub.classList.remove('transmission-success');
            }, 3000);
        }
    }

    /**
     * Setup animations
     */
    setupAnimations() {
        // Intersection observer for contact section
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('contact-visible');
                    
                    // Start signal rings animation
                    this.startSignalAnimation();
                }
            });
        }, { threshold: 0.3 });

        const hubCore = this.container.querySelector('.hub-core');
        if (hubCore) {
            observer.observe(hubCore);
        }

        // Animate contact channels
        const channelCards = this.container.querySelectorAll('.contact-channel-card');
        channelCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('channel-visible');
            }, index * 200);
        });
    }

    /**
     * Start signal ring animation
     */
    startSignalAnimation() {
        const rings = this.container.querySelectorAll('.signal-ring');
        rings.forEach((ring, index) => {
            setTimeout(() => {
                ring.classList.add('signal-transmitting');
            }, index * 500);
        });
    }

    /**
     * Setup interactions
     */
    setupInteractions() {
        // Hub core click for easter egg
        const hubCore = this.container.querySelector('.hub-core');
        if (hubCore) {
            let clickCount = 0;
            hubCore.addEventListener('click', () => {
                clickCount++;
                if (clickCount >= 5) {
                    this.activateEasterEgg();
                    clickCount = 0;
                }
            });
        }

        // Form keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'Enter') {
                    const form = document.getElementById('contact-form');
                    if (form && document.activeElement.tagName !== 'TEXTAREA') {
                        e.preventDefault();
                        form.requestSubmit();
                    }
                }
            }
        });
    }

    /**
     * Activate easter egg
     */
    activateEasterEgg() {
        const hub = this.container.querySelector('.hub-core');
        if (hub) {
            hub.classList.add('easter-egg-active');
            
            // Create rainbow particles
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'rainbow-particle';
                particle.style.left = '50%';
                particle.style.top = '50%';
                particle.style.animationDelay = `${i * 0.05}s`;
                particle.style.setProperty('--hue', Math.random() * 360);
                hub.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 3000);
            }
            
            setTimeout(() => {
                hub.classList.remove('easter-egg-active');
            }, 3000);
        }
    }

    /**
     * Update component with new data
     * @param {Object} data - New profile data
     */
    update(data) {
        this.communicationChannels = [];
        this.render(data);
        this.setupAnimations();
    }

    /**
     * Handle component visibility
     */
    onVisible() {
        // Start transmission animations
        this.startSignalAnimation();
        
        // Activate random channel particles
        const channels = this.container.querySelectorAll('.contact-channel-card');
        channels.forEach(channel => {
            setInterval(() => {
                const particles = channel.querySelectorAll('.particle');
                const randomParticle = particles[Math.floor(Math.random() * particles.length)];
                if (randomParticle) {
                    randomParticle.classList.add('particle-float');
                    setTimeout(() => {
                        randomParticle.classList.remove('particle-float');
                    }, 2000);
                }
            }, 3000 + Math.random() * 2000);
        });
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Adjust hub positioning for mobile
        if (window.innerWidth < 768) {
            const hub = this.container.querySelector('.communication-hub');
            if (hub) {
                hub.classList.add('hub-mobile');
            }
        }
    }
}

// Export to global scope
window.ContactComponent = ContactComponent;