# Auditoría y ajustes — INSATECH NEO

Los archivos originales quedaron guardados en `_respaldo/` por si hay que volver atrás.

---

## Las falencias de fondo

**Tres proyectos, dos de ellos vacíos.** "Sistema de Gestión" y "API REST con FastAPI"
tenían `github: '#'`, sin demo y con una imagen genérica. Un cliente que entraba, hacía
clic en "Ver Detalles" y llegaba a una ficha sin un solo enlace. Eso no comunica "equipo
nuevo", comunica "esto es de mentira".

Como acordamos, la sección quedó **vacía a propósito** y ahora muestra un estado
"Estamos preparando nuestros primeros casos" con un llamado directo a contacto. Es más
creíble que el relleno, y añadir el primer proyecto real es cuestión de descomentar la
plantilla que dejé documentada en `portfolio-data.js`.

**Seis servicios que no contaban la misma historia.** "Gestión Administrativa Digital",
"Atención al Cliente Digital" y reparación de PCs junto a desarrollo web hacían que el
sitio no se leyera como un estudio de software, sino como dos personas ofreciendo lo que
sepan hacer. Ahora hay **cuatro servicios de desarrollo** (aplicaciones web, sistemas de
gestión interna, APIs y bases de datos, despliegue y mantenimiento) con descripciones
reescritas para que suenen a una sola oferta, y un bloque secundario **"También hacemos"**
con soporte técnico, digitalización de procesos y capacitación. Siguen ahí, pero ya no
compiten en la primera lectura.

**Las tarjetas de equipo eran hojas de vida completas.** Mostraban toda la trayectoria de
cada uno, incluida la parte de enfermería y administración en salud. En un sitio de
empresa eso hace que el visitante cuente experiencia no relacionada en lugar de leer
capacidades. Ahora cada tarjeta muestra el perfil, unas etiquetas de foco y **solo la
experiencia relevante**; el recorrido completo vive en el portafolio personal de cada uno,
que ya está enlazado al final de la tarjeta y es donde tiene sentido contarlo entero.

**Cifras que no se pueden sostener.** El bloque decía "5 Proyectos Completados" con tres
proyectos publicados, dos de ellos falsos. Se reemplazó por cifras verificables:
2 desarrolladores, 2 tecnólogos ADSO, 8 tecnologías en el stack.

**Porcentajes de habilidad.** "Microsoft Azure 45 %" comunica un techo, no una capacidad,
y nadie puede verificarlo. Ahora cada tecnología muestra un nivel en texto — Sólido,
En práctica, Explorando — que es más honesto y se lee mejor.

**El formulario de contacto no envía nada.** EmailJS sigue sin configurar
(`TU_PUBLIC_KEY_AQUI`). En un sitio de empresa ese formulario es la única vía de
conversión: alguien escribe, pulsa enviar y recibe "el formulario aún no está
configurado". Está marcado como PENDIENTE con las instrucciones paso a paso.

**LinkedIn apuntaba a una página que no pudimos confirmar.** Dejé
`linkedin.com/company/insatech-neo` comentado en el código. Un ícono social que lleva a un
404 en la portada de una empresa da peor impresión que no tener el ícono; se descomenta
cuando la página exista.

---

## Errores técnicos corregidos

**Desbordamiento horizontal en móvil.** El logo de la sección "Quiénes Somos" tenía
`max-width:400px` sin `width`, así que en pantallas de 375 px la página se movía de lado.

**El logo del navbar era el JPEG.** `logo.jpeg` trae un cuadro oscuro incrustado que en la
barra se veía como un parche. `logo.png` tiene fondo transparente y es el que se usa ahora
en navbar, hero y footer.

**El video del hero no se veía en iPhone.** Le faltaba `playsinline` (sin él iOS no
reproduce el video dentro de la página) y tenía `poster=""` vacío. Además llevaba una
pista de audio inútil en un video silenciado: se eliminó y el archivo pasó de 4,2 MB a
1,07 MB (`video/hero.mp4`).

**Botones muertos en la ficha de proyecto.** Ahora el botón solo se dibuja si el enlace es
una URL real.

**"Proyectos Relacionados" quedaba como un hueco** cuando no había otros proyectos. Ahora
la sección se oculta.

**El formulario no tenía `<label>`,** solo `placeholder`: rompe el autocompletado y deja
los campos sin nombre para lectores de pantalla.

**La sección de GitHub mostraba una alerta roja al visitante** si la API fallaba. Ahora se
oculta en silencio, cachea una hora en el navegador y escapa el texto que llega de GitHub
antes de insertarlo en el HTML.

**Tres listeners de scroll independientes** disparando en cada frame, ahora unificados en
uno con `requestAnimationFrame`.

**Añadidos:** Open Graph y datos estructurados de tipo `Organization` (ayuda a que Google
entienda que esto es una empresa), favicon de 64 px en vez del PNG de 500×500,
`rel="noopener"` en enlaces externos, aviso para quien tenga JavaScript desactivado,
`prefers-reduced-motion` y foco visible con teclado.

---

## Dos cosas que no toqué y conviene revisar

**El monograma del logo no dice INSATECH NEO.** Las letras del símbolo se leen como "UB" o
"V3" — no corresponden a las iniciales de la marca. Alguien que lo mire de cerca lo nota, y
en un logo de empresa es lo primero que transmite descuido. Vale la pena rehacerlo con las
iniciales reales o pasar a un símbolo abstracto sin letras.

**El verde del logo y el cyan del sitio no son el mismo color.** El logo es
verde → cyan degradado; la paleta del sitio es cyan `#00D4FF`. No choca, pero tampoco se
siente como un sistema. Un ajuste de una línea en `--primary-color` alinearía las dos cosas.

---

## Pendientes marcados en el código

Búscalos como `PENDIENTE`:

1. **Configurar EmailJS** — `js/portfolio-data.js`
2. **Reemplazar `SITE_URL`** por el dominio real — `index.html`
3. **Crear (o quitar) la página de LinkedIn** — `js/portfolio-data.js`
4. **Confirmar la URL del portafolio de Luisa** — `js/portfolio-data.js`
5. **Poner descripción al repositorio `portafolios`** en la cuenta `insatechneo-code`,
   que hoy aparece como "Repositorio sin descripción". Nota: esa cuenta es un usuario
   normal, no una organización de GitHub — para una empresa conviene convertirla en
   organización, así los repos quedan a nombre de INSATECH NEO y no de una persona.
6. **Publicar el primer proyecto** — plantilla comentada y documentada en
   `js/portfolio-data.js`

---

# Rediseño — «Circuito» (22 oct 2026)

Copia completa de la versión anterior en `_respaldo-diseno/` (sin los videos). Textos,
servicios y datos del equipo no cambiaron: todo sigue saliendo de `js/portfolio-data.js`.

**Idea visual.** La identidad sale del logo: sus colores y sus pistas de circuito. Es una
marca distinta de los dos portafolios personales (otra paleta, otras fuentes, otra idea).

**Paleta** (variables al inicio de `css/style.css`), tomada del logo con un muestreo de
píxeles: verde lima `#8FD84E`, verde `#62D27A`, turquesa `#48C0A8`, cian `#22BFD8`.
- Oscuro: azul noche `#0B1622` (el fondo del logo), panel `#122130`, botones en cian.
- Claro: `#F7FAF9`, tinta `#0B2A2E` y los tonos del logo oscurecidos para que el texto
  cumpla contraste (botones `#0B7A90` con texto blanco).
- El degradado del logo solo se usa en líneas (pistas, riel, borde del contacto, anillo de
  las fotos), nunca como relleno de botones.

**Tipografías.** *Red Hat Display* (títulos) y *Red Hat Text* (texto). Reemplazan a Outfit.

**Qué cambió:**
- **Hero:** sin video (era un concierto en rojo, sin relación con la empresa). La oferta va
  como título principal y el botón principal es **Iniciar Proyecto**. A la derecha, el logo
  con ocho pistas de circuito que se dibujan al cargar.
- **Nosotros:** las cifras son nodos unidos por una pista. Se quitó la imagen
  `logo-neo.jpeg` de esta sección (repetía el logo y tiene una marca de agua de estrella
  en la esquina inferior derecha).
- **Servicios:** tablero 2×2 de "nodos" con pistas punteadas entre ellos; los secundarios
  van en una fila compacta.
- **Equipo:** perfil compacto; la experiencia y la educación se despliegan con
  "Ver trayectoria".
- **Tecnologías:** filas con el nivel como 3 LEDs (Sólido 3, En práctica 2, Explorando 1).
- **Proyectos vacíos:** un conector abierto (pista que termina en un anillo con "+") y el
  botón **Cuéntanos tu proyecto**.
- **Contacto:** bloque con la línea del degradado arriba, etiquetas visibles en el formulario.
- **Detalle de proyecto:** mismo estilo; si el enlace no corresponde a ningún proyecto, se
  muestra un mensaje claro y un botón para volver, en vez de secciones vacías.
- Se quitó la pastilla "Innovación • Desarrollo • Tecnología" del hero.

## Animaciones e interacciones

Archivos: `css/motion.css` y `js/interactions.js`. Siguen la skill "motion" (controles en
100–300 ms, sin rebotes ni bucles). Excepción documentada: la entrada del hero, el trazado
de las pistas y las apariciones al hacer scroll usan 600 ms, una sola vez.

- **Pistas del logo:** se trazan hacia afuera al cargar y sus terminales aparecen al final.
- **Paralaje:** con mouse, el logo se acerca al cursor y las pistas se alejan un poco.
- **Riel de circuito** (pantallas de 1200 px o más): una pista vertical acompaña la página,
  se llena con el degradado del logo a medida que se baja y cada título de sección tiene
  un nodo que se enciende al llegar. Usa el único listener de scroll de `main.js`.
- **Servicios:** en hover la tarjeta sube y su punto de conexión se enciende.
- **LEDs** del stack que se encienden uno tras otro; cascadas suaves en listas.
- **Cambio de tema** con fundido (Chrome y Edge).
- Todo se desactiva con `prefers-reduced-motion`; los efectos de puntero solo con mouse.

**Errores corregidos de paso:** al hacer `<main>` relativo (por el riel), el resaltado del
menú y el desplazamiento al hacer clic usaban `offsetTop`, que pasaba a medirse desde
`<main>`; ahora usan la posición real en la página. "Inicio" se marca al estar arriba.
Entre 992 y 1199 px el botón Contáctanos queda solo con su ícono para que el menú quepa.

**Se mantiene:** labels, foco visible, un solo listener de scroll, `noscript`, Open Graph y
datos estructurados `Organization`. Se añadió "Saltar al contenido".

**Comprobado:** capturas en 375, 768, 1024, 1280 y 1440 px en claro y oscuro, sin scroll
horizontal ni errores en consola; menú, desplazamiento, trayectoria, riel, tema y
movimiento reducido probados en el navegador.

## Pendientes que no son de diseño

- **Fotos del equipo:** `images/breiner.jpg` y `images/luisa.jpg` son avatares. La foto real
  de Breiner está en su portafolio (`Portafolio virtual breiner/images/perfil.jpg`).
- **`video/`** (≈5 MB) ya no se usa: se puede borrar. Antes de publicar, borra también
  `_respaldo-diseno/` o sácala del despliegue.
- Siguen los pendientes de antes: EmailJS sin configurar y `SITE_URL` en las etiquetas OG.
