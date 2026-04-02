# Portafolio Web — Luisa Fernanda Sánchez

Portafolio profesional personalizable, desarrollado en HTML, CSS y JavaScript, que despliega tu experiencia, proyectos, habilidades, educación y contacto en un solo sitio web moderno y responsive.

## 📁 Estructura principal

```
/
├── index.html
├── project-detail.html
├── css/
│   └── style.css
├── js/
│   ├── portfolio-data.js     <-- Aquí configuras TODO el contenido
│   ├── main.js
│   └── github-api.js
├── images/
├── video/
└── assets/
    └── cv.pdf
```

---

## ✏️ ¿Dónde editar tus datos personales?

Todo el contenido principal (nombre, experiencia, proyectos, etc.) se edita en:

```
js/portfolio-data.js
```

Busca el objeto `PORTFOLIO`. Aquí se definen:

- **Datos personales** (`owner`)
- **Redes sociales** (`socialLinks`)
- **Experiencia laboral** (`experience`)
- **Proyectos** (`projects` y `projectCards`)
- **Habilidades técnicas y blandas** (`skills`, `softSkills`)
- **Educación y certificados** (`education`, `certificates`)
- **Configuración del formulario EmailJS** (`emailjs`)

---

## 👤 Editar información básica y redes

En `owner` añade/cambia:

```js
owner: {
  name: 'Luisa Fernanda Sánchez',
  shortName: 'Luisa Sánchez',
  title: 'Tecnóloga en Análisis y Desarrollo de Software & Auxiliar Administrativa',
  email: 'fers86113@gmail.com',
  phone: '+573205703024',
  phoneFormatted: '+57 320 570 3024',
  whatsapp: 'https://wa.me/573205703024',        // Chat directo de WhatsApp
  location: 'Pereira, Risaralda, Colombia',
  github: 'https://github.com/Luisa-039',
  photo: 'images/perfil.jpg',
},
```

Las redes sociales que aparecen en el hero/footer están en `socialLinks`:

```js
socialLinks: [
  { url: 'https://github.com/Luisa-039', icon: 'bi-github', label: 'GitHub' },
  { url: 'mailto:fers86113@gmail.com', icon: 'bi-envelope', label: 'Email' },
  { url: 'https://wa.me/573205703024', icon: 'bi-whatsapp', label: 'WhatsApp' },
],
```

---

## 💼 Experiencia Laboral

Agrega, elimina o cambia empleos agregando objetos al array `experience`:

```js
experience: [
  {
    date: '2025',
    title: 'Asistente Ejecutiva (Remoto)',
    company: 'First Class Business',
    tasks: [
      'Atención y soporte a clientes de manera virtual.',
      'Gestión de agenda, correos electrónicos y coordinación de reuniones.',
      // ...
    ],
  },
  // ...
],
```

---

## 🚀 Proyectos

### 1. Cómo agregar un nuevo proyecto

- Cada proyecto es un objeto dentro de `projects`, con una clave corta (ejemplo: `gestion`).
- Debes agregar el `id` de tu proyecto también al array `projectCards` para que aparezca en la portada.

Ejemplo básico:

```js
projects: {
  gestion: {
    title: 'Sistema de Gestión Administrativa',
    subtitle: 'Aplicación web...',
    brief: 'Descripción corta...',
    date: '2025',
    role: 'Desarrolladora',
    duration: '2 meses',
    category: 'web',      // puedes poner otro
    github: 'URL a repo o "#"',
    demo: 'URL demo online o "#"',
    mainImage: 'images/gestion.jpg',   // Imagen representativa
    gallery: [ 'images/gestion.jpg' ], // Galería de imágenes
    tech: [ 'Laravel', 'PHP', 'MySQL', 'Bootstrap' ], // Tecnologías que se mostrarán como chips
    tools: [ 'VS Code', 'Git', 'Postman' ],           // Herramientas (chips)
    tags: [ 'Laravel', 'PHP', 'MySQL' ],              // Chips visibles en portada
    stats: [
      { label: 'Módulos', value: 'Gestión documental, agenda, procesos' },
      // ...
    ],
    description: `
      <p>Descripción puede contener HTML para formateo.</p>
      <ul class="project-features-list">
        <li><i class="bi bi-check-circle-fill me-2"></i>Característica destacada</li>
      </ul>
    `,
    team: [
      {
        name: 'Luisa Fernanda Sánchez',
        role: 'Desarrolladora',
        contribution: 'Diseño, maquetación y desarrollo del sitio',
        photo: 'images/perfil.jpg',
        github: 'https://github.com/Luisa-039',
        email: 'fers86113@gmail.com',
        whatsapp: 'https://wa.me/573205703024', // Añadir para mostrar WhatsApp
      },
      // Puede haber varios miembros
    ],
    extraLinks: [
      { url: 'https://mi-demo.com', label: 'Demo Online', icon: 'bi bi-box-arrow-up-right' },
      // Puedes agregar documentación, slides, etc.
    ],
    demoAccess: [
      { role: 'Administrador', user: 'admin@ejemplo.com', pass: '12345678' },
      // Para acceso de prueba, opcional
    ],
  },
  // ...otros proyectos
},

// Asegúrate de incluir tu proyecto nuevo aquí para que se vea en el grid:
projectCards: ['portafolio', 'gestion', /* nuevo_id */],
```

### 2. Imágenes de proyectos

- Coloca imágenes en la carpeta `images` o dentro de sub-carpetas (ej: `images/projects/`).
- Las rutas se ponen relativas, por ejemplo: `'images/proyectos/nuevo-proyecto1.png'`.

---

## 🛠️ Habilidades técnicas y blandas

Las técnicas están organizadas en categorías:

```js
skills: [
  {
    category: 'Gestión Administrativa',
    icon: 'bi-clipboard2-data',
    items: [
      { name: 'Atención al Cliente', icon: 'bi-headset', pct: 90 },
      // ...
    ],
  },
  // ...
],
softSkills: [
  { name: 'Comunicación', icon: 'bi-chat-dots' },
  // ...
],
```
Puedes modificar, eliminar o agregar según tu perfil.

---

## 🎓 Educación y Certificados

Modifica estos arrays para mostrar tu formación y certificaciones:

```js
education: [
  {
    date: '2024 - En curso',
    title: 'Tecnóloga en Análisis y Desarrollo de Software',
    institution: 'SENA, Pereira Risaralda',
    description: 'Formación en desarrollo web...',
  },
  // ...
],

certificates: [
  {
    name: 'Tecnóloga ADSO',
    issuer: 'SENA',
    date: '2024 - En curso',
  },
  // ...
],
```

---

## 📞 Sección de contacto

### Cambiar WhatsApp

- El número y enlace se obtienen de `owner.whatsapp` y `owner.phoneFormatted`.
- En la función `renderContactInfo()` de `main.js` ya aparece el icono de WhatsApp y el enlace directo.

---

## 👨‍💻 Agregar miembros al equipo de un proyecto

- En la propiedad `team` de un proyecto, cada persona es un objeto donde puedes incluir:
  - `name`, `role`, `contribution`, `photo`, `github`, `email`, `whatsapp`
- Si agregas el campo `whatsapp: 'https://wa.me/...'` se mostrará el icono y enlace automáticamente.
- Puedes poner varios miembros (aparecen en cards iguales).

---

## 🟢 Mostrando tus repos de GitHub

- El username se define en `github-api.js` en la variable `CONFIG.username`.
- Se mostrarán hasta 6 repos públicos ordenados por actualización.
- Si quieres ocultar un repo pon su nombre en `excludeRepos`.

---

## 📧 Configuración EmailJS

Para que funcione el formulario de contacto necesitas una cuenta gratuita de [emailjs.com](https://www.emailjs.com/):

1. Accede y crea un **service** y un **template** en EmailJS.
2. Copia tus `publicKey`, `serviceId` y `templateId` en la propiedad `emailjs` de tu `portfolio-data.js`.
3. Listo, ya envía emails cómodamente.

---

## 📸 Modificar imágenes y multimedia

- Usa solo archivos de la carpeta `/images` y sub-carpetas.
- Cambia las fotos del perfil, de proyectos y del equipo ahí y cambia la ruta en los objetos.

---

## 🖼️ Cambiar video de fondo

- Sustituye el archivo en `/video` y cambia la ruta del `<video>` en `index.html` (`src="video/pexels-2022395.mp4"`).

---

## 🎨 Colores y estilos

- Están en `/css/style.css`. Puedes cambiar la paleta de colores modificando las variables `:root` para oscuro y `[data-theme="light"]` para claro.

---

## 🔁 ¿Cómo se actualiza luego el contenido?

Solo editando `js/portfolio-data.js` y agregando imágenes nuevas en `/images`.

No es necesario editar HTML ni JavaScript salvo para funciones avanzadas o cambios de diseño.

---

## 📝 Recomendaciones

- Cuando agregues un proyecto, revisa que su `id` esté en `projectCards`.
- Usa rutas relativas para imágenes.
- Si un proyecto tiene varios miembros, pon sus datos completos (nombre, rol, email, github, whatsapp...).
- Guarda siempre copia de seguridad antes de grandes cambios.
- Haz pruebas de navegación, de cambios de tema y del formulario de contacto después de cada cambio.

---

¿Dudas? Modifica este README para explicar procesos personalizados de tu propio flujo de trabajo.

---