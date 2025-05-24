/**
 * Application Configuration
 * Central configuration for the Interactive Resume Website
 */

window.APP_CONFIG = {
    // Application Info
    version: '1.0.0',
    name: 'Neural Resume Interface',
    author: 'Jatinder Bhola',
    buildDate: '2024-12-19',
    
    // Theme Configuration
    theme: {
        default: 'cosmos-neural',
        available: ['cosmos', 'neural'],
        prefersDark: true
    },
    
    // Animation Settings
    animations: {
        enabled: true,
        reducedMotion: false,
        particleCount: 3000,
        neuralNodes: 50,
        cosmicRings: 5,
        brainWaves: 3,
        performance: {
            mobile: {
                particleCount: 1500,
                neuralNodes: 30,
                cosmicRings: 3,
                brainWaves: 2
            },
            lowEnd: {
                particleCount: 1000,
                neuralNodes: 20,
                cosmicRings: 2,
                brainWaves: 1
            }
        }
    },
    
    // Three.js Background Settings
    threeJs: {
        antialias: true,
        alpha: true,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        shadows: false, // Disabled for performance
        fog: {
            enabled: true,
            color: 0x0B1426,
            near: 1,
            far: 2000
        },
        camera: {
            fov: 75,
            near: 0.1,
            far: 3000,
            position: { x: 0, y: 0, z: 1000 }
        }
    },
    
    // Data Loading Configuration
    dataLoader: {
        cacheEnabled: true,
        preloadProfiles: true,
        defaultProfile: 'resume',
        retryAttempts: 3,
        timeout: 5000,
        profiles: {
            'resume': {
                file: 'data/resume.json',
                name: 'Main Profile',
                description: 'Complete engineering leadership profile',
                priority: 1
            },
            'frontend-lead': {
                file: 'data/profiles/frontend-lead.json',
                name: 'Frontend Lead',
                description: 'Frontend-focused leadership role',
                priority: 2
            },
            'backend-architect': {
                file: 'data/profiles/backend-architect.json',
                name: 'Backend Architect',
                description: 'Backend architecture and scalability',
                priority: 3
            },
            'ai-engineer': {
                file: 'data/profiles/ai-engineer.json',
                name: 'AI Engineer',
                description: 'AI/ML engineering and innovation',
                priority: 4
            }
        }
    },
    
    // Component Settings
    components: {
        hero: {
            typingSpeed: 100,
            deletingSpeed: 50,
            pauseDuration: 2000,
            titleRotation: true
        },
        skills: {
            constellationEnabled: true,
            orbitSpeed: 0.001,
            connectionThreshold: 300,
            categoryFilter: true
        },
        experience: {
            timelineAnimation: true,
            rocketEnabled: true,
            progressTracking: true,
            detailsPanel: true
        },
        contact: {
            formValidation: true,
            signalAnimation: true,
            transmissionEffects: true,
            easterEggEnabled: true
        },
        aiShowcase: {
            metricsAnimation: true,
            techConstellation: true,
            impactVisualization: true,
            modalDetails: true
        }
    },
    
    // Performance Settings
    performance: {
        lazyLoading: true,
        imageOptimization: true,
        animationThrottling: true,
        intersectionObserver: true,
        debounceScroll: 16, // milliseconds
        throttleResize: 250, // milliseconds
        cacheSize: 10, // number of cached profiles
        preloadDelay: 2000 // milliseconds
    },
    
    // Analytics & Tracking (placeholder)
    analytics: {
        enabled: false, // Set to true when you add analytics
        trackingId: null,
        events: {
            profileSwitch: true,
            componentInteraction: true,
            downloadResume: true,
            contactForm: true
        }
    },
    
    // SEO Configuration
    seo: {
        updateMetaTags: true,
        generateSitemap: false,
        structuredData: true,
        openGraph: true,
        twitter: true
    },
    
    // API Configuration (for future integrations)
    api: {
        baseUrl: null,
        timeout: 5000,
        retries: 3,
        endpoints: {
            contact: '/api/contact',
            analytics: '/api/analytics',
            resume: '/api/resume'
        }
    },
    
    // Feature Flags
    features: {
        downloadResume: true,
        profileSwitching: true,
        contactForm: true,
        themeSwitch: true,
        keyboardNavigation: true,
        voiceNavigation: false, // Future feature
        ar3d: false, // Future AR/VR feature
        collaboration: false, // Future real-time collaboration
        aiChatbot: false // Future AI assistant
    },
    
    // Localization (for future multi-language support)
    i18n: {
        enabled: false,
        defaultLocale: 'en',
        availableLocales: ['en'],
        dateFormat: 'YYYY-MM-DD',
        numberFormat: 'en-US'
    },
    
    // Security Settings
    security: {
        sanitizeInput: true,
        validateJson: true,
        csrfProtection: false, // Not needed for static site
        contentSecurityPolicy: false
    },
    
    // Development Settings
    development: {
        debug: false, // Set to true for development
        verbose: false,
        showPerformanceMetrics: false,
        mockData: false,
        hotReload: false
    },
    
    // Browser Support
    browserSupport: {
        modern: ['chrome', 'firefox', 'safari', 'edge'],
        legacy: ['ie11'], // Limited support
        mobile: ['chrome-mobile', 'safari-mobile', 'firefox-mobile'],
        required: {
            es6: true,
            webgl: true,
            fetch: true,
            intersectionObserver: true
        }
    },
    
    // Error Handling
    errorHandling: {
        enableGlobalHandler: true,
        logErrors: true,
        showUserFriendlyMessages: true,
        fallbackContent: true,
        retryMechanism: true
    },
    
    // Accessibility
    accessibility: {
        enableKeyboardNavigation: true,
        enableScreenReader: true,
        highContrastMode: true,
        reducedMotion: true,
        focusManagement: true,
        ariaLabels: true
    }
};

// Theme-specific configurations
window.APP_CONFIG.themes = {
    cosmos: {
        name: 'Cosmos',
        colors: {
            primary: '#00F5FF',
            secondary: '#FF6B9D',
            accent: '#8B5FBF',
            background: '#0B1426',
            surface: '#1A2332'
        },
        particles: {
            count: 3000,
            colors: ['#00F5FF', '#FF6B9D', '#8B5FBF', '#FFD700', '#39FF83']
        }
    },
    neural: {
        name: 'Neural',
        colors: {
            primary: '#FF6B9D',
            secondary: '#8B5FBF',
            accent: '#00F5FF',
            background: '#1A0B26',
            surface: '#2A1332'
        },
        particles: {
            count: 2500,
            colors: ['#FF6B9D', '#8B5FBF', '#00F5FF', '#9D4EDD', '#FF1493']
        }
    }
};

// Device detection utilities
window.APP_CONFIG.device = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isTablet: /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent),
    isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isLowEnd: navigator.hardwareConcurrency < 4,
    hasWebGL: (() => {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
        } catch (e) {
            return false;
        }
    })(),
    hasIntersectionObserver: 'IntersectionObserver' in window,
    hasFetch: 'fetch' in window,
    hasLocalStorage: (() => {
        try {
            return 'localStorage' in window && window.localStorage !== null;
        } catch (e) {
            return false;
        }
    })()
};

// Performance monitoring
window.APP_CONFIG.performance = {
    ...window.APP_CONFIG.performance,
    startTime: performance.now(),
    metrics: {
        loadTime: 0,
        renderTime: 0,
        interactionTime: 0,
        memoryUsage: 0
    },
    thresholds: {
        loadTime: 3000, // 3 seconds
        renderTime: 1000, // 1 second
        interactionTime: 100, // 100ms
        memoryLimit: 50 * 1024 * 1024 // 50MB
    }
};

// URL configuration
window.APP_CONFIG.urls = {
    base: window.location.origin,
    assets: './assets',
    data: './data',
    profiles: './data/profiles',
    api: null, // Set when API is available
    cdn: null, // Set if using CDN
    social: {
        linkedin: 'https://linkedin.com/in/jatinderbhola',
        github: 'https://github.com/jatinderbhola',
        email: 'mailto:JatinderBhola@gmail.com'
    }
};

// Environment detection
window.APP_CONFIG.environment = {
    isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    isProduction: window.location.protocol === 'https:' && !window.location.hostname.includes('localhost'),
    isPreview: window.location.hostname.includes('netlify') || window.location.hostname.includes('vercel'),
    buildMode: 'production' // Will be replaced during build
};

// Keyboard shortcuts configuration
window.APP_CONFIG.keyboard = {
    enabled: true,
    shortcuts: {
        'ArrowDown': 'navigateNext',
        'ArrowUp': 'navigatePrevious',
        'Home': 'navigateHome',
        'End': 'navigateContact',
        'Escape': 'closeModal',
        'Enter': 'activateElement',
        'Space': 'activateElement',
        'Tab': 'focusNext',
        'Shift+Tab': 'focusPrevious',
        'Ctrl+Enter': 'submitForm',
        'Ctrl+K': 'openSearch', // Future feature
        'Ctrl+/': 'showHelp' // Future feature
    }
};

// Animation easing functions
window.APP_CONFIG.easing = {
    linear: 'linear',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    neural: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    cosmic: 'cubic-bezier(0.19, 1, 0.22, 1)'
};

// Content Security Policy (for future implementation)
window.APP_CONFIG.csp = {
    enabled: false,
    directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
        'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        'font-src': ["'self'", "https://fonts.gstatic.com"],
        'img-src': ["'self'", "data:", "https:"],
        'connect-src': ["'self'"],
        'frame-src': ["'none'"],
        'object-src': ["'none'"],
        'base-uri': ["'self'"],
        'form-action': ["'self'"]
    }
};

// Cache configuration
window.APP_CONFIG.cache = {
    version: '1.0.0',
    enabled: true,
    ttl: 24 * 60 * 60 * 1000, // 24 hours
    maxSize: 50, // Maximum number of cached items
    storage: 'memory', // 'memory' or 'localStorage' (Note: localStorage not available in Claude.ai)
    keys: {
        profiles: 'resume_profiles',
        theme: 'resume_theme',
        preferences: 'resume_preferences',
        analytics: 'resume_analytics'
    }
};

// Logging configuration
window.APP_CONFIG.logging = {
    enabled: true,
    level: 'info', // 'debug', 'info', 'warn', 'error'
    console: true,
    remote: false, // Set to true when remote logging is available
    maxEntries: 1000,
    categories: {
        app: true,
        components: true,
        animations: true,
        performance: true,
        errors: true,
        user: true
    }
};

// Utility functions
window.APP_CONFIG.utils = {
    // Format duration string
    formatDuration: (start, end = 'Present') => {
        if (end === 'Present') {
            const years = new Date().getFullYear() - parseInt(start);
            return `${start} - ${end} (${years} year${years !== 1 ? 's' : ''})`;
        }
        const years = parseInt(end) - parseInt(start);
        return `${start} - ${end} (${years} year${years !== 1 ? 's' : ''})`;
    },
    
    // Generate unique ID
    generateId: () => {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Deep merge objects
    deepMerge: (target, source) => {
        const output = Object.assign({}, target);
        if (typeof target === 'object' && typeof source === 'object') {
            Object.keys(source).forEach(key => {
                if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    } else {
                        output[key] = window.APP_CONFIG.utils.deepMerge(target[key], source[key]);
                    }
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    },
    
    // Format file size
    formatFileSize: (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    // Validate email
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Sanitize HTML
    sanitizeHtml: (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }
};

// Initialize performance monitoring
if (window.APP_CONFIG.development.debug) {
    console.log('🚀 Resume App Configuration Loaded', window.APP_CONFIG);
    
    // Monitor performance
    window.addEventListener('load', () => {
        window.APP_CONFIG.performance.metrics.loadTime = performance.now() - window.APP_CONFIG.performance.startTime;
        console.log(`⚡ Load Time: ${window.APP_CONFIG.performance.metrics.loadTime.toFixed(2)}ms`);
    });
}

// Export configuration for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.APP_CONFIG;
}

// Freeze configuration to prevent modifications
Object.freeze(window.APP_CONFIG);

console.log('⚙️ Neural Resume Configuration: Systems Online');