const PORTFOLIO = {
    // ---- Configuración EmailJS ----
    // Cambia estos valores por los de la cuenta de Luisa
    emailjs: {
        publicKey: 'TU_PUBLIC_KEY_AQUI',
        serviceId: 'TU_SERVICE_ID_AQUI',
        templateId: 'TU_TEMPLATE_ID_AQUI',
    },

    // ---- Info personal ----
    owner: {
        name: 'Luisa Fernanda Sánchez Suarez',
        shortName: 'Luisa Sánchez',
        title: 'Tecnóloga en Análisis y Desarrollo de Software & Auxiliar Administrativa',
        email: 'fers86113@gmail.com',
        phoneFormatted: '+57 320 570 3024',
        whatsapp: 'https://wa.me/573205703024?text=%C2%A1Hola!%20Vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conocer%20más%20sobre%20tus%20servicios.',
        location: 'Pereira, Risaralda, Colombia',
        github: 'https://github.com/Luisa-039',
        photo: 'images/perfil.jpg',
    },

    socialLinks: [
        { url: 'https://github.com/Luisa-039', icon: 'bi-github', label: 'GitHub' },
        { url: 'mailto:fers86113@gmail.com', icon: 'bi-envelope', label: 'Email' },
        { url: 'https://wa.me/573205703024?text=%C2%A1Hola!%20Vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conocer%20más%20sobre%20tus%20servicios.', icon: 'bi-whatsapp', label: 'WhatsApp' },
    ],

    // ---- Experiencia ----
    experience: [
        {
            date: '2025',
            title: 'Asistente Ejecutiva (Remoto)',
            company: 'First Class Business',
            tasks: [
                'Atención y soporte a clientes de manera virtual.',
                'Gestión de agenda, correos electrónicos y coordinación de reuniones.',
                'Organización y manejo de documentación administrativa digital.',
                'Apoyo en campañas mediante actualización y gestión de bases de datos en Excel.',
                'Asistencia administrativa general.',
            ],
        },
        {
            date: '2023 - 2024',
            title: 'Auxiliar Administrativo en Salud / Auxiliar de Enfermería',
            company: 'Gastroeje, Pereira',
            tasks: [
                'Admisión de pacientes para procedimientos médicos.',
                'Gestión y seguimiento de autorizaciones de procedimientos.',
                'Diligenciamiento de formatos clínicos.',
                'Recaudo de copagos y orientación a pacientes y acompañantes.',
                'Agendamiento de citas médicas vía telefónica y WhatsApp.',
                'Preparación y canalización de pacientes para procedimientos médicos.',
                'Rotulación y registro de muestras de biopsia y apoyo en recuperación post anestesia.',
            ],
        },
        {
            date: '2023',
            title: 'Auxiliar de Enfermería',
            company: 'Hemocentro del Otún, Pereira',
            tasks: [
                'Promoción y captación de donantes de sangre.',
                'Aplicación de cuestionarios de valoración para verificar aptitud del donante.',
                'Realización de flebotomía y acompañamiento al donante durante el proceso.',
                'Atención y orientación a usuarios durante las jornadas de donación.',
            ],
        },
        {
            date: '2019 - 2020',
            title: 'Pasante Administrativa',
            company: 'American School Way, Pereira',
            tasks: [
                'Inducción y orientación a estudiantes nuevos sobre procesos académicos y administrativos.',
                'Gestión de PQRS y atención a solicitudes de estudiantes.',
                'Manejo y organización de matrículas y documentación estudiantil.',
                'Envío y seguimiento de documentos administrativos a sede principal.',
                'Recaudo de pagos en efectivo y consignaciones bancarias.',
                'Apoyo general a procesos administrativos y atención al cliente.',
            ],
        },
    ],

    // ---- Proyectos ----
    projects: {
        portafolio: {
            title: 'Portafolio Web Personal',
            subtitle: 'Sitio web personal responsive con modo oscuro/claro y diseño moderno.',
            brief: 'Portafolio profesional para mostrar experiencia administrativa y proyectos de software.',
            date: '2025',
            role: 'Desarrolladora Frontend',
            duration: '1 mes',
            category: 'web',
            github: 'https://github.com/Luisa-039', // si tienes repo específico cámbialo
            demo: '#hero',
            mainImage: 'images/portafolio.jpg',
            gallery: [
                'images/portafolio.jpg',
            ],
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
            tools: ['VS Code', 'Git', 'Figma'],
            tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
            stats: [
                { label: 'Secciones', value: 'Inicio, Sobre mí, Experiencia, Proyectos, Habilidades, Educación, Contacto' },
                { label: 'Responsive', value: 'Sí, adaptable a móvil, tablet y escritorio' },
            ],
            description: `
        <p>Este portafolio web fue creado para presentar mi perfil profesional combinando mi experiencia administrativa
        y en el sector salud, con mi formación en desarrollo de software. Está diseñado para ser claro, moderno y fácil de navegar.</p>
        <h4 class="mt-4 mb-3">Características Principales</h4>
        <ul class="project-features-list">
          <li><i class="bi bi-check-circle-fill me-2"></i>Modo oscuro/claro con persistencia en el navegador.</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Secciones organizadas para experiencia, educación y habilidades.</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Integración con GitHub para mostrar repositorios.</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Formulario de contacto con validación básica.</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Animaciones suaves en scroll y estadísticas animadas.</li>
        </ul>
        <h4 class="mt-4 mb-3">Desafíos y Soluciones</h4>
        <p>El principal reto fue organizar de forma clara información de dos áreas distintas (administración y salud)
        junto con el desarrollo de software. Se solucionó creando una estructura de secciones muy visual y fácil de leer.</p>
        <h4 class="mt-4 mb-3">Resultados</h4>
        <p>El resultado es un portafolio profesional que puedo compartir con empresas para mostrar rápidamente
        mi experiencia, habilidades y proyectos en un solo lugar.</p>
      `,
            team: [
                {
                    name: 'Luisa Fernanda Sánchez Suarez',
                    role: 'Desarrolladora',
                    contribution: 'Diseño, maquetación y desarrollo completo del sitio',
                    photo: 'images/perfil.jpg',
                    github: 'https://github.com/Luisa-039',
                    email: 'fers86113@gmail.com',
                    whatsapp: '"https://wa.me/573205703024?text=%C2%A1Hola!%20Vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conocer%20más%20sobre%20tus%20servicios."',
                },
            ],
            extraLinks: [],
            demoAccess: [],
        },

        gestion: {
            title: 'Sistema de Gestión Administrativa',
            subtitle: 'Aplicación web para gestión documental, agenda y control de procesos administrativos.',
            brief: 'Proyecto orientado a optimizar procesos administrativos y organizar información.',
            date: '2025',
            role: 'Desarrolladora',
            duration: '2 meses',
            category: 'web',
            github: '#', // pon aquí el repo si lo tienes
            demo: '#projects',
            mainImage: 'images/gestion.jpg',
            gallery: [
                'images/gestion.jpg',
            ],
            tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
            tools: ['VS Code', 'Git', 'Postman'],
            tags: ['Laravel', 'PHP', 'MySQL'],
            stats: [
                { label: 'Módulos', value: 'Gestión documental, agenda, procesos' },
                { label: 'Base de datos', value: 'MySQL' },
            ],
            description: `
        <p>Este sistema de gestión administrativa fue pensado para centralizar la documentación,
        las agendas y los procesos internos de una organización, facilitando el trabajo del área administrativa.</p>
        <h4 class="mt-4 mb-3">Características Principales</h4>
        <ul class="project-features-list">
          <li><i class="bi bi-check-circle-fill me-2"></i>Gestión de documentos y archivos.</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Control de tareas y procesos internos.</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Uso de Laravel, PHP y MySQL.</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Interfaz basada en Bootstrap.</li>
        </ul>
        <h4 class="mt-4 mb-3">Desafíos y Soluciones</h4>
        <p>Uno de los retos fue diseñar una estructura de datos flexible que permitiera registrar diferentes
        tipos de documentos y procesos. Se solucionó con un modelo relacional bien normalizado en MySQL.</p>
        <h4 class="mt-4 mb-3">Resultados</h4>
        <p>El sistema permite tener mayor control sobre la información y mejorar la trazabilidad de las actividades administrativas.</p>
      `,
            team: [
                {
                    name: 'Luisa Fernanda Sánchez Suarez',
                    role: 'Desarrolladora',
                    contribution: 'Análisis de requerimientos, diseño de base de datos y desarrollo.',
                    photo: 'images/perfil.jpg',
                    github: 'https://github.com/Luisa-039',
                    email: 'fers86113@gmail.com',
                },
            ],
            extraLinks: [],
            demoAccess: [],
        },
    },

    // Orden de las cards en la sección proyectos
    projectCards: ['portafolio', 'gestion'],

    // ---- Habilidades ----
    skills: [
        {
            category: 'Gestión Administrativa',
            icon: 'bi-clipboard2-data',
            items: [
                { name: 'Gestión Administrativa', icon: 'bi-folder2-open', pct: 90 },
                { name: 'Archivo y Control Documental', icon: 'bi-archive', pct: 85 },
                { name: 'Atención al Cliente', icon: 'bi-headset', pct: 90 },
                { name: 'Atención Telefónica y WhatsApp', icon: 'bi-whatsapp', pct: 90 },
                { name: 'Gestión de Bases de Datos (Excel)', icon: 'bi-table', pct: 80 },
                { name: 'Organización Documental', icon: 'bi-files', pct: 85 },
            ],
        },
        {
            category: 'Desarrollo de Software',
            icon: 'bi-code-square',
            items: [
                { name: 'HTML5 & CSS3', icon: 'bi-filetype-html', pct: 70 },
                { name: 'JavaScript', icon: 'bi-filetype-js', pct: 55 },
                { name: 'PHP & Laravel', icon: 'bi-filetype-php', pct: 50 },
                { name: 'Python', icon: 'bi-filetype-py', pct: 45 },
                { name: 'Bootstrap', icon: 'bi-bootstrap', pct: 65 },
                { name: 'Bases de Datos SQL', icon: 'bi-database', pct: 55 },
                { name: 'Git & GitHub', icon: 'bi-git', pct: 55 },
                { name: 'React', icon: 'bi-code-slash', pct: 45 },
            ],
        },
    ],

    softSkills: [
        { name: 'Comunicación', icon: 'bi-chat-dots' },
        { name: 'Trabajo en Equipo', icon: 'bi-people-fill' },
        { name: 'Organización', icon: 'bi-kanban' },
        { name: 'Responsabilidad', icon: 'bi-shield-check' },
        { name: 'Empatía', icon: 'bi-heart' },
        { name: 'Orientación al Servicio', icon: 'bi-headset' },
        { name: 'Adaptabilidad', icon: 'bi-arrow-repeat' },
        { name: 'Gestión del Tiempo', icon: 'bi-clock-history' },
    ],

    // ---- Educación ----
    education: [
        {
            date: '2024 - En curso',
            title: 'Tecnóloga en Análisis y Desarrollo de Software',
            institution: 'SENA, Pereira Risaralda',
            description:
                'Formación en desarrollo web, bases de datos, análisis de requisitos, control de versiones y metodologías de desarrollo de software.',
        },
        {
            date: '2021 - 2022',
            title: 'Técnica Auxiliar en Enfermería',
            institution: 'INEC, Pereira Risaralda',
            description:
                'Formación en atención y cuidado de pacientes, procedimientos clínicos básicos, flebotomía y asistencia en entornos hospitalarios.',
        },
        {
            date: '2019 - 2020',
            title: 'Técnica en Comercio Exterior',
            institution: 'SENA, Pereira Risaralda',
            description:
                'Formación en procesos de importación/exportación, gestión documental de comercio exterior y procedimientos aduaneros.',
        },
    ],

    // ---- Certificados ----
    certificates: [
        {
            name: 'Tecnóloga ADSO',
            issuer: 'SENA',
            date: '2024 - En curso',
        },
        {
            name: 'Técnica Auxiliar en Enfermería',
            issuer: 'INEC',
            date: '2021 - 2022',
        },
        {
            name: 'Técnica en Comercio Exterior',
            issuer: 'SENA',
            date: '2019 - 2020',
        },
    ],
};