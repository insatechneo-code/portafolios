/* ============================================================================
   INTERACTIONS.JS — Efectos interactivos de INSATECH NEO ("Circuito")
   Depende de: main.js (que ya dibujó el contenido) y css/motion.css.

   1. Apariciones al hacer scroll (y nodos del riel)
   2. Paralaje del logo con el cursor
   3. "Ver trayectoria" en las tarjetas del equipo

   Respeta prefers-reduced-motion; el paralaje solo se activa con mouse. No
   registra listeners de scroll: el riel se llena desde el único listener de main.js.
   ============================================================================ */

(function () {
  'use strict';

  const body = document.body;
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ---------- 1. Apariciones al hacer scroll ----------
  // Cada hijo de un [data-stagger] recibe su posición (--i) para la cascada. Los
  // títulos de sección son .reveal: al aparecer, su nodo del riel se enciende.
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

  // ---------- 2. Paralaje del logo del hero ----------
  function initParallax() {
    const art = document.getElementById('heroArt');
    const hero = document.getElementById('hero');
    if (!art || !hero || !finePointer() || reducedMotion()) return;

    let frame = 0;
    hero.addEventListener('pointermove', (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = art.getBoundingClientRect();
        const px = (e.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
        const py = (e.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
        art.style.setProperty('--px', Math.max(-0.5, Math.min(0.5, px)).toFixed(3));
        art.style.setProperty('--py', Math.max(-0.5, Math.min(0.5, py)).toFixed(3));
        art.classList.add('is-tracking');
      });
    });
    hero.addEventListener('pointerleave', () => {
      art.style.setProperty('--px', '0');
      art.style.setProperty('--py', '0');
    });
  }

  // ---------- 3. "Ver trayectoria" en el equipo ----------
  function initTrails() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.trail-toggle');
      if (!btn) return;
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
      const label = btn.querySelector('span');
      if (label) label.textContent = open ? 'Ver trayectoria' : 'Ocultar trayectoria';
    });
  }

  function init() {
    initReveal();
    initParallax();
    initTrails();
  }

  // main.js dibuja el contenido en DOMContentLoaded; este archivo se carga después,
  // así que su manejador corre cuando el contenido ya existe.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
