/* ============================================
   MAIN.JS — Lógica del portafolio de Luisa
   Depende de: portfolio-data.js (cargado antes)
   ============================================ */

(function () {
    'use strict';

    if (typeof PORTFOLIO === 'undefined') {
        console.error('portfolio-data.js no se cargó: revisa la ruta del script en el HTML.');
        return;
    }

    const {
        owner,
        socialLinks,
        experience,
        projects,
        projectCards,
        skills,
        softSkills,
        education,
        certificates,
    } = PORTFOLIO;

    // ========== DOM REFERENCES ==========
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
    const fill = (id, html) => {
        const el = $(id);
        if (el) el.innerHTML = html;
    };

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

    // ========== THEME TOGGLE ==========
    function initThemeToggle() {
        const saved = localStorage.getItem('theme') || 'dark';
        setTheme(saved);
        themeToggles.forEach((btn) => btn.addEventListener('click', toggleTheme));
    }

    const prefersReducedMotion = () =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function toggleTheme() {
        const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        const apply = () => {
            setTheme(next);
            localStorage.setItem('theme', next);
        };
        // Fundido entre temas donde el navegador lo soporta; si no, cambio directo.
        if (document.startViewTransition && !prefersReducedMotion()) {
            document.startViewTransition(apply);
        } else {
            apply();
        }
        if (!prefersReducedMotion()) {
            themeToggles.forEach((btn) => btn.querySelector('i')?.animate(
                [{ transform: 'rotate(-90deg) scale(.6)', opacity: 0 }, { transform: 'none', opacity: 1 }],
                { duration: 300, easing: 'cubic-bezier(.16, 1, .3, 1)' }
            ));
        }
    }

    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        const iconClass = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        themeToggles.forEach((btn) => {
            const i = btn.querySelector('i');
            if (i) i.className = iconClass;
        });
    }

    // ========== NAVBAR SCROLL ==========
    function initNavbarScroll() {
        if (!navbar) return;
        onScroll(() => {
            navbar.classList.toggle('navbar-scrolled', window.scrollY > 100);
            // Progreso de lectura (0 a 1) para la barra morada bajo el navbar.
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
            navbar.style.setProperty('--scroll', progress.toFixed(4));
        });
    }

    // ========== SCROLL TO TOP ==========
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
        document.querySelectorAll('.click-scroll, .smoothscroll').forEach((link) => {
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
            sections.forEach((sec) => {
                if (
                    window.scrollY >= sec.offsetTop - 100 &&
                    window.scrollY < sec.offsetTop + sec.clientHeight
                ) {
                    current = sec.id;
                }
            });
            navLinks.forEach((l) => {
                l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
            });
        });
    }

    // ========== INTERSECTION OBSERVER ==========
    function observe(selector, callback, options = { threshold: 0.5 }) {
        const els = document.querySelectorAll(selector);
        if (!els.length) return;
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    callback(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, options);
        els.forEach((el) => obs.observe(el));
    }

    // ========== STATS COUNTER ==========
    function initStatsCounter() {
        // Duración fija (~1,2 s) en lugar de 50 pasos de 40 ms. Con el contador viejo,
        // un valor bajo pasaba dos segundos completos mostrando "0" antes de llegar a
        // su número, porque Math.floor(target/50 * n) se queda en 0 casi todo el tramo.
        const DURACION = 1200;
        observe('.stat-number', (el) => {
            const target = parseInt(el.dataset.count, 10) || 0;
            if (prefersReducedMotion()) {
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

    // ========== REVEAL AL HACER SCROLL ==========
    // Solo los bloques grandes aparecen una vez; el CSS desactiva el efecto con
    // prefers-reduced-motion, y sin IntersectionObserver todo queda visible.
    function initReveal() {
        // Cada hijo de un [data-stagger] recibe su posición para el retraso en cascada.
        document.querySelectorAll('[data-stagger]').forEach((list) => {
            Array.from(list.children).forEach((child, i) => child.style.setProperty('--i', i));
        });
        const els = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            els.forEach((el) => el.classList.add('is-visible'));
            return;
        }
        body.classList.add('reveal-ready');
        observe('.reveal', (el) => el.classList.add('is-visible'), { threshold: 0.12 });
    }

    // ========== NOTIFICATIONS (contacto) ==========
    function showNotification(message, type) {
        document.querySelectorAll('.notification-toast').forEach((n) => n.remove());

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

    // ========== CONTACT FORM + EmailJS ==========
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        const { publicKey, serviceId, templateId } = PORTFOLIO.emailjs;
        if (publicKey && publicKey !== 'TU_PUBLIC_KEY_AQUI') {
            emailjs.init(publicKey);
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameField = form.querySelector('#name');
            const emailField = form.querySelector('#email');
            const subjectField = form.querySelector('#subject');
            const messageField = form.querySelector('#message');
            const submitBtn = form.querySelector('button[type="submit"]');

            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const subject = subjectField.value.trim();
            const message = messageField.value.trim();

            if (!name || !email || !message) {
                showNotification('Por favor completa todos los campos requeridos.', 'error');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showNotification('Por favor ingresa un email válido.', 'error');
                return;
            }

            if (!publicKey || publicKey === 'TU_PUBLIC_KEY_AQUI') {
                showNotification('El formulario aún no está configurado. Contáctame directamente por email.', 'error');
                return;
            }

            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando...';

            try {
                await emailjs.send(serviceId, templateId, {
                    from_name: name,
                    from_email: email,
                    subject: subject || 'Sin asunto',
                    message: message,
                });

                showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
                form.reset();
            } catch (error) {
                console.error('Error EmailJS:', error);
                showNotification(
                    'Hubo un error al enviar. Intenta de nuevo o escríbeme a ' + owner.email,
                    'error'
                );
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            }
        });
    }

    // ========== TOOLTIPS ==========
    function initTooltips() {
        document
            .querySelectorAll('[data-bs-toggle="tooltip"]')
            .forEach((el) => new bootstrap.Tooltip(el));
    }

    // ========== RENDERERS ==========

    function renderSocialIcons(linksArr) {
        const items = renderList(
            linksArr,
            (s) => `
      <li>
        <a href="${s.url}" ${s.url.startsWith('mailto') || s.url.startsWith('tel') ? '' : 'target="_blank" rel="noopener noreferrer"'
                }
           class="social-icon-link" aria-label="${s.label}" title="${s.label}">
          <i class="bi ${s.icon}" aria-hidden="true"></i>
        </a>
      </li>`
        );
        return `<ul class="social-icon">${items}</ul>`;
    }

    function renderFooter() {
        return `
      <div class="container footer-row">
        <div>
          <p class="footer-name">${owner.name}</p>
          <p class="footer-meta">${owner.title}</p>
        </div>
        ${renderSocialIcons(socialLinks.slice(0, 3))}
        <p class="footer-meta footer-copy">
          © ${new Date().getFullYear()} ${owner.name}. Todos los derechos reservados.
        </p>
      </div>`;
    }

    function renderDetailNavbar() {
        const nav = $('detailNavbar');
        if (!nav) return;
        nav.innerHTML = `
      <div class="scroll-progress" aria-hidden="true"></div>
      <div class="container">
        <a class="navbar-brand" href="index.html">${owner.shortName}</a>
        <button class="btn btn-theme-toggle d-lg-none ms-auto me-3" id="themeToggle" aria-label="Cambiar tema">
          <i class="bi bi-moon-stars-fill"></i>
        </button>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Abrir menú">
          <i class="bi bi-list"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav align-items-lg-center ms-auto me-lg-3">
            <li class="nav-item"><a class="nav-link" href="index.html#hero">Inicio</a></li>
            <li class="nav-item"><a class="nav-link" href="index.html#projects">Proyectos</a></li>
            <li class="nav-item"><a class="nav-link" href="index.html#contact">Contacto</a></li>
          </ul>
          <button class="btn btn-theme-toggle d-none d-lg-block me-3" id="themeToggleDesktop" aria-label="Cambiar tema">
            <i class="bi bi-moon-stars-fill"></i>
          </button>
          <a href="index.html#projects" class="btn btn-ghost d-lg-block d-none">
            <i class="bi bi-arrow-left me-2"></i>Volver
          </a>
        </div>
      </div>`;
        themeToggles = [];
        ['themeToggle', 'themeToggleDesktop'].forEach((id) => {
            const el = $(id);
            if (el) {
                themeToggles.push(el);
                el.addEventListener('click', toggleTheme);
            }
        });
        setTheme(localStorage.getItem('theme') || 'dark');
    }

    // Cada empleo es una carpeta: la pestaña lleva las fechas, el cuerpo el cargo y las tareas.
    function renderExperience() {
        fill(
            'experienceTimeline',
            renderList(
                experience,
                (exp) => `
      <article class="folder reveal">
        <span class="folder-tab">${exp.date}</span>
        <div class="folder-body">
          <header class="folder-head">
            <h3 class="folder-title">${exp.title}</h3>
            <p class="folder-org"><i class="bi bi-building me-2" aria-hidden="true"></i>${exp.company}</p>
          </header>
          <ul class="folder-tasks" data-stagger>
            ${renderList(exp.tasks, (t) => `<li>${t}</li>`)}
          </ul>
        </div>
      </article>`
            )
        );
    }

    function renderProjectCards() {
        const grid = $('projectsGrid');
        if (!grid) return;

        // Solo se muestran los proyectos cuyo id esté en projectCards (portfolio-data.js).
        const visibles = (projectCards || []).filter((id) => projects[id]);

        // Estado vacío: mejor un mensaje honesto que una sección en blanco.
        if (!visibles.length) {
            // Se dibuja como una carpeta abierta y vacía, coherente con el resto del sitio.
            grid.innerHTML = `
        <div class="col-12">
          <div class="empty-folder reveal">
            <span class="folder-tab">Proyectos</span>
            <div class="empty-folder-body">
              <div class="empty-folder-sheets" aria-hidden="true">
                <span></span><span></span><span></span>
              </div>
              <div class="empty-folder-text">
                <h3 class="empty-state-title">Proyectos en preparación</h3>
                <p class="empty-state-text">
                  Estoy documentando mis proyectos para publicarlos aquí.
                  Mientras tanto puedes ver mi código en GitHub o escribirme directamente.
                </p>
                <div class="empty-state-actions">
                  <a href="${owner.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-solid">
                    <i class="bi bi-github me-2"></i>Ver mi GitHub
                  </a>
                  <a href="#contact" class="btn btn-ghost smoothscroll">
                    <i class="bi bi-chat-dots me-2"></i>Contactarme
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>`;
            return;
        }

        grid.innerHTML = renderList(visibles, (id) => {
            const p = projects[id];
            const demoExterna = isExternal(p.demo);
            return `
        <div class="col-lg-4 col-md-6 col-12 mb-4 project-item reveal" data-category="${esc(p.category || 'web')}">
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
              <p class="project-brief">
                ${p.brief}
                ${demoExterna ? `<br><strong><a href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">Ver demo</a></strong>` : ''}
              </p>
              <div class="project-tech-tags">
                ${renderList(p.tags || p.tech || [], (t) => `<span class="tech-tag">${esc(t)}</span>`)}
              </div>
            </div>
          </div>
        </div>`;
        });
    }

    // Índice de habilidades: una columna por categoría, sin barras de porcentaje
    // (el campo `pct` sigue en portfolio-data.js por si se quiere volver a usar).
    function renderSkills() {
        const container = $('skillsContainer');
        if (!container) return;

        const technical = renderList(
            skills,
            (cat) => `
      <section class="skill-index reveal">
        <h3 class="skill-index-title">
          <i class="bi ${cat.icon}" aria-hidden="true"></i>${cat.category}
          <span class="skill-index-count">${cat.items.length}</span>
        </h3>
        <ul class="skill-index-list" data-stagger>
          ${renderList(
                cat.items,
                (s) => `<li><i class="bi ${s.icon}" aria-hidden="true"></i>${s.name}</li>`
            )}
        </ul>
      </section>`
        );

        container.innerHTML = `
      <div class="skill-index-grid">${technical}</div>
      <div class="soft-skills reveal">
        <h3 class="skill-index-title"><i class="bi bi-people" aria-hidden="true"></i>Habilidades Blandas</h3>
        <ul class="chip-list" data-stagger>
          ${renderList(
            softSkills,
            (s) => `<li class="chip"><i class="bi ${s.icon}" aria-hidden="true"></i>${s.name}</li>`
        )}
        </ul>
      </div>`;
    }

    function renderEducation() {
        fill(
            'educationTimeline',
            renderList(
                education,
                (ed) => `
      <li class="dated-item reveal">
        <span class="dated-date">${ed.date}</span>
        <div>
          <h3 class="dated-title">${ed.title}</h3>
          <p class="dated-org">${ed.institution}</p>
          <p class="dated-desc">${ed.description}</p>
        </div>
      </li>`
            )
        );
    }

    function renderCertificates() {
        fill(
            'certificatesGrid',
            renderList(
                certificates,
                (c) => `
      <li class="cert-item">
        <i class="bi bi-patch-check-fill" aria-hidden="true"></i>
        <div>
          <span class="cert-name">${c.name}</span>
          <span class="cert-meta">${c.issuer}${c.date ? `, ${c.date}` : ''}</span>
        </div>
      </li>`
            )
        );
    }

    function renderContactInfo() {
        fill(
            'contactInfo',
            `
      <ul class="contact-list" data-stagger>
        <li>
          <i class="bi bi-envelope" aria-hidden="true"></i>
          <div><span class="contact-label">Email</span>
            <a href="mailto:${owner.email}">${owner.email}</a></div>
        </li>
        <li>
          <i class="bi bi-whatsapp" aria-hidden="true"></i>
          <div><span class="contact-label">WhatsApp</span>
            <a href="${owner.whatsapp}" target="_blank" rel="noopener noreferrer">${owner.phoneFormatted}</a></div>
        </li>
        <li>
          <i class="bi bi-geo-alt" aria-hidden="true"></i>
          <div><span class="contact-label">Ubicación</span>
            <span>${owner.location}</span></div>
        </li>
      </ul>`
        );
    }

    // ========== PROJECT DETAIL PAGE ==========
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

        document.title = `${p.title} - Detalle de Proyecto`;
        fill('projectTitle', p.title);
        fill('projectSubtitle', p.subtitle || '');
        fill('projectBreadcrumb', p.title);

        fill(
            'projectMeta',
            `
      <span class="project-meta-item"><i class="bi bi-calendar3 me-2"></i><strong>Fecha:</strong> ${p.date || '—'
            }</span>
      <span class="project-meta-item"><i class="bi bi-person me-2"></i><strong>Rol:</strong> ${p.role || '—'
            }</span>
      <span class="project-meta-item"><i class="bi bi-clock me-2"></i><strong>Duración:</strong> ${p.duration || '—'
            }</span>
    `
        );

        let btns = '';
        // Solo se pinta el botón si el enlace es real; antes un '#' generaba un botón muerto.
        if (isExternal(p.github))
            btns += `<a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-solid me-2"><i class="bi bi-github me-2"></i>Ver Código</a>`;
        if (isExternal(p.demo))
            btns += `<a href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost"><i class="bi bi-box-arrow-up-right me-2"></i>Demo en Vivo</a>`;
        fill('projectLinksButtons', btns);

        if (p.demoAccess?.length) {
            fill(
                'projectLinksDemo',
                `
        <div class="alert alert-info mt-4 mb-0 mx-auto" style="max-width:430px">
          <i class="bi bi-key me-2"></i><strong>Acceso Demo:</strong><br>
          ${renderList(
                    p.demoAccess,
                    (d) => `
            <div style="margin-bottom:3px"><b>${d.role}</b>: <code>${d.user}</code> | <b>Clave:</b> <code>${d.pass}</code></div>`
                )}
          <span style="font-size:.92em;color:#6c757d">Puedes probar todos los roles en la demo online</span>
        </div>`
            );
        } else {
            fill('projectLinksDemo', '');
        }

        const mainImg = $('projectMainImage');
        if (mainImg) {
            mainImg.src = p.mainImage;
            mainImg.alt = p.title;
        }

        fill(
            'projectGallery',
            renderList(
                p.gallery || [],
                (img) => `
      <div class="col-lg-4 col-md-6 col-12 mb-4">
        <div class="project-screenshot">
          <img src="${img}" class="img-fluid rounded" alt="Vista de ${p.title}">
        </div>
      </div>`
            )
        );

        fill('projectDescription', p.description || '');

        const badgeList = (arr) => renderList(arr || [], (t) => `<span class="tech-badge">${t}</span>`);
        fill('projectTech', badgeList(p.tech));
        fill('projectTools', badgeList(p.tools));

        const statsBox = $('projectStatsBox');
        if (p.stats?.length) {
            if (statsBox) statsBox.classList.remove('d-none');
            fill(
                'projectStats',
                renderList(
                    p.stats,
                    (s) =>
                        `<li><span class="stat-label">${s.label}:&nbsp;</span><span class="stat-value">${s.value}</span></li>`
                )
            );
        }

        const extraBox = $('projectExtraLinksBox');
        if (p.extraLinks?.length) {
            if (extraBox) extraBox.classList.remove('d-none');
            fill(
                'projectExtraLinks',
                renderList(
                    p.extraLinks,
                    (l) =>
                        `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary"><i class="${l.icon} me-2"></i>${l.label}</a>`
                )
            );
        }

        const team = p.team || [];
        fill(
            'teamDescription',
            team.length === 1
                ? 'Este proyecto fue desarrollado de forma individual'
                : 'Personas que colaboraron en este proyecto'
        );
        fill(
            'projectTeam',
            renderList(
                team,
                (m) => `
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
        </div>`
            )
        );
    }

    // ========== INITIALIZATION ==========
    function initAll() {
        // Social hero y footer
        const heroSocialEl = document.getElementById('heroSocial');
        if (heroSocialEl) heroSocialEl.innerHTML = renderSocialIcons(socialLinks);
        const footerEl = document.getElementById('siteFooter');
        if (footerEl) footerEl.innerHTML = renderFooter();

        renderExperience();
        renderProjectCards();
        renderSkills();
        renderEducation();
        renderCertificates();
        renderContactInfo();

        initThemeToggle();
        initNavbarScroll();
        initScrollTop();
        initSmoothScroll();
        initActiveNav();
        initStatsCounter();
        initReveal();
        initContactForm();
        initTooltips();
        initProjectDetail();

    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
})();