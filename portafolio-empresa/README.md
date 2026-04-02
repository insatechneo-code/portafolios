# 🚀 INSATECH NEO — Portafolio Web Empresarial

Sitio web corporativo del equipo **INSATECH NEO**, desarrollado con HTML, CSS y JavaScript vanilla.
Todo el contenido se gestiona desde un solo archivo de datos, sin necesidad de tocar HTML ni JavaScript.

---

## 📁 Estructura del Proyecto

```
/
├── index.html                 ← Página principal (NO editar contenido aquí)
├── project-detail.html        ← Detalle de proyectos (NO editar contenido aquí)
├── css/
│   └── style.css              ← Estilos y colores (verde-cyan-azul)
├── js/
│   ├── portfolio-data.js      ← ⭐ AQUÍ SE EDITA TODO EL CONTENIDO ⭐
│   ├── main.js                ← Lógica de renderizado (no tocar salvo avanzado)
│   └── github-api.js          ← Integración con GitHub API
├── images/
│   ├── logo.jpeg              ← Logo de INSATECH NEO (navbar y hero)
│   ├── logo-neo.jpeg          ← Logo para sección "Nosotros"
│   ├── logo.png               ← Favicon
│   ├── breiner.jpg            ← Foto de Breiner
│   ├── luisa.jpg              ← Foto de Luisa
│   └── projects/              ← Imágenes de proyectos (crear subcarpetas si quieres)
│       ├── portafolio.jpg
│       ├── gestion.jpg
│       └── fast-api.jpg
├── video/
│   └── pexels-2022395.mp4     ← Video de fondo del hero
└── assets/
    └── cv.pdf                 ← CV descargable (opcional)
```

---

## ⭐ ¿Dónde editar el contenido?

**TODO se edita en un solo archivo:**

```
js/portfolio-data.js
```

Abre ese archivo y encontrarás el objeto `PORTFOLIO` con las siguientes secciones:

---

## 📧 1. Configurar EmailJS (Formulario de contacto)

Para que el formulario envíe emails reales, necesitas una cuenta gratuita en [emailjs.com](https://www.emailjs.com/).

```js
emailjs: {
    publicKey: 'TU_PUBLIC_KEY_AQUI',      // ← Reemplaza con tu Public Key
    serviceId: 'TU_SERVICE_ID_AQUI',      // ← Reemplaza con tu Service ID
    templateId: 'TU_TEMPLATE_ID_AQUI',    // ← Reemplaza con tu Template ID
},
```

### Pasos:
1. Crear cuenta en [emailjs.com](https://www.emailjs.com/)
2. Crear un **Email Service** (conectar Gmail, Outlook, etc.)
3. Crear un **Email Template** con las variables: `from_name`, `from_email`, `subject`, `message`
4. Copiar los 3 IDs y pegarlos en `portfolio-data.js`

> ⚠️ Mientras los valores digan `TU_..._AQUI`, el formulario mostrará un mensaje indicando que no está configurado.

---

## 🏢 2. Datos de la Empresa

```js
company: {
    name: 'INSATECH NEO',
    brandHTML: 'INSATECH <span class="brand-accent">NEO</span>',
    tagline: 'Desarrollo de Software & Soluciones Tecnológicas',
    email: 'insatechneo@gmail.com',
    location: 'Pereira, Risaralda, Colombia',
    logo: 'images/logo.jpeg',         // ← Logo principal
    logoAlt: 'images/logo-neo.jpeg',   // ← Logo sección "Nosotros"
},
```

### Para cambiar:
- **Nombre o tagline:** edita `name`, `brandHTML` y `tagline`
- **Logo:** reemplaza los archivos en `/images/` y actualiza la ruta
- **Email:** cambia `email`

---

## 🌐 3. Redes Sociales

```js
socialLinks: [
    { url: 'https://github.com/insatechneo-code', icon: 'bi-github', label: 'GitHub' },
    { url: 'mailto:insatechneo@gmail.com', icon: 'bi-envelope', label: 'Email' },
    { url: 'https://linkedin.com/company/insatech-neo', icon: 'bi-linkedin', label: 'LinkedIn' },
],
```

### Para agregar una red social:
Añade un nuevo objeto al array:
```js
{ url: 'https://wa.me/573001234567?text=Hola', icon: 'bi-whatsapp', label: 'WhatsApp' },
```

### Para quitar una red social:
Simplemente borra o comenta la línea correspondiente.

### Iconos disponibles:
Usa cualquier icono de [Bootstrap Icons](https://icons.getbootstrap.com/):
- `bi-github`, `bi-linkedin`, `bi-whatsapp`, `bi-envelope`
- `bi-instagram`, `bi-twitter-x`, `bi-facebook`, `bi-youtube`
- `bi-tiktok`, `bi-discord`, `bi-telegram`, etc.

---

## 📊 4. Estadísticas de "Nosotros"

```js
aboutStats: [
    { count: 2, label: 'Desarrolladores<br>en el Equipo' },
    { count: 5, label: 'Proyectos<br>Completados' },
    { count: 10, label: 'Tecnologías<br>Dominadas' },
],
```

Cambia `count` al número real y `label` al texto que quieras mostrar.
Se pueden usar etiquetas HTML como `<br>` para saltos de línea.

---

## 🛠️ 5. Servicios

```js
services: [
    {
        icon: 'bi-globe2',                    // Icono Bootstrap
        title: 'Desarrollo Web',              // Título del servicio
        description: 'Descripción...',         // Texto descriptivo
        tags: ['HTML/CSS', 'JavaScript'],      // Chips/etiquetas
    },
    // ... más servicios
],
```

### Para agregar un servicio:
Copia un bloque existente y cambia los datos. No hay límite de servicios.

### Para quitar un servicio:
Borra el bloque `{ ... }` correspondiente del array.

---

## 👥 6. Equipo

Cada miembro del equipo tiene esta estructura:

```js
team: [
    {
        name: 'Breiner Stiven Guisao Rodriguez',
        role: 'Co-Fundador & Desarrollador Full Stack',
        photo: 'images/breiner.jpg',           // ← Foto del miembro
        social: [
            { url: 'https://github.com/Breiner1412', icon: 'bi-github', label: 'GitHub' },
            { url: 'mailto:correo@ejemplo.com', icon: 'bi-envelope', label: 'Email' },
            { url: 'https://wa.me/573206554202?text=Hola...', icon: 'bi-whatsapp', label: 'WhatsApp' },
        ],
        profile: 'Texto de perfil profesional...',
        experience: [
            {
                date: 'Dic 2025 - Jun 2026',
                title: 'Técnico de Soporte — TuCable SAS',
                desc: 'Descripción de funciones...',
            },
            // ... más experiencias
        ],
        education: [
            {
                title: 'Tecnólogo en ADSO',
                institution: 'SENA — 2024 - 2026',
            },
            // ... más formación
        ],
        portfolioUrl: 'https://mi-portafolio.com',  // ← Link al portafolio personal
    },
    // ... más miembros
],
```

### Para agregar un nuevo miembro:
1. Pon su foto en `/images/` (ejemplo: `images/nuevo-miembro.jpg`)
2. Copia un bloque de miembro existente
3. Cambia todos los datos
4. El miembro aparecerá automáticamente

### Para quitar un miembro:
Borra el bloque `{ ... }` correspondiente del array.

### WhatsApp con mensaje predeterminado:
El formato de la URL es:
```
https://wa.me/NUMERO?text=MENSAJE_CODIFICADO
```
Ejemplo:
```
https://wa.me/573206554202?text=%C2%A1Hola!%20Vi%20el%20portafolio%20de%20INSATECH%20NEO.
```
Para codificar tu mensaje usa: [urlencoder.org](https://www.urlencoder.org/)

---

## 💻 7. Tecnologías / Habilidades

```js
skills: [
    {
        category: 'Desarrollo Web & Backend',    // Nombre de categoría
        icon: 'bi-code-square',                   // Icono de categoría
        items: [
            { name: 'HTML5 & CSS3', icon: 'bi-filetype-html', pct: 85 },
            { name: 'JavaScript', icon: 'bi-filetype-js', pct: 70 },
            // ... más habilidades
        ],
    },
    // ... más categorías
],
```

### Para agregar una habilidad:
Añade un objeto al array `items` de la categoría correspondiente:
```js
{ name: 'TypeScript', icon: 'bi-filetype-tsx', pct: 60 },
```

### Para agregar una categoría nueva:
Copia un bloque de categoría y cambia los datos.

### Para cambiar porcentajes:
Modifica el valor `pct` (0 a 100). La barra se anima automáticamente.

---

## 🚀 8. Proyectos

Los proyectos tienen **dos partes**:

### Parte A: Definir el proyecto

Cada proyecto se define dentro de `projects` con un **ID corto** como clave:

```js
projects: {
    miproyecto: {                              // ← ID del proyecto (sin espacios)
        title: 'Mi Nuevo Proyecto',
        subtitle: 'Descripción corta impactante',
        brief: 'Texto para la tarjeta en la portada',
        date: '2026',
        role: 'Equipo INSATECH NEO',
        duration: '2 meses',
        category: 'web',                        // web, backend, mobile, etc.
        github: 'https://github.com/...',       // URL del repo (o '#' si no hay)
        demo: 'https://mi-demo.com',            // URL demo (dejar '' si no hay)
        mainImage: 'images/projects/mi-proyecto.jpg',   // Imagen principal
        gallery: [                              // Galería de capturas (opcional)
            'images/projects/mi-proyecto-1.jpg',
            'images/projects/mi-proyecto-2.jpg',
            'images/projects/mi-proyecto-3.jpg',
        ],
        tech: ['React', 'Node.js', 'MongoDB'],  // Tecnologías (sidebar)
        tools: ['VS Code', 'Git', 'Postman'],   // Herramientas (sidebar)
        tags: ['React', 'Node.js'],              // Chips en tarjeta de portada
        stats: [                                 // Estadísticas (opcional)
            { label: 'Líneas de código', value: '5,000+' },
            { label: 'Commits', value: '120+' },
        ],
        description: `
            <p>Descripción detallada con HTML...</p>
            <h4 class="mt-4 mb-3">Características Principales</h4>
            <ul class="project-features-list">
                <li><i class="bi bi-check-circle-fill me-2"></i>Feature 1</li>
                <li><i class="bi bi-check-circle-fill me-2"></i>Feature 2</li>
            </ul>
            <h4 class="mt-4 mb-3">Desafíos y Soluciones</h4>
            <p>Texto sobre desafíos...</p>
            <h4 class="mt-4 mb-3">Resultados</h4>
            <p>Texto sobre resultados...</p>
        `,
        team: [                                  // Equipo del proyecto
            {
                name: 'Breiner Guisao',
                role: 'Backend Developer',
                contribution: 'API y base de datos',
                photo: 'images/breiner.jpg',
                github: 'https://github.com/Breiner1412',
                email: 'rodriguezbreiner125@gmail.com',
                whatsapp: 'https://wa.me/573206554202?text=Hola',
            },
        ],
        extraLinks: [                            // Enlaces adicionales (opcional)
            { url: 'https://docs.com', label: 'Documentación', icon: 'bi bi-file-earmark-text' },
        ],
        demoAccess: [                            // Credenciales demo (opcional)
            { role: 'Admin', user: 'admin@test.com', pass: '12345678' },
        ],
    },
    // ... más proyectos
},
```

### Parte B: Mostrar el proyecto en la portada

Agrega el **ID** del proyecto al array `projectCards`:

```js
projectCards: ['portafolio', 'gestion', 'fastapi', 'miproyecto'],
//                                                   ↑ nuevo ID
```

> ⚠️ **IMPORTANTE:** Si no agregas el ID a `projectCards`, el proyecto existirá en los datos pero NO se mostrará en la portada.

### Para quitar un proyecto de la portada:
Borra su ID de `projectCards`. Los datos se mantienen por si lo quieres volver a mostrar.

---

## 📞 9. Información de Contacto

```js
contactInfo: [
    {
        icon: 'bi-envelope-fill',
        title: 'Email',
        lines: [
            { text: 'correo1@gmail.com', url: 'mailto:correo1@gmail.com' },
            { text: 'correo2@gmail.com', url: 'mailto:correo2@gmail.com' },
        ],
    },
    {
        icon: 'bi-whatsapp',
        title: 'WhatsApp',
        lines: [
            {
                text: '+57 320 655 4202',
                url: 'https://wa.me/573206554202?text=%C2%A1Hola!%20Vi%20el%20portafolio...'
            },
        ],
    },
    {
        icon: 'bi-geo-alt-fill',
        title: 'Ubicación',
        lines: [
            { text: 'Pereira, Risaralda<br>Colombia' },   // Sin url = solo texto
        ],
    },
],
```

### Para agregar un método de contacto:
Agrega un nuevo objeto al array. Si `url` está presente, será un enlace clickeable.
Si no hay `url`, se muestra como texto plano.

---

## 📸 10. Imágenes

### Dónde ponerlas:
| Tipo | Ruta recomendada |
|---|---|
| Logo empresa | `images/logo.jpeg` |
| Favicon | `images/logo.png` |
| Fotos del equipo | `images/breiner.jpg`, `images/luisa.jpg` |
| Proyectos | `images/projects/nombre-proyecto.jpg` |
| Galería de proyecto | `images/projects/proyecto/captura1.jpg` |

### Recomendaciones:
- Fotos de perfil: **cuadradas**, mínimo 300x300px
- Imágenes de proyecto: **16:9**, mínimo 800x450px
- Galería: **16:9**, mínimo 600x340px
- Logo: **cuadrado**, mínimo 200x200px
- Formatos: `.jpg`, `.png` o `.webp`

---

## 🎥 11. Video de Fondo

El video del hero está en `/video/`. Para cambiarlo:

1. Pon el nuevo video en `/video/`
2. Cambia la ruta en `index.html` línea del `<source>`:
```html
<source src="video/tu-nuevo-video.mp4" type="video/mp4">
```

> 💡 Videos gratuitos: [pexels.com/videos](https://www.pexels.com/videos/) o [pixabay.com/videos](https://pixabay.com/videos/)

---

## 🐙 12. Repositorios de GitHub

Se configuran en `js/github-api.js`:

```js
const CONFIG = {
    username: 'insatechneo-code',   // ← Usuario u organización de GitHub
    maxRepos: 6,                     // ← Máximo de repos a mostrar
    sort: 'updated',                 // ← Ordenar por: updated, created, pushed
    excludeForks: true,              // ← Ocultar forks
    excludeRepos: ['repo-privado']   // ← Repos a excluir por nombre
};
```

Los repos se cargan automáticamente desde la API pública de GitHub.

---

## 🎨 13. Colores y Tema

Los colores se definen en `css/style.css` mediante variables CSS:

### Modo Oscuro (`:root` y `[data-theme="dark"]`):
```css
--primary-color: #00D4FF;        /* Cyan principal */
--secondary-color: #7ED957;      /* Verde lima */
--accent-gradient: linear-gradient(135deg, #7ED957, #00D4FF);
--bg-primary: #0a0f1a;           /* Fondo principal */
--bg-card: #131b2e;              /* Fondo de tarjetas */
```

### Modo Claro (`[data-theme="light"]`):
```css
--primary-color: #0094b3;
--secondary-color: #5aad35;
--bg-primary: #ffffff;
--bg-card: #ffffff;
```

### Para cambiar la paleta de colores:
1. Modifica las variables en `:root` / `[data-theme="dark"]`
2. Modifica las mismas variables en `[data-theme="light"]`
3. Cambia los gradientes en `--accent-gradient`

---

## ✅ Checklist para poner datos reales

Cuando tengas toda la información real, sigue este orden:

- [ ] **EmailJS:** Crear cuenta, obtener los 3 IDs, pegarlos en `portfolio-data.js`
- [ ] **Datos empresa:** Nombre, tagline, email, ubicación
- [ ] **Logo:** Reemplazar `images/logo.jpeg` y `images/logo-neo.jpeg`
- [ ] **Favicon:** Reemplazar `images/logo.png`
- [ ] **Redes sociales:** Poner URLs reales de GitHub, LinkedIn, etc.
- [ ] **Fotos del equipo:** Reemplazar `images/breiner.jpg` y `images/luisa.jpg`
- [ ] **Experiencia de cada miembro:** Fechas, cargos, funciones reales
- [ ] **Educación de cada miembro:** Títulos, instituciones, fechas
- [ ] **Links de portafolios personales:** URLs reales desplegadas
- [ ] **Servicios:** Ajustar descripciones y etiquetas
- [ ] **Tecnologías:** Ajustar porcentajes según nivel real
- [ ] **Estadísticas "Nosotros":** Números reales
- [ ] **Proyectos:** Agregar cada proyecto real con imágenes, descripción y equipo
- [ ] **Imágenes de proyectos:** Capturas de pantalla reales en `/images/projects/`
- [ ] **Contacto:** Emails, WhatsApp con mensajes predeterminados, ubicación
- [ ] **Video hero:** Elegir un video acorde al equipo
- [ ] **GitHub API:** Verificar que el username tenga repos públicos
- [ ] **Probar:** Tema oscuro/claro, responsive, formulario, links, detalle de proyectos

---

## 🔄 Flujo de actualización futura

Para cualquier cambio de contenido en el futuro:

1. Abre `js/portfolio-data.js`
2. Busca la sección que quieres modificar
3. Edita los datos
4. Guarda y recarga el navegador
5. ¡Listo!

**Nunca necesitas editar `index.html`, `project-detail.html` ni `main.js`** para cambios de contenido.

---

## 🐛 Solución de Problemas

| Problema | Solución |
|---|---|
| No se ven los repos de GitHub | Verifica el `username` en `github-api.js` y que tenga repos públicos |
| El formulario dice "no configurado" | Configura EmailJS con tus 3 IDs reales |
| Una imagen no carga | Verifica que la ruta en `portfolio-data.js` coincida con el archivo real |
| Un proyecto no aparece en la portada | Verifica que su ID esté en `projectCards` |
| El detalle de proyecto dice "no encontrado" | Verifica que el `?id=` en la URL coincida con el ID en `projects` |
| El tema no cambia | Limpia el localStorage del navegador (DevTools → Application → Local Storage → borrar `theme`) |

---

## 📝 Notas Importantes

- **Rutas de imágenes:** Siempre relativas desde la raíz (`images/...`), nunca absolutas
- **IDs de proyecto:** Sin espacios, sin caracteres especiales, todo en minúsculas
- **HTML en descripciones:** Las descripciones de proyectos aceptan HTML (`<p>`, `<ul>`, `<h4>`, etc.)
- **WhatsApp:** Siempre usar formato `https://wa.me/CODIGO_PAIS + NUMERO` sin espacios ni guiones
- **Backup:** Antes de cambios grandes, haz copia de `portfolio-data.js`

---

© 2025 INSATECH NEO — Breiner Guisao & Luisa Sánchez