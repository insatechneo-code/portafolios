/* ============================================
   MAIN JAVASCRIPT FOR PORTFOLIO
   Funcionalidades: Modo oscuro/claro, animaciones,
   scroll, stats counter, y más
   ============================================ */

(function() {
    'use strict';

    // ========== VARIABLES GLOBALES ==========
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleDesktop = document.getElementById('themeToggleDesktop');

    // ========== THEME TOGGLE (MODO OSCURO/CLARO) ==========
    function initThemeToggle() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);

        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        if (themeToggleDesktop) {
            themeToggleDesktop.addEventListener('click', toggleTheme);
        }
    }

    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    function setTheme(theme) {
        body.setAttribute('data-theme', theme);

        // En modo oscuro mostramos sol (para cambiar a claro)
        // En modo claro mostramos luna (para cambiar a oscuro)
        const iconClass = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';

        if (themeToggle) {
            themeToggle.querySelector('i').className = iconClass;
        }
        if (themeToggleDesktop) {
            themeToggleDesktop.querySelector('i').className = iconClass;
        }
    }

    // ========== NAVBAR SCROLL EFFECT ==========
    function handleNavbarScroll() {
        if (!navbar) return;
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // ========== SCROLL TO TOP BUTTON ==========
    function initScrollTopButton() {
        if (!scrollTopBtn) return;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========== SMOOTH SCROLL PARA NAVEGACIÓN ==========
    function initSmoothScroll() {
        const links = document.querySelectorAll('.click-scroll, .smoothscroll');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);

                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });

                        // Cerrar navbar en mobile
                        const navbarCollapse = document.querySelector('.navbar-collapse');
                        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                            navbarCollapse.classList.remove('show');
                        }
                    }
                }
            });
        });
    }

    // ========== ACTIVE NAVIGATION HIGHLIGHT ==========
    function initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', function() {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;

                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ========== SCROLL ANIMATIONS ==========
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.scroll-animation');

        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    // ========== STATS COUNTER ANIMATION ==========
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');

        if (statNumbers.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const count = parseInt(target.getAttribute('data-count')) || 0;
                    animateCounter(target, count);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }

    // ========== SKILL PROGRESS BARS ANIMATION ==========
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress .progress-bar');

        if (skillBars.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width');

                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);

                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    // ========== PROJECT FILTERING (Opcional) ==========
    function initProjectFiltering() {
        const filterButtons = document.querySelectorAll('[data-filter]');
        const projectItems = document.querySelectorAll('.project-item');

        if (filterButtons.length === 0) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                projectItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ========== CONTACT FORM VALIDATION ==========
    function initContactForm() {
        const form = document.querySelector('.contact-form');

        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const message = form.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                showNotification('Por favor completa todos los campos requeridos', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Por favor ingresa un email válido', 'error');
                return;
            }

            showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            form.reset();
        });
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} notification-toast`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            animation: slideInRight 0.3s ease;
            border-radius: 12px;
            font-weight: 500;
        `;
        notification.innerHTML = `
            <strong>${type === 'success' ? '✓' : '✗'}</strong> ${message}
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // ========== LAZY LOADING IMAGES ==========
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ========== TOOLTIP INITIALIZATION ==========
    function initTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // ========== PROJECT DETAIL PAGE ==========
    function initProjectDetail() {
        if (!window.location.pathname.includes('project-detail')) return;

        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');

        if (projectId) {
            loadProjectData(projectId);
        }
    }

    function loadProjectData(id) {
        console.log('Loading project data for ID:', id);
    }

    // ========== UPDATE CURRENT YEAR IN FOOTER ==========
    function updateFooterYear() {
        const yearElements = document.querySelectorAll('.current-year');
        const currentYear = new Date().getFullYear();

        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    }

    // ========== PRELOADER (Opcional) ==========
    function initPreloader() {
        const preloader = document.querySelector('.preloader');

        if (preloader) {
            window.addEventListener('load', function() {
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 300);
                }, 500);
            });
        }
    }

    // ========== INITIALIZATION ==========
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAll);
        } else {
            initAll();
        }
    }

    function initAll() {
        console.log('🚀 Portfolio initialized');

        initThemeToggle();
        handleNavbarScroll();
        initScrollTopButton();
        initSmoothScroll();
        initActiveNavigation();
        initScrollAnimations();
        initStatsCounter();
        initSkillBars();
        initProjectFiltering();
        initContactForm();
        initLazyLoading();
        initTooltips();
        initProjectDetail();
        updateFooterYear();
        initPreloader();

        console.log('✅ All features loaded');
    }

    init();

})();