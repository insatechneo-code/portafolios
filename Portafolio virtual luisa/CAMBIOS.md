# Ajustes aplicados a la plantilla — Portafolio de Luisa

Los archivos originales quedaron guardados en la carpeta `_respaldo/` por si hay que
volver atrás.

---

## Errores corregidos

**El enlace de WhatsApp en la ficha de proyecto estaba roto.**
En `portfolio-data.js` la URL venía escrita con comillas dobles dentro de las comillas
simples (`'"https://wa.me/..."'`), así que el navegador la tomaba como parte de la
dirección y el enlace no abría nada.

**El favicon daba error 404.**
`index.html` y `project-detail.html` apuntaban a `images/favicon.png`, que no existía en
la carpeta. Se creó uno con el monograma "LS" sobre el morado de la paleta del sitio.

**El video del hero no se veía en iPhone.**
Al `<video>` le faltaba el atributo `playsinline`: sin él, iOS se niega a reproducir el
video dentro de la página y el hero aparece en negro. También tenía `poster=""` vacío, así
que se veía negro durante la carga en cualquier navegador. Ahora usa
`images/hero-poster.jpg`.

**Los botones "Ver demo" y "Demo en Vivo" no llevaban a ninguna parte.**
Los proyectos tenían `demo: '#hero'` y `github: '#'`. Ahora el botón solo se dibuja si el
enlace es una URL real; si el campo está vacío, simplemente no aparece.

**El nombre completo rompía la barra de navegación.**
"Luisa Fernanda Sánchez Suarez" en el navbar hacía que el menú y el botón de CV se
partieran en dos líneas en pantallas de portátil. Ahora dice "Luisa Sánchez"; el nombre
completo se mantiene en el hero y en el `<title>`.

---

## Mejoras

**Peso de la página: de ~5,4 MB a ~800 KB.**
El video del hero pasó de 5,3 MB a 724 KB (recortado a 12 segundos, sin pista de audio,
recomprimido). El archivo nuevo es `video/hero.mp4`.

**El formulario ahora tiene etiquetas `<label>`.**
Antes solo tenía `placeholder`, lo que rompe el autocompletado del navegador y deja los
campos sin nombre para lectores de pantalla.

**La sección de GitHub ya no muestra errores al visitante.**
Antes, si GitHub fallaba o se agotaba el límite de peticiones, salía una alerta roja en
mitad del portafolio. Ahora el bloque se oculta y ya. Además guarda el resultado una hora
en el navegador (la API pública permite 60 peticiones por hora y por IP) y escapa el texto
que llega de GitHub antes de insertarlo en el HTML.

**Un solo listener de scroll en lugar de tres.**
Los tres efectos de scroll (navbar, botón de subir, resaltado del menú) se ejecutaban de
forma independiente en cada frame. Ahora comparten un único manejador con
`requestAnimationFrame`.

**Añadidos:** etiquetas Open Graph para que el enlace muestre vista previa al compartirlo,
`rel="noopener"` en todos los enlaces externos, aviso para quien tenga JavaScript
desactivado (el sitio entero se genera con JS, así que sin él la página quedaba vacía),
respeto a `prefers-reduced-motion` y foco visible al navegar con teclado.

---

## Lo que falta por completar

Todo está marcado con la palabra `PENDIENTE` dentro de los archivos.

1. **Configurar EmailJS** — `js/portfolio-data.js`, arriba del todo. Mientras diga
   `TU_PUBLIC_KEY_AQUI`, el formulario le dice al visitante que escriba por correo en vez
   de enviar el mensaje. Las instrucciones paso a paso están en ese mismo comentario.

2. **Publicar proyectos** — `js/portfolio-data.js`, campo `projectCards`. Está vacío a
   propósito, así que la sección muestra un mensaje de "Proyectos en preparación" con
   enlaces a GitHub y al formulario. Los dos proyectos ya escritos siguen ahí: para
   mostrarlos basta con completar sus URLs y poner `projectCards: ['portafolio', 'gestion']`.

3. **Reemplazar `SITE_URL`** — `index.html`, en las etiquetas Open Graph. Cambiar por la
   dirección real del sitio una vez publicado.

4. **Revisar las tres cifras de "Sobre Mí"** — `index.html`. Los "años de experiencia"
   están escritos a mano y hay que actualizarlos cada año.

5. **Descripciones en los repositorios de GitHub** — `control_ingreso_demo` y
   `juego-piedra-papel-tijera` no tienen descripción, así que en el portafolio aparecen
   como "Repositorio sin descripción". Se arregla desde GitHub, no desde el código.

---

## Archivos de video sin usar

En `video/` hay 60 MB de archivos que no se usan en ninguna parte y que se suben al
servidor en cada despliegue. El único necesario es `hero.mp4`:

| Archivo | Peso | Estado |
|---|---|---|
| `hero.mp4` | 724 KB | **en uso** |
| `nucleo.mp4` | 5,3 MB | original del hero, ya reemplazado |
| `lineas.mp4` | 20,6 MB | sin usar |
| `tecno.mp4` | 18,1 MB | sin usar |
| `mundo.mp4` | 9,8 MB | sin usar |
| `pexels-2022395.mp4` | 4,2 MB | sin usar |
| `pc.mp4` | 2,5 MB | sin usar |

Se pueden borrar todos menos `hero.mp4`.
