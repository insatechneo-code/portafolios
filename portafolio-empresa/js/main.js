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
    // Fundido entre temas donde el navegador lo soporta; si no, cambio directo.
    function toggleTheme() {
        const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        const apply = () => {
            setTheme(next);
            localStorage.setItem('theme', next);
        };
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (document.startViewTransition && !reduced) document.startViewTransition(apply);
        else apply();
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
        const main = document.querySelector('.circuit-main');
        onScroll(() => {
            navbar.classList.toggle('navbar-scrolled', window.scrollY > 100);
            // Riel de circuito: 0 al empezar <main>, 1 al llegar al final.
            if (main) {
                const start = main.offsetTop - window.innerHeight * 0.5;
                const progress = (window.scrollY - start) / main.offsetHeight;
                main.style.setProperty('--rail', Math.min(Math.max(progress, 0), 1).toFixed(4));
            }
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
                // getBoundingClientRect: offsetTop sería relativo a <main> (position: relative).
                window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
                const collapse = document.querySelector('.navbar-collapse.show');
                if (collapse) collapse.classList.remove('show');
            });
        });
    }

    // ========== ACTIVE NAV ==========
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id], header[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        onScroll(() => {
            let current = '';
            // Posición real en la página: offsetTop sería relativo a <main>, que tiene
            // position: relative por el riel de circuito.
            sections.forEach(sec => {
                const top = sec.getBoundingClientRect().top + window.scrollY;
                if (window.scrollY >= top - 100 && window.scrollY < top + sec.clientHeight) {
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

    // Nivel de habilidad -> clave corta (CSS) y cuántos de los 3 "LEDs" se encienden.
    const LEVELS = {
        'Sólido': { slug: 'solido', on: 3 },
        'En práctica': { slug: 'practica', on: 2 },
        'Explorando': { slug: 'explorando', on: 1 },
    };
    const leds = (on) => `<span class="leds" aria-hidden="true">${[1, 2, 3]
        .map((n) => `<i class="${n <= on ? 'on' : ''}"></i>`).join('')}</span>`;

    function renderSocialIcons(linksArr) {
        const items = renderList(linksArr, s => `
      <li>
        <a href="${s.url}" ${s.url.startsWith('mailto') ? '' : 'target="_blank" rel="noopener noreferrer"'}
           class="social-icon-link" aria-label="${s.label}" title="${s.label}">
          <i class="bi ${s.icon}" aria-hidden="true"></i>
        </a>
      </li>`);
        return `<ul class="social-icon">${items}</ul>`;
    }

    // Cifras como nodos de circuito unidos por una pista.
    function renderAboutStats() {
        const container = $('aboutStats');
        if (!container) return;
        container.innerHTML = renderList(aboutStats, s => `
      <li class="stat-node">
        <span class="stat-number" data-count="${s.count}">0</span>
        <span class="stat-label">${s.label}</span>
      </li>`);
    }

    // Servicios principales: tablero 2×2 de "nodos"; cada tarjeta tiene su punto de
    // conexión en la esquina, que se enciende al pasar el cursor.
    function renderServices() {
        const container = $('servicesGrid');
        if (container) {
            container.innerHTML = renderList(services, s => `
      <article class="service-node reveal">
        <span class="service-pin" aria-hidden="true"></span>
        <div class="service-icon"><i class="bi ${esc(s.icon)}" aria-hidden="true"></i></div>
        <h3 class="service-title">${esc(s.title)}</h3>
        <p class="service-description">${s.description}</p>
        <div class="service-tags">
          ${renderList(s.tags || [], t => `<span class="tech-tag">${esc(t)}</span>`)}
        </div>
      </article>`);
        }

        // Servicios complementarios: fila secundaria y compacta, para que no compitan
        // visualmente con la oferta principal de software.
        const secondary = $('secondaryServicesGrid');
        const secondaryBlock = $('secondaryServices');
        const list = PORTFOLIO.secondaryServices || [];
        if (!secondary) return;
        if (!list.length) {
            if (secondaryBlock) secondaryBlock.style.display = 'none';
            return;
        }
        secondary.innerHTML = renderList(list, s => `
      <li>
        <i class="bi ${esc(s.icon)}" aria-hidden="true"></i>
        <div>
          <h4 class="secondary-title">${esc(s.title)}</h4>
          <p>${s.description}</p>
        </div>
      </li>`);
    }

    // Equipo: perfil compacto; la trayectoria (experiencia y educación) se despliega
    // con "Ver trayectoria" (interactions.js), para no mostrar dos hojas de vida enteras.
    function renderTeam() {
        const container = $('teamGrid');
        if (!container) return;
        container.innerHTML = renderList(team, (m, i) => `
      <article class="team-card reveal">
        <header class="team-head">
          <div class="team-avatar-wrap"><img src="${m.photo}" class="team-avatar" alt="${m.name}" loading="lazy" decoding="async"></div>
          <div>
            <h3 class="team-name">${m.name}</h3>
            <p class="team-role">${m.role}</p>
            <div class="team-social">
              ${renderList(m.social, s => `
                <a href="${s.url}" ${s.url.startsWith('mailto') ? '' : 'target="_blank" rel="noopener noreferrer"'} aria-label="${s.label}" title="${s.label}">
                  <i class="bi ${s.icon}" aria-hidden="true"></i>
                </a>`)}
            </div>
          </div>
        </header>
        <p class="team-profile">${m.profile}</p>
        ${m.focus?.length ? `<div class="team-focus">
          ${renderList(m.focus, f => `<span class="tech-tag">${esc(f)}</span>`)}
        </div>` : ''}

        <button type="button" class="trail-toggle" aria-expanded="false" aria-controls="trail-${i}">
          <i class="bi bi-diagram-3 me-2" aria-hidden="true"></i><span>Ver trayectoria</span>
          <i class="bi bi-chevron-down trail-chevron" aria-hidden="true"></i>
        </button>
        <div class="trail" id="trail-${i}" hidden>
          <h4 class="trail-title"><i class="bi bi-briefcase me-2" aria-hidden="true"></i>Experiencia relevante</h4>
          <ul class="trail-list">
            ${renderList(m.experience, exp => `
              <li>
                <span class="trail-date">${exp.date}</span>
                <strong>${exp.title}</strong>
                <p>${exp.desc}</p>
              </li>`)}
          </ul>
          <h4 class="trail-title"><i class="bi bi-mortarboard me-2" aria-hidden="true"></i>Educación</h4>
          <ul class="trail-list">
            ${renderList(m.education, ed => `
              <li>
                <strong>${ed.title}</strong>
                <span class="trail-date">${ed.institution}</span>
              </li>`)}
          </ul>
        </div>

        <a href="${m.portfolioUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost team-portfolio">
          <i class="bi bi-box-arrow-up-right me-2"></i>Ver Portafolio Personal
        </a>
      </article>`);
    }

    // Stack: dos columnas de filas; el nivel se muestra con 3 "LEDs" y en texto.
    function renderSkills() {
        const container = $('skillsContainer');
        if (!container) return;
        container.innerHTML = renderList(skills, cat => `
      <section class="stack-group reveal">
        <h3 class="stack-title"><i class="bi ${cat.icon}" aria-hidden="true"></i>${cat.category}</h3>
        <ul class="stack-list" data-stagger>
          ${renderList(cat.items, s => {
            const nivel = s.level || 'En práctica';
            const lv = LEVELS[nivel] || LEVELS['En práctica'];
            return `
            <li class="stack-row" data-level="${lv.slug}">
              <i class="bi ${esc(s.icon)} stack-icon" aria-hidden="true"></i>
              <span class="stack-name">${esc(s.name)}</span>
              ${leds(lv.on)}
              <span class="stack-level">${esc(nivel)}</span>
            </li>`;
          })}
        </ul>
      </section>`);
    }

    function renderProjectCards() {
        const grid = $('projectsGrid');
        if (!grid) return;

        // Solo se muestran los proyectos cuyo id esté listado en projectCards (portfolio-data.js).
        const visibles = (projectCards || []).filter(id => projects[id]);

        // Estado vacío: es preferible decir "aún no hay casos publicados" que mostrar
        // proyectos de relleno con enlaces que no llevan a ninguna parte. Se dibuja como
        // un conector abierto esperando su primer proyecto.
        if (!visibles.length) {
            grid.innerHTML = `
        <div class="col-12">
          <div class="empty-node reveal">
            <div class="empty-socket" aria-hidden="true">
              <span class="socket-line"></span>
              <span class="socket-ring"><i class="bi bi-plus-lg"></i></span>
            </div>
            <div class="empty-copy">
              <h3 class="empty-state-title">Estamos preparando nuestros primeros casos</h3>
              <p class="empty-state-text">
                Aquí publicaremos los proyectos con capturas, stack y resultados.
                Si quieres ser uno de los primeros, cuéntanos tu idea y armamos una propuesta sin costo.
              </p>
              <a href="#contact" class="btn btn-primary-solid smoothscroll">
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
        <div class="col-lg-4 col-md-6 col-12 mb-4 project-item reveal" data-category="${esc(p.category || 'web')}">
          <a class="project-card" href="project-detail.html?id=${encodeURIComponent(id)}">
            <span class="project-image-wrap">
              <img src="${esc(p.mainImage)}" class="project-image" alt="${esc(p.title)}" loading="lazy" decoding="async">
            </span>
            <span class="project-info">
              <span class="project-title">${esc(p.title)}</span>
              <span class="project-brief">${p.brief}</span>
              <span class="project-tech-tags">
                ${renderList(p.tags || p.tech || [], t => `<span class="tech-tag">${esc(t)}</span>`)}
              </span>
            </span>
          </a>
        </div>`;
        });
    }

    function renderContactInfo() {
        const container = $('contactInfoGrid');
        if (!container) return;
        container.innerHTML = renderList(contactInfo, item => `
      <li>
        <i class="bi ${item.icon}" aria-hidden="true"></i>
        <div>
          <span class="contact-label">${item.title}</span>
          ${renderList(item.lines, line =>
            line.url
                ? `<a href="${line.url}" ${line.url.startsWith('mailto') ? '' : 'target="_blank" rel="noopener noreferrer"'}>${line.text}</a>`
                : `<span class="contact-text">${line.text}</span>`
        )}
        </div>
      </li>`);
    }

    function renderFooter() {
        const footer = $('siteFooter');
        if (!footer) return;
        footer.innerHTML = `
      <div class="container footer-row">
        <div class="footer-brand">
          <img src="${company.logo}" alt="" width="40" height="40">
          <div>
            <p class="footer-name">${company.brandHTML}</p>
            <p class="footer-meta">${company.tagline}</p>
          </div>
        </div>
        ${renderSocialIcons(socialLinks)}
        <p class="footer-meta footer-copy">
          © ${new Date().getFullYear()} ${company.name}. Todos los derechos reservados. | Breiner Guisao & Luisa Sánchez
        </p>
      </div>`;
    }

    // ========== PROJECT DETAIL PAGE ==========
    function renderDetailNavbar() {
        const nav = $('detailNavbar');
        if (!nav) return;
        nav.innerHTML = `
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <img src="${company.logo}" alt="" class="navbar-logo" width="40" height="40">
          <span>${company.brandHTML}</span>
        </a>
        <button class="btn btn-theme-toggle d-lg-none ms-auto me-3" id="themeToggle" aria-label="Cambiar tema">
          <i class="bi bi-sun-fill"></i>
        </button>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Abrir menú">
          <i class="bi bi-list"></i>
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
          <a href="index.html#projects" class="btn btn-ghost nav-cta">
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
            fill('projectSubtitle', 'Este enlace no corresponde a ningún proyecto publicado.');
            fill('projectLinksButtons', `<a href="index.html#projects" class="btn btn-primary-solid">
              <i class="bi bi-arrow-left me-2"></i>Ver los proyectos</a>`);
            // Sin proyecto no hay nada que mostrar debajo: se ocultan las secciones vacías.
            document.querySelectorAll('.project-gallery-section, .project-details-section, .project-team-section, .related-projects-section')
                .forEach((sec) => { sec.hidden = true; });
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
        if (isExternal(p.github)) btns += `<a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-solid me-2"><i class="bi bi-github me-2"></i>Ver Código</a>`;
        if (isExternal(p.demo)) btns += `<a href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost"><i class="bi bi-box-arrow-up-right me-2"></i>Demo en Vivo</a>`;
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
                `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost"><i class="${l.icon} me-2"></i>${l.label}</a>`));
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
        fill('heroSocial', renderSocialIcons(socialLinks));
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
        initContactForm();
        initTooltips();
        initProjectDetail();

    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else { initAll(); }

})();