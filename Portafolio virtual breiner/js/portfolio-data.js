/* ============================================================================
   PORTFOLIO-DATA.JS — Todo el contenido del sitio se edita AQUÍ.

   PENDIENTES (búscalos como "PENDIENTE"):
     1. Duración de Anime Trivia y de El Hipster Barato  -> abajo, en `projects`
     2. Añadir LinkedIn                                  -> `socialLinks`
     3. Reemplazar SITE_URL en index.html                -> etiquetas Open Graph
     4. Poner descripción a los repos en GitHub          -> se hace desde GitHub
   ============================================================================ */

const PORTFOLIO = {
    // ---- Configuración EmailJS (ya configurado) ----
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
        // Un solo lugar para el WhatsApp: antes el número estaba escrito a mano en
        // main.js y en socialLinks, y ambos apuntaban a un número que no es el tuyo.
        whatsapp: 'https://wa.me/573206554202?text=%C2%A1Hola!%20Vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20tus%20servicios.',
        // PENDIENTE: LinkedIn. Es el canal donde te van a buscar los reclutadores;
        // cuando tengas el perfil, añádelo también a socialLinks (abajo).
        // linkedin: 'https://www.linkedin.com/in/tu-usuario',
        photo: 'images/perfil.jpg',
    },

    socialLinks: [
        { url: 'https://github.com/Breiner1412', icon: 'bi-github', label: 'GitHub' },
        { url: 'mailto:rodriguezbreiner125@gmail.com', icon: 'bi-envelope', label: 'Email' },
        // Corregido: antes apuntaba a 573205703024, que no es tu número.
        { url: 'https://wa.me/573206554202?text=%C2%A1Hola!%20Vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20tus%20servicios.', icon: 'bi-whatsapp', label: 'WhatsApp' },
        // PENDIENTE: descomentar cuando tengas el perfil de LinkedIn.
        // { url: 'https://www.linkedin.com/in/tu-usuario', icon: 'bi-linkedin', label: 'LinkedIn' },
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

    // Proyectos publicados. Para añadir uno nuevo: copia la plantilla comentada
    // al final de este bloque, cámbiale el id, llénala y agrega el id a
    // `projectCards` (más abajo) — si no está en esa lista, no se muestra.
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
            mainImage: 'images/projects/gestion/portada.jpg',
            gallery: [
                'images/projects/gestion/dashboard.jpg',
                'images/projects/gestion/registros.jpg',
                'images/projects/gestion/en-sitio.jpg',
                'images/projects/gestion/importar.jpg',
                'images/projects/gestion/movil.jpg',
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
                    email: 'rodriguezbreiner125@gmail.com',
                    whatsapp: 'https://wa.me/573206554202?text=%C2%A1Hola!%20Vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20tus%20servicios.'
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

        anime_trivia: {
            title: 'Anime Trivia',
            subtitle: 'Juego de trivia con preguntas generadas por IA, modo supervivencia y ranking por categoría.',
            brief: 'Trivia contra reloj con 3 vidas, dificultad creciente, ranking y preguntas generadas con Gemini.',
            date: 'Agosto 2026',
            role: 'Fullstack Developer',
            duration: '',                      // PENDIENTE: cuánto te tomó (ej: '1 mes')
            category: 'web',
            github: 'https://github.com/Breiner1412/Pregunta2',
            demo: 'https://trivia-h7a2.onrender.com',
            mainImage: 'images/projects/anime-trivia/portada.jpg',
            gallery: [
                'images/projects/anime-trivia/categorias.jpg',
                'images/projects/anime-trivia/pregunta.jpg',
                'images/projects/anime-trivia/respuesta.jpg',
                'images/projects/anime-trivia/movil.jpg',
            ],
            tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Gemini API'],
            tools: ['VS Code', 'Git', 'Render'],
            tags: ['Next.js', 'TypeScript', 'Supabase', 'IA'],
            stats: [
                { label: 'Modo de juego', value: 'Supervivencia: 3 vidas, 15 s por pregunta' },
                { label: 'Categorías', value: '8 temas + modo mezclado' },
                { label: 'Preguntas', value: 'Generadas con IA desde el panel admin' },
            ],
            description: `
        <p>Anime Trivia es un juego de preguntas que empezó como una trivia de anime y creció a ocho
        categorías: cultura general, ciencia, deportes, música, anime y manga, películas, cómics y series,
        más un modo mezclado. El banco de preguntas no se escribe a mano: desde el panel de administración
        se generan preguntas nuevas con la API de Gemini, así que el juego no se queda sin contenido.</p>
        <h4 class="mt-4 mb-3">Cómo se juega</h4>
        <p>Eliges una categoría y respondes contra reloj: 15 segundos por pregunta y 3 vidas. La partida
        no tiene un número fijo de preguntas, sigue hasta que fallas tres veces, y la dificultad sube a medida
        que avanzas. Al responder, la app marca en verde la opción correcta y descuenta una vida si te
        equivocas. Si inicias sesión, tu puntaje entra al ranking de esa categoría.</p>
        <h4 class="mt-4 mb-3">Características Principales</h4>
        <ul class="project-features-list">
          <li><i class="bi bi-check-circle-fill me-2"></i>Modo supervivencia con temporizador y sistema de vidas</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Dificultad progresiva durante la partida</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Ranking de jugadores por categoría</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Registro e inicio de sesión con Supabase Auth</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Panel de administración que genera preguntas con IA (Gemini)</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Diseño responsive, pensado para jugar desde el celular</li>
        </ul>
        <h4 class="mt-4 mb-3">Desafíos y Soluciones</h4>
        <p>El reto principal fue que las preguntas generadas por IA llegaran con un formato confiable:
        cuatro opciones, una sola correcta y un nivel de dificultad asignado, para poder guardarlas
        directamente en la base de datos y servirlas en orden de dificultad durante la partida.</p>
        <h4 class="mt-4 mb-3">Resultados</h4>
        <p>Un juego completo y desplegado, con banco de preguntas que se amplía desde el panel sin tocar
        código, y ranking persistente en Supabase.</p>
      `,
            team: [
                {
                    name: 'Breiner Stiven Guisao Rodriguez',
                    role: 'Fullstack Developer',
                    contribution: 'Diseño, desarrollo, integración con Supabase y con la API de Gemini, y despliegue',
                    photo: 'images/perfil.jpg',
                    github: 'https://github.com/Breiner1412',
                    email: 'rodriguezbreiner125@gmail.com',
                },
            ],
            extraLinks: [
                { url: 'https://trivia-h7a2.onrender.com', label: 'Jugar ahora', icon: 'bi bi-controller' },
            ],
            demoAccess: [],
        },

        hipster_barato: {
            title: 'El Hipster Barato — Sitio y Boletería (demo)',
            subtitle: 'Proyecto demostrativo: sitio y sistema de venta de boletas para un comediante de stand-up.',
            brief: 'Demo funcional de un sitio de comediante con venta de boletas, pagos en línea y panel de administración.',
            date: '2026',                      // PENDIENTE: mes en que lo terminaste
            role: 'Fullstack Developer',
            duration: '',                      // PENDIENTE
            category: 'web',
            github: '',                        // Código privado
            demo: 'https://hispster-barato-plum.vercel.app',
            mainImage: 'images/projects/hipster-barato/portada.jpg',
            gallery: [
                'images/projects/hipster-barato/eventos.jpg',
                'images/projects/hipster-barato/bio.jpg',
                'images/projects/hipster-barato/movil.jpg',
            ],
            tech: ['Next.js 14', 'Supabase', 'Wompi', 'Brevo'],
            tools: ['VS Code', 'Git', 'Vercel'],
            tags: ['Next.js', 'Supabase', 'Pagos'],
            stats: [
                { label: 'Tipo', value: 'Demo funcional, no está en operación' },
                { label: 'Nombre artístico', value: 'Usado con autorización de Sebastián Rincón' },
            ],
            description: `
        <p class="alert alert-secondary"><i class="bi bi-info-circle me-2"></i><strong>Proyecto de
        demostración.</strong> Este sitio no está en uso oficial ni vende boletas de verdad: es una
        versión funcional que desarrollé por mi cuenta. El comediante Sebastián Rincón autorizó el uso
        de su nombre artístico para mostrarlo aquí.</p>
        <p>El Hipster Barato es el nombre artístico del comediante de stand-up Sebastián Rincón. La idea
        del proyecto fue resolver algo concreto: que un artista pueda tener su propia boletería —publicar
        sus shows, vender las entradas y entregar la boleta al comprador— sin depender de plataformas de
        terceros ni de sus comisiones.</p>
        <h4 class="mt-4 mb-3">Cómo funciona</h4>
        <p>El visitante entra a <em>Eventos</em>, ve los shows con ciudad, fecha, lugar y precio, y compra
        su boleta. El pago se procesa con Wompi; cuando se confirma, el sistema genera la boleta en PDF y
        se la envía por correo mediante Brevo. Desde el panel de administración se crean y editan los
        eventos, y los shows que ya pasaron quedan marcados como finalizados.</p>
        <h4 class="mt-4 mb-3">Características Principales</h4>
        <ul class="project-features-list">
          <li><i class="bi bi-check-circle-fill me-2"></i>Catálogo de eventos con estado (disponible / finalizado)</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Compra de boletas con pasarela de pagos Wompi</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Generación de la boleta en PDF</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Envío automático de la boleta por correo con Brevo</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Panel de administración para gestionar eventos</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Diseño responsive con la identidad visual del artista</li>
        </ul>
        <h4 class="mt-4 mb-3">Desafíos y Soluciones</h4>
        <p>Lo delicado fue encadenar el flujo de compra: la boleta solo debe generarse y enviarse cuando
        la pasarela confirma el pago, no cuando el usuario vuelve a la página. Para eso el sistema escucha
        la confirmación de Wompi del lado del servidor antes de emitir el PDF y el correo.</p>
        <h4 class="mt-4 mb-3">Resultados</h4>
        <p>Una boletería completa y funcional de punta a punta: catálogo, pago, emisión de la boleta y
        administración de la cartelera, lista para ponerse en operación el día que se decida usarla.</p>
      `,
            team: [
                {
                    name: 'Breiner Stiven Guisao Rodriguez',
                    role: 'Fullstack Developer',
                    contribution: 'Desarrollo completo: sitio, boletería, pagos, correos y panel de administración',
                    photo: 'images/perfil.jpg',
                    github: 'https://github.com/Breiner1412',
                    email: 'rodriguezbreiner125@gmail.com',
                },
            ],
            extraLinks: [
                { url: 'https://hispster-barato-plum.vercel.app', label: 'Ver la demo', icon: 'bi bi-box-arrow-up-right' },
            ],
            demoAccess: [],
        },
    },

    /* PLANTILLA para próximos proyectos — copia este bloque dentro de `projects`,
       cámbiale el id y descoméntalo. Después añade el id a projectCards.

        nuevo_proyecto: {
            title: 'Nombre del proyecto',
            subtitle: 'Una línea: qué es y para quién.',
            brief: 'Frase corta que sale en la tarjeta de la portada.',
            date: '',                          // ej: 'Agosto 2026'
            role: 'Fullstack Developer',
            duration: '',                      // ej: '2 meses'
            category: 'web',
            github: '',                        // URL del repo (déjalo vacío si es privado)
            demo: '',                          // URL del sitio desplegado
            mainImage: 'images/projects/<carpeta>/portada.jpg',
            gallery: [],                       // 3 o 4 capturas más
            tech:  [],                         // tecnologías: lenguajes, frameworks, servicios
            tools: ['VS Code', 'Git'],
            tags:  [],                         // 3 o 4 etiquetas para la tarjeta
            stats: [
                { label: 'Etiqueta', value: 'Dato corto que impresione' },
            ],
            description: `
              <p>Qué problema resuelve o de dónde salió la idea.</p>
              <h4 class="mt-4 mb-3">Características Principales</h4>
              <ul class="project-features-list">
                <li><i class="bi bi-check-circle-fill me-2"></i>Función principal</li>
                <li><i class="bi bi-check-circle-fill me-2"></i>Otra función</li>
              </ul>
              <h4 class="mt-4 mb-3">Desafíos y Soluciones</h4>
              <p>Qué fue lo difícil y cómo lo resolviste. Esta es la parte que más
                 le interesa a quien contrata.</p>
              <h4 class="mt-4 mb-3">Resultados</h4>
              <p>Qué quedó funcionando.</p>
            `,
            team: [
                {
                    name: 'Breiner Stiven Guisao Rodriguez',
                    role: 'Fullstack Developer',
                    contribution: 'Qué hiciste tú en el proyecto',
                    photo: 'images/perfil.jpg',
                    github: 'https://github.com/Breiner1412',
                    email: 'rodriguezbreiner125@gmail.com',
                },
            ],
            extraLinks: [],
            demoAccess: [],
        },

    */

    // Ids de `projects` que se muestran como tarjetas, en este orden.
    projectCards: ['anime_trivia', 'hipster_barato', 'registro'],

    // 'level' se muestra como texto: Sólido / En práctica / Explorando.
    // Es más creíble que un porcentaje autoasignado — "Azure 45%" comunicaba un
    // techo, no una capacidad, y nadie puede verificarlo.
    skills: [
        {
            category: 'Lenguajes de Programación',
            icon: 'bi-code-square',
            items: [
                { name: 'JavaScript', icon: 'bi-filetype-js', level: 'En práctica' },
                { name: 'PHP', icon: 'bi-filetype-php', level: 'En práctica' },
                { name: 'Python', icon: 'bi-filetype-py', level: 'En práctica' },
                { name: 'HTML5 & CSS3', icon: 'bi-filetype-html', level: 'Sólido' },
            ],
        },
        {
            category: 'Frameworks y Librerías',
            icon: 'bi-layers',
            items: [
                { name: 'Laravel', icon: 'bi-braces', level: 'En práctica' },
                { name: 'React', icon: 'bi-code-slash', level: 'En práctica' },
                { name: 'FastAPI', icon: 'bi-lightning-charge', level: 'En práctica' },
                { name: 'Bootstrap', icon: 'bi-bootstrap', level: 'Sólido' },
            ],
        },
        {
            category: 'Herramientas y Tecnologías',
            icon: 'bi-tools',
            items: [
                { name: 'Git & GitHub', icon: 'bi-git', level: 'Sólido' },
                { name: 'Bases de Datos SQL', icon: 'bi-database', level: 'Sólido' },
                { name: 'Microsoft Azure (Básico)', icon: 'bi-cloud', level: 'Explorando' },
                { name: 'Arduino IDE', icon: 'bi-cpu', level: 'Explorando' },
                { name: 'Windows & Linux', icon: 'bi-windows', level: 'Sólido' },
                { name: 'Herramientas Ofimáticas', icon: 'bi-file-earmark-spreadsheet', level: 'Sólido' },
            ],
        },
        {
            category: 'Mantenimiento y Hardware',
            icon: 'bi-cpu',
            items: [
                { name: 'Ensamblaje y Mantenimiento de PCs', icon: 'bi-pc-display', level: 'Sólido' },
                { name: 'Redes y Configuración de Equipos', icon: 'bi-hdd-network', level: 'Sólido' },
                { name: 'Diagnóstico de Problemas Técnicos', icon: 'bi-wrench', level: 'Sólido' },
                { name: 'Instalación de Software y SO', icon: 'bi-download', level: 'Sólido' },
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