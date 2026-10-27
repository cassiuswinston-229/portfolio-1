/* ============================================
   DEVSECOPS PORTFOLIO - INTERACTIVE SCRIPT
   ============================================ */

// ============================================
// THEME MANAGER
// ============================================

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.htmlElement = document.documentElement;
        this.storageKey = 'portfolio-theme';
        this.init();
    }

    init() {
        this.loadTheme();
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    loadTheme() {
        const savedTheme = localStorage.getItem(this.storageKey);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        this.setTheme(theme);
    }

    setTheme(theme) {
        this.htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.storageKey, theme);
        this.themeToggle.setAttribute('aria-pressed', theme === 'dark');
    }

    toggleTheme() {
        const currentTheme = this.htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// ============================================
// NAVIGATION MANAGER
// ============================================

class NavManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateActiveLink());
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
    }

    updateActiveLink() {
        let current = '';
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    handleNavClick(e) {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                mobileMenu.close();
            }
        }
    }
}

// ============================================
// MOBILE MENU MANAGER
// ============================================

class MobileMenu {
    constructor() {
        this.menuBtn = document.getElementById('mobile-menu-btn');
        this.closeBtn = document.getElementById('mobile-menu-close');
        this.menu = document.getElementById('mobile-menu');
        this.backdrop = document.getElementById('mobile-menu-backdrop');
        this.navLinks = document.querySelectorAll('.mobile-nav-link');
        this.isOpen = false;
        this.init();
    }

    init() {
        this.menuBtn.addEventListener('click', () => this.toggle());
        this.closeBtn.addEventListener('click', () => this.close());
        this.backdrop.addEventListener('click', () => this.close());
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close();
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.menu.classList.add('active');
        this.backdrop.classList.add('active');
        this.menuBtn.classList.add('active');
        this.menuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.menu.classList.remove('active');
        this.backdrop.classList.remove('active');
        this.menuBtn.classList.remove('active');
        this.menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

// ============================================
// GLITCH EFFECT ON HOVER (ENHANCED)
// ============================================

class GlitchEffect {
    constructor() {
        this.glitchElements = document.querySelectorAll('.glitch');
        this.init();
    }

    init() {
        this.glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => this.startGlitch(element));
            element.addEventListener('mouseleave', () => this.stopGlitch(element));
        });
    }

    startGlitch(element) {
        element.classList.add('glitch-active');

        // Random character displacement
        const text = element.getAttribute('data-text');
        const glitchInterval = setInterval(() => {
            if (!element.classList.contains('glitch-active')) {
                clearInterval(glitchInterval);
                return;
            }

            // Randomly corrupt the display
            const chars = text.split('');
            const glitchChars = ['█', '▓', '▒', '░', '▀', '▄', '█', '▌', '▐'];
            const randomIndex = Math.floor(Math.random() * chars.length);

            // 30% chance to show glitch
            if (Math.random() > 0.7) {
                chars[randomIndex] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
        }, 50);

        element.dataset.glitchInterval = glitchInterval;
    }

    stopGlitch(element) {
        element.classList.remove('glitch-active');

        if (element.dataset.glitchInterval) {
            clearInterval(parseInt(element.dataset.glitchInterval));
        }

        // Reset to original text
        element.setAttribute('data-text', element.textContent);
    }
}


// ============================================
// MATRIX RAIN ANIMATION
// ============================================

class MatrixRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.characters = '01000011011000010111001101110011011010010111010101110011';
        this.columns = Math.floor(this.canvas.width / 20);
        this.drops = Array(this.columns).fill(0);
        this.init();
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    init() {
        window.addEventListener('resize', () => this.resizeCanvas());
        this.animate();
    }

    animate() {
        this.ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ff88';
        this.ctx.font = '20px JetBrains Mono';

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            this.ctx.fillText(char, i * 20, this.drops[i] * 20);

            if (this.drops[i] * 20 > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }

        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// TERMINAL TYPING EFFECT
// ============================================

class Terminal {
    constructor(outputId) {
        this.output = document.getElementById(outputId);
        if (!this.output) return;

        this.messages = [
            'Cassius Winston',
            'DevSec Engineer',
            'Security-First Developer',
            'Threat Modeler',
            'Red Team Operator'
        ];
        this.currentMessage = 0;
        this.init();
    }

    init() {
        this.typeMessage();
    }

    typeMessage() {
        const message = this.messages[this.currentMessage];
        let index = 0;

        const type = () => {
            if (index < message.length) {
                this.output.innerHTML = `<span class="terminal-prompt">$</span> <span class="terminal-command">${message.substring(0, index + 1)}</span><span class="terminal-cursor">▌</span>`;
                index++;
                setTimeout(type, 50);
            } else {
                setTimeout(() => this.eraseMessage(), 2000);
            }
        };

        type();
    }

    eraseMessage() {
        const message = this.messages[this.currentMessage];
        let index = message.length;

        const erase = () => {
            if (index > 0) {
                this.output.innerHTML = `<span class="terminal-prompt">$</span> <span class="terminal-command">${message.substring(0, index - 1)}</span><span class="terminal-cursor">▌</span>`;
                index--;
                setTimeout(erase, 30);
            } else {
                this.currentMessage = (this.currentMessage + 1) % this.messages.length;
                setTimeout(() => this.typeMessage(), 500);
            }
        };

        erase();
    }
}

// ============================================
// STAT COUNTERS
// ============================================

class Counters {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    this.animateCounter(entry.target);
                    entry.target.dataset.counted = 'true';
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const start = Date.now();

        const update = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOut);
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        };

        update();
    }
}

// ============================================
// SKILL BARS ANIMATION
// ============================================

class SkillBars {
    constructor() {
        this.skillItems = document.querySelectorAll('.skill-item');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    setTimeout(() => {
                        this.animateBar(entry.target);
                        entry.target.dataset.animated = 'true';
                    }, index * 100);
                }
            });
        }, { threshold: 0.5 });

        this.skillItems.forEach(item => observer.observe(item));
    }

    animateBar(element) {
        const progress = element.querySelector('.skill-progress');
        const width = progress.style.width;
        progress.style.width = '0';

        setTimeout(() => {
            progress.style.transition = 'width 1s ease-out';
            progress.style.width = width;
        }, 10);
    }
}

// ============================================
// PORTFOLIO FILTER
// ============================================

class PortfolioFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.portfolioCards = document.querySelectorAll('.portfolio-card');
        this.init();
    }

    init() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });
    }

    handleFilter(e) {
        const filter = e.target.dataset.filter;

        // Update button states
        this.filterBtns.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        e.target.classList.add('active');
        e.target.setAttribute('aria-pressed', 'true');

        // Filter cards
        this.portfolioCards.forEach(card => {
            const category = card.dataset.category;
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
}

// ============================================
// CONTACT FORM
// ============================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        if (!this.form) return;

        this.inputs = this.form.querySelectorAll('input, textarea');
        this.submitBtn = this.form.querySelector('.form-submit');
        this.messageStatus = document.getElementById('form-message-status');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    validateField(field) {
        const error = document.getElementById(`${field.name}-error`);
        let isValid = true;
        let errorMsg = '';

        if (!field.value.trim()) {
            isValid = false;
            errorMsg = 'This field is required';
        } else if (field.name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMsg = 'Please enter a valid email';
            }
        }

        if (error) {
            error.textContent = errorMsg;
            field.classList.toggle('error', !isValid);
        }

        return isValid;
    }

    validateForm() {
        let isValid = true;
        this.inputs.forEach(input => {
            if (input.name !== 'website' && !this.validateField(input)) {
                isValid = false;
            }
        });
        return isValid;
    }

    handleSubmit(e) {
        e.preventDefault();

        // Check honeypot
        const honeypot = this.form.querySelector('input[name="website"]');
        if (honeypot.value) {
            console.log('Honeypot triggered');
            return;
        }

        if (!this.validateForm()) {
            this.showMessage('Please fix the errors above', 'error');
            return;
        }

        this.submitForm();
    }

    submitForm() {
        const submitText = this.submitBtn.querySelector('.submit-text');
        const submitLoading = this.submitBtn.querySelector('.submit-loading');

        this.submitBtn.disabled = true;
        submitText.style.display = 'none';
        submitLoading.style.display = 'inline-flex';

        // Simulate API call
        setTimeout(() => {
            this.showMessage('Message sent! I\'ll get back to you within 24 hours.', 'success');
            this.form.reset();
            this.submitBtn.disabled = false;
            submitText.style.display = 'inline';
            submitLoading.style.display = 'none';
        }, 2000);
    }

    showMessage(text, type) {
        this.messageStatus.textContent = text;
        this.messageStatus.className = `form-message form-message--${type}`;
        this.messageStatus.style.display = 'block';

        if (type === 'success') {
            setTimeout(() => {
                this.messageStatus.style.display = 'none';
            }, 5000);
        }
    }
}

// ============================================
// CURSOR GLOW EFFECT
// ============================================

class CursorGlow {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-glow';
        document.body.appendChild(this.cursor);
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        });
    }
}

// ============================================
// SCROLL REVEAL
// ============================================

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('section, .portfolio-card, .service-card, .timeline-item');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        this.elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

class ScrollTop {
    constructor() {
        this.button = document.getElementById('scroll-top');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.toggleButton());
        this.button.addEventListener('click', () => this.scrollToTop());
    }

    toggleButton() {
        if (window.pageYOffset > 300) {
            this.button.style.display = 'block';
        } else {
            this.button.style.display = 'none';
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    const themeManager = new ThemeManager();
    const navManager = new NavManager();
    const mobileMenu = new MobileMenu();
    const matrixRain = new MatrixRain('matrix-canvas');
    const terminal = new Terminal('terminal-output');
    const counters = new Counters();
    const skillBars = new SkillBars();
    const portfolioFilter = new PortfolioFilter();
    const contactForm = new ContactForm();
    const cursorGlow = new CursorGlow();
    const scrollReveal = new ScrollReveal();
    const scrollTop = new ScrollTop();

    // Log initialization
    console.log('%c🔐 DevSecOps Portfolio Loaded', 'color: #00ff88; font-size: 16px; font-weight: bold;');
    console.log('%cThink like an attacker. Build like a defender.', 'color: #00ff88; font-size: 12px;');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScroll = (element) => {
        const targetPosition = element.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };
}

// Performance monitoring
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%cPage Load Time: ${pageLoadTime}ms`, 'color: #00ff88;');
    });
}