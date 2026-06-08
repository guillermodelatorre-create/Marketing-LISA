# PLAN DE ACCIÓN PRIORIZADO
## LISA Institute · Basado en Auditoría Multi-Plataforma · Mayo 2026

---

## RESUMEN DE PRIORIDADES

```
🔴 CRÍTICO (fix inmediato):    8 acciones
🟠 ALTO (< 7 días):            9 acciones
🟡 MEDIO (< 30 días):          7 acciones
⚪ BAJO (backlog):             4 acciones
```

---

## 🔴 CRÍTICO — FIX INMEDIATO

### C1 · Corregir UTM parameters rotos
**Plataforma:** Meta · **Tiempo:** 10 min · **Impacto:** Atribución completa activada

Los parámetros `{{site_source_name}}`, `{{placement}}`, `{{campaign.name}}`, `{{ad.name}}` están siendo enviados como texto literal. Ningún lead tiene atribución correcta.

**Fix:**
1. Meta Ads Manager → cualquier anuncio activo → Editar → URL Parameters
2. Usar el botón "Build a URL parameter" de Meta (no escribir a mano)
3. Seleccionar variables dinámicas del desplegable de Meta
4. Aplicar a todos los anuncios activos
5. Verificar en GA4 o CRM que `utm_source=facebook` aparece correctamente

---

### C2 · Cambiar CTA "Order Now" → "Solicita tu Entrevista"
**Plataforma:** Meta · **Tiempo:** 5 min · **Impacto:** CVR y calidad de lead

3 de 6 anuncios tienen "Order Now". Inaceptable para un producto de 4.190€ con proceso de admisión.

**Fix:**
- Anuncio 1 (Analista Inteligencia, azul): Order Now → "Solicita tu Entrevista"
- Anuncio 3 (Analista Criminal, rojo): Order Now → "Solicita tu Entrevista"
- Anuncio 6 (Prospectiva, suit): Order Now → "Solicita tu Entrevista"
- Headlines: "Mejora tu CV y tu futuro" → "El máster que forma a los que dirigen"
- Descriptions: "Becas y Descuentos disponibles" → "Proceso de admisión · Plazas limitadas"

---

### C3 · Pausar Anuncio 5 (duplicado del Anuncio 2)
**Plataforma:** Meta · **Tiempo:** 2 min · **Impacto:** Elimina penalización Andromeda

El Anuncio 5 es copia exacta del Anuncio 2. Andromeda los agrupa y suprime uno de los dos. Solo uno entrega tráfico; el otro consume presupuesto sin resultado.

**Fix:** Pausar Anuncio 5 → libera presupuesto para Anuncio 2 que es el mejor (score 52/100)

---

### C4 · Activar Meta CAPI (Conversions API)
**Plataforma:** Meta · **Tiempo:** 2-4 horas (técnico) · **Impacto:** +15-20% más conversiones medidas, +20-40% mejor calidad de optimización

Sin CAPI, Meta pierde 30-40% de las señales post-iOS 14.5. El algoritmo está optimizando con datos incompletos.

**Fix options (por orden de facilidad):**
1. Meta CAPI Gateway (zero-code): en Events Manager → activar CAPI Gateway si el pixel está en GTM
2. Via CRM/plataforma: si usan HubSpot, Salesforce, ActiveCampaign → activar integración nativa
3. Via servidor: implementar envío de evento `Lead` server-side al recibir el formulario

**Verificar:** Events Manager → Overview → columna "CAPI" debe mostrar eventos activos

---

### C5 · Lanzar Google Ads — Brand Protection
**Plataforma:** Google · **Tiempo:** 15 min · **Impacto:** Evita que UNIR/Nebrija capturen búsquedas de marca LISA

Cada día sin campaña de marca en Google, UNIR puede pujar sobre "LISA Institute" y capturar a usuarios que os están buscando directamente.

**Fix:**
1. Crear cuenta Google Ads (si no existe)
2. Campaña: "Brand_LISA_Protection" · Match: Exacto + Frase
3. Keywords: "LISA Institute", "Instituto LISA", "LISA máster", "lisainstitute"
4. Budget: 200€/mes · CPC max: 1-2€ (nadie más puja en vuestra marca)
5. Lanzar esta semana

---

### C6 · Implementar Consent Mode V2 (EEA)
**Plataforma:** Meta + Google (cuando se active) · **Tiempo:** 2-3 horas (técnico)

España = EEA. Sin Consent Mode V2 desde julio 2025, Meta no puede modelar conversiones de usuarios que rechazan cookies. Puede estar perdiendo 30-50% de datos de conversión.

**Fix:**
1. Verificar si el banner de cookies actual usa un CMP compatible (Cookiebot, Didomi, etc.)
2. Activar modo avanzado de Consent Mode V2 (no el básico)
3. Conectar CMP con GTM → señales ad_storage, ad_user_data, analytics_storage

---

### C7 · Eliminar "No necesitas conocimientos previos" en campañas de ICP profesional
**Plataforma:** Meta · **Tiempo:** 8 min · **Impacto:** Mejora calidad de lead para equipo de admisiones

Este mensaje está en 4 de 6 anuncios y atrae al ICP equivocado para las campañas de prospecting de profesionales.

**Fix:**
- Separar en dos versiones de copy por ICP:
  - ICP Profesional: "Para profesionales del sector que quieren el siguiente nivel"
  - ICP Reconversión: mantener "el programa se adapta a tu nivel de partida"

---

### C8 · Verificar y activar deduplicación de eventos (event_id)
**Plataforma:** Meta · **Tiempo:** 30 min (técnico) · **Impacto:** Elimina doble conteo

Si eventualmente se activa CAPI, sin event_id único los eventos se contarán dos veces (pixel + CAPI = 2× leads). Verificar que el formulario genera event_id único para cada envío.

---

## 🟠 ALTO — ANTES DEL VIERNES

### A1 · Lanzar Google Search — alta intención por programa
**Plataforma:** Google · **Tiempo:** 2-3 horas

Cada día que UNIR aparece en "máster analista inteligencia" y LISA no, son leads que van a UNIR. Las keywords de nicho (analista inteligencia, analista criminal, geopolítica) están prácticamente sin competencia.

**Campañas a lanzar:**
1. `GOOGLE_LEAD_Másteres_HighIntent_ES` — grupos por programa
2. `GOOGLE_LEAD_Competidores_Conquista_ES` — UNIR/Nebrija keywords
3. Budget: 2.400€/mes total · Maximize Clicks · CPC max 4€ al inicio

---

### A2 · Activar retargeting de leads no citados (lista CRM)
**Plataforma:** Meta · **Tiempo:** 30 min

Los 280 leads del mes pasado son una audiencia de retargeting de alto valor infrautilizada. Los leads que no agendaron entrevista pueden ser calentados con ads antes de que los asesores vuelvan a llamar.

**Fix:**
1. Exportar de CRM: leads sin entrevista agendada (últimos 60 días)
2. Meta Ads Manager → Audiences → Custom Audience → Customer List → subir CSV
3. Crear campaña `META_RETAR_Leads_NoCitados_ES` con mensaje de urgencia/diferencial
4. Budget: 800-1.000€/mes separado del prospecting

---

### A3 · Crear creativo de vídeo — profesor en activo
**Plataforma:** Meta + LinkedIn · **Tiempo:** 1 día (coordinación)

El activo creativo de mayor impacto y menor coste de producción. Un profesor grabándose con el iPhone en su entorno profesional real (insignia visible, entorno institucional).

**Brief:**
- Duración: 20-30 segundos
- Estructura: [Cargo real] → [Por qué enseña en LISA] → [CTA]
- Formato: vertical 9:16 para Reels + cuadrado 1:1 para Feed
- Producción: iPhone, sin edición profesional necesaria — autenticidad > producción

---

### A4 · Crear creativo de testimonial de alumno
**Plataforma:** Meta + YouTube · **Tiempo:** 2-3 días

**Brief:**
- Alumno con cargo operativo actual visible (nombrar empresa/institución si es posible)
- Estructura BAB: cargo antes → cargo actual → "el máster fue el puente"
- Duración: 60-90 segundos
- Formato: UGC-style, iPhone, sin producción

---

### A5 · Activar LinkedIn Ads — Lead Gen Form por cargo
**Plataforma:** LinkedIn · **Tiempo:** 2 horas

**Setup:**
1. Crear cuenta LinkedIn Ads (Business Manager)
2. Campaña: `LI_LEAD_Profesionales_Seguridad_ES`
3. Targeting: España · Cargo: Inspector, Oficial, Detective, Abogado penalista, Criminólogo
4. Formato: Lead Gen Form (datos prellenados, sin salir de LinkedIn)
5. Budget: 1.800€/mes · CPC manual al inicio (3-5€)

---

### A6 · Configurar Offline Conversions API (CRM → Meta)
**Plataforma:** Meta · **Tiempo:** 4-8 horas (técnico)

El paso más transformador para la calidad del algoritmo. Cuando Meta sabe que un lead se convirtió en matrícula de 4.190€, empieza a buscar perfiles similares en vez de optimizar hacia formularios.

**Fix:**
1. Identificar el CRM en uso (HubSpot, Salesforce, etc.)
2. Activar integración nativa CRM → Meta CAPI
3. Enviar evento de conversión cuando una matrícula se formaliza
4. Incluir valor: 4.190€ para que Meta optimice por valor, no solo por conversiones

---

### A7 · Separar campañas por ICP en Meta
**Plataforma:** Meta · **Tiempo:** 1 hora

Un solo conjunto de anuncios para dos perfiles muy distintos (profesional en activo vs. reconversión laboral) produce mensajes que no resuenan del todo con ninguno.

**Estructura recomendada:**
- `META_PROS_ICP_Profesionales_Seguridad_ES` — copy de identidad profesional
- `META_PROS_ICP_Reconversion_Laboral_ES` — copy de transformación/aspiración

---

### A8 · Activar carrusel "Quién enseña en LISA"
**Plataforma:** Meta · **Tiempo:** 3-4 horas (diseño)

**Estructura del carrusel:**
- Slide 1: "En LISA no aprenderás de académicos." (hook)
- Slide 2-5: Un profesor por slide — Nombre · Cargo real · Institución · foto
- Slide 6: "LISA Work — el acceso al mercado que otros no tienen" · CTA

---

### A9 · Configurar reglas automáticas en Meta
**Plataforma:** Meta · **Tiempo:** 20 min

```
Regla 1 — Kill: Si gasto > 96€ y conversiones = 0 → PAUSAR
Regla 2 — Fatiga: Si frecuencia > 3.5 (7 días) → NOTIFICAR
Regla 3 — Escalar: Si CPL < 25€ durante 7 días → aumentar budget 20%
```

---

## 🟡 MEDIO — ANTES DEL 15 DE JUNIO

### M1 · Implementar Google Ads Smart Bidding cuando ≥30 conv/mes
Mover de Maximize Clicks a Target CPA cuando Google Search acumule 30+ conversiones en 30 días.

### M2 · Lanzar YouTube con testimonial de alumno
Usar el vídeo BAB del alumno en YouTube pre-roll. Budget inicial: 600€/mes.

### M3 · LinkedIn Thought Leader Ads desde perfil de docente
Requiere docente con perfil LinkedIn activo. Costo de CPC 2-5× más bajo que Sponsored Content estándar.

### M4 · Activar Advantage+ Audience en Meta
Una vez que Offline Conversions esté activo y haya >50 matrículas registradas, Advantage+ Audience puede encontrar perfiles similares automáticamente.

### M5 · Activar Google Enhanced Conversions
Cuando Google Ads esté activo y con ≥15 conversiones/mes. Mejora medición en ~10%.

### M6 · Configurar GA4 cross-platform
Etiquetado unificado de todos los canales en GA4 para tener una visión de fuente real del embudo completo.

### M7 · Test A/B formal: hook identidad vs. hook aspiracional
Usando el framework de `/ads-test` para diseñar el test con significancia estadística correcta.

---

## ⚪ BAJO — BACKLOG

### B1 · Microsoft Ads (Bing)
Cuando Google Search tenga 2+ meses de datos, importar a Microsoft Ads. CPCs 20-35% más baratos.

### B2 · Activar Amazon Ads
No aplicable para LISA Institute — Amazon no es canal para este producto.

### B3 · UTM tracking en todas las fuentes orgánicas
Etiquetado correcto de tráfico orgánico (Instagram, LinkedIn orgánico) para no contaminar datos de paid.

### B4 · Re-auditoría a 90 días
Con todas las plataformas activas y Offline Conversions conectadas, re-auditar en agosto 2026 para medir progreso.

---

## CALENDARIO DE IMPLEMENTACIÓN

```
SEMANA 1 (esta semana):
  Lun-Mar: C1, C2, C3, C5 (UTMs, CTAs, duplicado, brand Google)
  Mié-Jue: C4, C7 (CAPI, copy ICP)
  Vie:     A1 inicio (Google Search alta intención)

SEMANA 2:
  Lun-Mar: A2 (retargeting CRM), A5 (LinkedIn)
  Mié-Vie: A3, A4 (coordinación grabaciones vídeo)

SEMANA 3-4:
  A6 (Offline Conversions) · A7 (separar campañas ICP) · A8 (carrusel) · A9 (reglas)

MES 2:
  M2 (YouTube) · M3 (TLA LinkedIn) · M4 (Advantage+)
  
MES 3:
  M1 (Smart Bidding Google) · M5-M6 (Enhanced Conv + GA4)
  Re-auditoría parcial
```

---

*Generado con Claude Ads · LISA Institute · Mayo 2026*
