/* ============================================
   PORTFOLIO-DATA.JS — INSATECH NEO
   Todo el contenido del sitio se edita AQUÍ. No hace falta tocar el HTML.
   ============================================ */

const PORTFOLIO = {
    // ---- Configuración EmailJS ----------------------------------------------
    // PENDIENTE: mientras estos valores sean 'TU_..._AQUI', el formulario de
    // contacto NO envía nada — le dice al visitante que escriba por email.
    // Es la única vía de conversión del sitio, así que conviene configurarlo:
    // 1) Crear cuenta gratis en https://www.emailjs.com
    // 2) Añadir un servicio de correo (Gmail sirve) -> copiar el Service ID
    // 3) Crear una plantilla con las variables {{from_name}}, {{from_email}},
    //    {{subject}} y {{message}} -> copiar el Template ID
    // 4) Copiar la Public Key desde Account > General
    emailjs: {
        publicKey: 'TU_PUBLIC_KEY_AQUI',
        serviceId: 'TU_SERVICE_ID_AQUI',
        templateId: 'TU_TEMPLATE_ID_AQUI',
    },

    // ---- Info de la empresa --------------------------------------------------
    company: {
        name: 'INSATECH NEO',
        brandHTML: 'INSATECH <span class="brand-accent">NEO</span>',
        tagline: 'Desarrollo de Software & Soluciones Tecnológicas',
        email: 'insatechneo@gmail.com',
        location: 'Pereira, Risaralda, Colombia',
        // logo.png tiene fondo transparente; logo.jpeg trae un cuadro oscuro incrustado
        // que en la navbar se veía como un parche. Para el navbar/footer siempre el PNG.
        logo: 'images/logo.png',
        logoAlt: 'images/logo-neo.jpeg',   // versión con el texto "INSATECH NEO" debajo
    },

    socialLinks: [
        { url: 'https://github.com/insatechneo-code', icon: 'bi-github', label: 'GitHub' },
        { url: 'mailto:insatechneo@gmail.com', icon: 'bi-envelope', label: 'Email' },
        // PENDIENTE: la página de empresa en LinkedIn está comentada porque no pudimos
        // confirmar que exista. Un ícono social que lleva a un 404 en la home de una
        // empresa da peor impresión que no tener el ícono. Descoméntalo cuando la crees.
        // { url: 'https://linkedin.com/company/insatech-neo', icon: 'bi-linkedin', label: 'LinkedIn' },
    ],

    // ---- Cifras de la sección "Quiénes somos" -------------------------------
    // Solo números verificables. Si una cifra no se puede sostener frente a un
    // cliente que pregunte "¿cuáles?", es mejor no ponerla.
    aboutStats: [
        { count: 2, label: 'Desarrolladores<br>en el equipo' },
        { count: 2, label: 'Tecnólogos<br>ADSO (SENA)' },
        { count: 8, label: 'Tecnologías<br>en el stack' },
    ],

    // ---- Servicios principales ----------------------------------------------
    // Enfocados en desarrollo de software: es lo que define a la empresa.
    services: [
        {
            icon: 'bi-globe2',
            title: 'Sitios y aplicaciones web a medida',
            description: 'Diseñamos y construimos el sitio completo: landing pages, portafolios, catálogos y aplicaciones web responsive. Entregamos el código, el despliegue y la documentación para que puedas mantenerlo.',
            tags: ['HTML/CSS', 'JavaScript', 'React', 'Bootstrap'],
        },
        {
            icon: 'bi-kanban',
            title: 'Sistemas de gestión interna',
            description: 'Software para reemplazar los Excel compartidos: control de inventarios, registro de usuarios, agendamiento, reportes y permisos por rol. Pensado para equipos pequeños que necesitan trazabilidad.',
            tags: ['Laravel', 'PHP', 'MySQL', 'Roles y permisos'],
        },
        {
            icon: 'bi-database-gear',
            title: 'APIs y bases de datos',
            description: 'Diseño de modelo de datos, APIs REST documentadas e integración con servicios externos. Si ya tienes un sistema, conectamos lo nuevo con lo que ya funciona.',
            tags: ['Python', 'FastAPI', 'SQL', 'REST'],
        },
        {
            icon: 'bi-cloud-arrow-up',
            title: 'Despliegue y mantenimiento',
            description: 'Publicamos el proyecto en producción, configuramos el dominio y los respaldos, y dejamos el repositorio con control de versiones para que cualquier cambio quede registrado.',
            tags: ['Git & GitHub', 'Azure', 'Firebase', 'Dominios'],
        },
    ],

    // ---- Servicios complementarios ------------------------------------------
    // Se muestran en un bloque secundario y más compacto: son reales y suman,
    // pero no deben competir con la oferta de software en la primera lectura.
    secondaryServices: [
        {
            icon: 'bi-pc-display',
            title: 'Soporte técnico y hardware',
            description: 'Mantenimiento preventivo y correctivo de equipos, configuración de redes y diagnóstico de fallas.',
        },
        {
            icon: 'bi-clipboard2-data',
            title: 'Digitalización de procesos',
            description: 'Organización documental, migración de datos a sistemas y automatización de tareas administrativas repetitivas.',
        },
        {
            icon: 'bi-headset',
            title: 'Acompañamiento y capacitación',
            description: 'Entrenamiento al equipo del cliente para que use el sistema entregado, con soporte durante la puesta en marcha.',
        },
    ],

    // ---- Equipo --------------------------------------------------------------
    // La experiencia listada aquí es la RELEVANTE para lo que vende la empresa.
    // El recorrido completo de cada uno vive en su portafolio personal (enlazado
    // al final de cada tarjeta), que es donde tiene sentido contarlo entero.
    team: [
        {
            name: 'Breiner Stiven Guisao Rodriguez',
            role: 'Co-Fundador · Desarrollador Full Stack',
            photo: 'images/breiner.jpg',
            social: [
                { url: 'https://github.com/Breiner1412', icon: 'bi-github', label: 'GitHub de Breiner' },
                { url: 'mailto:rodriguezbreiner125@gmail.com', icon: 'bi-envelope', label: 'Email de Breiner' },
                { url: 'https://wa.me/573206554202?text=%C2%A1Hola!%20Vi%20el%20portafolio%20de%20INSATECH%20NEO%20y%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios.', icon: 'bi-whatsapp', label: 'WhatsApp de Breiner' },
            ],
            profile: 'Tecnólogo en Análisis y Desarrollo de Software (SENA). Desarrolla el frontend y el backend de los proyectos: JavaScript, PHP con Laravel, Python con FastAPI, bases de datos SQL y despliegue con Git. Su base como técnico en mantenimiento de sistemas le da criterio para resolver también la parte de infraestructura.',
            focus: ['Full Stack', 'Laravel', 'JavaScript', 'Bases de datos', 'Despliegue'],
            experience: [
                { date: 'Dic 2025 - Jun 2026', title: 'Técnico de Soporte — TuCable SAS', desc: 'Diagnóstico y resolución de incidentes en servicios de internet y TV, configuración de equipos de red y validación del servicio en usuario final.' },
                { date: 'Jul 2023 - Ene 2024', title: 'Auxiliar de Soporte Técnico — Comfamiliar Risaralda', desc: 'Mantenimiento preventivo y correctivo, ensamblaje de hardware y gestión de inventarios tecnológicos.' },
            ],
            education: [
                { title: 'Tecnólogo en Análisis y Desarrollo de Software', institution: 'SENA — 2024 - 2026' },
                { title: 'Técnico Laboral en Mantenimiento de Sistemas', institution: 'Instituto Comfamiliar Risaralda — 2022 - 2024' },
            ],
            portfolioUrl: 'https://portafolio-breiner-guisao.onrender.com',
        },
        {
            name: 'Luisa Fernanda Sánchez',
            role: 'Co-Fundadora · Desarrolladora y Gestión de Proyectos',
            photo: 'images/luisa.jpg',
            social: [
                { url: 'https://github.com/Luisa-039', icon: 'bi-github', label: 'GitHub de Luisa' },
                { url: 'mailto:fers86113@gmail.com', icon: 'bi-envelope', label: 'Email de Luisa' },
                { url: 'https://wa.me/573205703024?text=%C2%A1Hola!%20Vi%20el%20portafolio%20de%20INSATECH%20NEO%20y%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios.', icon: 'bi-whatsapp', label: 'WhatsApp de Luisa' },
            ],
            profile: 'Tecnóloga en Análisis y Desarrollo de Software (SENA) con trayectoria previa en gestión administrativa y atención al cliente. Se encarga del levantamiento de requerimientos, la relación con el cliente y el seguimiento de las entregas, además del desarrollo frontend. Sabe cómo funciona por dentro un área administrativa, que es justo lo que el software de gestión tiene que resolver.',
            focus: ['Requerimientos', 'Frontend', 'Gestión documental', 'Relación con cliente'],
            experience: [
                { date: '2025', title: 'Asistente Ejecutiva (remoto) — First Class Business', desc: 'Atención a clientes, coordinación de agendas y manejo de bases de datos: el tipo de proceso que hoy ayuda a digitalizar.' },
                { date: '2023 - 2024', title: 'Auxiliar Administrativa — Gastroeje', desc: 'Admisión de usuarios, gestión de autorizaciones y agendamiento: experiencia directa en flujos que se automatizan con software de gestión.' },
            ],
            education: [
                { title: 'Tecnóloga en Análisis y Desarrollo de Software', institution: 'SENA — 2024 - En curso' },
            ],
            // PENDIENTE: confirmar la URL del portafolio de Luisa antes de publicar.
            portfolioUrl: 'https://portafolio-luisa-sanchez.onrender.com',
        },
    ],

    // ---- Stack tecnológico ---------------------------------------------------
    // 'level' se muestra como texto ("Sólido", "En práctica", "Explorando").
    // Es más creíble que un porcentaje autoasignado, que nadie puede verificar
    // y que sobre todo comunica el techo ("Azure 45%" resta más de lo que suma).
    skills: [
        {
            category: 'Desarrollo Web & Backend',
            icon: 'bi-code-square',
            items: [
                { name: 'HTML5 & CSS3', icon: 'bi-filetype-html', level: 'Sólido' },
                { name: 'JavaScript', icon: 'bi-filetype-js', level: 'Sólido' },
                { name: 'PHP & Laravel', icon: 'bi-filetype-php', level: 'En práctica' },
                { name: 'Python & FastAPI', icon: 'bi-filetype-py', level: 'En práctica' },
                { name: 'React & Bootstrap', icon: 'bi-bootstrap', level: 'En práctica' },
                { name: 'Bases de datos SQL', icon: 'bi-database', level: 'Sólido' },
            ],
        },
        {
            category: 'Herramientas & Infraestructura',
            icon: 'bi-tools',
            items: [
                { name: 'Git & GitHub', icon: 'bi-git', level: 'Sólido' },
                { name: 'Soporte técnico & hardware', icon: 'bi-pc-display', level: 'Sólido' },
                { name: 'Windows & Linux', icon: 'bi-windows', level: 'Sólido' },
                { name: 'Excel & ofimática', icon: 'bi-file-earmark-spreadsheet', level: 'Sólido' },
                { name: 'Firebase', icon: 'bi-fire', level: 'En práctica' },
                { name: 'Microsoft Azure', icon: 'bi-cloud', level: 'Explorando' },
            ],
        },
    ],

    // ---- Proyectos -----------------------------------------------------------
    // Vacío a propósito: no hay casos publicables todavía. La sección muestra un
    // estado "en preparación" con llamado a contacto, en vez de proyectos de
    // relleno cuyos botones no llevaban a ningún repositorio ni demo.
    //
    // PARA PUBLICAR UN PROYECTO:
    //   1) Copia la plantilla de abajo dentro de `projects` con un id propio.
    //   2) Añade ese id a `projectCards`.
    //   3) Deja `github` y `demo` vacíos si aún no existen: el botón no se pinta
    //      solo, en vez de quedar muerto apuntando a '#'.
    projects: {
        /* PLANTILLA — copia este bloque, cámbiale el nombre y descoméntalo:

        mi_proyecto: {
            title: 'Nombre del proyecto',
            subtitle: 'Una línea que explique qué resuelve.',
            brief: 'Resumen corto para la tarjeta de la home.',
            date: 'Marzo 2026',
            role: 'Equipo INSATECH NEO',
            duration: '3 meses',
            category: 'web',                       // web | backend | movil
            github: '',                            // URL completa o vacío
            demo: '',                              // URL completa o vacío
            mainImage: 'images/mi-proyecto.jpg',
            gallery: ['images/mi-proyecto-2.jpg'],
            tech:  ['Laravel', 'MySQL'],
            tools: ['VS Code', 'Git'],
            tags:  ['Laravel', 'MySQL'],
            stats: [
                { label: 'Cliente',  value: 'Nombre o sector' },
                { label: 'Resultado', value: 'Cifra concreta si la hay' },
            ],
            description: `
              <p>Contexto: qué problema tenía el cliente.</p>
              <h4 class="mt-4 mb-3">Características principales</h4>
              <ul class="project-features-list">
                <li><i class="bi bi-check-circle-fill me-2"></i>Funcionalidad clave</li>
              </ul>
              <h4 class="mt-4 mb-3">Resultados</h4>
              <p>Qué cambió después de implementarlo.</p>
            `,
            team: [
                {
                    name: 'Breiner Stiven Guisao Rodriguez',
                    role: 'Desarrollador Full Stack',
                    contribution: 'Qué hizo exactamente en este proyecto',
                    photo: 'images/breiner.jpg',
                    github: 'https://github.com/Breiner1412',
                    email: 'rodriguezbreiner125@gmail.com',
                },
            ],
            extraLinks: [],
            demoAccess: [],   // credenciales de demo, si aplica
        },

        */
    },

    // Ids de `projects` que se muestran como tarjetas, en este orden.
    projectCards: [],

    // ---- Contacto ------------------------------------------------------------
    contactInfo: [
        {
            icon: 'bi-envelope-fill',
            title: 'Email',
            lines: [
                { text: 'insatechneo@gmail.com', url: 'mailto:insatechneo@gmail.com' },
            ],
        },
        {
            icon: 'bi-whatsapp',
            title: 'WhatsApp',
            lines: [
                { text: 'Breiner · +57 320 655 4202', url: 'https://wa.me/573206554202?text=%C2%A1Hola!%20Vi%20el%20portafolio%20de%20INSATECH%20NEO%20y%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios.' },
                { text: 'Luisa · +57 320 570 3024', url: 'https://wa.me/573205703024?text=%C2%A1Hola!%20Vi%20el%20portafolio%20de%20INSATECH%20NEO%20y%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios.' },
            ],
        },
        {
            icon: 'bi-geo-alt-fill',
            title: 'Ubicación',
            lines: [
                { text: 'Pereira, Risaralda<br>Colombia · trabajamos también en remoto' },
            ],
        },
    ],
};
