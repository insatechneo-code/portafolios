/* ============================================
   GITHUB API INTEGRATION
   Muestra tus repositorios automáticamente
   ============================================ */

(function() {
    'use strict';

    // ========== CONFIGURACIÓN ==========
    const CONFIG = {
        username: 'Breiner1412',
        maxRepos: 6,
        sort: 'updated',
        excludeForks: true,
        excludeRepos: []
    };

    // ========== ELEMENTOS DEL DOM ==========
    const reposContainer = document.getElementById('githubRepos');

    // ========== FETCH REPOSITORIES ==========
    async function fetchGitHubRepos() {
        if (!reposContainer) return;

        try {
            showLoading();

            const url = `https://api.github.com/users/${CONFIG.username}/repos?sort=${CONFIG.sort}&per_page=100`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const repos = await response.json();
            
            const filteredRepos = filterRepos(repos);
            const limitedRepos = filteredRepos.slice(0, CONFIG.maxRepos);

            displayRepos(limitedRepos);

        } catch (error) {
            console.error('Error fetching GitHub repos:', error);
            showError();
        }
    }

    // ========== FILTRAR REPOSITORIOS ==========
    function filterRepos(repos) {
        return repos.filter(repo => {
            if (CONFIG.excludeForks && repo.fork) return false;
            if (CONFIG.excludeRepos.includes(repo.name)) return false;
            return true;
        });
    }

    // ========== MOSTRAR REPOSITORIOS ==========
    function displayRepos(repos) {
        if (repos.length === 0) {
            reposContainer.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-muted">No hay repositorios públicos disponibles.</p>
                </div>
            `;
            return;
        }

        reposContainer.innerHTML = repos.map(repo => createRepoCard(repo)).join('');
        
        const cards = reposContainer.querySelectorAll('.github-repo-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'all 0.3s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    }

    // ========== CREAR CARD DE REPOSITORIO ==========
    function createRepoCard(repo) {
        const description = repo.description || 'Sin descripción';
        const language = repo.language || 'N/A';
        const stars = repo.stargazers_count;
        const forks = repo.forks_count;
        const updated = formatDate(repo.updated_at);

        return `
            <div class="github-repo-card">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <a href="${repo.html_url}" target="_blank" class="github-repo-title text-decoration-none">
                        <i class="bi bi-github me-2"></i>${repo.name}
                    </a>
                    ${repo.private ? '<span class="badge bg-warning">Private</span>' : '<span class="badge bg-success">Public</span>'}
                </div>
                
                <p class="github-repo-description mb-3">${truncateText(description, 80)}</p>
                
                <div class="d-flex justify-content-between align-items-center">
                    <div class="github-repo-stats">
                        ${language !== 'N/A' ? `
                            <span class="me-3">
                                <i class="bi bi-circle-fill me-1" style="color: ${getLanguageColor(language)}"></i>
                                ${language}
                            </span>
                        ` : ''}
                        <span class="me-3">
                            <i class="bi bi-star me-1"></i>${stars}
                        </span>
                        <span>
                            <i class="bi bi-diagram-3 me-1"></i>${forks}
                        </span>
                    </div>
                </div>
                
                <div class="mt-2">
                    <small class="text-muted">Actualizado: ${updated}</small>
                </div>
            </div>
        `;
    }

    // ========== UTILIDADES ==========
    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Hoy';
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
        if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`;
        return `Hace ${Math.floor(diffDays / 365)} años`;
    }

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    function getLanguageColor(language) {
        const colors = {
            'JavaScript': '#f1e05a',
            'Python': '#3572A5',
            'Java': '#b07219',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'PHP': '#4F5D95',
            'Ruby': '#701516',
            'C++': '#f34b7d',
            'C': '#555555',
            'Go': '#00ADD8',
            'TypeScript': '#2b7489',
            'Swift': '#ffac45',
            'Kotlin': '#F18E33',
            'Rust': '#dea584',
            'Shell': '#89e051',
            'Vue': '#41b883',
            'React': '#61dafb'
        };
        return colors[language] || '#6c757d';
    }

    function showLoading() {
        reposContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando repositorios...</span>
                </div>
                <p class="mt-3 text-muted">Cargando repositorios desde GitHub...</p>
            </div>
        `;
    }

    function showError() {
        reposContainer.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger" role="alert">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    Error al cargar los repositorios. Por favor intenta más tarde.
                </div>
            </div>
        `;
    }

    // ========== INICIALIZACIÓN ==========
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fetchGitHubRepos);
        } else {
            fetchGitHubRepos();
        }
    }

    init();

})();