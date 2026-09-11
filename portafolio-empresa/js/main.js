/* ============================================
   MAIN.JS — INSATECH NEO
   Depende de: portfolio-data.js
   ============================================ */

(function () {
    'use strict';

    if (typeof PORTFOLIO === 'undefined') {
        console.error('portfolio-data.js no se cargó: revisa la ruta del script en el HTML.');
        return;
    }

    const {
        company, socialLinks, aboutStats, services, team,
        skills, projects, projectCards, contactInfo,
    } = PORTFOLIO;

    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    let themeToggles = [
        document.getElementById('themeToggle'),
        document.getElementById('themeToggleDesktop'),
    ].filter(Boolean);

    // Helpers
    const renderList = (arr, tpl) => arr.map(tpl).join('');
    const $ = (id) => document.getElementById(id);
    const fill = (id, html) => { const el = $(id); if (el) el.innerHTML = html; };

    // ========== SCROLL: un solo listener con rAF ==========
    // Antes había 3 listeners de 'scroll' independientes disparando en cada frame.
    // Ahora se registran callbacks y se ejecutan una vez por frame.
    const scrollHandlers = [];
    let scrollTicking = false;
    function onScroll(fn) {
        scrollHandlers.push(fn);
        fn();
    }
    window.addEventListener('scroll', () => {
        if (scrollTicking) return;
        scrollTicking = true;
        requestAnimationFrame(() => {
            scrollHandlers.forEach((fn) => fn());
            scrollTicking = false;
        });
    }, { passive: true });

    // Escapa texto antes de insertarlo como HTML.
    const esc = (str) => String(str ?? '').replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));

    // Un enlace es externo si sale del sitio; los '#ancla' no deben abrirse en pestaña nueva.
    const isExternal = (url) => /^(https?:)?\/\//i.test(String(url || ''));

    // ========== THEME ==========
    function initThemeToggle() {
        const saved = localStorage.getItem('theme') || 'dark';
        setTheme(saved);
        themeToggles.forEach(btn => btn.addEventListener('click', toggleTheme));
    }
    function toggleTheme() {
        const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(next);
        localStorage.setItem('theme', next);
    }
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        const iconClass = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        themeToggles.forEach(btn => {
            const i = btn.querySelector('i');
            if (i) i.className = iconClass;
        });
    }

    // ========== NAVBAR SCROLL ==========
    function initNavbarScroll() {
        if (!navbar) return;
        onScroll(() => {
            navbar.classList.toggle('navbar-scrolled', window.scrollY > 100);
        });
    }

    // ========== SCROLL TOP ==========
    function initScrollTop() {
        if (!scrollTopBtn) return;
        onScroll(() => {
            scrollTopBtn.classList.toggle('show', window.scrollY > 300);
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== SMOOTH SCROLL ==========
    function initSmoothScroll() {
        document.querySelectorAll('.click-scroll, .smoothscroll').forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href?.startsWith('#')) return;
                e.preventDefault();
                const target = document.querySelector(href);
                if (!target) return;
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                const collapse = document.querySelector('.navbar-collapse.show');
                if (collapse) collapse.classList.remove('show');
            });
        });
    }

    // ========== ACTIVE NAV ==========
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        onScroll(() => {
            let current = '';
            sections.forEach(sec => {
                if (window.scrollY >= sec.offsetTop - 100 &&
                    window.scrollY < sec.offsetTop + sec.clientHeight) {
                    current = sec.id;
                }
            });
            navLinks.forEach(l => {
                l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
            });
        });
    }

    // ========== OBSERVER ==========
    function observe(selector, callback, options = { threshold: 0.5 }) {
        const els = document.querySelectorAll(selector);
        if (!els.length) return;
        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { callback(entry.target); obs.unobserve(entry.target); }
            });
        }, options);
        els.forEach(el => obs.observe(el));
    }

    // ========== STATS COUNTER ==========
    function initStatsCounter() {
        // Duración fija (~1,2 s) en lugar de 50 pasos de 40 ms. Con el contador viejo,
        // un valor bajo pasaba dos segundos completos mostrando "0" antes de llegar a
        // su número, porque Math.floor(target/50 * n) se queda en 0 casi todo el tramo.
        const DURACION = 1200;
        observe('.stat-number', (el) => {
            const target = parseInt(el.dataset.count, 10) || 0;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                el.textContent = target;
                return;
            }
            const inicio = performance.now();
            const paso = (ahora) => {
                const p = Math.min((ahora - inicio) / DURACION, 1);
                el.textContent = Math.round(target * p);
                if (p < 1) requestAnimationFrame(paso);
            };
            requestAnimationFrame(paso);
        });
    }

    // ========== SKILL BARS ==========
    function initSkillBars() {
        observe('.skill-progress .progress-bar', bar => {
            setTimeout(() => { bar.style.width = bar.dataset.width; }, 100);
        });
    }

    // ========== NOTIFICATIONS ==========
    function showNotification(message, type) {
        document.querySelectorAll('.notification-toast').forEach(n => n.remove());
        const isSuccess = type === 'success';
        const div = document.createElement('div');
        div.className = `alert alert-${isSuccess ? 'success' : 'danger'} notification-toast`;
        div.style.cssText = `
      position:fixed;top:100px;right:20px;z-index:9999;min-width:320px;max-width:450px;
      animation:slideInRight .3s ease;border-radius:12px;font-weight:500;
      box-shadow:0 10px 30px rgba(0,0,0,0.2);display:flex;align-items:flex-start;gap:10px;
    `;
        div.innerHTML = `
      <i class="bi ${isSuccess ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'}"
         style="font-size:1.2rem;margin-top:2px"></i>
      <div>
        <strong>${isSuccess ? '¡Enviado!' : 'Error'}</strong>
        <p style="margin:4px 0 0;font-size:0.9rem;font-weight:400">${message}</p>
      </div>
      <button type="button" class="btn-close ms-auto" style="font-size:0.7rem" aria-label="Cerrar"></button>
    `;
        document.body.appendChild(div);
        div.querySelector('.btn-close').addEventListener('click', () => {
            div.style.animation = 'slideOutRight .3s ease';
            setTimeout(() => div.remove(), 300);
        });
        setTimeout(() => {
            if (div.parentNode) {
                div.style.animation = 'slideOutRight .3s ease';
                setTimeout(() => div.remove(), 300);
            }
        }, 6000);
    }

    // ========== CONTACT FORM ==========
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        const { publicKey, serviceId, templateId } = PORTFOLIO.emailjs;
        if (typeof emailjs !== 'undefined' && publicKey && publicKey !== 'TU_PUBLIC_KEY_AQUI') {
            emailjs.init(publicKey);
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const subject = form.querySelector('#subject')?.value.trim() || '';
            const message = form.querySelector('#message').value.trim();
            const submitBtn = form.querySelector('button[type="submit"]');

            if (!name || !email || !message) {
                showNotification('Por favor completa todos los campos requeridos.', 'error');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showNotification('Por favor ingresa un email válido.', 'error');
                return;
            }
            if (!publicKey || publicKey === 'TU_PUBLIC_KEY_AQUI') {
                showNotification('El formulario aún no está configurado. Contáctanos directamente por email.', 'error');
                return;
            }

            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando...';

            try {
                await emailjs.send(serviceId, templateId, {
                    from_name: name, from_email: email,
                    subject: subject || 'Sin asunto', message,
                });
                showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
                form.reset();
            } catch (error) {
                console.error('Error EmailJS:', error);
                showNotification('Hubo un error al enviar. Intenta de nuevo o escríbenos a ' + company.email, 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            }
        });
    }

    // ========== TOOLTIPS ==========
    function initTooltips() {
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
            .forEach(el => new bootstrap.Tooltip(el));
    }

    // ========== RENDERERS ==========

    function renderSocialIcons(linksArr, withLabel = false, labelText = 'Síguenos:') {
        const items = renderList(linksArr, s => `
      <li class="social-icon-item">
        <a href="${s.url}" ${s.url.startsWith('mailto') ? '' : 'target="_blank" rel="noopener noreferrer"'}
           class="social-icon-link" aria-label="${s.label}">
          <span class="${s.icon}"></span>
        </a>
      </li>`);
        return `<ul class="social-icon d-flex align-items-center justify-content-center">
      ${withLabel ? `<span class="text-white me-3">${labelText}</span>` : ''}${items}</ul>`;
    }

    function renderAboutStats() {
        const container = $('aboutStats');
        if (!container) return;
        container.innerHTML = renderList(aboutStats, s => `
      <div class="col-4">
        <div class="stat-item">
          <h3 class="stat-number" data-count="${s.count}">0</h3>
          <p class="stat-label">${s.label}</p>
        </div>
      </div>`);
    }

    function renderServices() {
        const container = $('servicesGrid');
        if (container) {
            container.innerHTML = renderList(services, s => `
      <div class="col-lg-6 col-12 mb-4">
        <div class="service-card">
          <div class="service-icon"><i class="bi ${esc(s.icon)}"></i></div>
          <h4 class="service-title">${esc(s.title)}</h4>
          <p class="service-description">${s.description}</p>
          <div class="service-tags">
            ${renderList(s.tags || [], t => `<span class="tech-tag">${esc(t)}</span>`)}
          </div>
        </div>
      </div>`);
        }

        // Servicios complementarios: se muestran en una fila secundaria y compacta,
        // para que no compitan visualmente con la oferta principal de software.
        const secondary = $('secondaryServicesGrid');
        const secondaryBlock = $('secondaryServices');
        const list = PORTFOLIO.secondaryServices || [];
        if (!secondary) return;
        if (!list.length) {
            if (secondaryBlock) secondaryBlock.style.display = 'none';
            return;
        }
        secondary.innerHTML = renderList(list, s => `
      <div class="col-lg-4 col-md-6 col-12 mb-4">
        <div class="service-card service-card--compact">
          <div class="service-icon service-icon--sm"><i class="bi ${esc(s.icon)}"></i></div>
          <h5 class="service-title">${esc(s.title)}</h5>
          <p class="service-description">${s.description}</p>
        </div>
      </div>`);
    }

    function renderTeam() {
        const container = $('teamGrid');
        if (!container) return;
        container.innerHTML = renderList(team, m => `
      <div class="col-lg-6 col-12 mb-5">
        <div class="team-card">
          <div class="team-card-header">
            <div class="team-avatar-wrap">
              <img src="${m.photo}" class="team-avatar" alt="${m.name}">
            </div>
            <h3 class="team-name">${m.name}</h3>
            <p class="team-role">${m.role}</p>
            <div class="team-social">
              ${renderList(m.social, s => `
                <a href="${s.url}" ${s.url.startsWith('mailto') ? '' : 'target="_blank" rel="noopener noreferrer"'} aria-label="${s.label}">
                  <i class="bi ${s.icon}"></i>
                </a>`)}
            </div>
          </div>
          <div class="team-card-body">
            <h5 class="team-section-subtitle"><i class="bi bi-person-badge me-2"></i>Perfil</h5>
            <p>${m.profile}</p>

            ${m.focus?.length ? `<div class="team-focus mb-4">
              ${renderList(m.focus, f => `<span class="tech-tag">${esc(f)}</span>`)}
            </div>` : ''}

            <h5 class="team-section-subtitle"><i class="bi bi-briefcase me-2"></i>Experiencia relevante</h5>
            <div class="team-experience">
              ${renderList(m.experience, exp => `
                <div class="experience-item">
                  <span class="experience-date">${exp.date}</span>
                  <strong>${exp.title}</strong>
                  <p>${exp.desc}</p>
                </div>`)}
            </div>

            <h5 class="team-section-subtitle"><i class="bi bi-mortarboard me-2"></i>Educación</h5>
            <div class="team-education">
              ${renderList(m.education, ed => `
                <div class="education-item">
                  <strong>${ed.title}</strong>
                  <span>${ed.institution}</span>
                </div>`)}
            </div>

            <div class="team-portfolio-link mt-4">
              <a href="${m.portfolioUrl}" target="_blank" rel="noopener noreferrer" class="btn custom-btn w-100">
                <i class="bi bi-box-arrow-up-right me-2"></i>Ver Portafolio Personal
              </a>
            </div>
          </div>
        </div>
      </div>`);
    }

    function renderSkills() {
        const container = $('skillsContainer');
        if (!container) return;
        container.innerHTML = renderList(skills, cat => `
      <div class="skill-category mb-5">
        <h3 class="skill-category-title mb-4">
          <i class="bi ${cat.icon} me-2"></i> ${cat.category}
        </h3>
        <div class="row">
          ${renderList(cat.items, s => {
            const nivel = s.level || 'En práctica';
            const slug = { 'Sólido': 'solido', 'En práctica': 'practica', 'Explorando': 'explorando' }[nivel] || 'practica';
            return `
            <div class="col-lg-4 col-md-6 col-12 mb-4">
              <div class="skill-item skill-item--level">
                <div class="skill-header">
                  <div class="skill-icon-name">
                    <i class="bi ${esc(s.icon)} skill-icon-bootstrap"></i>
                    <h5 class="skill-name">${esc(s.name)}</h5>
                  </div>
                  <span class="skill-level skill-level--${slug}">${esc(nivel)}</span>
                </div>
              </div>
            </div>`;
          })}
        </div>
      </div>`);
    }

    function renderProjectCards() {
        const grid = $('projectsGrid');
        if (!grid) return;

        // Solo se muestran los proyectos cuyo id esté listado en projectCards (portfolio-data.js).
        const visibles = (projectCards || []).filter(id => projects[id]);

        // Estado vacío: es preferible decir "aún no hay casos publicados" que mostrar
        // proyectos de relleno con enlaces que no llevan a ninguna parte.
        if (!visibles.length) {
            grid.innerHTML = `
        <div class="col-lg-8 col-12 mx-auto">
          <div class="empty-state text-center">
            <i class="bi bi-rocket-takeoff empty-state-icon"></i>
            <h4 class="empty-state-title">Estamos preparando nuestros primeros casos</h4>
            <p class="empty-state-text">
              Aquí publicaremos los proyectos con capturas, stack y resultados.
              Si quieres ser uno de los primeros, cuéntanos tu idea y armamos una propuesta sin costo.
            </p>
            <div class="empty-state-actions">
              <a href="#contact" class="btn custom-btn smoothscroll">
                <i class="bi bi-chat-dots me-2"></i>Cuéntanos tu proyecto
              </a>
            </div>
          </div>
        </div>`;
            return;
        }

        grid.innerHTML = renderList(visibles, id => {
            const p = projects[id];
            return `
        <div class="col-lg-4 col-md-6 col-12 mb-4 project-item" data-category="${esc(p.category || 'web')}">
          <div class="project-card">
            <div class="project-image-wrap">
              <img src="${esc(p.mainImage)}" class="project-image img-fluid" alt="${esc(p.title)}"
                   loading="lazy" decoding="async">
              <div class="project-overlay">
                <a href="project-detail.html?id=${encodeURIComponent(id)}" class="btn btn-project-detail">
                  Ver Detalles <i class="bi bi-arrow-right ms-2"></i>
                </a>
              </div>
            </div>
            <div class="project-info">
              <h4 class="project-title">${esc(p.title)}</h4>
              <p class="project-brief">${p.brief}</p>
              <div class="project-tech-tags">
                ${renderList(p.tags || p.tech || [], t => `<span class="tech-tag">${esc(t)}</span>`)}
              </div>
            </div>
          </div>
        </div>`;
        });
    }

    function renderContactInfo() {
        const container = $('contactInfoGrid');
        if (!container) return;
        container.innerHTML = renderList(contactInfo, item => `
      <div class="col-lg-4 col-12 mb-4">
        <div class="contact-info-item">
          <i class="bi ${item.icon}"></i>
          <h5>${item.title}</h5>
          ${renderList(item.lines, line =>
            line.url
                ? `<a href="${line.url}" ${line.url.startsWith('mailto') ? '' : 'target="_blank" rel="noopener noreferrer"'}>${line.text}</a><br>`
                : `<p>${line.text}</p>`
        )}
        </div>
      </div>`);
    }

    function renderFooter() {
        const footer = $('siteFooter');
        if (!footer) return;
        footer.innerHTML = `
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-12 text-center text-lg-start mb-4 mb-lg-0">
            <div class="d-flex align-items-center justify-content-center justify-content-lg-start">
              <img src="${company.logo}" alt="${company.name}" style="width:40px;margin-right:12px;">
              <div>
                <h4 class="text-white mb-1">${company.brandHTML}</h4>
                <p class="text-white-50 mb-0" style="font-size:0.85rem">${company.tagline}</p>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-12 d-flex justify-content-center justify-content-lg-end align-items-center">
            ${renderSocialIcons(socialLinks)}
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-12 text-center">
            <p class="copyright-text text-white-50">
              © ${new Date().getFullYear()} ${company.name}. Todos los derechos reservados. | Breiner Guisao & Luisa Sánchez
            </p>
          </div>
        </div>
      </div>`;
    }

    // ========== PROJECT DETAIL PAGE ==========
    function renderDetailNavbar() {
        const nav = $('detailNavbar');
        if (!nav) return;
        nav.innerHTML = `
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="index.html">
          <img src="${company.logo}" alt="${company.name}" class="navbar-logo me-2">
          <span>${company.brandHTML}</span>
        </a>
        <button class="btn btn-theme-toggle d-lg-none ms-auto me-3" id="themeToggle" aria-label="Cambiar tema">
          <i class="bi bi-sun-fill"></i>
        </button>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav align-items-lg-center ms-auto me-lg-3">
            <li class="nav-item"><a class="nav-link" href="index.html#hero">Inicio</a></li>
            <li class="nav-item"><a class="nav-link" href="index.html#projects">Proyectos</a></li>
            <li class="nav-item"><a class="nav-link" href="index.html#contact">Contacto</a></li>
          </ul>
          <button class="btn btn-theme-toggle d-none d-lg-block me-3" id="themeToggleDesktop" aria-label="Cambiar tema">
            <i class="bi bi-sun-fill"></i>
          </button>
          <a href="index.html#projects" class="btn custom-btn d-lg-block d-none">
            <i class="bi bi-arrow-left me-2"></i>Volver
          </a>
        </div>
      </div>`;
        themeToggles = [];
        ['themeToggle', 'themeToggleDesktop'].forEach(id => {
            const el = $(id);
            if (el) { themeToggles.push(el); el.addEventListener('click', toggleTheme); }
        });
        setTheme(localStorage.getItem('theme') || 'dark');
    }

    function initProjectDetail() {
        if (!window.location.pathname.includes('project-detail')) return;

        renderDetailNavbar();

        const id = new URLSearchParams(window.location.search).get('id');
        const p = projects[id];

        if (!p) {
            fill('projectTitle', 'Proyecto no encontrado');
            fill('projectSubtitle', 'ID incorrecto');
            return;
        }

        document.title = `${p.title} - ${company.name}`;
        fill('projectTitle', p.title);
        fill('projectSubtitle', p.subtitle || '');
        fill('projectBreadcrumb', p.title);

        fill('projectMeta', `
      <span class="project-meta-item"><i class="bi bi-calendar3 me-2"></i><strong>Fecha:</strong> ${p.date || '—'}</span>
      <span class="project-meta-item"><i class="bi bi-person me-2"></i><strong>Rol:</strong> ${p.role || '—'}</span>
      <span class="project-meta-item"><i class="bi bi-clock me-2"></i><strong>Duración:</strong> ${p.duration || '—'}</span>
    `);

        let btns = '';
        // Solo se pinta el botón si el enlace es real; un '#' generaba un botón muerto.
        if (isExternal(p.github)) btns += `<a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer" class="btn custom-btn me-2"><i class="bi bi-github me-2"></i>Ver Código</a>`;
        if (isExternal(p.demo)) btns += `<a href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-hero"><i class="bi bi-box-arrow-up-right me-2"></i>Demo en Vivo</a>`;
        fill('projectLinksButtons', btns);

        if (p.demoAccess?.length) {
            fill('projectLinksDemo', `
        <div class="alert alert-info mt-4 mb-0 mx-auto" style="max-width:430px">
          <i class="bi bi-key me-2"></i><strong>Acceso Demo:</strong><br>
          ${renderList(p.demoAccess, d => `<div style="margin-bottom:3px"><b>${d.role}</b>: <code>${d.user}</code> | <b>Clave:</b> <code>${d.pass}</code></div>`)}
        </div>`);
        } else { fill('projectLinksDemo', ''); }

        const mainImg = $('projectMainImage');
        if (mainImg) { mainImg.src = p.mainImage; mainImg.alt = p.title; }

        fill('projectGallery', renderList(p.gallery || [], img => `
      <div class="col-lg-4 col-md-6 col-12 mb-4">
        <div class="project-screenshot">
          <img src="${img}" class="img-fluid rounded" alt="Vista de ${p.title}">
        </div>
      </div>`));

        fill('projectDescription', p.description || '');

        const badgeList = arr => renderList(arr || [], t => `<span class="tech-badge">${t}</span>`);
        fill('projectTech', badgeList(p.tech));
        fill('projectTools', badgeList(p.tools));

        const statsBox = $('projectStatsBox');
        if (p.stats?.length) {
            if (statsBox) statsBox.classList.remove('d-none');
            fill('projectStats', renderList(p.stats, s =>
                `<li><span class="stat-label">${s.label}:&nbsp;</span><span class="stat-value">${s.value}</span></li>`));
        }

        const extraBox = $('projectExtraLinksBox');
        if (p.extraLinks?.length) {
            if (extraBox) extraBox.classList.remove('d-none');
            fill('projectExtraLinks', renderList(p.extraLinks, l =>
                `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary"><i class="${l.icon} me-2"></i>${l.label}</a>`));
        }

        const pTeam = p.team || [];
        fill('teamDescription', pTeam.length === 1
            ? 'Este proyecto fue desarrollado de forma individual'
            : 'Personas que colaboraron en este proyecto');
        fill('projectTeam', renderList(pTeam, m => `
      <div class="col-lg-3 col-md-6 col-12 mb-4">
        <div class="team-member-card text-center">
          <div class="team-member-image">
            <img src="${m.photo}" class="img-fluid rounded-circle" alt="${m.name}">
          </div>
          <div class="team-member-info">
            <h5 class="team-member-name">${m.name}</h5>
            <p class="team-member-role">${m.role}</p>
            <p class="team-member-contribution">${m.contribution}</p>
            <div class="team-member-social">
              ${m.github ? `<a href="${m.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="bi bi-github"></i></a>` : ''}
              ${m.email ? `<a href="mailto:${m.email}" aria-label="Email"><i class="bi bi-envelope"></i></a>` : ''}
              ${m.whatsapp ? `<a href="${m.whatsapp}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>` : ''}
            </div>
          </div>
        </div>
      </div>`));
        // ========== PROYECTOS RELACIONADOS ==========
        const relatedContainer = $('relatedProjects');
        const relatedSection = document.querySelector('.related-projects-section');
        if (relatedContainer) {
            const relatedIds = (projectCards || []).filter(pid => pid !== id && projects[pid]).slice(0, 3);
            // Sin proyectos relacionados se oculta la sección completa en vez de dejar un hueco.
            if (relatedIds.length === 0 && relatedSection) relatedSection.style.display = 'none';
            if (relatedIds.length > 0) {
                relatedContainer.innerHTML = renderList(relatedIds, rid => {
                    const rp = projects[rid];
                    if (!rp) return '';
                    return `
            <div class="col-lg-4 col-md-6 col-12 mb-4">
              <div class="project-card">
                <div class="project-image-wrap">
                  <img src="${rp.mainImage}" class="project-image img-fluid" alt="${rp.title}">
                  <div class="project-overlay">
                    <a href="project-detail.html?id=${rid}" class="btn btn-project-detail">
                      Ver Detalles <i class="bi bi-arrow-right ms-2"></i>
                    </a>
                  </div>
                </div>
                <div class="project-info">
                  <h4 class="project-title">${rp.title}</h4>
                  <p class="project-brief">${rp.brief}</p>
                  <div class="project-tech-tags">
                    ${renderList(rp.tags || rp.tech, t => `<span class="tech-tag">${t}</span>`)}
                  </div>
                </div>
              </div>
            </div>`;
                });
            } else {
                relatedContainer.innerHTML = '<p class="text-center text-muted">No hay proyectos relacionados disponibles.</p>';
            }
        }
    }

    // ========== INIT ==========
    function initAll() {
        fill('heroSocial', renderSocialIcons(socialLinks, true, 'Síguenos:'));
        renderAboutStats();
        renderServices();
        renderTeam();
        renderSkills();
        renderProjectCards();
        renderContactInfo();
        renderFooter();

        initThemeToggle();
        initNavbarScroll();
        initScrollTop();
        initSmoothScroll();
        initActiveNav();
        initStatsCounter();
        initSkillBars();
        initContactForm();
        initTooltips();
        initProjectDetail();

        console.log('🚀 INSATECH NEO initialized');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else { initAll(); }

})();