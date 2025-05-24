/**
 * Data Loader Utility
 * Handles dynamic loading of JSON resume data and profiles
 */

class DataLoader {
    constructor() {
        this.currentProfile = 'resume';
        this.profileData = null;
        this.profileCache = new Map();
        this.observers = new Map();
        
        // Available profiles configuration
        this.availableProfiles = {
            'resume': { 
                file: 'data/resume.json', 
                name: 'Main Profile',
                description: 'Complete engineering leadership profile'
            },
            'frontend-lead': { 
                file: 'data/profiles/frontend-lead.json', 
                name: 'Frontend Lead',
                description: 'Frontend-focused leadership role'
            },
            'backend-architect': { 
                file: 'data/profiles/backend-architect.json', 
                name: 'Backend Architect',
                description: 'Backend architecture and scalability'
            },
            'ai-engineer': { 
                file: 'data/profiles/ai-engineer.json', 
                name: 'AI Engineer',
                description: 'AI/ML engineering and innovation'
            }
        };
    }

    /**
     * Initialize data loader
     * @param {string} profileKey - Profile to load initially
     */
    async init(profileKey = null) {
        try {
            // Get profile from URL parameters or default
            const urlParams = new URLSearchParams(window.location.search);
            const requestedProfile = profileKey || urlParams.get('profile') || 'resume';
            
            // Load the profile
            await this.loadProfile(requestedProfile);
            
            // Set up profile selector
            this.setupProfileSelector();
            
            // Listen for URL changes
            window.addEventListener('popstate', () => {
                const urlParams = new URLSearchParams(window.location.search);
                const newProfile = urlParams.get('profile') || 'resume';
                if (newProfile !== this.currentProfile) {
                    this.loadProfile(newProfile);
                }
            });
            
            return this.profileData;
        } catch (error) {
            console.error('Failed to initialize data loader:', error);
            throw error;
        }
    }

    /**
     * Load a specific profile
     * @param {string} profileKey - Profile key to load
     */
    async loadProfile(profileKey) {
        try {
            // Validate profile key
            if (!this.availableProfiles[profileKey]) {
                console.warn(`Unknown profile: ${profileKey}, falling back to 'resume'`);
                profileKey = 'resume';
            }

            // Check cache first
            if (this.profileCache.has(profileKey)) {
                this.profileData = this.profileCache.get(profileKey);
                this.currentProfile = profileKey;
                this.notifyObservers('profileLoaded', this.profileData);
                return this.profileData;
            }

            // Show loading state
            this.notifyObservers('loadingStart', { profile: profileKey });

            // Load from file
            const profileConfig = this.availableProfiles[profileKey];
            const response = await fetch(profileConfig.file);
            
            if (!response.ok) {
                throw new Error(`Failed to load profile: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            // Validate data structure
            this.validateProfileData(data);
            
            // Cache the data
            this.profileCache.set(profileKey, data);
            this.profileData = data;
            this.currentProfile = profileKey;

            // Update URL without page reload
            const url = new URL(window.location);
            if (profileKey === 'resume') {
                url.searchParams.delete('profile');
            } else {
                url.searchParams.set('profile', profileKey);
            }
            window.history.replaceState({}, '', url);

            // Update page metadata
            this.updatePageMetadata(data);

            // Notify observers
            this.notifyObservers('profileLoaded', data);
            
            return data;
        } catch (error) {
            console.error(`Error loading profile ${profileKey}:`, error);
            this.notifyObservers('loadingError', { profile: profileKey, error });
            throw error;
        }
    }

    /**
     * Validate profile data structure
     * @param {Object} data - Profile data to validate
     */
    validateProfileData(data) {
        const requiredFields = ['personalInfo', 'summary', 'experience', 'technicalSkills'];
        const missingFields = requiredFields.filter(field => !data[field]);
        
        if (missingFields.length > 0) {
            console.warn('Missing required fields:', missingFields);
        }

        // Validate personal info
        if (data.personalInfo) {
            const requiredPersonalFields = ['name', 'title', 'email'];
            const missingPersonalFields = requiredPersonalFields.filter(field => !data.personalInfo[field]);
            
            if (missingPersonalFields.length > 0) {
                console.warn('Missing personal info fields:', missingPersonalFields);
            }
        }
    }

    /**
     * Update page metadata based on profile data
     * @param {Object} data - Profile data
     */
    updatePageMetadata(data) {
        if (data.personalInfo) {
            // Update title
            const title = `${data.personalInfo.name} - ${data.personalInfo.title}`;
            document.title = title;
            document.getElementById('page-title').textContent = title;

            // Update description
            const description = data.summary || `${data.personalInfo.name} - ${data.personalInfo.title}`;
            document.getElementById('page-description').setAttribute('content', description);

            // Update keywords from SEO tags
            if (data.seoTags) {
                const keywords = Object.values(data.seoTags).flat().join(', ');
                document.getElementById('page-keywords').setAttribute('content', keywords);
            }
        }
    }

    /**
     * Setup profile selector dropdown
     */
    setupProfileSelector() {
        const selector = document.getElementById('profile-selector');
        if (!selector) return;

        // Clear existing options
        selector.innerHTML = '';

        // Add options for each available profile
        Object.entries(this.availableProfiles).forEach(([key, config]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = config.name;
            option.title = config.description;
            
            if (key === this.currentProfile) {
                option.selected = true;
            }
            
            selector.appendChild(option);
        });

        // Handle profile change
        selector.addEventListener('change', (e) => {
            const newProfile = e.target.value;
            if (newProfile !== this.currentProfile) {
                this.switchProfile(newProfile);
            }
        });
    }

    /**
     * Switch to a different profile with smooth transition
     * @param {string} profileKey - Profile to switch to
     */
    async switchProfile(profileKey) {
        try {
            // Add loading state to UI
            document.body.classList.add('profile-switching');
            
            // Load new profile
            await this.loadProfile(profileKey);
            
            // Remove loading state
            document.body.classList.remove('profile-switching');
            
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        } catch (error) {
            console.error('Failed to switch profile:', error);
            document.body.classList.remove('profile-switching');
            
            // Show error message
            this.showError('Failed to load profile. Please try again.');
        }
    }

    /**
     * Get current profile data
     * @returns {Object} Current profile data
     */
    getCurrentProfile() {
        return this.profileData;
    }

    /**
     * Get specific section data
     * @param {string} section - Section name
     * @returns {*} Section data
     */
    getSection(section) {
        return this.profileData?.[section] || null;
    }

    /**
     * Subscribe to data changes
     * @param {string} event - Event name ('profileLoaded', 'loadingStart', 'loadingError')
     * @param {Function} callback - Callback function
     */
    subscribe(event, callback) {
        if (!this.observers.has(event)) {
            this.observers.set(event, []);
        }
        this.observers.get(event).push(callback);
    }

    /**
     * Unsubscribe from data changes
     * @param {string} event - Event name
     * @param {Function} callback - Callback function to remove
     */
    unsubscribe(event, callback) {
        if (this.observers.has(event)) {
            const callbacks = this.observers.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    /**
     * Notify observers of changes
     * @param {string} event - Event name
     * @param {*} data - Data to pass to observers
     */
    notifyObservers(event, data) {
        if (this.observers.has(event)) {
            this.observers.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in observer callback for ${event}:`, error);
                }
            });
        }
    }

    /**
     * Show error message to user
     * @param {string} message - Error message
     */
    showError(message) {
        // Create or update error notification
        let errorDiv = document.getElementById('error-notification');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'error-notification';
            errorDiv.className = 'error-notification';
            document.body.appendChild(errorDiv);
        }

        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
                <button class="error-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        errorDiv.classList.add('show');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.classList.remove('show');
                setTimeout(() => errorDiv.remove(), 300);
            }
        }, 5000);
    }

    /**
     * Preload all available profiles for faster switching
     */
    async preloadProfiles() {
        const preloadPromises = Object.keys(this.availableProfiles)
            .filter(key => key !== this.currentProfile)
            .map(async (key) => {
                try {
                    const config = this.availableProfiles[key];
                    const response = await fetch(config.file);
                    if (response.ok) {
                        const data = await response.json();
                        this.profileCache.set(key, data);
                    }
                } catch (error) {
                    console.warn(`Failed to preload profile ${key}:`, error);
                }
            });

        await Promise.allSettled(preloadPromises);
        console.log('Profile preloading completed');
    }

    /**
     * Get profile statistics
     * @returns {Object} Profile statistics
     */
    getProfileStats() {
        if (!this.profileData) return null;

        const stats = {
            totalExperience: 0,
            totalSkills: 0,
            totalProjects: 0,
            revenueImpact: 0
        };

        // Calculate experience years
        if (this.profileData.experience) {
            const currentYear = new Date().getFullYear();
            this.profileData.experience.forEach(exp => {
                const duration = exp.duration || '';
                const years = this.extractYearsFromDuration(duration, currentYear);
                stats.totalExperience += years;
            });
        }

        // Count skills
        if (this.profileData.technicalSkills) {
            stats.totalSkills = Object.values(this.profileData.technicalSkills)
                .flat()
                .filter(skill => skill && typeof skill === 'string').length;
        }

        // Extract revenue impact
        if (this.profileData.experience) {
            this.profileData.experience.forEach(exp => {
                if (exp.achievements) {
                    exp.achievements.forEach(achievement => {
                        const revenue = this.extractRevenueFromText(achievement);
                        stats.revenueImpact += revenue;
                    });
                }
            });
        }

        return stats;
    }

    /**
     * Extract years from duration string
     * @param {string} duration - Duration string
     * @param {number} currentYear - Current year
     * @returns {number} Years of experience
     */
    extractYearsFromDuration(duration, currentYear) {
        // Simple extraction logic - can be enhanced
        if (duration.includes('Present')) {
            const startYear = parseInt(duration.match(/\d{4}/)?.[0]) || currentYear;
            return currentYear - startYear;
        }
        
        const years = duration.match(/\d{4}/g);
        if (years && years.length >= 2) {
            return parseInt(years[1]) - parseInt(years[0]);
        }
        
        return 1; // Default to 1 year if can't parse
    }

    /**
     * Extract revenue numbers from text
     * @param {string} text - Text to extract revenue from
     * @returns {number} Revenue amount in thousands
     */
    extractRevenueFromText(text) {
        const matches = text.match(/\$([0-9,]+)K/g);
        if (matches) {
            return matches.reduce((total, match) => {
                const amount = parseInt(match.replace(/\$|K|,/g, ''));
                return total + amount;
            }, 0);
        }
        return 0;
    }

    /**
     * Generate SEO-friendly URL slug
     * @param {string} text - Text to convert to slug
     * @returns {string} URL slug
     */
    generateSlug(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }

    /**
     * Export current profile data
     * @param {string} format - Export format ('json', 'yaml')
     * @returns {string} Exported data
     */
    exportProfile(format = 'json') {
        if (!this.profileData) return null;

        switch (format) {
            case 'json':
                return JSON.stringify(this.profileData, null, 2);
            case 'yaml':
                // Simple YAML conversion - you might want to use a proper YAML library
                return this.jsonToYaml(this.profileData);
            default:
                return JSON.stringify(this.profileData, null, 2);
        }
    }

    /**
     * Simple JSON to YAML converter
     * @param {Object} obj - Object to convert
     * @param {number} indent - Indentation level
     * @returns {string} YAML string
     */
    jsonToYaml(obj, indent = 0) {
        const spaces = ' '.repeat(indent);
        let yaml = '';

        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                yaml += `${spaces}${key}:\n${this.jsonToYaml(value, indent + 2)}`;
            } else if (Array.isArray(value)) {
                yaml += `${spaces}${key}:\n`;
                value.forEach(item => {
                    if (typeof item === 'object') {
                        yaml += `${spaces}  -\n${this.jsonToYaml(item, indent + 4)}`;
                    } else {
                        yaml += `${spaces}  - ${item}\n`;
                    }
                });
            } else {
                yaml += `${spaces}${key}: ${value}\n`;
            }
        }

        return yaml;
    }
}

// Create global instance
window.dataLoader = new DataLoader();