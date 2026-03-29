const PORTFOLIO = {
    // ---- Configuración EmailJS ----
    // ⚠️ REEMPLAZA estos 3 valores con los tuyos de https://www.emailjs.com
    emailjs: {
        publicKey: '4aU8BFtzbZCxBmqgm',
        serviceId: 'service_gtbxotr',
        templateId: 'template_i6nth3d',
    },

    // ---- Info personal ----
    owner: {
        name: 'Breiner Stiven Guisao Rodriguez',
        shortName: 'Breiner Guisao',
        title: 'Tecnólogo en Análisis y Desarrollo de Software & Técnico en Mantenimiento de Sistemas',
        email: 'rodriguezbreiner125@gmail.com',
        phone: '+573206554202',
        phoneFormatted: '+57 320 655 4202',
        location: 'Pereira, Risaralda, Colombia',
        github: 'https://github.com/Breiner1412',
        linkedin: 'https://linkedin.com/in/breiner-guisao',
        photo: 'images/perfil.jpg',
    },

    socialLinks: [
        { url: 'https://github.com/Breiner1412', icon: 'bi-github', label: 'GitHub' },
        { url: 'https://linkedin.com/in/breiner-guisao', icon: 'bi-linkedin', label: 'LinkedIn' },
        { url: 'mailto:rodriguezbreiner125@gmail.com', icon: 'bi-envelope', label: 'Email' },
        { url: 'tel:+573206554202', icon: 'bi-telephone', label: 'Teléfono' },
    ],

    experience: [
        {
            date: 'Diciembre 2025 - Junio 2026',
            title: 'Técnico de Soporte en Telecomunicaciones',
            company: 'TuCable SAS, Pereira',
            tasks: [
                'Atención, diagnóstico y resolución de incidentes técnicos en servicios de internet y televisión.',
                'Configuración y actualización de equipos de red y dispositivos tecnológicos.',
                'Parametrización y verificación del correcto funcionamiento de servicios en usuarios finales.',
                'Soporte técnico remoto según requerimientos del servicio.',
                'Monitoreo y validación del rendimiento operativo de los sistemas.',
                'Detección y reporte de fallas técnicas para su escalamiento oportuno.',
                'Garantía de continuidad y calidad en la prestación del servicio.',
            ],
        },
        {
            date: 'Julio 2023 - Enero 2024',
            title: 'Auxiliar de Soporte Técnico en Mantenimiento de Sistemas',
            company: 'Comfamiliar Risaralda, Pereira',
            tasks: [
                'Mantenimiento preventivo y correctivo de equipos informáticos.',
                'Ensamblaje, instalación y configuración de hardware.',
                'Desmontaje, transporte y almacenamiento de equipos obsoletos.',
                'Gestión de inventarios tecnológicos.',
                'Participación en proyectos de renovación tecnológica.',
                'Atención al cliente, resolución de consultas y orientación a los usuarios.',
                'Gestión eficiente en un entorno de alta demanda.',
            ],
        },
    ],

    projects: {
        registro: {
            title: 'Sistema de Registro de Entrada y Salida Escolar',
            subtitle: 'WebApp para control de acceso escolar con panel admin, roles y reportes.',
            brief: 'Controla entradas y salidas en colegio, roles, reportes y panel admin.',
            date: 'Marzo 2026',
            role: 'Fullstack JS',
            duration: '3 meses',
            category: 'web',
            github: 'https://github.com/Breiner1412/sistema-de-gestion-de-ingreso',
            demo: 'https://registro-ingreso-72ef6.web.app',
            mainImage: 'images/projects/gestion/imagen1.png',
            gallery: [
                'images/projects/gestion/imagen2.png',
                'images/projects/gestion/imagen3.png',
                'images/projects/gestion/imagen4.png',
                'images/projects/gestion/imagen5.png',
            ],
            tech: ['JavaScript', 'HTML5', 'CSS3', 'Firebase', 'SweetAlert2', 'Chart.js'],
            tools: ['VS Code', 'Git', 'Firebase CLI', 'SheetJS'],
            tags: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
            stats: [
                { label: 'Usuarios', value: '2 roles (admin y recepcionista)' },
                { label: 'Duración', value: '3 meses' },
                { label: 'Líneas de código', value: '4000+' },
            ],
            description: `
        <p>Este sistema fue diseñado para colegios que necesitan llevar control de acceso rápido y eficiente.
        Permite registrar entradas y salidas de empleados, estudiantes y visitantes mediante escaneo de cédula o carnet.
        Incluye administración de usuarios, importación masiva desde Excel, dashboard con estadísticas y reportes exportables.</p>
        <h4 class="mt-4 mb-3">Características Principales</h4>
        <ul class="project-features-list">
          <li><i class="bi bi-check-circle-fill me-2"></i>Escaneo automático de cédula o carnet</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Panel administrativo con controles y reportes</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Importación masiva de personas desde Excel</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Exporta registros e informes a CSV</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Modo oscuro/claro, SweetAlert2 y diseño responsive</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>100% Frontend, sin servidor propio</li>
        </ul>
        <h4 class="mt-4 mb-3">Desafíos y Soluciones</h4>
        <p>El reto fue orquestar autenticación segura por roles sin backend, solo con Firestore y reglas.</p>
        <h4 class="mt-4 mb-3">Resultados</h4>
        <p>El colegio puede monitorear la asistencia y seguridad en tiempo real, ahorrar tiempo y obtener trazabilidad digital.</p>
      `,
            team: [
                {
                    name: 'Breiner Stiven Guisao Rodriguez',
                    role: 'Fullstack Developer',
                    contribution: 'Arquitectura, desarrollo, integración con Firebase y despliegue',
                    photo: 'images/perfil.jpg',
                    github: 'https://github.com/Breiner1412',
                    linkedin: 'https://linkedin.com/in/breiner-guisao',
                },
            ],
            extraLinks: [
                { url: 'https://registro-ingreso-72ef6.web.app', label: 'Demo Online', icon: 'bi bi-box-arrow-up-right' },
            ],
            demoAccess: [
                { role: 'Administrador', user: 'admin@colegio.com', pass: '12345678' },
                { role: 'Recepcionista', user: 'recepcion@colegio.com', pass: '12345678' },
            ],
        },
    },

    projectCards: ['registro'],

    skills: [
        {
            category: 'Lenguajes de Programación',
            icon: 'bi-code-square',
            items: [
                { name: 'JavaScript', icon: 'bi-filetype-js', pct: 65 },
                { name: 'PHP', icon: 'bi-filetype-php', pct: 65 },
                { name: 'Python', icon: 'bi-filetype-py', pct: 60 },
                { name: 'HTML5 & CSS3', icon: 'bi-filetype-html', pct: 80 },
            ],
        },
        {
            category: 'Frameworks y Librerías',
            icon: 'bi-layers',
            items: [
                { name: 'Laravel', icon: 'bi-braces', pct: 60 },
                { name: 'React', icon: 'bi-code-slash', pct: 55 },
                { name: 'FastAPI', icon: 'bi-lightning-charge', pct: 55 },
                { name: 'Bootstrap', icon: 'bi-bootstrap', pct: 75 },
            ],
        },
        {
            category: 'Herramientas y Tecnologías',
            icon: 'bi-tools',
            items: [
                { name: 'Git & GitHub', icon: 'bi-git', pct: 75 },
                { name: 'Bases de Datos SQL', icon: 'bi-database', pct: 70 },
                { name: 'Microsoft Azure (Básico)', icon: 'bi-cloud', pct: 45 },
                { name: 'Arduino IDE', icon: 'bi-cpu', pct: 45 },
                { name: 'Windows & Linux', icon: 'bi-windows', pct: 80 },
                { name: 'Herramientas Ofimáticas', icon: 'bi-file-earmark-spreadsheet', pct: 80 },
            ],
        },
        {
            category: 'Mantenimiento y Hardware',
            icon: 'bi-cpu',
            items: [
                { name: 'Ensamblaje y Mantenimiento de PCs', icon: 'bi-pc-display', pct: 90 },
                { name: 'Redes y Configuración de Equipos', icon: 'bi-hdd-network', pct: 75 },
                { name: 'Diagnóstico de Problemas Técnicos', icon: 'bi-wrench', pct: 85 },
                { name: 'Instalación de Software y SO', icon: 'bi-download', pct: 85 },
            ],
        },
    ],

    softSkills: [
        { name: 'Comunicación', icon: 'bi-chat-dots' },
        { name: 'Trabajo en Equipo', icon: 'bi-people-fill' },
        { name: 'Resolución de Problemas', icon: 'bi-lightbulb' },
        { name: 'Empatía', icon: 'bi-heart' },
        { name: 'Organización', icon: 'bi-kanban' },
        { name: 'Adaptabilidad', icon: 'bi-arrow-repeat' },
        { name: 'Atención al Cliente', icon: 'bi-headset' },
        { name: 'Trabajo Bajo Presión', icon: 'bi-speedometer2' },
    ],

    education: [
        {
            date: 'Abril 2024 - Junio 2026',
            title: 'Tecnólogo en Análisis y Desarrollo de Software',
            institution: 'SENA - Centro de Atención Sector Agropecuario, Pereira Risaralda',
            description: 'Conocimientos en desarrollo web y backend con JavaScript, PHP, Python, Laravel, React y FastAPI; manejo de bases de datos SQL; control de versiones con Git y GitHub; diseño y maquetación con HTML, CSS y Bootstrap; despliegue y administración básica de servidores (incluyendo Microsoft Azure); programación básica en Arduino IDE; manejo de Linux y Windows y herramientas de ofimática.',
        },
        {
            date: 'Junio 2022 - Diciembre 2024',
            title: 'Técnico Laboral en Mantenimiento de Sistemas',
            institution: 'Instituto Comfamiliar Risaralda, Pereira Risaralda',
            description: 'Aprendizaje en mantenimiento preventivo y correctivo de equipos informáticos, instalación de software, diagnóstico y solución de problemas técnicos básicos. Capacitación en herramientas ofimáticas y sistemas operativos.',
        },
        {
            date: 'Febrero 2016 - Diciembre 2021',
            title: 'Bachiller',
            institution: 'Instituto Santuario, Santuario Risaralda',
            description: 'Formación académica secundaria completa.',
        },
    ],

    certificates: [
        {
            name: 'Ensamble y Mantenimiento de Computadores',
            issuer: 'Desarrollo de habilidades en ensamblaje, configuración y reparación de hardware, instalación de sistemas operativos y optimización de equipos.',
        },
        {
            name: 'Técnico Laboral en Sistemas',
            issuer: 'Instituto Comfamiliar Risaralda',
            date: '2022 - 2024',
        },
        {
            name: 'Tecnólogo ADSO',
            issuer: 'SENA',
            date: '2024 - 2026',
        },
    ],
};