/* ============================================================================
   INTERACTIONS.JS — Efectos interactivos del portafolio ("Plano técnico")
   Depende de: main.js (que ya dibujó el contenido) y css/motion.css.

   1. Apariciones al hacer scroll   6. Lista de piezas desplegable
   2. Cotas (nombre y foto)         7. Filtro de habilidades por nivel
   3. Mira de CAD en el hero        8. Copiar correo / número
   4. Lente de plano en la foto     9. Inspector de la página
   5. Inclinación 3D de capturas

   Todo respeta prefers-reduced-motion y los efectos de puntero solo se activan
   con mouse. No registra listeners de scroll: la regla de lectura vive en el
   único listener de main.js.
   ============================================================================ */

(function () {
  'use strict';

  const body = document.body;
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Aviso breve y accesible (role="status") en la parte de abajo de la pantalla.
  const toastEl = document.getElementById('liveToast');
  let toastTimer = null;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  // ---------- 1. Apariciones al hacer scroll ----------
  function initReveal() {
    document.querySelectorAll('[data-stagger]').forEach((list) => {
      Array.from(list.children).forEach((child, i) => child.style.setProperty('--i', i));
    });
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    body.classList.add('reveal-ready');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    els.forEach((el) => obs.observe(el));
  }

  // ---------- 2. Cotas: medidas reales en pantalla, en vivo ----------
  // Cada cota muestra el tamaño actual de su elemento y se actualiza al
  // redimensionar la ventana (ResizeObserver) y cuando cargan las fuentes.
  function initDimensions() {
    const pairs = [
      ['heroName', 'nameWidth', 'width'],
      ['photoLens', 'photoWidth', 'width'],
      ['photoLens', 'photoHeight', 'height'],
    ];
    pairs.forEach(([targetId, valueId, axis]) => {
      const target = document.getElementById(targetId);
      const value = document.getElementById(valueId);
      if (!target || !value) return;
      const write = () => {
        const rect = target.getBoundingClientRect();
        value.textContent = `${Math.round(axis === 'width' ? rect.width : rect.height)} px`;
      };
      write();
      if ('ResizeObserver' in window) new ResizeObserver(write).observe(target);
      if (document.fonts?.ready) document.fonts.ready.then(write);
    });
  }

  // ---------- 3. Mira de CAD que sigue al cursor en el hero ----------
  function initCrosshair() {
    const hero = document.querySelector('.hero');
    const label = hero?.querySelector('.crosshair-label');
    if (!hero || !label || !finePointer() || reducedMotion()) return;

    let frame = 0;
    hero.addEventListener('pointermove', (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = hero.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        hero.style.setProperty('--cx', `${x}px`);
        hero.style.setProperty('--cy', `${y}px`);
        // Cerca de los bordes la etiqueta cambia de lado para no quedar cortada.
        hero.style.setProperty('--lox', x > rect.width - 120 ? '-104px' : '12px');
        hero.style.setProperty('--loy', y > rect.height - 32 ? '-24px' : '10px');
        label.textContent = `x ${x}  y ${y}`;
        hero.classList.add('is-tracking');
      });
    });
    hero.addEventListener('pointerleave', () => hero.classList.remove('is-tracking'));
  }

  // ---------- 4. Lente de plano sobre la foto ----------
  // Con mouse, el lente sigue al cursor mientras está sobre la foto. En pantallas
  // táctiles, un toque lo enciende en ese punto y otro toque fuera lo apaga.
  function initLens() {
    const frame = document.getElementById('photoLens');
    if (!frame) return;
    const PADDING = 8;   // el mismo padding del marco en style.css

    const moveTo = (clientX, clientY) => {
      const rect = frame.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left - PADDING, rect.width - PADDING * 2));
      const y = Math.max(0, Math.min(clientY - rect.top - PADDING, rect.height - PADDING * 2));
      frame.style.setProperty('--lx', `${x}px`);
      frame.style.setProperty('--ly', `${y}px`);
    };

    if (finePointer()) {
      frame.addEventListener('pointerenter', (e) => { moveTo(e.clientX, e.clientY); frame.classList.add('lens-on'); });
      frame.addEventListener('pointermove', (e) => moveTo(e.clientX, e.clientY));
      frame.addEventListener('pointerleave', () => frame.classList.remove('lens-on'));
      return;
    }

    frame.addEventListener('click', (e) => {
      moveTo(e.clientX, e.clientY);
      frame.classList.add('lens-on');
    });
    document.addEventListener('click', (e) => {
      if (!frame.contains(e.target)) frame.classList.remove('lens-on');
    });
  }

  // ---------- 5. Las capturas de proyectos se inclinan siguiendo el cursor ----------
  function initTilt() {
    if (!finePointer() || reducedMotion()) return;
    const MAX_X = 6;   // grados
    const MAX_Y = 9;
    document.querySelectorAll('[data-tilt]').forEach((zone) => {
      const stack = zone.querySelector('.shot-stack');
      if (!stack) return;
      zone.addEventListener('pointermove', (e) => {
        const rect = zone.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        stack.style.setProperty('--ry', `${(px * MAX_Y * 2).toFixed(2)}deg`);
        stack.style.setProperty('--rx', `${(-py * MAX_X * 2).toFixed(2)}deg`);
      });
      zone.addEventListener('pointerleave', () => {
        stack.style.setProperty('--rx', '0deg');
        stack.style.setProperty('--ry', '0deg');
      });
    });
  }

  // ---------- 6. Lista de piezas: cada fila se abre y se cierra ----------
  function initParts() {
    document.addEventListener('click', (e) => {
      const head = e.target.closest('.part-head');
      if (!head) return;
      const panel = document.getElementById(head.getAttribute('aria-controls'));
      if (!panel) return;
      const open = head.getAttribute('aria-expanded') === 'true';
      head.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
    });
  }

  // ---------- 7. Filtro de habilidades por nivel ----------
  function initSkillFilter() {
    const container = document.getElementById('skillsContainer');
    const buttons = document.querySelectorAll('.level-btn');
    if (!container || !buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const level = btn.dataset.level;
        container.dataset.filter = level;
        buttons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        let count = 0;
        container.querySelectorAll('.skill-chip').forEach((chip) => {
          const match = level === 'todos' || chip.dataset.level === level;
          chip.classList.toggle('is-match', match);
          if (match) count += 1;
        });
        toast(level === 'todos'
          ? `Mostrando las ${count} habilidades`
          : `${count} habilidades en nivel ${btn.textContent.trim()}`);
      });
    });
  }

  // ---------- 8. Copiar correo o número con un clic ----------
  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    // Navegadores sin API de portapapeles (o sitio sin HTTPS).
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    if (!ok) throw new Error('copy-failed');
  }

  function initCopy() {
    document.addEventListener('click', async (e) => {
      const btn = e.target.closest('.copy-btn');
      if (!btn) return;
      const icon = btn.querySelector('.bi');
      try {
        await copyText(btn.dataset.copy);
        btn.classList.add('is-done');
        if (icon) icon.className = 'bi bi-check2';
        toast(`Copiado: ${btn.dataset.copy}`);
        setTimeout(() => {
          btn.classList.remove('is-done');
          if (icon) icon.className = 'bi bi-copy';
        }, 1800);
      } catch (err) {
        console.warn('No se pudo copiar:', err);
        toast('No se pudo copiar. Selecciona el texto y cópialo a mano.');
      }
    });
  }

  // ---------- 9. Inspector: muestra cómo está armada la página ----------
  // Como las herramientas de desarrollador: al pasar el cursor (o con el foco del
  // teclado) se marca el bloque con su etiqueta y sus medidas. Mientras está
  // activo, un clic inspecciona en lugar de navegar. Esc o el botón para salir.
  function describe(el) {
    const tag = el.tagName.toLowerCase();
    if (el.id) return `${tag}#${el.id}`;
    const cls = Array.from(el.classList).find((c) => !/^(bi|me-|ms-|mb-|mt-|d-|col-|row$)/.test(c));
    return cls ? `${tag}.${cls}` : tag;
  }

  function initInspector() {
    const btn = document.getElementById('inspectToggle');
    if (!btn) return;
    const label = btn.querySelector('span');

    const box = document.createElement('div');
    box.className = 'inspector-box';
    box.setAttribute('aria-hidden', 'true');
    box.innerHTML = '<span class="inspector-label"></span>';
    const boxLabel = box.firstElementChild;

    const exit = document.createElement('button');
    exit.type = 'button';
    exit.className = 'inspector-exit';
    exit.hidden = true;
    exit.innerHTML = '<i class="bi bi-x-lg" aria-hidden="true"></i>Salir del inspector <kbd>Esc</kbd>';
    document.body.append(box, exit);

    const IGNORE = 'html, body, main, .inspector-box, .inspector-exit, .inspector-exit *';
    let active = false;
    let frame = 0;

    function show(el) {
      if (!el || el.matches(IGNORE)) { box.classList.remove('has-target'); return; }
      const r = el.getBoundingClientRect();
      // Coordenadas de página: el recuadro sigue pegado al bloque al hacer scroll.
      box.style.transform = `translate(${r.left + window.scrollX}px, ${r.top + window.scrollY}px)`;
      box.style.width = `${r.width}px`;
      box.style.height = `${r.height}px`;
      box.classList.toggle('label-inside', r.top < 90);
      boxLabel.innerHTML = `${describe(el)}<span class="dim">${Math.round(r.width)} × ${Math.round(r.height)}</span>`;
      box.classList.add('has-target');
    }

    const onMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        show(document.elementFromPoint(e.clientX, e.clientY));
      });
    };
    const onFocus = (e) => show(e.target);
    // Mientras se inspecciona, un clic marca el bloque en vez de seguir el enlace.
    const onClick = (e) => {
      if (e.target.closest('#inspectToggle, .inspector-exit')) return;
      e.preventDefault();
      e.stopPropagation();
      show(e.target);
    };

    const set = (on) => {
      active = on;
      body.classList.toggle('inspecting', on);
      btn.setAttribute('aria-pressed', String(on));
      if (label) label.textContent = on ? 'Dejar de inspeccionar' : 'Inspeccionar esta página';
      exit.hidden = !on;
      const method = on ? 'addEventListener' : 'removeEventListener';
      document[method]('pointermove', onMove);
      document[method]('focusin', onFocus);
      document[method]('click', onClick, true);
      if (!on) box.classList.remove('has-target');
      toast(on
        ? 'Inspector activado: pasa el cursor o toca cualquier bloque.'
        : 'Inspector desactivado');
    };

    btn.addEventListener('click', () => set(!active));
    exit.addEventListener('click', () => set(false));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && active) set(false);
    });
  }

  function init() {
    initReveal();
    initDimensions();
    initCrosshair();
    initLens();
    initTilt();
    initParts();
    initSkillFilter();
    initCopy();
    initInspector();
  }

  // main.js dibuja el contenido en DOMContentLoaded; este archivo se carga
  // después, así que su manejador corre cuando el contenido ya existe.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
