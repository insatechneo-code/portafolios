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

  const { owner, socialLinks, experience, projects, projectCards,
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

  // ========== SKILL BARS ==========
  function initSkillBars() {
    observe('.skill-progress .progress-bar', (bar) => {
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

  function renderSocialIcons(linksArr, withLabel = false) {
    const items = renderList(linksArr, (s) => `
      <li class="social-icon-item">
        <a href="${s.url}" ${s.url.startsWith('mailto') || s.url.startsWith('tel') ? '' : 'target="_blank" rel="noopener noreferrer"'}
           class="social-icon-link" aria-label="${s.label}">
          <span class="${s.icon}"></span>
        </a>
      </li>`);
    return `<ul class="social-icon d-flex align-items-center justify-content-center">
      ${withLabel ? '<span class="text-white me-3">Sígueme:</span>' : ''}${items}</ul>`;
  }

  function renderFooter() {
    return `
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-12 text-center text-lg-start mb-4">
            <h4 class="text-white mb-3">${owner.name}</h4>
            <p class="text-white-50">${owner.title}</p>
          </div>
          <div class="col-lg-6 col-12 d-flex justify-content-center justify-content-lg-end align-items-center">
            ${renderSocialIcons(socialLinks.slice(0, 3))}
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-12 text-center">
            <p class="copyright-text text-white-50">
              © ${new Date().getFullYear()} ${owner.name}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>`;
  }

  function renderDetailNavbar() {
    const nav = $('detailNavbar');
    if (!nav) return;
    nav.innerHTML = `
      <div class="container">
        <a class="navbar-brand" href="index.html">${owner.shortName}</a>
        <button class="btn btn-theme-toggle d-lg-none ms-auto me-3" id="themeToggle" aria-label="Cambiar tema">
          <i class="bi bi-moon-stars-fill"></i>
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
            <i class="bi bi-moon-stars-fill"></i>
          </button>
          <a href="index.html#projects" class="btn custom-btn d-lg-block d-none">
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

  function renderExperience() {
    fill('experienceTimeline', renderList(experience, (exp) => `
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <span class="timeline-date"><i class="bi bi-calendar3 me-2"></i>${exp.date}</span>
          <h4 class="timeline-title">${exp.title}</h4>
          <p class="timeline-institution"><i class="bi bi-building me-2"></i>${exp.company}</p>
          <ul class="timeline-responsibilities">
            ${renderList(exp.tasks, (t) => `<li>${t}</li>`)}
          </ul>
        </div>
      </div>`));
  }

  function renderProjectCards() {
    const grid = $('projectsGrid');
    if (!grid) return;

    const visibles = (projectCards || []).filter((id) => projects[id]);

    if (!visibles.length) {
      grid.innerHTML = `
        <div class="col-lg-8 col-12 mx-auto">
          <div class="empty-state text-center">
            <i class="bi bi-folder-plus empty-state-icon"></i>
            <h4 class="empty-state-title">Proyectos en preparación</h4>
            <p class="empty-state-text">
              Estoy documentando mis proyectos para publicarlos aquí.
              Mientras tanto puedes ver mi código en GitHub.
            </p>
            <div class="empty-state-actions">
              <a href="${owner.github}" target="_blank" rel="noopener noreferrer" class="btn custom-btn">
                <i class="bi bi-github me-2"></i>Ver mi GitHub
              </a>
            </div>
          </div>
        </div>`;
      return;
    }

    grid.innerHTML = renderList(visibles, (id) => {
      const p = projects[id];
      return `
        <div class="col-lg-4 col-md-6 col-12 mb-4 project-item" data-category="${esc(p.category || 'web')}">
          <div class="project-card">
            <div class="project-image-wrap">
              <img src="${esc(p.mainImage)}" class="project-image img-fluid" alt="${esc(p.title)}"
                   loading="lazy" decoding="async">
              <div class="project-overlay">
                <a href="project-detail.html?id=${id}" class="btn btn-project-detail">
                  Ver Detalles <i class="bi bi-arrow-right ms-2"></i>
                </a>
              </div>
            </div>
            <div class="project-info">
              <h4 class="project-title">${esc(p.title)}</h4>
              <p class="project-brief">
                ${p.brief}
                ${isExternal(p.demo) ? `<br><strong><a href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">Ver demo</a></strong>` : ''}
              </p>
              <div class="project-tech-tags">
                ${renderList(p.tags || p.tech || [], (t) => `<span class="tech-tag">${esc(t)}</span>`)}
              </div>
            </div>
          </div>
        </div>`;
    });

    // El aviso solo tiene sentido si hay demos publicadas.
    const noteBox = $('projectsHostingNote');
    if (noteBox) {
      const hayDemos = visibles.some((id) => isExternal(projects[id].demo));
      noteBox.innerHTML = hayDemos ? hostingNote('#contact') : '';
    }
  }

  function renderSkills() {
    const container = $('skillsContainer');
    if (!container) return;

    let html = renderList(skills, (cat) => `
      <div class="skill-category mb-5">
        <h3 class="skill-category-title mb-4">
          <i class="bi ${cat.icon} me-2"></i> ${cat.category}
        </h3>
        <div class="row">
          ${renderList(cat.items, (s) => {
            const nivel = s.level || 'En práctica';
            const slug = { 'Sólido': 'solido', 'En práctica': 'practica', 'Explorando': 'explorando' }[nivel] || 'practica';
            return `
            <div class="col-lg-6 col-12 mb-4">
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

    html += `
      <div class="skill-category">
        <h3 class="skill-category-title mb-4">
          <i class="bi bi-people me-2"></i> Habilidades Blandas
        </h3>
        <div class="row">
          ${renderList(softSkills, (s) => `
            <div class="col-lg-3 col-md-6 col-12 mb-4">
              <div class="soft-skill-item text-center">
                <div class="soft-skill-icon"><i class="bi ${s.icon}"></i></div>
                <h5>${s.name}</h5>
              </div>
            </div>`)}
        </div>
      </div>`;

    container.innerHTML = html;
  }

  function renderEducation() {
    fill('educationTimeline', renderList(education, (ed) => `
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <span class="timeline-date"><i class="bi bi-calendar3 me-2"></i>${ed.date}</span>
          <h4 class="timeline-title">${ed.title}</h4>
          <p class="timeline-institution"><i class="bi bi-bank me-2"></i>${ed.institution}</p>
          <p class="timeline-description">${ed.description}</p>
        </div>
      </div>`));
  }

  function renderCertificates() {
    fill('certificatesGrid', renderList(certificates, (c) => `
      <div class="col-lg-4 col-md-6 col-12 mb-4">
        <div class="certificate-card">
          <div class="certificate-icon"><i class="bi bi-patch-check-fill"></i></div>
          <h5 class="certificate-name">${c.name}</h5>
          <p class="certificate-issuer">${c.issuer}</p>
          ${c.date ? `<span class="certificate-date">${c.date}</span>` : ''}
        </div>
      </div>`));
  }

  function renderContactInfo() {
    fill('contactInfo', `
  <div class="row text-center">
    <div class="col-lg-4 col-12 mb-4">
      <div class="contact-info-item">
        <i class="bi bi-envelope-fill"></i>
        <h5>Email</h5>
        <a href="mailto:${owner.email}">${owner.email}</a>
      </div>
    </div>
    <div class="col-lg-4 col-12 mb-4">
      <div class="contact-info-item">
        <i class="bi bi-whatsapp"></i>
        <h5>WhatsApp</h5>
        <!-- El número sale de owner.whatsapp (portfolio-data.js), ya no escrito a mano:
             antes este enlace llevaba a un número distinto del que mostraba. -->
        <a href="${owner.whatsapp}" target="_blank" rel="noopener noreferrer">${owner.phoneFormatted}</a>
      </div>
    </div>
    <div class="col-lg-4 col-12 mb-4">
      <div class="contact-info-item">
        <i class="bi bi-geo-alt-fill"></i>
        <h5>Ubicación</h5>
        <p>${owner.location}</p>
      </div>
    </div>
  </div>`);
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
    if (isExternal(p.github)) btns += `<a href="${esc(p.github)}" target="_blank" rel="noopener noreferrer" class="btn custom-btn me-2"><i class="bi bi-github me-2"></i>Ver Código</a>`;
    // btn-outline-light desaparecía en modo claro: ahora usa un estilo propio
    // que funciona en los dos temas.
    if (isExternal(p.demo)) btns += `<a href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-brand"><i class="bi bi-box-arrow-up-right me-2"></i>Demo en Vivo</a>`;
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
        `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-brand"><i class="${l.icon} me-2"></i>${l.label}</a>`));
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
    fill('heroSocial', renderSocialIcons(socialLinks, true));
    fill('siteFooter', renderFooter());
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
    initSkillBars();
    initContactForm();
    initTooltips();
    initProjectDetail();

    console.log('🚀 Portfolio initialized');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();