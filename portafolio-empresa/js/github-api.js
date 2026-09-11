/* ============================================
   GITHUB API — Repositorios públicos
   - Escapa el contenido que llega de la API (nunca se inyecta HTML crudo)
   - Cachea 1 hora en sessionStorage (la API pública limita a 60 req/hora por IP)
   - Si no hay repos que mostrar, oculta el bloque entero en vez de dejar un hueco
   ============================================ */

(function () {
    'use strict';

    // ========== CONFIGURACIÓN ==========
    const CONFIG = {
        enabled: true,            // ponlo en false para ocultar la sección por completo
        username: 'insatechneo-code',
        maxRepos: 6,
        sort: 'updated',
        excludeForks: true,
        excludeRepos: [],         // ej: ['repo-de-pruebas', 'tareas-clase']
        requireDescription: false, // true = solo muestra repos que tengan descripción
        cacheMinutes: 60,
    };

    const reposContainer = document.getElementById('githubRepos');
    // Bloque completo (título + grid) para poder ocultarlo si no hay nada que mostrar
    const reposBlock = reposContainer ? reposContainer.closest('.row') : null;

    // ========== UTILIDADES ==========
    const esc = (str) => String(str ?? '').replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));

    function hideBlock() {
        if (reposBlock) reposBlock.style.display = 'none';
        else if (reposContainer) reposContainer.innerHTML = '';
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const diffDays = Math.floor(Math.abs(Date.now() - date) / 86400000);
        if (diffDays === 0) return 'hoy';
        if (diffDays === 1) return 'ayer';
        if (diffDays < 7) return `hace ${diffDays} días`;
        if (diffDays < 30) return `hace ${Math.floor(diffDays / 7)} semanas`;
        if (diffDays < 365) return `hace ${Math.floor(diffDays / 30)} meses`;
        const y = Math.floor(diffDays / 365);
        return `hace ${y} ${y === 1 ? 'año' : 'años'}`;
    }

    function getLanguageColor(language) {
        const colors = {
            JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
            Java: '#b07219', HTML: '#e34c26', CSS: '#563d7c', PHP: '#4F5D95',
            'C#': '#178600', 'C++': '#f34b7d', C: '#555555', Go: '#00ADD8',
            Ruby: '#701516', Rust: '#dea584', Swift: '#ffac45', Kotlin: '#F18E33',
            Dart: '#00B4AB', Shell: '#89e051', Vue: '#41b883', Blade: '#f7523f',
        };
        return colors[language] || '#8a8fa3';
    }

    // ========== CACHÉ ==========
    const cacheKey = `gh:${CONFIG.username}`;

    function readCache() {
        try {
            const raw = sessionStorage.getItem(cacheKey);
            if (!raw) return null;
            const { at, data } = JSON.parse(raw);
            if (Date.now() - at > CONFIG.cacheMinutes * 60000) return null;
            return data;
        } catch (_) { return null; }
    }

    function writeCache(data) {
        try {
            sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), data }));
        } catch (_) { /* modo incógnito o storage lleno: seguimos sin caché */ }
    }

    // ========== RENDER ==========
    function createRepoCard(repo) {
        const hasDesc = Boolean(repo.description);
        const topics = (repo.topics || []).slice(0, 3);

        return `
      <div class="github-repo-card">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <a href="${esc(repo.html_url)}" target="_blank" rel="noopener noreferrer"
             class="github-repo-title text-decoration-none">
            <i class="bi bi-github me-2"></i>${esc(repo.name)}
          </a>
        </div>

        <p class="github-repo-description mb-3${hasDesc ? '' : ' github-repo-description--empty'}">
          ${hasDesc ? esc(repo.description) : 'Repositorio sin descripción'}
        </p>

        ${topics.length ? `<div class="github-repo-topics mb-3">
          ${topics.map((t) => `<span class="tech-tag">${esc(t)}</span>`).join('')}
        </div>` : ''}

        <div class="github-repo-stats d-flex align-items-center flex-wrap">
          ${repo.language ? `<span class="me-3">
            <i class="bi bi-circle-fill me-1" style="color:${esc(getLanguageColor(repo.language))}"></i>${esc(repo.language)}
          </span>` : ''}
          ${repo.stargazers_count ? `<span class="me-3"><i class="bi bi-star me-1"></i>${repo.stargazers_count}</span>` : ''}
          <span class="ms-auto github-repo-updated">Actualizado ${esc(formatDate(repo.updated_at))}</span>
        </div>
      </div>`;
    }

    function displayRepos(repos) {
        if (!repos.length) { hideBlock(); return; }
        reposContainer.innerHTML = repos.map(createRepoCard).join('');
    }

    function showLoading() {
        reposContainer.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Cargando repositorios…</span>
        </div>
      </div>`;
    }

    // ========== FETCH ==========
    function filterRepos(repos) {
        return repos.filter((repo) => {
            if (CONFIG.excludeForks && repo.fork) return false;
            if (repo.archived) return false;
            if (CONFIG.excludeRepos.includes(repo.name)) return false;
            if (CONFIG.requireDescription && !repo.description) return false;
            return true;
        });
    }

    async function fetchGitHubRepos() {
        if (!CONFIG.enabled || !reposContainer) { hideBlock(); return; }
        if (!CONFIG.username || CONFIG.username.startsWith('__')) { hideBlock(); return; }

        const cached = readCache();
        if (cached) { displayRepos(cached); return; }

        showLoading();

        try {
            const url = `https://api.github.com/users/${encodeURIComponent(CONFIG.username)}/repos?sort=${CONFIG.sort}&per_page=100`;
            const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });

            if (response.status === 403) throw new Error('rate-limit');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const repos = await response.json();
            const list = filterRepos(Array.isArray(repos) ? repos : []).slice(0, CONFIG.maxRepos);

            writeCache(list);
            displayRepos(list);
        } catch (error) {
            console.warn('GitHub repos no disponibles:', error.message);
            // Un error de red no debe dejar un mensaje rojo en medio del portafolio:
            // simplemente ocultamos la sección.
            hideBlock();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fetchGitHubRepos);
    } else {
        fetchGitHubRepos();
    }
})();
