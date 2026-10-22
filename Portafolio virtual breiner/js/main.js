/* ============================================
   MAIN.JS — Lógica del portafolio
   Depende de: portfolio-data.js (cargado antes)
   Depende de: EmailJS SDK (cargado antes)
   ============================================ */

(function () {
  'use strict';

  if (typeof PORTFOLIO === 'undefined') {
    console.error('portfolio-data.js no se cargó: revisa la ruta del script en el HTML.');
    return;
  }

  const { owner, socialLinks, experience, projects, projectCards, otherProjects,
    skills, softSkills, education, certificates } = PORTFOLIO;

  // ========== DOM REFERENCES ==========
  const body = document.body;
  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  let themeToggles = [
    document.getElementById('themeToggle'),
    document.getElementById('themeToggleDesktop'),
  ].filter(Boolean);

  // ========== HELPERS ==========
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

  // Un enlace es externo si sale del sitio; los '#ancla' no van en pestaña nueva.
  const isExternal = (url) => /^(https?:)?\/\//i.test(String(url || ''));

  // Aviso único sobre el hosting gratuito. Se usa en la portada (bajo las
  // tarjetas) y en la página de detalle (bajo el botón de la demo).
  // (el enlace de contacto cambia según la página desde la que se muestra)
  const hostingNote = (contactHref) => `
    <div class="hosting-note mt-4 mx-auto">
      <i class="bi bi-info-circle me-2"></i>
      <span><strong>Sobre las demos:</strong> están alojadas en planes gratuitos. La primera
      carga puede tardar hasta un minuto mientras el servidor se despierta, y en algún momento
      un proyecto puede quedar fuera de línea. Si alguna demo no abre,
      <a href="${contactHref}">escríbeme</a> y te la muestro funcionando.</span>
    </div>`;

  // ========== THEME TOGGLE ==========
  function initThemeToggle() {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    themeToggles.forEach(btn => btn.addEventListener('click', toggleTheme));
  }

  // El tema nuevo se revela en un círculo que crece desde el botón (View
  // Transitions). Sin soporte o con movimiento reducido, el cambio es directo.
  function toggleTheme(e) {
    const next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    const apply = () => {
      setTheme(next);
      localStorage.setItem('theme', next);
    };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduced) {
      apply();
      return;
    }
    const rect = e?.currentTarget?.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty('--vt-x', `${rect ? rect.left + rect.width / 2 : innerWidth / 2}px`);
    root.style.setProperty('--vt-y', `${rect ? rect.top + rect.height / 2 : 0}px`);
    document.startViewTransition(apply);
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
      // Regla de lectura bajo el navbar: progreso de 0 a 1.
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

  // ========== ACTIVE NAV HIGHLIGHT ==========
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

  // ========== INTERSECTION OBSERVER HELPER ==========
  function observe(selector, callback, options = { threshold: 0.5 }) {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, options);
    els.forEach(el => obs.observe(el));
  }

  // ========== STATS COUNTER ==========
  function initStatsCounter() {
    // Duración fija (~1,2 s) en lugar de 50 pasos de 40 ms. Con el contador viejo,
    // un valor de 1 pasaba dos segundos completos mostrando "0" antes de llegar a
    // su número, porque Math.floor(1/50 * n) se queda en 0 casi todo el recorrido.
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

  // ========== CONTACT FORM CON EMAILJS ==========
  function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    // Inicializar EmailJS.
    // El `typeof emailjs !== 'undefined'` importa: si el CDN de EmailJS no carga
    // (bloqueador de anuncios, red corporativa, CDN caído), esta línea lanzaba una
    // excepción que cortaba initAll() en seco y dejaba sin renderizar todo lo que
    // viene después. Ahora el formulario avisa y el resto del sitio sigue en pie.
    const { publicKey, serviceId, templateId } = PORTFOLIO.emailjs;
    const emailjsListo = typeof emailjs !== 'undefined'
      && publicKey && publicKey !== 'TU_PUBLIC_KEY_AQUI';
    if (emailjsListo) emailjs.init(publicKey);

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

      // Validaciones
      if (!name || !email || !message) {
        showNotification('Por favor completa todos los campos requeridos.', 'error');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showNotification('Por favor ingresa un email válido.', 'error');
        return;
      }

      // Verificar que EmailJS esté cargado y configurado
      if (!emailjsListo) {
        showNotification('No se pudo cargar el servicio de envío. Escríbeme a ' + owner.email, 'error');
        return;
      }

      // Deshabilitar botón mientras envía
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

        showNotification('¡Mensaje enviado con éxito! Te contactaré pronto. ✉️', 'success');
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
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
      .forEach(el => new bootstrap.Tooltip(el));
  }

  // ========== RENDERERS ==========

  // Nivel de habilidad -> clave corta para CSS y para el filtro.
  const LEVEL_SLUG = { 'Sólido': 'solido', 'En práctica': 'practica', 'Explorando': 'explorando' };
  const levelBars = (slug) =>
    `<span class="level-bars level-bars--${slug}" aria-hidden="true"><i></i><i></i><i></i></span>`;

  // Dominio de una URL para la barra del "navegador" que enmarca las capturas.
  const hostOf = (url) => {
    try { return new URL(url).host; } catch (_) { return ''; }
  };

  function renderSocialIcons(linksArr) {
    const items = renderList(linksArr, (s) => `
      <li>
        <a href="${s.url}" ${s.url.startsWith('mailto') || s.url.startsWith('tel') ? '' : 'target="_blank" rel="noopener noreferrer"'}
           class="social-icon-link" aria-label="${s.label}" title="${s.label}">
          <i class="bi ${s.icon}" aria-hidden="true"></i>
        </a>
      </li>`);
    return `<ul class="social-icon">${items}</ul>`;
  }

  function renderFooter() {
    return `
      <div class="container footer-row">
        <div>
          <p class="footer-name">${owner.name}</p>
          <p class="footer-meta">${owner.title}</p>
        </div>
        ${renderSocialIcons(socialLinks)}
        <p class="footer-meta footer-copy">
          © ${new Date().getFullYear()} ${owner.name}. Todos los derechos reservados.
        </p>
      </div>`;
  }

  function renderDetailNavbar() {
    const nav = $('detailNavbar');
    if (!nav) return;
    nav.innerHTML = `
      <div class="scroll-ruler" aria-hidden="true"></div>
      <div class="container">
        <a class="navbar-brand" href="index.html"><span class="brand-mark" aria-hidden="true">BG</span>${owner.shortName}</a>
        <button class="btn btn-theme-toggle d-lg-none ms-auto me-2" id="themeToggle" aria-label="Cambiar tema">
          <i class="bi bi-moon-stars-fill"></i>
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
            <i class="bi bi-moon-stars-fill"></i>
          </button>
          <a href="index.html#projects" class="btn btn-ghost nav-cv">
            <i class="bi bi-arrow-left me-2"></i>Volver
          </a>
        </div>
      </div>`;
    themeToggles = [];
    ['themeToggle', 'themeToggleDesktop'].forEach(id => {
      const el = $(id);
      if (el) {
        themeToggles.push(el);
        el.addEventListener('click', toggleTheme);
      }
    });
    setTheme(localStorage.getItem('theme') || 'dark');
  }

  // Experiencia y formación comparten formato: filas de una tabla de especificaciones.
  function renderExperience() {
    fill('experienceTimeline', renderList(experience, (exp) => `
      <li class="spec-row reveal">
        <span class="spec-date">${exp.date}</span>
        <div class="spec-main">
          <h3 class="spec-title">${exp.title}</h3>
          <p class="spec-org"><i class="bi bi-building me-2" aria-hidden="true"></i>${exp.company}</p>
        </div>
        <ul class="spec-tasks" data-stagger>
          ${renderList(exp.tasks, (t) => `<li>${t}</li>`)}
        </ul>
      </li>`));
  }

  // Cada proyecto es una fila grande: la captura enmarcada como un navegador (con
  // dos capturas más detrás que se abren en abanico) y al lado su ficha técnica.
  function renderProjectCards() {
    const grid = $('projectsGrid');
    if (!grid) return;

    const visibles = (projectCards || []).filter((id) => projects[id]);

    if (!visibles.length) {
      grid.innerHTML = `
        <div class="empty-state reveal">
          <i class="bi bi-rulers empty-state-icon" aria-hidden="true"></i>
          <h3 class="empty-state-title">Proyectos en preparación</h3>
          <p class="empty-state-text">
            Estoy documentando mis proyectos para publicarlos aquí.
            Mientras tanto puedes ver mi código en GitHub.
          </p>
          <a href="${owner.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-solid">
            <i class="bi bi-github me-2"></i>Ver mi GitHub
          </a>
        </div>`;
      return;
    }

    grid.innerHTML = renderList(visibles, (id) => {
      const p = projects[id];
      const detail = `project-detail.html?id=${encodeURIComponent(id)}`;
      const [back1, back2] = p.gallery || [];
      const host = isExternal(p.demo) ? hostOf(p.demo) : 'código privado';
      return `
        <article class="project-row reveal">
          <div class="project-visual" data-tilt>
            <a href="${detail}" class="shot-stack" aria-label="Ver detalles de ${esc(p.title)}">
              ${back2 ? `<img class="shot shot-back shot-back-2" src="${esc(back2)}" alt="" loading="lazy" decoding="async">` : ''}
              ${back1 ? `<img class="shot shot-back shot-back-1" src="${esc(back1)}" alt="" loading="lazy" decoding="async">` : ''}
              <span class="shot shot-main">
                <span class="browser-bar" aria-hidden="true"><i></i><i></i><i></i><span class="browser-url">${esc(host)}</span></span>
                <img src="${esc(p.mainImage)}" alt="${esc(p.title)}" loading="lazy" decoding="async" width="1280" height="800">
              </span>
            </a>
          </div>
          <div class="project-spec">
            <h3 class="project-title">${esc(p.title)}</h3>
            <p class="project-brief">${p.brief}</p>
            <dl class="spec-table">
              <div><dt>Rol</dt><dd>${esc(p.role || '—')}</dd></div>
              <div><dt>Fecha</dt><dd>${esc(p.date || '—')}</dd></div>
              ${p.duration ? `<div><dt>Duración</dt><dd>${esc(p.duration)}</dd></div>` : ''}
              <div class="spec-table-wide"><dt>Stack</dt><dd>
                ${renderList(p.tags || p.tech || [], (t) => `<span class="tech-tag">${esc(t)}</span>`)}
              </dd></div>
            </dl>
            <div class="project-actions">
              <a href="${detail}" class="btn btn-primary-solid"><i class="bi bi-file-earmark-text me-2"></i>Ver detalles</a>
              ${isExternal(p.demo) ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost"><i class="bi bi-box-arrow-up-right me-2"></i>Ver demo</a>` : ''}
            </div>
          </div>
        </article>`;
    });

    // No todos los proyectos tienen demo o capturas presentables; el resto vive
    // en GitHub y quien busca código va a querer ese enlace.
    const ctaBox = $('projectsGithubCta');
    if (ctaBox && isExternal(owner.github)) {
      ctaBox.innerHTML = `
        <div class="note">
          <i class="bi bi-github note-icon" aria-hidden="true"></i>
          <p><strong>Más proyectos de desarrollo en mi perfil de GitHub.</strong>
          Aquí están los que puedo mostrar con demo y capturas. El resto del código,
          incluidos los ejercicios y proyectos en curso, está en mi perfil.
          <a href="${esc(owner.github)}" target="_blank" rel="noopener noreferrer">Ver mi GitHub</a></p>
        </div>`;
    }

    // El aviso solo tiene sentido si hay demos publicadas.
    const noteBox = $('projectsHostingNote');
    if (noteBox) {
      const hayDemos = visibles.some((id) => isExternal(projects[id].demo));
      noteBox.innerHTML = hayDemos ? hostingNote('#contact') : '';
    }
  }

  // Proyectos sin capturas ni demo pública: "lista de piezas" desplegable
  // (interactions.js abre y cierra cada fila).
  function renderOtherProjects() {
    const box = $('otherProjects');
    if (!box || !(otherProjects || []).length) return;
    box.innerHTML = `
      <h3 class="subsection-title">Más proyectos</h3>
      <ul class="parts-list reveal" data-stagger>
        ${renderList(otherProjects, (p, i) => `
          <li class="part">
            <button type="button" class="part-head" aria-expanded="false" aria-controls="part-${i}">
              <i class="bi ${esc(p.icon || 'bi-code-slash')} part-icon" aria-hidden="true"></i>
              <span class="part-name">${esc(p.title)}</span>
              <span class="part-stack">${esc((p.tech || []).join(', '))}</span>
              ${p.year ? `<span class="part-year">${esc(p.year)}</span>` : ''}
              <i class="bi bi-plus-lg part-toggle" aria-hidden="true"></i>
            </button>
            <div class="part-body" id="part-${i}" hidden>
              <p>${esc(p.description)}</p>
              ${isExternal(p.github) ? `<a class="part-link" href="${esc(p.github)}" target="_blank" rel="noopener noreferrer"><i class="bi bi-github me-2"></i>Ver código</a>` : ''}
            </div>
          </li>`)}
      </ul>`;
  }

  function renderSkills() {
    const container = $('skillsContainer');
    if (!container) return;

    const groups = renderList(skills, (cat) => `
      <section class="skill-group reveal">
        <h3 class="skill-group-title">
          <i class="bi ${cat.icon}" aria-hidden="true"></i>${cat.category}
          <span class="skill-group-count">${cat.items.length}</span>
        </h3>
        <ul class="skill-chips" data-stagger>
          ${renderList(cat.items, (s) => {
            const nivel = s.level || 'En práctica';
            const slug = LEVEL_SLUG[nivel] || 'practica';
            return `
            <li class="skill-chip" data-level="${slug}" title="${esc(nivel)}">
              <i class="bi ${esc(s.icon)}" aria-hidden="true"></i>
              <span class="skill-chip-name">${esc(s.name)}</span>
              ${levelBars(slug)}<span class="visually-hidden">, nivel ${esc(nivel)}</span>
            </li>`;
          })}
        </ul>
      </section>`);

    container.innerHTML = `
      <div class="skill-groups">${groups}</div>
      <div class="soft-skills reveal">
        <h3 class="skill-group-title"><i class="bi bi-people" aria-hidden="true"></i>Habilidades Blandas</h3>
        <ul class="soft-list" data-stagger>
          ${renderList(softSkills, (s) => `<li><i class="bi ${s.icon}" aria-hidden="true"></i>${s.name}</li>`)}
        </ul>
      </div>`;
  }

  function renderEducation() {
    fill('educationTimeline', renderList(education, (ed) => `
      <li class="spec-row reveal">
        <span class="spec-date">${ed.date}</span>
        <div class="spec-main">
          <h3 class="spec-title">${ed.title}</h3>
          <p class="spec-org"><i class="bi bi-bank me-2" aria-hidden="true"></i>${ed.institution}</p>
        </div>
        <p class="spec-desc">${ed.description}</p>
      </li>`));
  }

  // Cada certificado es un sello; si tiene enlace verificable, la tarjeta entera es el enlace.
  function renderCertificates() {
    fill('certificatesGrid', renderList(certificates, (c) => {
      const inner = `
        <span class="cert-stamp" aria-hidden="true"><i class="bi bi-patch-check-fill"></i></span>
        <span class="cert-body">
          <span class="cert-name">${esc(c.name)}</span>
          ${c.issuer ? `<span class="cert-issuer">${esc(c.issuer)}</span>` : ''}
          ${c.detail ? `<span class="cert-detail">${esc(c.detail)}</span>` : ''}
          ${c.date ? `<span class="cert-date">${esc(c.date)}</span>` : ''}
          ${isExternal(c.url) ? '<span class="cert-link">Ver certificado <i class="bi bi-box-arrow-up-right"></i></span>' : ''}
        </span>`;
      return isExternal(c.url)
        ? `<a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer" class="cert-card cert-card--link">${inner}</a>`
        : `<div class="cert-card">${inner}</div>`;
    }));
  }

  function renderContactInfo() {
    // El número sale de owner.whatsapp (portfolio-data.js), nunca escrito a mano.
    fill('contactInfo', `
      <ul class="contact-list" data-stagger>
        <li>
          <i class="bi bi-envelope" aria-hidden="true"></i>
          <div><span class="contact-label">Email</span>
            <a href="mailto:${owner.email}">${owner.email}</a></div>
          <button type="button" class="copy-btn" data-copy="${esc(owner.email)}" aria-label="Copiar correo">
            <i class="bi bi-copy" aria-hidden="true"></i></button>
        </li>
        <li>
          <i class="bi bi-whatsapp" aria-hidden="true"></i>
          <div><span class="contact-label">WhatsApp</span>
            <a href="${owner.whatsapp}" target="_blank" rel="noopener noreferrer">${owner.phoneFormatted}</a></div>
          <button type="button" class="copy-btn" data-copy="${esc(owner.phoneFormatted)}" aria-label="Copiar número">
            <i class="bi bi-copy" aria-hidden="true"></i></button>
        </li>
        <li>
          <i class="bi bi-geo-alt" aria-hidden="true"></i>
          <div><span class="contact-label">Ubicación</span>
            <span>${owner.location}</span></div>
        </li>
      </ul>`);
  }

  // ========== LIGHTBOX (visor de capturas a pantalla completa) ==========
  // En una galería, las capturas salen recortadas a 240 px de alto: sirven para
  // orientarse, pero no se lee nada. Este visor abre la imagen completa al hacer
  // clic, con flechas y teclado para moverse entre ellas.
  function initLightbox(shots, title) {
    if (!shots.length) return;

    let index = 0;
    let lastFocused = null;

    const box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', `Capturas de ${title}`);
    box.hidden = true;
    box.innerHTML = `
      <button type="button" class="lightbox-btn lightbox-close" aria-label="Cerrar (Esc)">
        <i class="bi bi-x-lg"></i>
      </button>
      <button type="button" class="lightbox-btn lightbox-prev" aria-label="Imagen anterior">
        <i class="bi bi-chevron-left"></i>
      </button>
      <figure class="lightbox-figure">
        <img class="lightbox-image" src="" alt="">
        <figcaption class="lightbox-counter"></figcaption>
      </figure>
      <button type="button" class="lightbox-btn lightbox-next" aria-label="Imagen siguiente">
        <i class="bi bi-chevron-right"></i>
      </button>`;
    document.body.appendChild(box);

    const img = box.querySelector('.lightbox-image');
    const counter = box.querySelector('.lightbox-counter');
    const btnClose = box.querySelector('.lightbox-close');
    const btnPrev = box.querySelector('.lightbox-prev');
    const btnNext = box.querySelector('.lightbox-next');
    const single = shots.length < 2;
    btnPrev.hidden = single;
    btnNext.hidden = single;

    function show(i) {
      index = (i + shots.length) % shots.length;
      img.src = shots[index];
      img.alt = `${title} — captura ${index + 1}`;
      counter.textContent = `${index + 1} / ${shots.length}`;
    }

    function open(i) {
      lastFocused = document.activeElement;
      show(i);
      box.hidden = false;
      body.classList.add('lightbox-open');
      btnClose.focus();
    }

    function close() {
      box.hidden = true;
      body.classList.remove('lightbox-open');
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', () => show(index - 1));
    btnNext.addEventListener('click', () => show(index + 1));
    // Clic en el fondo (no en la imagen ni en los botones) cierra el visor.
    box.addEventListener('click', (e) => { if (e.target === box) close(); });

    document.addEventListener('keydown', (e) => {
      if (box.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft' && !single) show(index - 1);
      else if (e.key === 'ArrowRight' && !single) show(index + 1);
    });

    // Un solo listener para la imagen principal y para toda la galería.
    document.addEventListener('click', (e) => {
      const target = e.target.closest('[data-shot]');
      if (!target) return;
      e.preventDefault();
      open(parseInt(target.dataset.shot, 10) || 0);
    });
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

    fill('projectMeta', `
      <span class="project-meta-item"><i class="bi bi-calendar3 me-2"></i><strong>Fecha:</strong> ${p.date || '—'}</span>
      <span class="project-meta-item"><i class="bi bi-person me-2"></i><strong>Rol:</strong> ${p.role || '—'}</span>
      <span class="project-meta-item"><i class="bi bi-clock me-2"></i><strong>Duración:</strong> ${p.duration || '—'}</span>
    `);

    let btns = '';
    // Solo se pinta el botón si el enlace es una URL real.
    if (isExternal(p.github)) btns += `<a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-solid me-2"><i class="bi bi-github me-2"></i>Ver Código</a>`;
    // btn-outline-light desaparecía en modo claro: ahora usa un estilo propio
    // que funciona en los dos temas.
    if (isExternal(p.demo)) btns += `<a href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost"><i class="bi bi-box-arrow-up-right me-2"></i>Demo en Vivo</a>`;
    fill('projectLinksButtons', btns);

    let demoHtml = '';
    if (p.demoAccess?.length) {
      demoHtml += `
        <div class="demo-access mt-4">
          <div class="demo-access-title"><i class="bi bi-key me-2"></i>Acceso de prueba</div>
          ${renderList(p.demoAccess, (d) => `
            <div class="demo-access-row">
              <span class="demo-access-role">${esc(d.role)}</span>
              <span class="demo-access-creds"><code>${esc(d.user)}</code><code>${esc(d.pass)}</code></span>
            </div>`)}
          <p class="demo-access-hint">Puedes entrar con cualquiera de los dos roles en la demo.</p>
        </div>`;
    }
    // Aviso de hosting gratuito: es mejor que quien entra sepa por qué la demo
    // tarda o no responde, a que piense que el proyecto está mal hecho.
    if (isExternal(p.demo)) demoHtml += hostingNote('index.html#contact');
    fill('projectLinksDemo', demoHtml);

    // Todas las capturas del proyecto, en orden: la principal y luego la galería.
    // Este mismo array alimenta el visor a pantalla completa.
    const shots = [p.mainImage, ...(p.gallery || [])].filter(Boolean);

    const mainImg = $('projectMainImage');
    if (mainImg) {
      mainImg.src = p.mainImage;
      mainImg.alt = p.title;
      mainImg.dataset.shot = '0';
    }

    fill('projectGallery', renderList(p.gallery || [], (img, i) => `
      <div class="col-lg-4 col-md-6 col-12 mb-4">
        <button type="button" class="project-screenshot" data-shot="${i + 1}"
                aria-label="Ampliar captura ${i + 2} de ${shots.length}">
          <img src="${esc(img)}" class="img-fluid rounded" alt="Vista de ${esc(p.title)}" loading="lazy">
        </button>
      </div>`));

    initLightbox(shots, p.title);

    fill('projectDescription', p.description || '');

    const badgeList = (arr) => renderList(arr || [], (t) => `<span class="tech-badge">${t}</span>`);
    fill('projectTech', badgeList(p.tech));
    fill('projectTools', badgeList(p.tools));

    const statsBox = $('projectStatsBox');
    if (p.stats?.length) {
      if (statsBox) statsBox.classList.remove('d-none');
      fill('projectStats', renderList(p.stats, (s) =>
        `<li><span class="stat-label">${s.label}:&nbsp;</span><span class="stat-value">${s.value}</span></li>`));
    }

    const extraBox = $('projectExtraLinksBox');
    if (p.extraLinks?.length) {
      if (extraBox) extraBox.classList.remove('d-none');
      fill('projectExtraLinks', renderList(p.extraLinks, (l) =>
        // btn-outline-primary pintaba un azul de Bootstrap que no está en la paleta.
        `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost"><i class="${l.icon} me-2"></i>${l.label}</a>`));
    }

    const team = p.team || [];
    fill('teamDescription', team.length === 1
      ? 'Este proyecto fue desarrollado de forma individual'
      : 'Personas que colaboraron en este proyecto');
    fill('projectTeam', renderList(team, (m) => `
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
  }

  // ========== INITIALIZATION ==========
  function initAll() {
    fill('heroSocial', renderSocialIcons(socialLinks));
    fill('siteFooter', renderFooter());
    renderExperience();
    renderProjectCards();
    renderOtherProjects();
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