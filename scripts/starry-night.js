/**
 * StarryNight.js - A JavaScript library for creating animated starry night backgrounds
 * Version: 1.0.0
 * Author: Your Name
 * License: MIT
 */

class StarryNight {
    constructor(options = {}) {
        // Default configuration
        this.config = {
            // Container element (if null, uses document.body)
            container: options.container || null,
            
            // Star configuration
            numStars: options.numStars || 300,
            starColors: options.starColors || ['white'],
            starSizes: options.starSizes || {
                small: { width: 1, height: 1, opacity: 0.7 },
                medium: { width: 2, height: 2, opacity: 0.8 },
                large: { width: 3, height: 3, opacity: 0.9 },
                bright: { width: 2, height: 2, opacity: 1 }
            },
            
            // Animation configuration
            twinkleSpeed: options.twinkleSpeed || { min: 2, max: 5 }, // seconds
            enableShootingStars: options.enableShootingStars !== false,
            shootingStarInterval: options.shootingStarInterval || 3000, // milliseconds
            
            // Background configuration
            backgroundColor: options.backgroundColor || '#000000',
            
            // Performance
            maxShootingStars: options.maxShootingStars || 5,
            
            // Responsive
            responsive: options.responsive !== false,
            
            // Z-index
            zIndex: options.zIndex || 1
        };

        this.container = null;
        this.starsContainer = null;
        this.shootingStarInterval = null;
        this.shootingStars = [];
        this.isInitialized = false;
        this.resizeHandler = null;
    }

    /**
     * Initialize the starry night background
     */
    init() {
        if (this.isInitialized) {
            console.warn('StarryNight is already initialized');
            return;
        }

        this.createContainer();
        this.injectCSS();
        this.generateStars();
        
        if (this.config.enableShootingStars) {
            this.startShootingStars();
        }
        
        if (this.config.responsive) {
            this.setupResponsive();
        }

        this.isInitialized = true;
        return this;
    }

    /**
     * Create the main container and stars container
     */
    createContainer() {
        this.container = this.config.container || document.body;
        
        // Apply background color to container
        if (this.container === document.body) {
            document.body.style.backgroundColor = this.config.backgroundColor;
            document.body.style.margin = '0';
            document.body.style.padding = '0';
            document.body.style.minHeight = '100vh';
        }

        // Create stars container
        this.starsContainer = document.createElement('div');
        this.starsContainer.className = 'starry-night-container';
        this.starsContainer.style.cssText = `
            position: ${this.container === document.body ? 'fixed' : 'absolute'};
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: ${this.config.zIndex};
            overflow: hidden;
        `;

        this.container.appendChild(this.starsContainer);
    }

    /**
     * Inject necessary CSS styles
     */
    injectCSS() {
        if (document.getElementById('starry-night-styles')) return;

        const style = document.createElement('style');
        style.id = 'starry-night-styles';
        style.textContent = `
            .starry-night-star {
                position: absolute;
                border-radius: 50%;
                animation: starry-night-twinkle 3s ease-in-out infinite;
            }

            .starry-night-star.small {
                box-shadow: none;
            }

            .starry-night-star.medium {
                box-shadow: 0 0 6px currentColor;
            }

            .starry-night-star.large {
                box-shadow: 0 0 10px currentColor, 0 0 20px rgba(255, 255, 255, 0.5);
            }

            .starry-night-star.bright {
                box-shadow: 0 0 15px currentColor, 0 0 30px rgba(255, 255, 255, 0.8);
                animation: starry-night-bright-twinkle 2s ease-in-out infinite;
            }

            .starry-night-shooting-star {
                position: absolute;
                border-radius: 50%;
                box-shadow: 0 0 10px currentColor;
                animation: starry-night-shoot 4s linear infinite;
                opacity: 0;
            }

            @keyframes starry-night-twinkle {
                0%, 100% {
                    opacity: 0.3;
                    transform: scale(1);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.2);
                }
            }

            @keyframes starry-night-bright-twinkle {
                0%, 100% {
                    opacity: 0.5;
                    transform: scale(1);
                    box-shadow: 0 0 15px currentColor, 0 0 30px rgba(255, 255, 255, 0.8);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.5);
                    box-shadow: 0 0 25px currentColor, 0 0 50px rgba(255, 255, 255, 1);
                }
            }

            @keyframes starry-night-shoot {
                0% {
                    opacity: 0;
                    transform: translateX(-100px) translateY(-100px);
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                    transform: translateX(100vw) translateY(100vh);
                }
            }
        `;

        document.head.appendChild(style);
    }

    /**
     * Generate random stars
     */
    generateStars() {
        const starTypes = Object.keys(this.config.starSizes);
        
        for (let i = 0; i < this.config.numStars; i++) {
            const star = this.createStar(starTypes);
            this.starsContainer.appendChild(star);
        }
    }

    /**
     * Create a single star element
     */
    createStar(starTypes) {
        const star = document.createElement('div');
        const type = starTypes[Math.floor(Math.random() * starTypes.length)];
        const size = this.config.starSizes[type];
        const color = this.config.starColors[Math.floor(Math.random() * this.config.starColors.length)];

        star.className = `starry-night-star ${type}`;
        star.style.cssText = `
            width: ${size.width}px;
            height: ${size.height}px;
            background: ${color};
            color: ${color};
            opacity: ${size.opacity};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 3}s;
            animation-duration: ${Math.random() * (this.config.twinkleSpeed.max - this.config.twinkleSpeed.min) + this.config.twinkleSpeed.min}s;
        `;

        return star;
    }

    /**
     * Start shooting stars animation
     */
    startShootingStars() {
        this.shootingStarInterval = setInterval(() => {
            if (this.shootingStars.length < this.config.maxShootingStars) {
                this.createShootingStar();
            }
        }, this.config.shootingStarInterval);
    }

    /**
     * Create a shooting star
     */
    createShootingStar() {
        const shootingStar = document.createElement('div');
        const color = this.config.starColors[Math.floor(Math.random() * this.config.starColors.length)];
        
        shootingStar.className = 'starry-night-shooting-star';
        shootingStar.style.cssText = `
            width: 2px;
            height: 2px;
            background: ${color};
            color: ${color};
            animation-delay: ${Math.random() * 2}s;
        `;

        // Random starting position
        if (Math.random() > 0.5) {
            shootingStar.style.left = '-100px';
            shootingStar.style.top = Math.random() * 50 + '%';
        } else {
            shootingStar.style.left = Math.random() * 50 + '%';
            shootingStar.style.top = '-100px';
        }

        this.starsContainer.appendChild(shootingStar);
        this.shootingStars.push(shootingStar);

        // Remove after animation
        setTimeout(() => {
            if (shootingStar.parentNode) {
                shootingStar.parentNode.removeChild(shootingStar);
                this.shootingStars = this.shootingStars.filter(star => star !== shootingStar);
            }
        }, 6000);
    }

    /**
     * Setup responsive behavior
     */
    setupResponsive() {
        this.resizeHandler = () => {
            // Regenerate stars on significant resize
            const currentStarCount = this.starsContainer.querySelectorAll('.starry-night-star:not(.starry-night-shooting-star)').length;
            if (currentStarCount !== this.config.numStars) {
                this.clearStars();
                this.generateStars();
            }
        };

        window.addEventListener('resize', this.resizeHandler);
    }

    /**
     * Clear all stars
     */
    clearStars() {
        const stars = this.starsContainer.querySelectorAll('.starry-night-star');
        stars.forEach(star => star.remove());
    }

    /**
     * Update configuration
     */
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        if (this.isInitialized) {
            this.refresh();
        }
        return this;
    }

    /**
     * Refresh the starry night (regenerate stars with new config)
     */
    refresh() {
        this.clearStars();
        this.generateStars();
        return this;
    }

    /**
     * Pause animations
     */
    pause() {
        if (this.starsContainer) {
            this.starsContainer.style.animationPlayState = 'paused';
            const stars = this.starsContainer.querySelectorAll('.starry-night-star, .starry-night-shooting-star');
            stars.forEach(star => {
                star.style.animationPlayState = 'paused';
            });
        }
        return this;
    }

    /**
     * Resume animations
     */
    resume() {
        if (this.starsContainer) {
            this.starsContainer.style.animationPlayState = 'running';
            const stars = this.starsContainer.querySelectorAll('.starry-night-star, .starry-night-shooting-star');
            stars.forEach(star => {
                star.style.animationPlayState = 'running';
            });
        }
        return this;
    }

    /**
     * Destroy the starry night instance
     */
    destroy() {
        if (this.shootingStarInterval) {
            clearInterval(this.shootingStarInterval);
        }

        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
        }

        if (this.starsContainer && this.starsContainer.parentNode) {
            this.starsContainer.parentNode.removeChild(this.starsContainer);
        }

        // Remove CSS if no other instances exist
        const containers = document.querySelectorAll('.starry-night-container');
        if (containers.length === 0) {
            const styles = document.getElementById('starry-night-styles');
            if (styles) {
                styles.remove();
            }
        }

        this.isInitialized = false;
        return this;
    }

    /**
     * Static method to create and initialize in one call
     */
    static create(options = {}) {
        return new StarryNight(options).init();
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StarryNight;
} else if (typeof define === 'function' && define.amd) {
    define(() => StarryNight);
} else {
    window.StarryNight = StarryNight;
}