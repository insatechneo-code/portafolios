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
