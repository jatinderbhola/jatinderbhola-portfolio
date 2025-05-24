/**
 * Hero Component
 * Handles the main hero section with dynamic content loading
 */

class HeroComponent {
    constructor() {
        this.container = document.getElementById('home');
        this.nameElement = document.getElementById('hero-name');
        this.titleElement = document.getElementById('hero-title');
        this.summaryElement = document.getElementById('hero-summary');
        this.actionsElement = document.getElementById('hero-actions');
        
        this.typingAnimation = null;
        this.currentTitleIndex = 0;
        this.titles = [
            "Engineering Leader & AI Pioneer",
            "Neural Network Architect", 
            "Cosmic Code Conductor",
            "Digital Universe Builder"
        ];
    }

    /**
     * Initialize hero component
     */
    async init() {
        try {
            // Get initial data
            const data = window.dataLoader.getCurrentProfile();
            if (data) {
                this.render(data);
            }
            
            this.setupAnimations();
            this.setupInteractions();
            
            console.log('✅ Hero component initialized');
        } catch (error) {
            console.error('❌ Hero component initialization failed:', error);
        }
    }

    /**
     * Render hero content with data
     * @param {Object} data - Profile data
     */
    render(data) {
        if (!data || !data.personalInfo) return;

        const { personalInfo, summary, latestAiProduct } = data;

        // Update name with animation
        this.updateName(personalInfo.name);
        
        // Update title with typing effect
        this.updateTitle(personalInfo.title);
        
        // Update summary
        this.updateSummary(summary);
        
        // Update action buttons
        this.updateActionButtons(personalInfo, latestAiProduct);
    }

    /**
     * Update name with neural glow effect
     * @param {string} name - Person's name
     */
    updateName(name) {
        if (!this.nameElement || !name) return;

        this.nameElement.innerHTML = '';
        
        // Split name into characters for individual animation
        const chars = name.split('');
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.1}s`;
            span.classList.add('hero-char');
            this.nameElement.appendChild(span);
        });

        // Add neural glow effect
        this.nameElement.classList.add('neural-glow-text');
    }

    /**
     * Update title with dynamic typing effect
     * @param {string} baseTitle - Base title from data
     */
    updateTitle(baseTitle) {
        if (!this.titleElement) return;

        // Add base title to rotation
        if (baseTitle && !this.titles.includes(baseTitle)) {
            this.titles.unshift(baseTitle);
        }

        this.startTypingAnimation();
    }

    /**
     * Start typing animation for titles
     */
    startTypingAnimation() {
        if (this.typingAnimation) {
            clearInterval(this.typingAnimation);
        }

        let currentText = '';
        let currentTitle = this.titles[this.currentTitleIndex];
        let isDeleting = false;
        let charIndex = 0;

        const typeChar = () => {
            if (!isDeleting) {
                // Typing
                currentText = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentTitle.length) {
                    // Finished typing, wait then start deleting
                    setTimeout(() => {
                        isDeleting = true;
                    }, 2000);
                }
            } else {
                // Deleting
                currentText = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    // Finished deleting, move to next title
                    isDeleting = false;
                    this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;
                    currentTitle = this.titles[this.currentTitleIndex];
                }
            }

            this.titleElement.innerHTML = currentText + '<span class="typing-cursor">|</span>';
        };

        this.typingAnimation = setInterval(typeChar, isDeleting ? 50 : 100);
    }

    /**
     * Update summary with reveal animation
     * @param {string} summary - Profile summary
     */
    updateSummary(summary) {
        if (!this.summaryElement || !summary) return;

        this.summaryElement.textContent = summary;
        this.summaryElement.classList.add('summary-reveal');
    }

    /**
     * Update action buttons
     * @param {Object} personalInfo - Personal information
     * @param {Object} aiProduct - AI product information
     */
    updateActionButtons(personalInfo, aiProduct) {
        if (!this.actionsElement) return;

        this.actionsElement.innerHTML = '';

        // AI Innovation button
        if (aiProduct) {
            const aiButton = this.createActionButton(
                'ai',
                'fas fa-brain',
                'Explore AI Innovation',
                'btn-primary neural-pulse'
            );
            this.actionsElement.appendChild(aiButton);
        }

        // Contact button
        if (personalInfo.email) {
            const contactButton = this.createActionButton(
                'contact',
                'fas fa-satellite-dish',
                'Establish Connection',
                'btn-secondary'
            );
            this.actionsElement.appendChild(contactButton);
        }

        // Download resume button
        const downloadButton = this.createDownloadButton();
        this.actionsElement.appendChild(downloadButton);
    }

    /**
     * Create action button
     * @param {string} section - Target section
     * @param {string} icon - Font Awesome icon
     * @param {string} text - Button text
     * @param {string} className - Additional CSS classes
     * @returns {HTMLElement} Button element
     */
    createActionButton(section, icon, text, className = '') {
        const button = document.createElement('a');
        button.href = `#${section}`;
        button.className = `btn ${className}`;
        button.innerHTML = `
            <i class="${icon}"></i>
            <span>${text}</span>
        `;

        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.resumeApp && window.resumeApp.navigateToSection) {
                window.resumeApp.navigateToSection(section);
                
                // Add burst effect
                if (window.cosmosBackground) {
                    const rect = button.getBoundingClientRect();
                    const position = {
                        x: (rect.left + rect.width / 2 - window.innerWidth / 2) * 2,
                        y: -(rect.top + rect.height / 2 - window.innerHeight / 2) * 2,
                        z: 0
                    };
                    window.cosmosBackground.createParticleBurst(position, 0x00F5FF);
                }
            }
        });

        return button;
    }

    /**
     * Create download resume button
     * @returns {HTMLElement} Download button
     */
    createDownloadButton() {
        const button = document.createElement('button');
        button.className = 'btn btn-secondary download-btn';
        button.innerHTML = `
            <i class="fas fa-download"></i>
            <span>Download Neural Map</span>
        `;

        button.addEventListener('click', () => {
            this.downloadResume();
        });

        return button;
    }

    /**
     * Download resume as PDF or JSON
     */
    downloadResume() {
        const data = window.dataLoader.getCurrentProfile();
        if (!data) return;

        // Create download menu
        const menu = document.createElement('div');
        menu.className = 'download-menu';
        menu.innerHTML = `
            <div class="download-options">
                <h4>Select Format</h4>
                <button class="download-option" data-format="json">
                    <i class="fas fa-code"></i>
                    <span>JSON Data</span>
                </button>
                <button class="download-option" data-format="yaml">
                    <i class="fas fa-file-alt"></i>
                    <span>YAML Format</span>
                </button>
                <button class="download-option" data-format="txt">
                    <i class="fas fa-file-text"></i>
                    <span>Text Summary</span>
                </button>
                <button class="download-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(menu);
        menu.classList.add('show');

        // Handle download options
        menu.addEventListener('click', (e) => {
            const option = e.target.closest('.download-option');
            const close = e.target.closest('.download-close');

            if (option) {
                const format = option.dataset.format;
                this.performDownload(data, format);
                menu.remove();
            } else if (close) {
                menu.remove();
            }
        });

        // Auto-close after 10 seconds
        setTimeout(() => {
            if (menu.parentElement) {
                menu.remove();
            }
        }, 10000);
    }

    /**
     * Perform actual download
     * @param {Object} data - Resume data
     * @param {string} format - Download format
     */
    performDownload(data, format) {
        let content = '';
        let filename = '';
        let mimeType = '';

        switch (format) {
            case 'json':
                content = JSON.stringify(data, null, 2);
                filename = `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume.json`;
                mimeType = 'application/json';
                break;
                
            case 'yaml':
                content = window.dataLoader.exportProfile('yaml');
                filename = `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume.yaml`;
                mimeType = 'text/yaml';
                break;
                
            case 'txt':
                content = this.generateTextSummary(data);
                filename = `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume.txt`;
                mimeType = 'text/plain';
                break;
        }

        // Create and trigger download
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Show success message
        this.showDownloadSuccess(filename);
    }

    /**
     * Generate text summary of resume
     * @param {Object} data - Resume data
     * @returns {string} Text summary
     */
    generateTextSummary(data) {
        const { personalInfo, summary, experience, education } = data;
        
        let text = `${personalInfo.name}\n`;
        text += `${personalInfo.title}\n`;
        text += `${personalInfo.location}\n`;
        text += `${personalInfo.email} | ${personalInfo.phone}\n`;
        text += `LinkedIn: ${personalInfo.linkedin}\n`;
        text += `GitHub: ${personalInfo.github}\n\n`;
        
        text += `SUMMARY\n`;
        text += `${summary}\n\n`;
        
        text += `EXPERIENCE\n`;
        experience.forEach(exp => {
            text += `${exp.position} | ${exp.company} (${exp.duration})\n`;
            exp.achievements.slice(0, 3).forEach(achievement => {
                text += `• ${achievement}\n`;
            });
            text += '\n';
        });
        
        text += `EDUCATION\n`;
        education.forEach(edu => {
            text += `${edu.degree} | ${edu.institution} (${edu.duration})\n`;
        });
        
        return text;
    }

    /**
     * Show download success message
     * @param {string} filename - Downloaded filename
     */
    showDownloadSuccess(filename) {
        const message = document.createElement('div');
        message.className = 'download-success';
        message.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <span>Neural map downloaded: ${filename}</span>
            </div>
        `;
        
        document.body.appendChild(message);
        message.classList.add('show');
        
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }

    /**
     * Setup animations
     */
    setupAnimations() {
        // Intersection observer for hero animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('hero-visible');
                }
            });
        }, { threshold: 0.3 });

        if (this.container) {
            observer.observe(this.container);
        }
    }

    /**
     * Setup interactions
     */
    setupInteractions() {
        // Add mouse interaction for neural glow
        if (this.nameElement) {
            this.nameElement.addEventListener('mouseenter', () => {
                this.nameElement.classList.add('neural-intensify');
            });
            
            this.nameElement.addEventListener('mouseleave', () => {
                this.nameElement.classList.remove('neural-intensify');
            });
        }

        // Add click interaction for title cycling
        if (this.titleElement) {
            this.titleElement.addEventListener('click', () => {
                this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;
                clearInterval(this.typingAnimation);
                this.startTypingAnimation();
            });
        }
    }

    /**
     * Update component with new data
     * @param {Object} data - New profile data
     */
    update(data) {
        this.render(data);
    }

    /**
     * Handle component visibility
     */
    onVisible() {
        // Restart typing animation when hero becomes visible
        if (!this.typingAnimation) {
            this.startTypingAnimation();
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Adjust hero layout for different screen sizes
        if (window.innerWidth < 768) {
            this.titles = this.titles.map(title => 
                title.length > 25 ? title.substring(0, 22) + '...' : title
            );
        }
    }

    /**
     * Dispose of component resources
     */
    dispose() {
        if (this.typingAnimation) {
            clearInterval(this.typingAnimation);
        }
    }
}

// Export to global scope
window.HeroComponent = HeroComponent;