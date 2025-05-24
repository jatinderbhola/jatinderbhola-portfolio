/**
 * Main Application Controller
 * Orchestrates the entire resume website
 */

class ResumeApp {
    constructor() {
        this.isInitialized = false;
        this.currentSection = 'home';
        this.components = new Map();
        this.loadingScreen = document.getElementById('loading-screen');
        
        // Bind methods
        this.handleScroll = this.throttle(this.handleScroll.bind(this), 16);
        this.handleResize = this.throttle(this.handleResize.bind(this), 250);
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            console.log('🚀 Initializing Resume Application...');
            
            // Show loading screen
            this.showLoadingScreen();
            
            // Initialize data loader
            await window.dataLoader.init();
            
            // Initialize Three.js background
            if (window.CosmosBackground) {
                window.cosmosBackground = new window.CosmosBackground();
                await window.cosmosBackground.init();
            }
            
            // Initialize components
            await this.initializeComponents();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Setup navigation
            this.setupNavigation();
            
            // Setup scroll effects
            this.setupScrollEffects();
            
            // Subscribe to data changes
            this.subscribeToDataChanges();
            
            // Hide loading screen
            setTimeout(() => {
                this.hideLoadingScreen();
                this.isInitialized = true;
                console.log('✅ Application initialized successfully');
            }, 1500);
            
        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            this.showError('Failed to load application. Please refresh the page.');
        }
    }

    /**
     * Initialize all components
     */
    async initializeComponents() {
        const componentClasses = {
            hero: window.HeroComponent,
            aiShowcase: window.AiShowcaseComponent,
            skills: window.SkillsComponent,
            experience: window.ExperienceComponent,
            contact: window.ContactComponent
        };

        for (const [name, ComponentClass] of Object.entries(componentClasses)) {
            if (ComponentClass) {
                try {
                    const component = new ComponentClass();
                    await component.init();
                    this.components.set(name, component);
                    console.log(`✅ ${name} component initialized`);
                } catch (error) {
                    console.error(`❌ Failed to initialize ${name} component:`, error);
                }
            } else {
                console.warn(`⚠️ Component class not found: ${name}`);
            }
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Window events
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('load', this.handleWindowLoad.bind(this));
        
        // Theme switcher
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
        
        // Page visibility
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    /**
     * Setup navigation functionality
     */
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = item.getAttribute('data-section');
                this.navigateToSection(targetSection);
            });
        });

        // Update active nav item based on scroll
        this.updateActiveNavItem();
    }

    /**
     * Navigate to a specific section
     * @param {string} sectionId - Section to navigate to
     */
    navigateToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (!targetElement) return;

        // Update URL
        window.history.replaceState({}, '', `#${sectionId}`);
        
        // Smooth scroll to section
        targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });

        // Update current section
        this.currentSection = sectionId;
        
        // Update active nav item
        this.updateActiveNavItem(sectionId);
    }

    /**
     * Update active navigation item
     * @param {string} activeSection - Section to mark as active
     */
    updateActiveNavItem(activeSection = null) {
        const navItems = document.querySelectorAll('.nav-item');
        const section = activeSection || this.getCurrentSection();
        
        navItems.forEach(item => {
            const targetSection = item.getAttribute('data-section');
            if (targetSection === section) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    /**
     * Get current section based on scroll position
     * @returns {string} Current section ID
     */
    getCurrentSection() {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.scrollY + 100; // Offset for navigation
        
        for (const section of sections) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                return section.id;
            }
        }
        
        return 'home';
    }

    /**
     * Setup scroll-based effects
     */
    setupScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger component-specific animations
                    const componentName = entry.target.dataset.component;
                    if (componentName && this.components.has(componentName)) {
                        const component = this.components.get(componentName);
                        if (component.onVisible) {
                            component.onVisible();
                        }
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            this.intersectionObserver.observe(section);
        });
    }

    /**
     * Handle scroll events
     */
    handleScroll() {
        if (!this.isInitialized) return;

        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollPercent = (scrollY / docHeight) * 100;

        // Update scroll progress bar
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
        }

        // Update current section
        const newSection = this.getCurrentSection();
        if (newSection !== this.currentSection) {
            this.currentSection = newSection;
            this.updateActiveNavItem(newSection);
        }

        // Parallax effects for hero section
        if (scrollY < windowHeight) {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                const parallaxSpeed = 0.5;
                heroContent.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
            }
        }

        // Update cosmos background
        if (window.cosmosBackground && window.cosmosBackground.updateScroll) {
            window.cosmosBackground.updateScroll(scrollY / windowHeight);
        }
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Update cosmos background
        if (window.cosmosBackground && window.cosmosBackground.handleResize) {
            window.cosmosBackground.handleResize();
        }

        // Update component layouts
        this.components.forEach(component => {
            if (component.handleResize) {
                component.handleResize();
            }
        });
    }

    /**
     * Handle window load
     */
    handleWindowLoad() {
        // Preload profiles for faster switching
        if (window.dataLoader && window.dataLoader.preloadProfiles) {
            window.dataLoader.preloadProfiles();
        }

        // Initialize hash navigation
        const hash = window.location.hash.slice(1);
        if (hash) {
            setTimeout(() => {
                this.navigateToSection(hash);
            }, 500);
        }
    }

    /**
     * Handle keyboard navigation
     */
    handleKeyboardNavigation(e) {
        if (!this.isInitialized) return;

        const sections = ['home', 'ai', 'skills', 'experience', 'contact'];
        const currentIndex = sections.indexOf(this.currentSection);

        switch (e.key) {
            case 'ArrowDown':
            case 'PageDown':
                if (currentIndex < sections.length - 1) {
                    e.preventDefault();
                    this.navigateToSection(sections[currentIndex + 1]);
                }
                break;
                
            case 'ArrowUp':
            case 'PageUp':
                if (currentIndex > 0) {
                    e.preventDefault();
                    this.navigateToSection(sections[currentIndex - 1]);
                }
                break;
                
            case 'Home':
                e.preventDefault();
                this.navigateToSection('home');
                break;
                
            case 'End':
                e.preventDefault();
                this.navigateToSection('contact');
                break;
        }
    }

    /**
     * Handle page visibility changes
     */
    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations when page is hidden
            if (window.cosmosBackground && window.cosmosBackground.pause) {
                window.cosmosBackground.pause();
            }
        } else {
            // Resume animations when page is visible
            if (window.cosmosBackground && window.cosmosBackground.resume) {
                window.cosmosBackground.resume();
            }
        }
    }

    /**
     * Subscribe to data loader changes
     */
    subscribeToDataChanges() {
        window.dataLoader.subscribe('profileLoaded', (data) => {
            console.log('📊 Profile data loaded:', data.personalInfo?.name);
            this.updateAllComponents(data);
        });

        window.dataLoader.subscribe('loadingStart', (info) => {
            console.log('⏳ Loading profile:', info.profile);
            this.showProfileSwitchingState();
        });

        window.dataLoader.subscribe('loadingError', (error) => {
            console.error('❌ Profile loading error:', error);
            this.hideProfileSwitchingState();
            this.showError('Failed to load profile data');
        });
    }

    /**
     * Update all components with new data
     * @param {Object} data - Profile data
     */
    updateAllComponents(data) {
        this.components.forEach((component, name) => {
            try {
                if (component.update) {
                    component.update(data);
                }
            } catch (error) {
                console.error(`Error updating ${name} component:`, error);
            }
        });

        // Update navigation brand
        const navBrand = document.querySelector('.nav-brand span');
        if (navBrand && data.personalInfo) {
            navBrand.textContent = data.personalInfo.name;
        }

        this.hideProfileSwitchingState();
    }

    /**
     * Show loading screen
     */
    showLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.remove('hidden');
        }
    }

    /**
     * Hide loading screen
     */
    hideLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
            }, 800);
        }
    }

    /**
     * Show profile switching state
     */
    showProfileSwitchingState() {
        document.body.classList.add('profile-switching');
    }

    /**
     * Hide profile switching state
     */
    hideProfileSwitchingState() {
        document.body.classList.remove('profile-switching');
    }

    /**
     * Toggle theme
     */
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'cosmos';
        const newTheme = currentTheme === 'cosmos' ? 'neural' : 'cosmos';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('preferred-theme', newTheme);
        
        // Update cosmos background theme
        if (window.cosmosBackground && window.cosmosBackground.setTheme) {
            window.cosmosBackground.setTheme(newTheme);
        }
        
        console.log(`🎨 Theme switched to: ${newTheme}`);
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        // Use dataLoader's error display method
        if (window.dataLoader && window.dataLoader.showError) {
            window.dataLoader.showError(message);
        } else {
            console.error(message);
            alert(message); // Fallback
        }
    }

    /**
     * Throttle function calls
     * @param {Function} func - Function to throttle
     * @param {number} delay - Delay in milliseconds
     * @returns {Function} Throttled function
     */
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    /**
     * Get application statistics
     * @returns {Object} App statistics
     */
    getStats() {
        return {
            isInitialized: this.isInitialized,
            currentSection: this.currentSection,
            componentsLoaded: this.components.size,
            profileData: window.dataLoader ? window.dataLoader.getProfileStats() : null
        };
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Load preferred theme
    const savedTheme = localStorage.getItem('preferred-theme') || 'cosmos';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Create and initialize app
    window.resumeApp = new ResumeApp();
    await window.resumeApp.init();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    // Cleanup resources
    if (window.cosmosBackground && window.cosmosBackground.dispose) {
        window.cosmosBackground.dispose();
    }
});

// Export for debugging
window.getAppStats = () => {
    return window.resumeApp ? window.resumeApp.getStats() : null;
};

console.log('🧠 Resume App: Neural connections established');