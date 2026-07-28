/**
 * CRM PERSONAL - CONTROL DE LEADS (LISA INSTITUTE)
 * ------------------------------------------------------------
 * Ejecutar la función crearControlLeadsComercial() desde el editor de
 * Apps Script (script.google.com) para generar automáticamente la
 * hoja de cálculo completa con sus 2 pestañas, fórmulas, validaciones
 * de datos y formato condicional.
 */

// ============================================================
// PALETA DE COLORES (Slate / Zinc)
// ============================================================
var COLOR = {
  HEADER_BG: '#1E293B',       // Gris pizarra oscuro (encabezados)
  HEADER_TEXT: '#FFFFFF',     // Blanco
  ACCENT_BG: '#F8FAFC',       // Fondo de acento muy claro
  CARD_BG: '#F1F5F9',         // Fondo de tarjetas KPI
  BORDER: '#E2E8F0',          // Bordes finos
  LABEL_MUTED: '#64748B',     // Títulos en mayúscula pequeños
  NUMBER_DARK: '#0F172A',     // Números grandes en negrita
  ROW_WHITE: '#FFFFFF',
  ROW_SOFT: '#F8FAFC',
  GREEN_BG: '#DCFCE7',
  GREEN_TEXT: '#15803D',
  GRAY_BG: '#F1F5F9',
  GRAY_TEXT: '#64748B',
  HOT_BG: '#FEE2E2',
  HOT_TEXT: '#991B1B',
  ALERT_BG: '#FEF08A'
};

var NOMBRE_HOJA_CALCULO = 'CRM Personal - Control de Leads (LISA Institute)';
var HOJA_PIPELINE = 'Gestión de Leads (Pipeline)';
var ULTIMA_FILA_DATOS = 150; // rango de trabajo para validaciones y fórmulas (filas 2-150)
var IMPORTE_POR_DEFECTO = 3600;

var ESTADO_MATRICULADO = '6. Matriculado';
var ESTADO_PERDIDO = '7. Perdido';

// Fases del pipeline: "display" es el texto que se muestra en la tabla del
// Dashboard, "match" es el valor EXACTO usado en el desplegable de la
// columna F de "Gestión de Leads (Pipeline)" (deben coincidir para que
// las fórmulas COUNTIF/SUMIFS funcionen correctamente).
var FASES = [
  {
    display: '1. Nuevo / Sin contactar',
    match: '1. Nuevo / Sin contactar',
    accion: 'Contactar en menos de 24h'
  },
  {
    display: '2. Contactado / En cualificación',
    match: '2. Contactado',
    accion: 'Agendar entrevista'
  },
  {
    display: '3. Entrevista Agendada',
    match: '3. Entrevista Agendada',
    accion: 'Confirmar asistencia'
  },
  {
    display: '4. Entrevista Realizada / Propuesta',
    match: '4. Entrevista Realizada',
    accion: 'Enviar propuesta y resolver dudas'
  },
  {
    display: '5. Pendiente de Pago / Reserva',
    match: '5. Pendiente Pago',
    accion: 'Enviar link de pago / recordatorio'
  },
  {
    display: '6. Matriculado (Cierre Ganado)',
    match: ESTADO_MATRICULADO,
    accion: 'Bienvenida y onboarding'
  },
  {
    display: '7. Descartado / Perdido',
    match: ESTADO_PERDIDO,
    accion: 'Analizar motivo y nutrir a futuro'
  }
];

var FORMATO_MONEDA = '#,##0.00" €"';
var FORMATO_PORCENTAJE = '0.0%';

// ============================================================
// FUNCIÓN PRINCIPAL
// ============================================================
function crearControlLeadsComercial() {
  var ss = SpreadsheetApp.create(NOMBRE_HOJA_CALCULO);

  // Reutilizamos la primera hoja por defecto como "Dashboard Comercial"
  var dashboard = ss.getSheets()[0];
  dashboard.setName('Dashboard Comercial');

  var pipeline = ss.insertSheet(HOJA_PIPELINE, 1);

  construirPipeline(pipeline);
  construirDashboard(dashboard);

  ss.setActiveSheet(dashboard);
  dashboard.setActiveSelection('A1');

  Logger.log('Hoja de cálculo creada correctamente: ' + ss.getUrl());
}

// ============================================================
// PESTAÑA 1: DASHBOARD COMERCIAL
// ============================================================
function construirDashboard(sheet) {
  sheet.setHiddenGridlines(true);
  sheet.setTabColor(COLOR.HEADER_BG);

  // ---------- Título principal ----------
  var titulo = sheet.getRange('A1:L1');
  titulo.merge()
    .setValue('DASHBOARD COMERCIAL — CONTROL DE LEADS')
    .setBackground(COLOR.HEADER_BG)
    .setFontColor(COLOR.HEADER_TEXT)
    .setFontSize(14)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 42);

  var refPipeline = "'" + HOJA_PIPELINE + "'!";
  var rangoEstado = refPipeline + 'F2:F' + ULTIMA_FILA_DATOS;
  var rangoImporte = refPipeline + 'I2:I' + ULTIMA_FILA_DATOS;
  var rangoNombre = refPipeline + 'B2:B' + ULTIMA_FILA_DATOS;
  var rangoSeguimiento = refPipeline + 'H2:H' + ULTIMA_FILA_DATOS;

  // ---------- Tarjetas KPI (filas 2 a 4) ----------
  var formulaPipelineActivo =
    '=SUMIFS(' + rangoImporte + ',' + rangoEstado + ',"<>' + ESTADO_MATRICULADO + '",' +
    rangoEstado + ',"<>' + ESTADO_PERDIDO + '")';
  crearTarjetaKPI(
    sheet, 'B2:C4', 'PIPELINE ACTIVO (€)', formulaPipelineActivo,
    COLOR.NUMBER_DARK, COLOR.CARD_BG, FORMATO_MONEDA
  );

  var formulaTotalMatriculas =
    '=SUMIFS(' + rangoImporte + ',' + rangoEstado + ',"' + ESTADO_MATRICULADO + '")';
  crearTarjetaKPI(
    sheet, 'E2:F4', 'TOTAL MATRÍCULAS (€)', formulaTotalMatriculas,
    COLOR.GREEN_TEXT, COLOR.GREEN_BG, FORMATO_MONEDA
  );

  var formulaTasaConversion =
    '=IFERROR(COUNTIF(' + rangoEstado + ',"' + ESTADO_MATRICULADO + '")/COUNTA(' + rangoNombre + '),0)';
  crearTarjetaKPI(
    sheet, 'H2:I4', 'TASA CONVERSIÓN (%)', formulaTasaConversion,
    COLOR.NUMBER_DARK, COLOR.CARD_BG, FORMATO_PORCENTAJE
  );

  var formulaPendientesHoy =
    '=COUNTIFS(' + rangoSeguimiento + ',"<="&TODAY(),' + rangoSeguimiento + ',"<>",' +
    rangoEstado + ',"<>' + ESTADO_MATRICULADO + '",' + rangoEstado + ',"<>' + ESTADO_PERDIDO + '")';
  crearTarjetaKPI(
    sheet, 'K2:L4', 'PENDIENTES HOY', formulaPendientesHoy,
    COLOR.HOT_TEXT, COLOR.HOT_BG, '0'
  );

  for (var f = 2; f <= 4; f++) sheet.setRowHeight(f, 30);

  // ---------- Tabla de estado del pipeline por fases (A7:E14) ----------
  var encabezados = ['Fase / Estado', 'N° Leads', 'Valor Total (€)', '% sobre Total', 'Acción Sugerida'];

  var rangoEncabezados = sheet.getRange(7, 1, 1, encabezados.length);
  rangoEncabezados.setValues([encabezados])
    .setBackground(COLOR.HEADER_BG)
    .setFontColor(COLOR.HEADER_TEXT)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);
  sheet.setRowHeight(7, 34);
  sheet.setFrozenRows(7);

  for (var i = 0; i < FASES.length; i++) {
    var fila = 8 + i;
    var fase = FASES[i];

    var formulaNumLeads = '=COUNTIF(' + rangoEstado + ',"' + fase.match + '")';
    var formulaValorTotal = '=SUMIFS(' + rangoImporte + ',' + rangoEstado + ',"' + fase.match + '")';
    var formulaPctTotal = '=IFERROR(B' + fila + '/COUNTA(' + rangoNombre + '),0)';

    sheet.getRange(fila, 1).setValue(fase.display).setFontWeight('bold').setHorizontalAlignment('left');
    sheet.getRange(fila, 2).setFormula(formulaNumLeads).setNumberFormat('0');
    sheet.getRange(fila, 3).setFormula(formulaValorTotal).setNumberFormat(FORMATO_MONEDA);
    sheet.getRange(fila, 4).setFormula(formulaPctTotal).setNumberFormat(FORMATO_PORCENTAJE);
    sheet.getRange(fila, 5).setValue(fase.accion).setFontStyle('italic').setFontColor(COLOR.LABEL_MUTED);

    var bandaFondo = (i % 2 === 0) ? COLOR.ROW_WHITE : COLOR.ACCENT_BG;
    sheet.getRange(fila, 1, 1, encabezados.length)
      .setBackground(bandaFondo)
      .setVerticalAlignment('middle');
    sheet.getRange(fila, 2, 1, 3).setHorizontalAlignment('center');
  }

  var filaFinTabla = 7 + FASES.length; // fila 14
  sheet.getRange(7, 1, filaFinTabla - 7 + 1, encabezados.length)
    .setBorder(true, true, true, true, true, true, COLOR.BORDER, SpreadsheetApp.BorderStyle.SOLID);

  sheet.autoResizeColumns(1, 12);

  // Anchos mínimos agradables para las tarjetas KPI y la tabla
  sheet.setColumnWidth(1, Math.max(sheet.getColumnWidth(1), 220));
  for (var col = 2; col <= 12; col++) {
    sheet.setColumnWidth(col, Math.max(sheet.getColumnWidth(col), 120));
  }
  sheet.setColumnWidth(5, Math.max(sheet.getColumnWidth(5), 260));
}

/**
 * Crea una tarjeta KPI dentro de un rango de 2 columnas x 3 filas.
 * Fila 1 del rango -> título en mayúsculas pequeñas.
 * Filas 2-3 del rango (fusionadas) -> valor grande en negrita con fórmula.
 */
function crearTarjetaKPI(sheet, rangoA1, titulo, formula, colorTexto, colorFondo, formatoNumero) {
  var rango = sheet.getRange(rangoA1);
  var filaInicio = rango.getRow();
  var colInicio = rango.getColumn();
  var numCols = rango.getNumColumns();

  rango.setBackground(colorFondo)
    .setBorder(true, true, true, true, false, false, COLOR.BORDER, SpreadsheetApp.BorderStyle.SOLID);

  var rangoTitulo = sheet.getRange(filaInicio, colInicio, 1, numCols);
  rangoTitulo.merge()
    .setValue(titulo)
    .setFontSize(9)
    .setFontWeight('bold')
    .setFontColor(COLOR.LABEL_MUTED)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  var rangoValor = sheet.getRange(filaInicio + 1, colInicio, 2, numCols);
  rangoValor.merge()
    .setFormula(formula)
    .setNumberFormat(formatoNumero)
    .setFontSize(22)
    .setFontWeight('bold')
    .setFontColor(colorTexto)
    .setBackground(colorFondo)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
}

// ============================================================
// PESTAÑA 2: GESTIÓN DE LEADS (PIPELINE)
// ============================================================
function construirPipeline(sheet) {
  sheet.setHiddenGridlines(true);
  sheet.setTabColor(COLOR.LABEL_MUTED);

  var encabezados = [
    'Fecha Ingreso',
    'Nombre Lead',
    'Teléfono / Email',
    'Programa / Máster',
    'Origen Lead',
    'Estado / Fase',
    'Prioridad / Temperatura',
    'Próximo Seguimiento (Fecha)',
    'Importe Oportunidad (€)',
    'Motivo de Pérdida',
    'Notas y Próximos Pasos'
  ];

  var rangoEncabezados = sheet.getRange(1, 1, 1, encabezados.length);
  rangoEncabezados.setValues([encabezados])
    .setBackground(COLOR.HEADER_BG)
    .setFontColor(COLOR.HEADER_TEXT)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);
  sheet.setRowHeight(1, 40);
  sheet.setFrozenRows(1);

  var numFilas = ULTIMA_FILA_DATOS - 1;
  var numCols = encabezados.length;

  // ---------- Validación de datos (filas 2 a 150) ----------
  aplicarListaValidacion(sheet, 5, [
    'Calendly Directo',
    'Dirección Académica',
    'Inbound Meta/Google',
    'Prospección Outbound',
    'Base Datos Antigua'
  ]); // E

  aplicarListaValidacion(sheet, 6, FASES.map(function (fase) { return fase.match; })); // F

  aplicarListaValidacion(sheet, 7, [
    '🔥 Alta / Caliente',
    '🟡 Media / Templado',
    '❄️ Baja / Frío'
  ]); // G

  aplicarListaValidacion(sheet, 10, [
    'N/A - En Proceso',
    'Precio / Sin Financiación',
    'Sin Perfil / Requisitos',
    'No responde / Localizable',
    'Eligió otra escuela',
    'Postpone convocatoria'
  ]); // J

  // ---------- Formatos de columnas ----------
  sheet.getRange(2, 1, numFilas, 1).setNumberFormat('dd/mm/yyyy'); // A: Fecha Ingreso
  sheet.getRange(2, 8, numFilas, 1).setNumberFormat('dd/mm/yyyy'); // H: Próximo Seguimiento
  sheet.getRange(2, 9, numFilas, 1).setNumberFormat(FORMATO_MONEDA); // I: Importe Oportunidad

  // ---------- Valor por defecto: Importe Oportunidad = 3.600 € ----------
  sheet.getRange(2, 9, numFilas, 1).setValue(IMPORTE_POR_DEFECTO);

  // ---------- Filas alternas y bordes finos ----------
  var rangoDatos = sheet.getRange(2, 1, numFilas, numCols);
  var banda = rangoDatos.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, false, false);
  banda.setFirstRowColor(COLOR.ROW_WHITE).setSecondRowColor(COLOR.ROW_SOFT);

  sheet.getRange(1, 1, ULTIMA_FILA_DATOS, numCols)
    .setBorder(true, true, true, true, true, true, COLOR.BORDER, SpreadsheetApp.BorderStyle.SOLID);

  sheet.getRange(2, 1, numFilas, numCols)
    .setVerticalAlignment('middle');
  sheet.getRange(2, 1, numFilas, 1).setHorizontalAlignment('center'); // A: Fecha Ingreso
  sheet.getRange(2, 2, numFilas, 3).setHorizontalAlignment('left'); // B-D: Nombre / Teléfono / Programa
  sheet.getRange(2, 5, numFilas, 3).setHorizontalAlignment('center'); // E-G: Origen / Estado / Prioridad
  sheet.getRange(2, 8, numFilas, 2).setHorizontalAlignment('center'); // H-I: Seguimiento / Importe
  sheet.getRange(2, 10, numFilas, 2).setHorizontalAlignment('left').setWrap(true); // J-K: Motivo / Notas

  // ---------- Formato condicional ----------
  var rangoFilaCompleta = sheet.getRange(2, 1, numFilas, numCols);
  var rangoPrioridad = sheet.getRange(2, 7, numFilas, 1);
  var rangoSeguimiento = sheet.getRange(2, 8, numFilas, 1);

  var reglas = sheet.getConditionalFormatRules();

  // Estado Matriculado -> fila verde suave (máxima prioridad)
  reglas.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$F2="' + ESTADO_MATRICULADO + '"')
      .setBackground(COLOR.GREEN_BG)
      .setFontColor(COLOR.GREEN_TEXT)
      .setRanges([rangoFilaCompleta])
      .build()
  );

  // Estado Perdido -> fila gris claro
  reglas.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$F2="' + ESTADO_PERDIDO + '"')
      .setBackground(COLOR.GRAY_BG)
      .setFontColor(COLOR.GRAY_TEXT)
      .setRanges([rangoFilaCompleta])
      .build()
  );

  // Prioridad Alta / Caliente -> celda de Prioridad en rojo suave
  reglas.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('🔥 Alta / Caliente')
      .setBackground(COLOR.HOT_BG)
      .setFontColor(COLOR.HOT_TEXT)
      .setRanges([rangoPrioridad])
      .build()
  );

  // Próximo seguimiento vencido y lead aún activo -> celda de fecha en amarillo
  reglas.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(
        '=AND($H2<>"",$H2<=TODAY(),$F2<>"' + ESTADO_MATRICULADO + '",$F2<>"' + ESTADO_PERDIDO + '")'
      )
      .setBackground(COLOR.ALERT_BG)
      .setRanges([rangoSeguimiento])
      .build()
  );

  sheet.setConditionalFormatRules(reglas);

  sheet.autoResizeColumns(1, numCols);

  // Anchos mínimos agradables para la legibilidad de la tabla
  sheet.setColumnWidth(3, Math.max(sheet.getColumnWidth(3), 170)); // Teléfono / Email
  sheet.setColumnWidth(11, Math.max(sheet.getColumnWidth(11), 260)); // Notas y Próximos Pasos
}

function aplicarListaValidacion(sheet, columna, opciones) {
  var rango = sheet.getRange(2, columna, ULTIMA_FILA_DATOS - 1, 1);
  var regla = SpreadsheetApp.newDataValidation()
    .requireValueInList(opciones, true)
    .setAllowInvalid(false)
    .setHelpText('Selecciona una opción de la lista: ' + opciones.join(', '))
    .build();
  rango.setDataValidation(regla);
}
