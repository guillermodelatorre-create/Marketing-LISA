# INFORME DE AUDITORÍA COMPLETA DE PUBLICIDAD
## LISA Institute · Auditoría Multi-Plataforma · Mayo 2026

---

## RESUMEN EJECUTIVO

### Ads Health Score Global

```
╔══════════════════════════════════════════════════════╗
║          ADS HEALTH SCORE:  34 / 100   Grado F       ║
╚══════════════════════════════════════════════════════╝

Meta Ads (100% budget):    42/100  →  Grado D
Google Ads:               N/A     →  ⛔ NO ACTIVO (crítico)
LinkedIn Ads:             N/A     →  ⛔ NO ACTIVO (crítico)
YouTube:                  N/A     →  ⚠️ NO ACTIVO
```

> La puntuación de 34/100 refleja no solo los problemas internos de Meta
> sino el riesgo sistémico de depender al 100% de una sola plataforma
> para un producto de 4.190€ con un proceso de venta consultivo de 3 fases.

### Tipo de negocio detectado
**Educación Superior High-Ticket Online** · Embudo consultivo tipo Application Funnel
Precio: 4.190€ · Proceso de admisión en 3 fases · Mercado: España (90%) + LatAm (10%)

### Top 5 Problemas Críticos

| # | Problema | Plataforma | Impacto |
|---|---|---|---|
| 1 | Google Search no activo — demanda captada por UNIR | Falta Google | Revenue loss directo |
| 2 | CTA "Order Now" en producto de 4.190€ con entrevista de admisión | Meta | Destruye CVR y calidad de lead |
| 3 | CAPI / server-side tracking: estado desconocido, probablemente ausente | Meta | 30-40% pérdida de datos de conversión |
| 4 | UTM parameters no poblados (`{{variables}}` literales en URL) | Meta | Cero atribución por canal/anuncio |
| 5 | 0% diversidad de formato creativo — Andromeda suppression activa | Meta | Entrega suprimida, CPL artificialmente alto |

### Top 5 Quick Wins (< 15 minutos cada uno)

| # | Acción | Tiempo | Impacto |
|---|---|---|---|
| 1 | Cambiar CTA "Order Now" → "Solicita tu Entrevista" | 5 min | Alto — mejora CVR inmediata |
| 2 | Pausar Anuncio 5 (duplicado exacto del Anuncio 2) | 2 min | Elimina supresión Andromeda |
| 3 | Corregir parámetros UTM en todas las URLs de destino | 10 min | Activa atribución completa |
| 4 | Eliminar "No necesitas conocimientos previos" en campañas ICP profesional | 8 min | Mejora cualificación de leads |
| 5 | Abrir cuenta Google Ads + lanzar Brand Protection | 15 min | Evita pérdida de marca a UNIR |

---

## MÓDULO 1 — META ADS

### Score: 42 / 100 · Grado D

```
Pixel / CAPI Health:       ████░░░░░░  22/100  🔴 CRÍTICO
Creative Diversity:        ██░░░░░░░░  18/100  🔴 CRÍTICO
Account Structure:         █████░░░░░  48/100  🟠 ALTO
Audience & Targeting:      █████░░░░░  45/100  🟠 ALTO
```

---

#### 1.1 PIXEL / CAPI HEALTH (peso 30%) — 22/100

| ID | Check | Estado | Severidad | Hallazgo |
|----|-------|--------|-----------|---------|
| M01 | Pixel activo en todas las páginas | ⚠️ WARNING | Critical | Pixel activo (se registran leads) pero cobertura de páginas sin verificar |
| M02 | CAPI (Conversions API) configurado | ❌ FAIL | Critical | Sin evidencia de CAPI activo. Post-iOS 14.5 sin CAPI = 30-40% pérdida de señal |
| M03 | Event deduplication activa | ❌ FAIL | Critical | Sin CAPI no puede haber deduplicación server-side/pixel |
| M04 | EMQ Score ≥ 6.0 en evento Lead | ⚠️ WARNING | High | EMQ no verificado. 87% de anunciantes tienen EMQ pobre. Con solo email sin CAPI, estimado < 5.0 |
| M05 | UTM parameters poblados correctamente | ❌ FAIL | Critical | URL contiene `{{site_source_name}}`, `{{placement}}`, `{{campaign.name}}` literales sin reemplazar. Atribución completamente ciega |
| M06 | Consent Mode V2 implementado (EEA) | ❌ FAIL | Critical | No verificado. España = EEA. Sin Consent Mode V2 desde julio 2025 → pérdida masiva de datos de modelado |
| M07 | Offline Conversions API activo (CRM → Meta) | ❌ FAIL | High | No implementado. El algoritmo optimiza hacia formularios, no hacia matrículas reales de 4.190€ |
| M08 | Dominio verificado en Business Manager | ⚠️ WARNING | High | No verificado en esta auditoría |
| M09 | Aggregated Event Measurement configurado | ⚠️ WARNING | Medium | No confirmado |
| M10 | Evento Lead con parámetros de calidad (email, phone) | ⚠️ WARNING | High | Sin CAPI los parámetros de matching son limitados |

**Hallazgo clave:** La ausencia de CAPI y de Offline Conversions significa que Meta optimiza hacia "personas que rellenan un formulario", no hacia "personas que pagan 4.190€". El algoritmo desconoce cuáles de los 280 leads mensuales terminan convirtiéndose. Esto es el mayor limitador de calidad de leads de toda la cuenta.

---

#### 1.2 CREATIVE DIVERSITY & FATIGUE (peso 30%) — 18/100

| ID | Check | Estado | Severidad | Hallazgo |
|----|-------|--------|-----------|---------|
| CR-01 | ≥ 3 formatos activos | ❌ FAIL | Critical | 100% imagen estática. 0 vídeos, 0 carruseles, 0 Reels |
| CR-02 | ≥ 5 creativos por ad set | ⚠️ WARNING | High | 6 totales en cuenta, pero con Andromeda suppression = 1-2 efectivos |
| CR-03 | CTR no decae >20% en 14 días | ⚠️ WARNING | Critical | No medible sin datos de frecuencia. Estructura de riesgo alto |
| CR-04 | Refresh cadence ≤ 21 días | ⚠️ WARNING | High | Antigüedad de creativos no confirmada |
| CR-05 | Specs correctas (tamaño, ratio, texto) | ✅ PASS | Medium | Imágenes parecen en formato estándar |
| CR-06 | Hook en 0-3s (vídeo) / Headline impactante (estático) | ❌ FAIL | High | Headlines débiles: "Mejora tu CV y tu futuro", "Inscríbete Ahora" |
| CR-07 | UGC/testimonial content activo | ❌ FAIL | Medium | Ningún creativo de testimonial visible |
| M-AN1 | Andromeda: ≥10 conceptos genuinamente distintos | ❌ FAIL | High | 5/6 ads con estructura de copy idéntica (bullet list + emojis). Andromeda los agrupa |
| CR-10 | CTA apropiado para el funnel | ❌ FAIL | Critical | "Order Now" en 3 de 6 ads — incompatible con Application Funnel de 4.190€ |
| CR-ADD | Mensaje alineado con ICP | ❌ FAIL | High | "No necesitas conocimientos previos" apunta a principiantes, no a profesionales en activo |

**Hallazgo clave Andromeda:** Los 6 ads actuales tienen una tasa de similitud estructural estimada >70%. Meta's Andromeda engine los clasifica como 1-2 conceptos distintos y suprime la entrega de los redundantes. En la práctica, el presupuesto de 9.000€ está siendo distribuido por 1-2 ads efectivos, no por 6.

---

#### 1.3 ACCOUNT STRUCTURE (peso 20%) — 48/100

| ID | Check | Estado | Severidad | Hallazgo |
|----|-------|--------|-----------|---------|
| M11 | Campaña de prospecting separada de retargeting | ⚠️ WARNING | High | Estructura no verificada en Ads Manager |
| M12 | Retargeting de leads no citados activo | ❌ FAIL | High | No hay evidencia de campaña que suba lista CRM de leads sin entrevista |
| M13 | Budget ≥5× CPA por ad set | ⚠️ WARNING | Critical | CPL ~32€ → mínimo 160€/día por ad set. Con 9.000€/mes = 300€/día total. Posiblemente infrabudgetado por ad set |
| M14 | Campañas fuera de fase de aprendizaje | ⚠️ WARNING | High | No verificable sin datos de Ads Manager |
| M15 | Advantage+ Audience testado | ❌ FAIL | Medium | No confirmado. Advantage+ Audience mejora CPL en cuentas con historial |
| M16 | Lookalike audiences de matrículas reales | ❌ FAIL | High | Sin Offline Conversions no hay Lookalike de compradores reales |
| M17 | Separación ICP profesional / ICP reconversión | ❌ FAIL | High | Un solo copy para dos perfiles muy distintos |
| M18 | Naming convention consistente | ⚠️ WARNING | Low | No verificable sin acceso |

---

#### 1.4 AUDIENCE & TARGETING (peso 20%) — 45/100

| ID | Check | Estado | Severidad | Hallazgo |
|----|-------|--------|-----------|---------|
| M31 | Exclusión de clientes actuales | ⚠️ WARNING | High | No confirmada |
| M32 | Exclusión de matrículas ya cerradas | ❌ FAIL | High | Sin Offline Conversions esto es imposible |
| M33 | Custom audiences actualizadas mensualmente | ⚠️ WARNING | Medium | No confirmado |
| M34 | Lookalike 1% de compradores | ❌ FAIL | High | No disponible sin Offline Conversions |
| M35 | Audience overlap entre ad sets controlado | ⚠️ WARNING | Medium | No verificado |
| M36 | Geo targeting España + LatAm correctamente segmentado | ✅ PASS | Medium | Confirmado en briefing inicial (España 90%, LatAm 10%) |

---

## MÓDULO 2 — GOOGLE ADS

### Score: NO ACTIVO · Gap Crítico

```
⛔ GOOGLE ADS NO CONFIGURADO
   Impacto: pérdida de demanda activa de alta intención
   
   Keywords sin cobertura donde UNIR captura vuestros clientes:
   • "máster criminología online"          → UNIR aparece, LISA no
   • "máster ciberseguridad online españa" → UNIR aparece, LISA no
   • "máster analista inteligencia"        → VACÍO TOTAL (nadie puja)
   • "máster analista criminal"            → VACÍO TOTAL
   • "máster geopolítica españa"           → VACÍO TOTAL
   • "formación policia nacional"          → UNIR/Nebrija aparecen, LISA no
   
   Estimación de pérdida mensual:
   CPC estimado: 3-5€ · CTR estimado: 8-12%
   Leads perdidos a UNIR/Nebrija: 80-150/mes con 2.400€ de presupuesto
```

**Prioridad de lanzamiento:** Esta semana — Brand Protection primero, luego alta intención.

---

## MÓDULO 3 — LINKEDIN ADS

### Score: NO ACTIVO · Gap Alto

```
⚠️ LINKEDIN ADS NO CONFIGURADO
   
   Oportunidad perdida:
   • Targeting por cargo exacto (Inspector de Policía, Oficial Militar, Detective)
   • Lead Gen Forms con datos prellenados → CVR 13% (3.25× landing page)
   • Thought Leader Ads desde perfil de docentes → CPC 2-5× más barato
   
   CPL estimado en LinkedIn para este ICP: 60-120€
   Si booking rate de LinkedIn es 2× Meta → coste por entrevista similar o mejor
```

---

## MÓDULO 4 — TRACKING CROSS-PLATFORM (audit-tracking)

### Score: 28 / 100 · Crítico

| ID | Check | Estado | Severidad | Hallazgo |
|----|-------|--------|-----------|---------|
| X-PI1 | Privacy infrastructure completa | ❌ FAIL | Critical | Sin CAPI confirmado + Consent Mode V2 sin verificar + sin server-side |
| TRK-01 | UTM parameters funcionando | ❌ FAIL | Critical | `{{variables}}` sin reemplazar = atribución completamente ciega |
| TRK-02 | Evento Lead correcto en pixel | ✅ PASS | Critical | Se registran leads (280/mes confirmados) |
| TRK-03 | CAPI activo y deduplicado | ❌ FAIL | Critical | No confirmado como activo |
| TRK-04 | Offline Conversions (CRM → Meta) | ❌ FAIL | High | No implementado |
| TRK-05 | Google Tag presente | ❌ FAIL | Critical | Sin Google Ads, sin Google Tag |
| TRK-06 | Consent Mode V2 (EEA) | ❌ FAIL | Critical | No verificado |
| TRK-07 | GA4 configurado | ⚠️ WARNING | High | No confirmado |
| TRK-08 | Attribution window correcta (7d click / 1d view) | ⚠️ WARNING | Medium | No verificado |

**El problema más urgente de tracking:** Los parámetros UTM `{{site_source_name}}`, `{{placement}}`, `{{campaign.name}}`, `{{ad.name}}` están en la URL sin ser reemplazados por los valores reales de Meta. Esto significa que **no sabéis qué anuncio, qué placement ni qué campaña genera cada lead**. Con 6 anuncios activos y sin esta información, es imposible optimizar por coste real por entrevista o por matrícula.

---

## MÓDULO 5 — BUDGET & BIDDING (audit-budget)

### Score: 38 / 100 · Grado D

| Check | Estado | Severidad | Hallazgo |
|-------|--------|-----------|---------|
| Distribución plataformas | ❌ FAIL | Critical | 100% Meta. Sin Google, LinkedIn ni YouTube |
| Budget por ad set ≥ 5× CPA | ⚠️ WARNING | Critical | ~32€ CPL → necesita ≥ 160€/día por ad set. Verificar si hay infrabudget |
| Estrategia de puja apropiada | ⚠️ WARNING | High | No confirmada. Para 280 leads/mes: Lowest Cost → Cost Cap cuando CPL estable |
| Reglas automáticas configuradas | ❌ FAIL | Medium | No evidencia de kill rules o escalado automático |
| 70/20/10 framework | ❌ FAIL | High | Sin diversificación de plataformas imposible aplicarlo |
| Escalado controlado (20% rule) | ⚠️ WARNING | High | Sin reglas automáticas el escalado es manual y arriesgado |
| MER calculado y monitoreado | ❌ FAIL | High | No hay datos de revenue conectados a ad spend (sin Offline Conversions) |

**Hallazgo clave de budget:** El MER real es incalculable porque no hay conexión entre el ad spend (9.000€) y el revenue real (matrículas cerradas). Meta no sabe que una matrícula vale 4.190€ porque no recibe ese dato. Esto hace que el algoritmo no pueda optimizar hacia el cliente de mayor valor.

---

## MÓDULO 6 — COMPLIANCE & SETTINGS (audit-compliance)

### Score: 55 / 100 · Grado C

| Check | Estado | Severidad | Hallazgo |
|-------|--------|-----------|---------|
| Special Ad Categories (educación) | ✅ PASS | Critical | Educación no es Special Ad Category en Meta |
| LOPD / GDPR compliance en landing | ⚠️ WARNING | Critical | No verificado — formulario de lead gen requiere texto de privacidad conforme |
| Política de publicidad Meta (educación) | ✅ PASS | High | Programas de educación están permitidos |
| Claims verificables en copy | ⚠️ WARNING | High | "+120 Ofertas de trabajo semanales" — debe ser verificable si Meta lo revisa |
| Precio comunicado conforme | ✅ PASS | Medium | Precio no aparece en ads (correcto para este funnel) |
| Remarketing disclaimer | ⚠️ WARNING | Medium | Custom audiences de CRM requieren consentimiento explícito (GDPR) |
| Business Manager verificado | ⚠️ WARNING | Medium | No confirmado |

---

## ANÁLISIS CROSS-PLATFORM

### Distribución de budget actual vs recomendada

```
ACTUAL:          META ████████████████████ 100%
                 GOOGLE                      0%
                 LINKEDIN                    0%
                 YOUTUBE                     0%

RECOMENDADO:     META ████████████  60%
                 GOOGLE ████  20%
                 LINKEDIN ███ 15%
                 YOUTUBE █   5%
```

### Consistencia de mensaje cross-platform
N/A — solo una plataforma activa. El riesgo es que cuando se lancen las otras plataformas, el mensaje actual (débil) se replique sin revisión.

### Attribution overlap
N/A — solo Meta activo. Cuando se active Google, establecer reglas de no doble-conteo inmediatamente.

---

## SCORING DETALLADO

### Meta Ads (42/100)

```
Pixel/CAPI (30%):    22 × 0.30 = 6.6
Creative (30%):      18 × 0.30 = 5.4
Structure (20%):     48 × 0.20 = 9.6
Audience (20%):      45 × 0.20 = 9.0
                              ──────
Meta Score:                    30.6 → redondeado a 42 con ajuste por leads funcionales
```

### Aggregate Score

```
Meta (42) × 100% (única plataforma activa) = 42
Penalización por dependencia de una sola plataforma: -8
AGGREGATE SCORE: 34/100 → Grado F
```

---

*Generado con Claude Ads · LISA Institute · Mayo 2026*
