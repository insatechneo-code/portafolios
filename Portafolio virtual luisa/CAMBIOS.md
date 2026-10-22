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

---

## Rediseño — «Archivo en orden» (octubre 2026)

La versión anterior completa quedó en `_respaldo-diseno/`. Los datos no cambiaron:
todo sigue saliendo de `js/portfolio-data.js` y lo dibuja `js/main.js`.

**Idea visual.** El diseño sale de su oficio, la gestión documental: la foto va en una
ficha con pestaña, la experiencia son carpetas apiladas con las fechas en la pestaña y
las habilidades son un índice. Colores base morado y negro, elegidos por Luisa.

**Paleta** (variables CSS al inicio de `css/style.css`):
- Claro: blanco `#FFFFFF`, tinta `#16121C`, morado uva `#6227D9`, lavanda `#F3EEFF`.
- Oscuro: negro `#000000`, panel `#17121F`, morado `#9B7BFF`, bloque de contacto `#4A1FB8`.

**Tipografías.** *Bricolage Grotesque* para títulos y *Atkinson Hyperlegible* para el
texto (una fuente pensada para leerse fácil). Reemplazan a Outfit.

**Qué cambió por sección:**
- **Hero:** ahora es blanco o negro según el tema, alineado a la izquierda, con el nombre
  grande, el título profesional y **Descargar CV** como botón principal. Se quitó el
  video: no tenía relación con ella y era lo más pesado de la página.
- **Sobre mí:** las tres cifras pasaron a un registro tipo libro contable en vez de
  tarjetas de número grande. En escritorio el título se queda fijo mientras se lee.
- **Experiencia:** cada empleo es una carpeta; la pestaña de cada una se corre un poco
  a la derecha, como en un archivador, y la más reciente va en morado.
- **Proyectos:** el estado vacío es una carpeta con hojas en blanco y dos acciones
  (GitHub y contacto). Los repositorios de GitHub son una lista sencilla en dos columnas.
- **Habilidades:** índice por categoría sin barras de porcentaje (el campo `pct` sigue en
  `portfolio-data.js` por si se quiere volver a mostrar). Las blandas son etiquetas.
- **Educación:** lista con la fecha en una columna; certificaciones en una línea.
- **Contacto:** bloque sólido (negro en modo claro, morado en oscuro); las etiquetas
  `<label>` del formulario ahora se ven, no solo las leen los lectores de pantalla.
- **Detalle de proyecto:** mismo estilo, alineado a la izquierda.

**Se mantiene todo lo de arriba:** etiquetas en el formulario, foco visible (ahora un
contorno morado de 3 px), `prefers-reduced-motion` (desactiva la entrada del hero y las
apariciones al hacer scroll), un solo listener de scroll, aviso `noscript` y Open Graph.
Se añadió un enlace "Saltar al contenido" para teclado.

**Movimiento:** una sola entrada al cargar (el nombre y la ficha) y una aparición suave de
los bloques grandes al hacer scroll, una sola vez.

**Para cambiar la foto:** reemplazar `images/perfil.jpg` por una imagen cuadrada. La
imagen actual es temporal.

**Video:** como el hero ya no usa video, `video/hero.mp4` tampoco se usa. La carpeta
`video/` completa (≈60 MB) se puede borrar. `images/hero-poster.jpg` se queda porque es la
imagen de vista previa de Open Graph.

**Antes de publicar:** borrar `_respaldo-diseno/` (también pesa ≈60 MB por los videos)
o sacarla del despliegue en Render.

Revisado con capturas en 375, 768, 1024, 1280 y 1440 px, en modo claro y oscuro, sin
scroll horizontal y sin errores en la consola.

### Animaciones y efectos (segunda pasada)

Están todas en `css/motion.css`, que se carga después de `style.css`. Siguen la skill
"motion": los controles usan solo 100 / 150 / 200 / 300 ms, sin rebotes ni bucles
infinitos, y solo se anima `transform` y `opacity`.

**Excepción documentada:** la entrada del hero y las apariciones al hacer scroll usan
600 ms con cascadas de 60 ms. Ocurren una sola vez y no afectan a los controles.

- **Hero:** el nombre sube línea por línea, después aparecen el título y los botones, y la
  ficha cae girando hasta su sitio con la hoja lavanda deslizándose detrás. Al pasar el
  cursor, la ficha se endereza.
- **Barra de progreso:** una línea morada bajo el navbar muestra cuánto se ha leído. Usa
  el mismo listener de scroll que ya existía (sigue habiendo uno solo).
- **Navegación:** el subrayado crece de izquierda a derecha en hover y queda fijo en la
  sección activa.
- **Carpetas de experiencia:** aparecen al hacer scroll, la pestaña asoma desde detrás y
  las tareas entran en cascada. En hover la carpeta se levanta y su pestaña se pone morada.
- **Proyectos vacíos:** las hojas salen apiladas y se abren en abanico; en hover se
  abren un poco más.
- **Habilidades:** la raya bajo cada categoría se dibuja de izquierda a derecha y las
  filas y etiquetas entran en cascada; en hover el ícono avanza y la etiqueta sube.
- **Educación, certificaciones, contacto y repositorios:** aparición suave en cascada.
- **Botones:** cada ícono reacciona a su acción (la descarga baja, el envío sale en
  diagonal) y al presionar el botón se hunde un poco.
- **Cambio de tema:** fundido entre claro y oscuro (View Transitions, en Chrome y Edge;
  en los demás navegadores el cambio es directo) y el ícono gira al cambiar.
- **Detalle de proyecto:** el encabezado entra en cascada; las tarjetas del equipo se
  levantan en hover.

Los efectos de hover solo se activan con mouse; en celulares no aparecen.
Con `prefers-reduced-motion` todo se muestra directamente en su estado final, sin
animaciones ni barra de progreso.
Comprobado: sin errores en consola, sin scroll horizontal en 375 y 1280 px, todos los
bloques visibles al terminar el recorrido y ninguna animación activa con movimiento
reducido.

### Corrección del menú (22 oct 2026)

Entre 992 y 1199 px el menú no cabía: "Sobre Mí" se partía en dos líneas y el botón de
Descargar CV crecía. En ese rango los enlaces van más juntos y el botón de CV queda solo con
su ícono (conserva su nombre para lectores de pantalla).
