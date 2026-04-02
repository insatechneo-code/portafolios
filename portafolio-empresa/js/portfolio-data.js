const PORTFOLIO = {
    // ---- Configuración EmailJS ----
    emailjs: {
        publicKey: 'TU_PUBLIC_KEY_AQUI',
        serviceId: 'TU_SERVICE_ID_AQUI',
        templateId: 'TU_TEMPLATE_ID_AQUI',
    },

    // ---- Info de la empresa ----
    company: {
        name: 'INSATECH NEO',
        brandHTML: 'INSATECH <span class="brand-accent">NEO</span>',
        tagline: 'Desarrollo de Software & Soluciones Tecnológicas',
        email: 'insatechneo@gmail.com',
        location: 'Pereira, Risaralda, Colombia',
        logo: 'images/logo.jpeg',
        logoAlt: 'images/logo-neo.jpeg',
    },

    socialLinks: [
        { url: 'https://github.com/insatechneo-code', icon: 'bi-github', label: 'GitHub' },
        { url: 'mailto:insatechneo@gmail.com', icon: 'bi-envelope', label: 'Email' },
        { url: 'https://linkedin.com/company/insatech-neo', icon: 'bi-linkedin', label: 'LinkedIn' },
    ],

    // ---- About / Stats ----
    aboutStats: [
        { count: 2, label: 'Desarrolladores<br>en el Equipo' },
        { count: 5, label: 'Proyectos<br>Completados' },
        { count: 10, label: 'Tecnologías<br>Dominadas' },
    ],

    // ---- Servicios ----
    services: [
        {
            icon: 'bi-globe2',
            title: 'Desarrollo Web',
            description: 'Creación de sitios web responsive, landing pages, portafolios y aplicaciones web con tecnologías modernas como React, Laravel y Bootstrap.',
            tags: ['HTML/CSS', 'JavaScript', 'React', 'Laravel'],
        },
        {
            icon: 'bi-database-gear',
            title: 'Backend & Bases de Datos',
            description: 'Desarrollo de APIs, sistemas de gestión, integración de bases de datos SQL y despliegue en servidores incluyendo Microsoft Azure.',
            tags: ['PHP', 'Python', 'FastAPI', 'SQL'],
        },
        {
            icon: 'bi-pc-display',
            title: 'Soporte Técnico',
            description: 'Mantenimiento preventivo y correctivo de equipos, diagnóstico de fallas, configuración de redes y soporte en telecomunicaciones.',
            tags: ['Hardware', 'Redes', 'Windows/Linux'],
        },
        {
            icon: 'bi-clipboard2-data',
            title: 'Gestión Administrativa Digital',
            description: 'Organización documental, gestión de bases de datos en Excel, automatización de procesos administrativos y soporte virtual.',
            tags: ['Excel', 'Ofimática', 'Gestión documental'],
        },
        {
            icon: 'bi-phone',
            title: 'Atención al Cliente Digital',
            description: 'Gestión de comunicaciones, atención vía WhatsApp y telefónica, manejo de PQRS y coordinación de agendas virtuales.',
            tags: ['WhatsApp Business', 'PQRS'],
        },
        {
            icon: 'bi-git',
            title: 'Control de Versiones & Deploy',
            description: 'Gestión de código con Git y GitHub, flujos de trabajo colaborativo, despliegue continuo y administración de servidores.',
            tags: ['Git', 'GitHub', 'Azure'],
        },
    ],

    // ---- Equipo ----
    team: [
        {
            name: 'Breiner Stiven Guisao Rodriguez',
            role: 'Co-Fundador & Desarrollador Full Stack',
            photo: 'images/breiner.jpg',
            social: [
                { url: 'https://github.com/Breiner1412', icon: 'bi-github', label: 'GitHub' },
                { url: 'mailto:rodriguezbreiner125@gmail.com', icon: 'bi-envelope', label: 'Email' },
                { url: 'https://wa.me/573206554202?text=%C2%A1Hola!%20Vi%20el%20portafolio%20de%20INSATECH%20NEO%20y%20me%20gustar%C3%ADa%20conocer%20más%20sobre%20sus%20servicios.', icon: 'bi-whatsapp', label: 'WhatsApp' },
            ],
            profile: 'Tecnólogo en Análisis y Desarrollo de Software (SENA) y Técnico Laboral en Mantenimiento de Sistemas. Experiencia en desarrollo web con JavaScript, PHP, Python, Laravel, React y FastAPI. Conocimiento en bases de datos SQL, Git, Azure y soporte técnico.',
            experience: [
                { date: 'Dic 2025 - Jun 2026', title: 'Técnico de Soporte — TuCable SAS', desc: 'Diagnóstico y resolución de incidentes técnicos en servicios de internet y TV. Configuración de equipos de red.' },
                { date: 'Jul 2023 - Ene 2024', title: 'Auxiliar de Soporte Técnico — Comfamiliar Risaralda', desc: 'Mantenimiento preventivo/correctivo de equipos, ensamblaje de hardware, gestión de inventarios tecnológicos.' },
            ],
            education: [
                { title: 'Tecnólogo en Análisis y Desarrollo de Software', institution: 'SENA — 2024 - 2026' },
                { title: 'Técnico Laboral en Mantenimiento de Sistemas', institution: 'Instituto Comfamiliar Risaralda — 2022 - 2024' },
            ],
            portfolioUrl: 'https://portafolio-breiner-guisao.onrender.com',
        },
        {
            name: 'Luisa Fernanda Sánchez',
            role: 'Co-Fundadora & Desarrolladora / Gestión Administrativa',
            photo: 'images/luisa.jpg',
            social: [
                { url: 'https://github.com/Luisa-039', icon: 'bi-github', label: 'GitHub' },
                { url: 'mailto:fers86113@gmail.com', icon: 'bi-envelope', label: 'Email' },
                { url: 'https://wa.me/573205703024?text=%C2%A1Hola!%20Vi%20el%20portafolio%20de%20INSATECH%20NEO%20y%20me%20gustar%C3%ADa%20conocer%20más%20sobre%20sus%20servicios.', icon: 'bi-whatsapp', label: 'WhatsApp' },
            ],
            profile: 'Auxiliar administrativa con experiencia en atención al cliente, gestión documental y apoyo en procesos administrativos en el sector educativo y de salud. Tecnóloga en Análisis y Desarrollo de Software (SENA). Organizada, responsable y orientada al servicio.',
            experience: [
                { date: '2025', title: 'Asistente Ejecutiva (Remoto) — First Class Business', desc: 'Atención virtual a clientes, gestión de agenda, coordinación de reuniones y manejo de bases de datos.' },
                { date: '2023 - 2024', title: 'Auxiliar Administrativo en Salud — Gastroeje', desc: 'Admisión de pacientes, gestión de autorizaciones, agendamiento de citas y atención al usuario.' },
                { date: '2019 - 2020', title: 'Pasante Administrativa — American School Way', desc: 'Gestión de PQRS, organización de matrículas, recaudo de pagos y atención al cliente.' },
            ],
            education: [
                { title: 'Tecnóloga en Análisis y Desarrollo de Software', institution: 'SENA — 2024 - En curso' },
                { title: 'Técnica Auxiliar en Enfermería', institution: 'INEC — 2021 - 2022' },
                { title: 'Técnica en Comercio Exterior', institution: 'SENA — 2019 - 2020' },
            ],
            portfolioUrl: 'https://portafolio-luisa-sanchez.onrender.com',
        },
    ],

    // ---- Skills / Tecnologías ----
    skills: [
        {
            category: 'Desarrollo Web & Backend',
            icon: 'bi-code-square',
            items: [
                { name: 'HTML5 & CSS3', icon: 'bi-filetype-html', pct: 85 },
                { name: 'JavaScript', icon: 'bi-filetype-js', pct: 70 },
                { name: 'PHP & Laravel', icon: 'bi-filetype-php', pct: 65 },
                { name: 'Python & FastAPI', icon: 'bi-filetype-py', pct: 60 },
                { name: 'React & Bootstrap', icon: 'bi-bootstrap', pct: 65 },
                { name: 'Bases de Datos SQL', icon: 'bi-database', pct: 70 },
            ],
        },
        {
            category: 'Herramientas & Soporte',
            icon: 'bi-tools',
            items: [
                { name: 'Git & GitHub', icon: 'bi-git', pct: 75 },
                { name: 'Soporte Técnico & Hardware', icon: 'bi-pc-display', pct: 85 },
                { name: 'Microsoft Azure', icon: 'bi-cloud', pct: 45 },
                { name: 'Excel & Ofimática', icon: 'bi-file-earmark-spreadsheet', pct: 85 },
                { name: 'Windows & Linux', icon: 'bi-windows', pct: 80 },
                { name: 'Gestión Administrativa', icon: 'bi-headset', pct: 80 },
            ],
        },
    ],

    // ---- Proyectos ----
    projects: {
        portafolio: {
            title: 'Portafolio Web Empresarial',
            subtitle: 'Sitio web corporativo responsive con modo oscuro/claro, integración GitHub API y diseño moderno.',
            brief: 'Sitio web corporativo responsive con modo oscuro/claro, integración GitHub API y diseño moderno.',
            date: '2025',
            role: 'Equipo INSATECH NEO',
            duration: '1 mes',
            category: 'web',
            github: 'https://github.com/insatechneo-code',
            demo: '',
            mainImage: 'images/portafolio.jpg',
            gallery: ['images/portafolio.jpg'],
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
            tools: ['VS Code', 'Git', 'GitHub'],
            tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
            stats: [
                { label: 'Tipo', value: 'Sitio corporativo' },
                { label: 'Responsive', value: 'Sí' },
            ],
            description: `
        <p>Portafolio web empresarial de INSATECH NEO, diseñado para presentar los servicios, equipo y proyectos del equipo de desarrollo.</p>
        <h4 class="mt-4 mb-3">Características Principales</h4>
        <ul class="project-features-list">
          <li><i class="bi bi-check-circle-fill me-2"></i>Modo oscuro/claro con persistencia</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Integración automática con GitHub API</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Diseño moderno con gradientes verde-cyan-azul</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Secciones de equipo con perfiles completos</li>
        </ul>
      `,
            team: [
                {
                    name: 'Breiner Stiven Guisao Rodriguez',
                    role: 'Desarrollador Full Stack',
                    contribution: 'Arquitectura, desarrollo y despliegue',
                    photo: 'images/breiner.jpg',
                    github: 'https://github.com/Breiner1412',
                    email: 'rodriguezbreiner125@gmail.com',
                    whatsapp: 'https://wa.me/573206554202?text=%C2%A1Hola!%20Vi%20el%20portafolio%20de%20INSATECH%20NEO.',
                },
                {
                    name: 'Luisa Fernanda Sánchez',
                    role: 'Desarrolladora / Gestión',
                    contribution: 'Contenido, diseño y revisión',
                    photo: 'images/luisa.jpg',
                    github: 'https://github.com/Luisa-039',
                    email: 'fers86113@gmail.com',
                    whatsapp: 'https://wa.me/573205703024?text=%C2%A1Hola!%20Vi%20el%20portafolio%20de%20INSATECH%20NEO.',
                },
            ],
            extraLinks: [],
            demoAccess: [],
        },

        gestion: {
            title: 'Sistema de Gestión',
            subtitle: 'Aplicación web full stack con autenticación, CRUD y panel de administración.',
            brief: 'Aplicación web full stack con autenticación, CRUD y panel de administración.',
            date: '2025',
            role: 'Equipo INSATECH NEO',
            duration: '2 meses',
            category: 'web',
            github: '#',
            demo: '',
            mainImage: 'images/gestion.jpg',
            gallery: ['images/gestion.jpg'],
            tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
            tools: ['VS Code', 'Git', 'Postman'],
            tags: ['Laravel', 'PHP', 'MySQL'],
            stats: [
                { label: 'Tipo', value: 'Full Stack' },
                { label: 'Base de datos', value: 'MySQL' },
            ],
            description: `
        <p>Sistema de gestión completo con autenticación por roles, operaciones CRUD y panel administrativo.</p>
        <h4 class="mt-4 mb-3">Características Principales</h4>
        <ul class="project-features-list">
          <li><i class="bi bi-check-circle-fill me-2"></i>Autenticación y autorización por roles</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>CRUD completo para gestión de datos</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Panel de administración</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Interfaz responsive con Bootstrap</li>
        </ul>
      `,
            team: [
                {
                    name: 'Breiner Stiven Guisao Rodriguez',
                    role: 'Backend Developer',
                    contribution: 'API, base de datos y lógica de negocio',
                    photo: 'images/breiner.jpg',
                    github: 'https://github.com/Breiner1412',
                    email: 'rodriguezbreiner125@gmail.com',
                    whatsapp: 'https://wa.me/573206554202?text=%C2%A1Hola!%20Vi%20el%20portafolio%20de%20INSATECH%20NEO.',
                },
                {
                    name: 'Luisa Fernanda Sánchez',
                    role: 'Frontend / Gestión',
                    contribution: 'Interfaz de usuario y pruebas',
                    photo: 'images/luisa.jpg',
                    github: 'https://github.com/Luisa-039',
                    email: 'fers86113@gmail.com',
                    whatsapp: 'https://wa.me/573205703024?text=%C2%A1Hola!%20Vi%20el%20portafolio%20de%20INSATECH%20NEO.',
                },
            ],
            extraLinks: [],
            demoAccess: [],
        },

        fastapi: {
            title: 'API REST con FastAPI',
            subtitle: 'Backend escalable con Python, documentación automática y conexión a bases de datos SQL.',
            brief: 'Backend escalable con Python, documentación automática y conexión a bases de datos SQL.',
            date: '2025',
            role: 'Equipo INSATECH NEO',
            duration: '1 mes',
            category: 'backend',
            github: '#',
            demo: '',
            mainImage: 'images/fast-api.jpg',
            gallery: ['images/fast-api.jpg'],
            tech: ['Python', 'FastAPI', 'SQL', 'Swagger'],
            tools: ['VS Code', 'Git', 'Postman'],
            tags: ['Python', 'FastAPI', 'SQL'],
            stats: [
                { label: 'Tipo', value: 'API REST' },
                { label: 'Documentación', value: 'Swagger automática' },
            ],
            description: `
        <p>API REST desarrollada con FastAPI de Python, con documentación automática Swagger y conexión a bases de datos SQL.</p>
        <h4 class="mt-4 mb-3">Características Principales</h4>
        <ul class="project-features-list">
          <li><i class="bi bi-check-circle-fill me-2"></i>Endpoints RESTful bien estructurados</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Documentación Swagger/OpenAPI automática</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Validación de datos con Pydantic</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Conexión a base de datos SQL</li>
        </ul>
      `,
            team: [
                {
                    name: 'Breiner Stiven Guisao Rodriguez',
                    role: 'Backend Developer',
                    contribution: 'Desarrollo completo de la API',
                    photo: 'images/breiner.jpg',
                    github: 'https://github.com/Breiner1412',
                    email: 'rodriguezbreiner125@gmail.com',
                    whatsapp: 'https://wa.me/573206554202?text=%C2%A1Hola!%20Vi%20el%20portafolio%20de%20INSATECH%20NEO.',
                },
            ],
            extraLinks: [],
            demoAccess: [],
        },
    },

    projectCards: ['portafolio', 'gestion', 'fastapi'],

    // ---- Contacto ----
    contactInfo: [
        {
            icon: 'bi-envelope-fill',
            title: 'Email',
            lines: [
                { text: 'rodriguezbreiner125@gmail.com', url: 'mailto:rodriguezbreiner125@gmail.com' },
                { text: 'fers86113@gmail.com', url: 'mailto:fers86113@gmail.com' },
            ],
        },
        {
            icon: 'bi-whatsapp',
            title: 'WhatsApp',
            lines: [
                { text: '+57 320 655 4202', url: 'https://wa.me/573206554202?text=%C2%A1Hola!%20Vi%20el%20portafolio%20de%20INSATECH%20NEO%20y%20me%20gustar%C3%ADa%20conocer%20más%20sobre%20sus%20servicios.' },
                { text: '+57 320 570 3024', url: 'https://wa.me/573205703024?text=%C2%A1Hola!%20Vi%20el%20portafolio%20de%20INSATECH%20NEO%20y%20me%20gustar%C3%ADa%20conocer%20más%20sobre%20sus%20servicios.' },
            ],
        },
        {
            icon: 'bi-geo-alt-fill',
            title: 'Ubicación',
            lines: [
                { text: 'Pereira, Risaralda<br>Colombia' },
            ],
        },
    ],
};