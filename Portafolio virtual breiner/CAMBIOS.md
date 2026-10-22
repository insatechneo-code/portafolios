# Ajustes aplicados — Portafolio de Breiner Guisao

Los originales quedaron en `_respaldo/` (incluida tu foto de perfil en tamaño completo,
como `_respaldo/images/perfil-original-1728px.jpg`).

La hoja de vida no se tocó: queda pendiente como acordamos.

---

## Errores corregidos

**El botón de WhatsApp llevaba al número de Luisa.**
Los enlaces usaban `573205703024` pero mostraban tu número, `320 655 4202`. Estaba en dos
sitios: `portfolio-data.js` y hardcodeado otra vez dentro de `main.js`. Ahora sale un solo
valor, `owner.whatsapp`, y los dos lugares lo usan.

**El favicon daba 404.** `images/favicon.png` no existía. Se creó uno con el monograma "BG"
sobre el naranja de tu paleta.

**El video del hero no se veía en iPhone.** Le faltaba `playsinline` — sin ese atributo iOS
no reproduce el video dentro de la página y el hero se ve negro. También tenía
`poster=""` vacío, así que se veía negro durante la carga en cualquier navegador.

**Si el CDN de EmailJS no cargaba, medio portafolio dejaba de renderizarse.**
`initContactForm()` llamaba a `emailjs.init()` sin comprobar que la librería existiera. Con
un bloqueador de anuncios, una red corporativa o el CDN caído, esa línea lanzaba una
excepción que cortaba `initAll()` en seco: nada de lo que venía después se ejecutaba. Ahora
el formulario avisa al visitante y el resto del sitio sigue funcionando.

**El contador de estadísticas se quedaba en cero.** Avanzaba en 50 pasos de 40 ms, así que
con un valor de 1 o 2 mostraba "0" durante casi dos segundos antes de saltar a su número.
Ahora tiene duración fija de 1,2 segundos y avanza suave sea cual sea el valor. (Este mismo
arreglo se aplicó a los otros dos portafolios.)

**Las cifras no cuadraban con el contenido.** Decía "5 Proyectos Completados" con un solo
proyecto publicado más abajo. Es lo primero que un reclutador cruza. Ahora dice "1 Proyecto
Publicado"; súbelo cuando publiques más.

---

## Peso: de 19 MB a 1,5 MB

Medido en tu sitio en producción, la página pesaba 19 MB. El desglose y lo que quedó:

| | Antes | Ahora |
|---|---|---|
| Video del hero | 18,1 MB (2560×1440) | 839 KB (`video/hero.mp4`, 1280×720, sin audio) |
| Foto de perfil | 1,35 MB (1728 px) | 57 KB (800 px, que es más de lo que se muestra) |
| **Total de la página** | **~19 MB** | **~1,5 MB** |

En 4G eso era la diferencia entre varios segundos mirando una pantalla en negro y una carga
normal.

---

## Mejoras

**Las barras de porcentaje pasaron a niveles en texto.** "JavaScript 65 %", "Azure 45 %" son
autoevaluaciones que nadie puede verificar y que sobre todo comunican un techo. Ahora cada
tecnología dice Sólido, En práctica o Explorando. Se ve mejor y no te juega en contra.

**El formulario ahora tiene etiquetas `<label>`.** Antes solo tenía `placeholder`, lo que
rompe el autocompletado del navegador y deja los campos sin nombre para lectores de pantalla.

**La sección de GitHub ya no muestra errores al visitante.** Antes, si GitHub fallaba o se
agotaba el límite de peticiones, salía una alerta roja en mitad del portafolio. Ahora el
bloque se oculta y ya. Además cachea el resultado una hora en el navegador (la API pública
permite 60 peticiones por hora y por IP) y escapa el texto que llega de GitHub antes de
insertarlo en el HTML.

**Un solo listener de scroll en lugar de tres.** Los tres efectos de scroll (navbar, botón de
subir, resaltado del menú) corrían por separado en cada frame; ahora comparten un manejador
con `requestAnimationFrame`.

**Añadidos:** Open Graph y datos estructurados de tipo `Person` (para que al compartir el
enlace salga vista previa y para que Google entienda quién eres), `rel="noopener"` en todos
los enlaces externos, aviso para quien tenga JavaScript desactivado (el sitio entero se
genera con JS, así que sin él la página quedaba vacía), `prefers-reduced-motion` y foco
visible al navegar con teclado.

---

## Lo que falta

Marcado como `PENDIENTE` dentro de los archivos.

1. **Publicar más proyectos.** Esto es lo que más te está frenando. Tienes Anime Trivia
   (Next.js + Supabase + Gemini, con modo supervivencia, rankings y panel admin) y el
   sistema de gestión técnica en Laravel, y el portafolio muestra uno solo. Dejé en
   `js/portfolio-data.js` una plantilla comentada ya pre-llenada con lo que sé de Anime
   Trivia: solo falta desplegarlo, poner las URLs, tomar capturas y descomentar.

2. **Reemplazar `SITE_URL`** en `index.html` por `https://portafolio-breiner-guisao.onrender.com`.

3. **Añadir LinkedIn.** Está comentado y listo en `owner` y en `socialLinks`. Es donde te van
   a buscar los reclutadores y hoy no hay forma de llegar a ti por ahí.

4. **Poner descripción a tus repos de GitHub.** `fut-app` y `Pregunta2` no tienen ninguna, así
   que en el portafolio salen como "Repositorio sin descripción" — y `Pregunta2` como nombre
   no le dice nada a nadie. Considera renombrarlo a `anime-trivia`.

---

## Archivos que puedes borrar

En `video/` quedan dos archivos que no se usan en ninguna parte y que se suben al servidor en
cada despliegue:

- `tecno.mp4` — 18,1 MB (el original del hero, ya reemplazado por `hero.mp4`)
- `nucleo.mp4` — 5,3 MB
- `pexels-2022395.mp4` — 4,2 MB

Y en `images/`, `perfil 01.jpg` (54 KB) tampoco se referencia. La carpeta `fonts/` está vacía.

---

# Actualización 22 oct 2026 — alineado con la hoja de vida

Copia de lo anterior en `_respaldo-2026-10-22/`.

- **LinkedIn** añadido (íconos del hero, footer y datos estructurados).
- **SITE_URL** reemplazado por `https://portafolio-breiner-guisao.onrender.com`.
- **Sobre mí** reescrito con el perfil de la hoja de vida (Next.js, .NET, servidor Linux).
- **Nueva sección "Más proyectos"** debajo de las tarjetas: FEV-Core, granjas avícolas,
  Gestión Técnica Integral y servidor Linux, con stack y enlace al código. Se edita en
  `otherProjects` dentro de `portfolio-data.js`.
- **Cifra "Proyectos"**: de 3 publicados a 7 desarrollados (los que ahora muestra el sitio).
- **Anime Trivia**: demo apuntando a `pregunta2-uppg.onrender.com` (la URL que tiene hoy el
  repo), revisión humana de preguntas y validación del lado del servidor.
- **Niveles de habilidades** igualados a los de la hoja de vida (Alto = Sólido,
  Bueno = En práctica, Básico = Explorando). Añadidos C#, .NET, Docker y servidores Linux.
- **Experiencia, formación y habilidades blandas** con el mismo texto de la hoja de vida;
  "Técnico Laboral en Mantenimiento de Sistemas" pasa a "Técnico Laboral en Sistemas".
- **Certificados**: quitados los dos títulos (ya están en Formación); Redes de Datos con
  su calificación 9.64/10.
- **`assets/cv.pdf`** reemplazado por la hoja de vida nueva (era la del 18 de septiembre).

## Correcciones 22 oct 2026 (la hoja de vida manda)

- Registro escolar: fecha 2025.
- Anime Trivia: nueve categorías y "tablas de posiciones", como en la hoja de vida.
- Granjas avícolas: stack Next.js · TypeScript · Tailwind CSS · Docker.
- Habilidades blandas: las seis de la hoja de vida (se quitaron Trabajo en Equipo y Trabajo Bajo Presión); ahora en grilla de 3 × 2.
- Cifra de experiencia: de 2 años a 1 año (las dos experiencias suman algo más de 12 meses).
- Hero: "Técnico en Mantenimiento de Sistemas" → "Técnico Laboral en Sistemas".

---

# Rediseño — «Plano técnico» (22 oct 2026)

Copia completa de la versión anterior en `_respaldo-diseno/` (sin los videos que no se
usaban). Los datos no cambiaron: todo sigue saliendo de `js/portfolio-data.js`.

**Idea visual.** Hardware + software: papel milimetrado, cotas, cajetín de plano y fichas
técnicas. Es una marca distinta de la de Luisa (otra paleta, otras fuentes y otra idea).

**Paleta** (variables al inicio de `css/style.css`):
- Claro: papel `#EEF0F2`, grafito `#1C1F24`, naranja señal `#CF430F`, azul plano `#2F5BD3`.
- Oscuro: `#15171B`, panel `#1C1F24`, naranja `#FF6A33`, azul `#7EA0FF`.

**Tipografías.** *Archivo* en ancho expandido para títulos y *Public Sans* para el texto.

**Qué cambió por sección:**
- **Hero:** sin video. Nombre grande con una cota debajo que mide su ancho real en px (cambia
  al redimensionar la ventana). Botón principal **Ver proyectos** y **Descargar CV**. Tu foto
  va en una lámina con marcas de registro y tres anotaciones: Next.js, Laravel y .NET; soporte
  técnico en telecomunicaciones; servidor Debian propio.
- **Sobre mí:** las cifras pasaron a un *cajetín* (el recuadro de datos de un plano).
- **Experiencia y formación:** tabla de especificaciones con fechas, cargo y tareas.
- **Proyectos:** cada uno es una fila grande con la captura en un marco de navegador (con el
  dominio real de la demo) y su ficha técnica: rol, fecha, duración y stack.
- **Más proyectos:** "lista de piezas" desplegable; cada fila se abre para ver la descripción
  y el enlace al código.
- **Notas al pie:** el aviso de GitHub y el de las demos gratuitas quedaron como notas.
- **Habilidades:** chips agrupados por área, con el nivel como barras de señal (3 = Sólido,
  2 = En práctica, 1 = Explorando) y un filtro por nivel.
- **Certificados:** tarjetas con sello.
- **Contacto:** hoja invertida (oscura en modo claro y clara en modo oscuro), etiquetas visibles
  en el formulario y botones para copiar el correo y el número.
- **Detalle de proyecto:** mismo estilo; el visor de capturas sigue igual.

**Texto actualizado en "Sobre este sitio":** decía que el video de portada bajó de 18 MB a
menos de 1 MB; como ya no hay video, ahora dice "Sin video de portada, imágenes en carga
diferida y un solo manejador de scroll".

## Interacciones y animaciones

Archivos: `css/motion.css` (animaciones) y `js/interactions.js` (lógica). Siguen la skill
"motion": controles en 100–300 ms, sin rebotes ni bucles, solo `transform` y `opacity`.
Excepción documentada: la entrada del hero, el revelado del tema y las apariciones al hacer
scroll usan 600 ms, una sola vez.

- **Mira de CAD:** en el hero, con mouse, dos líneas siguen al cursor con sus coordenadas.
- **Cota viva:** mide el nombre en px y se actualiza al cambiar el tamaño de la ventana.
- **El plano se dibuja al cargar:** el nombre sube línea por línea, la cota se traza desde
  el centro, aparecen las marcas de registro y luego cada anotación (punto, línea y texto).
  En hover, la anotación se marca.
- **Capturas en 3D:** la captura de cada proyecto se inclina siguiendo el cursor y las dos
  capturas de atrás se abren en abanico.
- **Lista de piezas** desplegable, con el "+" que gira a "×".
- **Filtro de habilidades:** atenúa las que no son del nivel elegido y anuncia cuántas hay.
- **Copiar:** el correo y el número se copian con un clic, con confirmación.
- **Modo plano:** el botón "Ver los planos de esta página" (en "Sobre este sitio") pinta todo
  el sitio como un plano azul, con cada caja dibujada en línea discontinua y la etiqueta de
  cada sección (`<section id="…">`). Se sale con Esc o con el mismo botón.
- **Cambio de tema:** el tema nuevo se revela en un círculo que crece desde el botón (Chrome
  y Edge; en los demás navegadores el cambio es directo).
- **Regla de lectura:** bajo el navbar, una regla con marcas se llena de naranja con el
  scroll. Usa el mismo listener de scroll de `main.js` (sigue habiendo uno solo).
- Apariciones en cascada al hacer scroll, subrayado animado en el menú e íconos que
  reaccionan en los botones.

Los efectos de puntero solo se activan con mouse. Con `prefers-reduced-motion` no hay
animaciones, mira ni inclinación: todo aparece en su estado final.

**Se mantiene:** labels en el formulario, foco visible, un solo listener de scroll, aviso
`noscript`, Open Graph y datos estructurados `Person`. Se añadió "Saltar al contenido".

**Comprobado:** capturas en 375, 768, 1024, 1280 y 1440 px en modo claro y oscuro, sin
scroll horizontal y sin errores en consola; cada interacción probada en el navegador.

## Archivos que ya no se usan

`video/` completo (incluido `hero.mp4`, ≈28 MB en total) ya no se usa: se puede borrar.
`images/hero-poster.jpg` se queda porque es la imagen de vista previa de Open Graph.
Antes de publicar, borra también `_respaldo-diseno/` o sácala del despliegue.

## Ajuste tras revisión (22 oct 2026)

Reemplaza dos cosas de la lista de arriba que no convencieron:

- **Foto del hero:** se quitaron las tres anotaciones. Ahora la foto va limpia, con una cota
  de ancho debajo y otra de alto a la derecha (medidas reales en pantalla), y un **lente de
  plano**: al pasar el cursor, un círculo con mira sigue al mouse y deja ver la foto en
  versión plano azul con cuadrícula. En celular se activa tocando la foto. Un texto pequeño
  bajo la foto lo indica. Sobre la foto se oculta la mira de CAD del hero.
- **Modo plano → Inspector:** el botón de "Sobre este sitio" ahora dice "Inspeccionar esta
  página". La página no cambia de color: al pasar el cursor (o con el foco del teclado, o
  tocando en celular) cada bloque se marca con un contorno naranja y una etiqueta como la de
  las herramientas de desarrollador, por ejemplo `section#projects 1116 × 840`. Mientras está
  activo, un clic inspecciona en lugar de abrir enlaces. Se sale con Esc, con el botón
  flotante "Salir del inspector" o con el mismo botón.
- **Menú entre 992 y 1199 px:** no cabía ("Sobre Mí" se partía y el botón de CV se salía de
  la pantalla). En ese rango los enlaces van más juntos y el botón de CV queda solo con su ícono.
