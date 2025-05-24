/**
 * Animation Utilities
 * Helper functions and classes for managing animations throughout the app
 */

class AnimationUtils {
    constructor() {
        this.activeAnimations = new Map();
        this.intersectionObserver = null;
        this.scrollAnimations = new Set();
        this.rafId = null;
        
        this.init();
    }

    /**
     * Initialize animation utilities
     */
    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.bindEvents();
        
        console.log('🎬 Animation utilities initialized');
    }

    /**
     * Setup intersection observer for scroll-based animations
     */
    setupIntersectionObserver() {
        const options = {
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
            rootMargin: '-50px 0px -50px 0px'
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const animationType = element.dataset.animation;
                const delay = parseFloat(element.dataset.animationDelay) || 0;

                if (entry.isIntersecting) {
                    if (delay > 0) {
                        setTimeout(() => {
                            this.triggerAnimation(element, animationType, entry.intersectionRatio);
                        }, delay * 1000);
                    } else {
                        this.triggerAnimation(element, animationType, entry.intersectionRatio);
                    }
                } else {
                    this.removeAnimation(element, animationType);
                }
            });
        }, options);
    }

    /**
     * Setup scroll-based animations
     */
    setupScrollAnimations() {
        let ticking = false;

        const updateScrollAnimations = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollProgress = scrollY / (documentHeight - windowHeight);

            this.scrollAnimations.forEach(animation => {
                if (typeof animation.update === 'function') {
                    animation.update(scrollY, scrollProgress, windowHeight);
                }
            });

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                this.rafId = requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    /**
     * Bind animation events
     */
    bindEvents() {
        // Handle animation end events
        document.addEventListener('animationend', (e) => {
            const element = e.target;
            const animationName = e.animationName;
            
            if (element.dataset.animationCleanup === 'true') {
                element.classList.remove(`animate-${animationName}`);
            }

            this.onAnimationComplete(element, animationName);
        });

        // Handle transition end events
        document.addEventListener('transitionend', (e) => {
            const element = e.target;
            const property = e.propertyName;
            
            this.onTransitionComplete(element, property);
        });

        // Reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.disableAnimations();
        }
    }

    /**
     * Observe element for scroll animations
     * @param {HTMLElement} element - Element to observe
     * @param {string} animationType - Type of animation
     * @param {number} delay - Animation delay
     */
    observeElement(element, animationType = 'fadeInUp', delay = 0) {
        element.dataset.animation = animationType;
        element.dataset.animationDelay = delay;
        
        if (this.intersectionObserver) {
            this.intersectionObserver.observe(element);
        }
    }

    /**
     * Stop observing element
     * @param {HTMLElement} element - Element to stop observing
     */
    unobserveElement(element) {
        if (this.intersectionObserver) {
            this.intersectionObserver.unobserve(element);
        }
    }

    /**
     * Trigger animation on element
     * @param {HTMLElement} element - Target element
     * @param {string} animationType - Animation type
     * @param {number} intersectionRatio - Intersection ratio
     */
    triggerAnimation(element, animationType, intersectionRatio = 1) {
        if (!element || !animationType) return;

        // Remove existing animation classes
        element.classList.remove('animate-out');
        
        // Add animation class
        element.classList.add('animate-in', `animate-${animationType}`);
        
        // Store animation info
        this.activeAnimations.set(element, {
            type: animationType,
            startTime: performance.now(),
            intersectionRatio
        });

        // Trigger custom animation logic
        switch (animationType) {
            case 'fadeInUp':
                this.fadeInUp(element);
                break;
            case 'slideInLeft':
                this.slideInLeft(element);
                break;
            case 'slideInRight':
                this.slideInRight(element);
                break;
            case 'scaleIn':
                this.scaleIn(element);
                break;
            case 'rotateIn':
                this.rotateIn(element);
                break;
            case 'bounceIn':
                this.bounceIn(element);
                break;
            case 'typewriter':
                this.typewriter(element);
                break;
            case 'countUp':
                this.countUp(element);
                break;
            case 'progressBar':
                this.progressBar(element);
                break;
            case 'particle':
                this.particleAnimation(element);
                break;
            default:
                console.warn(`Unknown animation type: ${animationType}`);
        }
    }

    /**
     * Remove animation from element
     * @param {HTMLElement} element - Target element
     * @param {string} animationType - Animation type
     */
    removeAnimation(element, animationType) {
        if (!element) return;

        element.classList.remove('animate-in', `animate-${animationType}`);
        element.classList.add('animate-out');
        
        this.activeAnimations.delete(element);
    }

    /**
     * Fade in up animation
     * @param {HTMLElement} element - Target element
     */
    fadeInUp(element) {
        element.style.transform = 'translateY(50px)';
        element.style.opacity = '0';
        
        requestAnimationFrame(() => {
            element.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        });
    }

    /**
     * Slide in from left animation
     * @param {HTMLElement} element - Target element
     */
    slideInLeft(element) {
        element.style.transform = 'translateX(-100px)';
        element.style.opacity = '0';
        
        requestAnimationFrame(() => {
            element.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        });
    }

    /**
     * Slide in from right animation
     * @param {HTMLElement} element - Target element
     */
    slideInRight(element) {
        element.style.transform = 'translateX(100px)';
        element.style.opacity = '0';
        
        requestAnimationFrame(() => {
            element.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
        });
    }

    /**
     * Scale in animation
     * @param {HTMLElement} element - Target element
     */
    scaleIn(element) {
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        
        requestAnimationFrame(() => {
            element.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.5s ease-out';
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        });
    }

    /**
     * Rotate in animation
     * @param {HTMLElement} element - Target element
     */
    rotateIn(element) {
        element.style.transform = 'rotate(-180deg) scale(0.8)';
        element.style.opacity = '0';
        
        requestAnimationFrame(() => {
            element.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
            element.style.transform = 'rotate(0deg) scale(1)';
            element.style.opacity = '1';
        });
    }

    /**
     * Bounce in animation
     * @param {HTMLElement} element - Target element
     */
    bounceIn(element) {
        element.style.transform = 'scale(0.3)';
        element.style.opacity = '0';
        
        requestAnimationFrame(() => {
            element.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.3s ease-out';
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
        });
    }

    /**
     * Typewriter animation
     * @param {HTMLElement} element - Target element
     */
    typewriter(element) {
        const text = element.dataset.text || element.textContent;
        const speed = parseInt(element.dataset.speed) || 50;
        
        element.textContent = '';
        element.style.opacity = '1';
        
        let i = 0;
        const typeChar = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            }
        };
        
        typeChar();
    }

    /**
     * Count up animation
     * @param {HTMLElement} element - Target element
     */
    countUp(element) {
        const target = parseInt(element.dataset.target) || parseInt(element.textContent) || 0;
        const duration = parseInt(element.dataset.duration) || 2000;
        const suffix = element.dataset.suffix || '';
        
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCount = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + suffix;
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target + suffix;
            }
        };
        
        updateCount();
    }

    /**
     * Progress bar animation
     * @param {HTMLElement} element - Target element
     */
    progressBar(element) {
        const progress = parseFloat(element.dataset.progress) || 0;
        const duration = parseInt(element.dataset.duration) || 1500;
        
        const bar = element.querySelector('.progress-fill') || element;
        bar.style.width = '0%';
        bar.style.transition = `width ${duration}ms ease-out`;
        
        requestAnimationFrame(() => {
            bar.style.width = progress + '%';
        });
    }

    /**
     * Particle animation
     * @param {HTMLElement} element - Target element
     */
    particleAnimation(element) {
        const particleCount = parseInt(element.dataset.particles) || 20;
        const colors = (element.dataset.colors || '#00F5FF,#FF6B9D,#8B5FBF').split(',');
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'animation-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                animation: particle-burst 2s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;
            
            // Random direction
            const angle = (Math.PI * 2 * i) / particleCount;
            const distance = 50 + Math.random() * 50;
            particle.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
            particle.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');
            
            element.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 2500);
        }
    }

    /**
     * Add scroll-based animation
     * @param {Object} animation - Animation object with update method
     */
    addScrollAnimation(animation) {
        this.scrollAnimations.add(animation);
    }

    /**
     * Remove scroll-based animation
     * @param {Object} animation - Animation object to remove
     */
    removeScrollAnimation(animation) {
        this.scrollAnimations.delete(animation);
    }

    /**
     * Create stagger animation
     * @param {NodeList|Array} elements - Elements to animate
     * @param {string} animationType - Animation type
     * @param {number} staggerDelay - Delay between elements
     */
    stagger(elements, animationType = 'fadeInUp', staggerDelay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                this.triggerAnimation(element, animationType);
            }, index * staggerDelay);
        });
    }

    /**
     * Create morphing animation between elements
     * @param {HTMLElement} fromElement - Source element
     * @param {HTMLElement} toElement - Target element
     * @param {number} duration - Animation duration
     */
    morph(fromElement, toElement, duration = 500) {
        const fromRect = fromElement.getBoundingClientRect();
        const toRect = toElement.getBoundingClientRect();
        
        const clone = fromElement.cloneNode(true);
        clone.style.cssText = `
            position: fixed;
            top: ${fromRect.top}px;
            left: ${fromRect.left}px;
            width: ${fromRect.width}px;
            height: ${fromRect.height}px;
            z-index: 9999;
            pointer-events: none;
            transition: all ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1);
        `;
        
        document.body.appendChild(clone);
        
        // Hide original elements
        fromElement.style.opacity = '0';
        toElement.style.opacity = '0';
        
        requestAnimationFrame(() => {
            clone.style.top = toRect.top + 'px';
            clone.style.left = toRect.left + 'px';
            clone.style.width = toRect.width + 'px';
            clone.style.height = toRect.height + 'px';
        });
        
        setTimeout(() => {
            toElement.style.opacity = '1';
            clone.remove();
        }, duration);
    }

    /**
     * Create ripple effect
     * @param {HTMLElement} element - Target element
     * @param {Event} event - Click event
     */
    ripple(element, event) {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-effect 0.6s linear;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /**
     * Handle animation completion
     * @param {HTMLElement} element - Animated element
     * @param {string} animationName - Animation name
     */
    onAnimationComplete(element, animationName) {
        // Emit custom event
        const event = new CustomEvent('animationComplete', {
            detail: { element, animationName }
        });
        element.dispatchEvent(event);
        
        // Cleanup if needed
        if (element.dataset.animationCleanup === 'true') {
            element.style.transition = '';
            element.style.animation = '';
        }
    }

    /**
     * Handle transition completion
     * @param {HTMLElement} element - Transitioned element
     * @param {string} property - CSS property
     */
    onTransitionComplete(element, property) {
        const event = new CustomEvent('transitionComplete', {
            detail: { element, property }
        });
        element.dispatchEvent(event);
    }

    /**
     * Disable all animations (for reduced motion preference)
     */
    disableAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
        
        console.log('🎬 Animations disabled for reduced motion');
    }

    /**
     * Get animation performance stats
     * @returns {Object} Performance statistics
     */
    getPerformanceStats() {
        return {
            activeAnimations: this.activeAnimations.size,
            scrollAnimations: this.scrollAnimations.size,
            observedElements: this.intersectionObserver ? 
                document.querySelectorAll('[data-animation]').length : 0,
            memoryUsage: performance.memory ? {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit
            } : null
        };
    }

    /**
     * Cleanup all animations and observers
     */
    dispose() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        
        this.activeAnimations.clear();
        this.scrollAnimations.clear();
        
        console.log('🎬 Animation utilities disposed');
    }
}

// CSS for particle animation
const particleCSS = `
@keyframes particle-burst {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0);
        opacity: 0;
    }
}

@keyframes ripple-effect {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject CSS
if (!document.querySelector('#animation-utils-css')) {
    const style = document.createElement('style');
    style.id = 'animation-utils-css';
    style.textContent = particleCSS;
    document.head.appendChild(style);
}

// Create global instance
window.AnimationUtils = AnimationUtils;
window.animationUtils = new AnimationUtils();

// Auto-setup elements with data-animation attribute
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(element => {
        const animationType = element.dataset.animation;
        const delay = parseFloat(element.dataset.animationDelay) || 0;
        window.animationUtils.observeElement(element, animationType, delay);
    });
    
    console.log(`🎬 Auto-setup complete: ${animatedElements.length} elements observed`);
});

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationUtils;
}