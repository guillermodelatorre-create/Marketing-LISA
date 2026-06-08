# QUICK WINS — Acciones de Alto Impacto en < 15 Minutos
## LISA Institute · Mayo 2026

Ordenadas por (Severidad × Impacto estimado) DESC

---

## ⚡ QW-1 · Cambiar CTA "Order Now" → "Solicita tu Entrevista"
**Tiempo:** 5 minutos · **Severidad:** Critical · **Plataforma:** Meta

El error más dañino y más fácil de corregir de toda la cuenta. Tres anuncios con "Order Now" en un máster de 4.190€ con proceso de admisión en 3 fases.

```
Cómo hacerlo:
1. Meta Ads Manager → Campañas → Anuncios
2. Anuncio 1 (Analista Inteligencia azul) → Editar → CTA Button → "Solicita tu Entrevista"
   o si no está disponible como opción: usar "Learn More" + cambiar headline
3. Repetir en Anuncio 3 (Analista Criminal rojo)
4. Repetir en Anuncio 6 (Prospectiva)
5. Cambiar también los headlines:
   "Mejora tu CV y tu futuro"  →  "El máster que forma a los que dirigen"
   "Inscríbete Ahora"          →  "Plazas limitadas · Admisión personalizada"
6. Cambiar descriptions:
   "Becas y Descuentos disponibles"  →  "Proceso de admisión · Plazas limitadas"
```

**Impacto esperado:** Mejora inmediata en calidad del lead y tasa de booking. Los leads que ven "Solicita tu entrevista" ya llegan al equipo de admisiones con una expectativa correcta del proceso.

---

## ⚡ QW-2 · Pausar Anuncio 5 (duplicado de Anuncio 2)
**Tiempo:** 2 minutos · **Severidad:** High · **Plataforma:** Meta

El Anuncio 5 es copia del Anuncio 2. Andromeda los agrupa y uno de los dos no entrega. Presupuesto quemado en un ad fantasma.

```
Cómo hacerlo:
1. Meta Ads Manager → Anuncios → identificar el Anuncio 5
   (mismo copy "¿Te gustaría ser Analista de Inteligencia?" + misma foto con sombrero)
2. Toggle → OFF (pausar)
3. El presupuesto se redirige automáticamente al Anuncio 2
```

**Impacto esperado:** El Anuncio 2 (el mejor del conjunto, score 52/100) recibe más presupuesto sin cambiar nada más.

---

## ⚡ QW-3 · Corregir UTM parameters rotos
**Tiempo:** 10 minutos · **Severidad:** Critical · **Plataforma:** Meta

Los `{{variables}}` sin reemplazar hacen que GA4 y el CRM no puedan atribuir qué anuncio genera cada lead.

```
Cómo hacerlo:
1. Meta Ads Manager → cualquier anuncio → Editar → Destination URL
2. Encontrar el campo "URL Parameters"
3. Borrar el contenido actual (que tiene {{variables}} literales)
4. Usar el botón "Build a URL Parameter" de Meta
5. Configurar:
   utm_source    = {{site_source_name}}   [seleccionar del desplegable]
   utm_medium    = {{placement}}          [seleccionar del desplegable]
   utm_campaign  = {{campaign.name}}      [seleccionar del desplegable]
   utm_content   = {{ad.name}}            [seleccionar del desplegable]
6. Copiar y aplicar a TODOS los anuncios activos
7. Verificar haciendo clic en el anuncio desde Facebook: 
   la URL debe mostrar utm_source=Facebook, no utm_source={{site_source_name}}
```

**Impacto esperado:** Atribución completa activada. Podréis saber exactamente qué anuncio, campaña y placement genera cada lead.

---

## ⚡ QW-4 · Eliminar "No necesitas conocimientos previos" de anuncios ICP profesional
**Tiempo:** 8 minutos · **Severidad:** High · **Plataforma:** Meta

Este mensaje está en 4 de 6 anuncios y atrae el perfil equivocado (principiante) en las campañas que apuntan a profesionales en activo.

```
Cómo hacerlo:
1. Anuncios 1, 3, 4, 6 → Editar → Primary Text
2. Eliminar la línea "🚫 No necesitas conocimientos previos"
3. Reemplazar por (elige una):
   • "👮 Para profesionales del sector que buscan el siguiente nivel"
   • "🎯 Proceso de admisión personalizado según tu perfil"
   • "🏆 Programa diseñado por y para quienes ya están en el sector"
4. Guardar
```

**Impacto esperado:** Los leads del ICP profesional (policías, militares, etc.) se sienten más identificados. Potencial mejora en tasa de booking de la llamada de cualificación.

---

## ⚡ QW-5 · Crear Brand Protection en Google Ads
**Tiempo:** 15 minutos · **Severidad:** Critical · **Plataforma:** Google

Sin esto, UNIR o Nebrija pueden pujar sobre "LISA Institute" y capturar usuarios que os buscan directamente.

```
Cómo hacerlo:
1. Abrir Google Ads (ads.google.com) — crear cuenta si no existe
2. Nueva campaña → Objetivos: Leads → Red de Búsqueda
3. Nombre: "BRAND_LISA_Protection_ES"
4. Geo: España (+ Colombia, México si LatAm es relevante)
5. Keywords (Exacto + Frase):
   [LISA Institute], "LISA Institute"
   [Instituto LISA], "Instituto LISA"  
   [LISA máster], "máster LISA"
   [lisainstitute], "lisa institute seguridad"
6. Puja: Manual CPC · Máximo 1,50€ (nadie más puja en vuestra marca exacta)
7. Budget: 200€/mes (suficiente para marca)
8. Ad: 
   Headline 1: LISA Institute | Másters Profesionales
   Headline 2: Formación por Profesionales en Activo
   Headline 3: Proceso de Admisión Personalizado
   Description: Másters en Ciberseguridad, Inteligencia, Criminología y Geopolítica.
                Profesorado 100% en activo. LISA Work incluido.
9. URL: lisainstitute.com (homepage o página de programas)
10. Lanzar
```

**Impacto esperado:** Protección de marca inmediata. CPCs bajos (1-2€) porque nadie compite en vuestro nombre exacto.

---

## ⚡ QW-6 · Añadir headline de LISA Work en al menos 2 anuncios
**Tiempo:** 6 minutos · **Severidad:** High · **Plataforma:** Meta

LISA Work es el diferenciador más exclusivo y más difícil de copiar. No aparece nombrado en ningún headline actual — solo como "+120 Ofertas de trabajo" en el body, donde nadie lo lee.

```
Cómo hacerlo:
1. Anuncio 2 (mejor anuncio, score 52/100) → Editar → Headline
2. Cambiar "Conviértete en Analista de Inteligencia"
   por "El único máster con acceso a LISA Work"
3. Anuncio 4 (Ciberseguridad) → Headline
   "Hazte Experto en Ciberseguridad"
   → "Ciberseguridad · LISA Work · Profesores CNI"
4. Guardar
```

**Impacto esperado:** LISA Work aparece en el primer elemento de texto que lee el usuario. Diferenciación inmediata respecto a UNIR y Nebrija en el feed.

---

## RESUMEN — MINUTOS TOTALES

| Quick Win | Tiempo | Impacto |
|---|---|---|
| QW-1: CTA "Solicita tu Entrevista" | 5 min | ★★★★★ |
| QW-2: Pausar anuncio duplicado | 2 min | ★★★★☆ |
| QW-3: Corregir UTMs | 10 min | ★★★★★ |
| QW-4: Eliminar "sin conocimientos" | 8 min | ★★★★☆ |
| QW-5: Google Brand Protection | 15 min | ★★★★★ |
| QW-6: LISA Work en headline | 6 min | ★★★★☆ |
| **TOTAL** | **46 min** | |

**En menos de 1 hora podéis resolver 3 problemas críticos y 3 altos de la auditoría.**

---

*Generado con Claude Ads · LISA Institute · Mayo 2026*
