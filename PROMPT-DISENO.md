# Prompt para subir el nivel de diseño de las plantillas (Claude Code)

## 1. Instalar la herramienta de diseño (una sola vez)

Dentro de Claude Code, escribe estos dos comandos:

    /plugin marketplace add anthropics/claude-code
    /plugin install frontend-design@claude-code-plugins

Reinicia Claude Code. Abre la terminal en la carpeta `portafolios` y ejecuta `claude`.

## 2. Pegar este prompt (una plantilla a la vez; empieza por la de Luisa)

---

Usa la skill frontend-design. Quiero rediseñar a fondo la plantilla de portafolio que está en la carpeta "Portafolio virtual luisa". Hoy se ve como una plantilla genérica de Bootstrap y quiero que se vea como un portafolio hecho a medida por un diseñador.

Contexto:
- Es un sitio estático: HTML, CSS y JavaScript puro, con Bootstrap 5 solo para la grilla y Bootstrap Icons. Se despliega en Render como sitio estático. No quiero frameworks ni paso de compilación.
- Todo el contenido sale de js/portfolio-data.js y lo dibuja js/main.js. Esa arquitectura se queda: el rediseño cambia cómo se ve, no de dónde salen los datos.
- La dueña es Luisa Fernanda Sánchez, tecnóloga en Análisis y Desarrollo de Software con experiencia administrativa. NO cambies ningún dato de ella (textos, fechas, enlaces, foto, número). Solo diseño.
- Lee CAMBIOS.md antes de empezar: ahí están arreglos de rendimiento y accesibilidad que no se pueden perder (playsinline y poster en el video, etiquetas <label> en el formulario, foco visible, prefers-reduced-motion, un solo listener de scroll, aviso noscript, Open Graph).

Antes de tocar código:
1. Haz una copia de la carpeta completa en "_respaldo-diseno" dentro de la misma plantilla.
2. Abre el sitio, recórrelo y dime en una lista corta qué se ve genérico o débil.
3. Propón 2 direcciones visuales distintas (paleta, tipografías de Google Fonts, estilo del hero, tratamiento de tarjetas) con una frase de por qué encaja con ella. Espera a que yo elija una.

Al implementar:
- Mantén modo claro y oscuro funcionando, con las dos paletas definidas como variables CSS.
- Jerarquía tipográfica clara: una fuente con personalidad para títulos y una legible para texto.
- El hero tiene que decir en 5 segundos quién es y qué hace, con un botón principal claro.
- Las secciones no pueden verse todas iguales: varía ritmo y composición sin perder coherencia.
- Animaciones sutiles al hacer scroll y en hover; nada que distraiga. Respeta prefers-reduced-motion.
- Nada de glassmorphism exagerado, degradados arcoíris ni efectos de relleno.
- Debe verse bien de 375 px a 1440 px, sin scroll horizontal en ningún ancho.
- No subas el peso de la página: nada de imágenes ni videos nuevos pesados.
- Mantén el estado vacío de "Proyectos en preparación" bonito, porque hoy no hay proyectos publicados.
- Revisa también project-detail.html para que siga el mismo estilo.

Al terminar:
- Toma capturas a 375 px y 1280 px, en modo claro y oscuro, y revísalas tú mismo antes de darme el trabajo por terminado.
- Comprueba que la consola no tenga errores.
- Agrega al final de CAMBIOS.md una sección "Rediseño" con lo que cambiaste.

---

## 3. Para INSATECH NEO

Usa el mismo prompt cambiando estas partes:

- La carpeta es "portafolio-empresa".
- En vez de "La dueña es Luisa...", pon: "Es el sitio de INSATECH NEO, un estudio de desarrollo de software de dos personas (Breiner y Luisa). Tiene que verse como una empresa seria y confiable, no como un portafolio personal. Los servicios principales son desarrollo de software; soporte técnico y digitalización van en un bloque secundario. NO cambies textos, servicios ni datos del equipo."
- Agrega: "La paleta tiene que partir de los colores del logo (images/logo.png, degradado verde a cian), porque hoy el sitio usa un cian que no coincide con el logo."
- Agrega: "La sección de proyectos está vacía a propósito; su estado vacío debe invitar a contactar."
- Agrega: "Que no se parezca a la plantilla de Luisa: son marcas distintas."
