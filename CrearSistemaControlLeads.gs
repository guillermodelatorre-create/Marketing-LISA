/**
 * SISTEMA DE CONTROL DE ASIGNACIÓN DE LEADS - LISA INSTITUTE
 * ------------------------------------------------------------
 * Ejecutar la función crearSistemaControlLeads() desde el editor de
 * Apps Script (script.google.com) para generar automáticamente la
 * hoja de cálculo completa con sus 3 pestañas, fórmulas, validaciones
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
  YELLOW_BG: '#FEF08A',
  YELLOW_TEXT: '#A16207',
  RED_BG: '#FEE2E2',
  RED_TEXT: '#B91C1C'
};

var NOMBRE_HOJA_CALCULO = 'Control de Asignación de Leads - LISA Institute';
var COMERCIALES = ['Frank', 'Valentina', 'Mafe'];
var HOJA_REGISTRO = 'Registro Diario';
var ULTIMA_FILA_DATOS = 100; // rango de trabajo para validaciones y fórmulas (filas 2-100)

// ============================================================
// FUNCIÓN PRINCIPAL
// ============================================================
function crearSistemaControlLeads() {
  var ss = SpreadsheetApp.create(NOMBRE_HOJA_CALCULO);

  // Reutilizamos la primera hoja por defecto como "Dashboard"
  var dashboard = ss.getSheets()[0];
  dashboard.setName('Dashboard');

  var registro = ss.insertSheet(HOJA_REGISTRO, 1);
  var protocolo = ss.insertSheet('Protocolo', 2);

  construirDashboard(dashboard);
  construirRegistroDiario(registro);
  construirProtocolo(protocolo);

  ss.setActiveSheet(dashboard);
  dashboard.setActiveSelection('A1');

  Logger.log('Hoja de cálculo creada correctamente: ' + ss.getUrl());
}

// ============================================================
// PESTAÑA 1: DASHBOARD
// ============================================================
function construirDashboard(sheet) {
  sheet.setHiddenGridlines(true);
  sheet.setTabColor(COLOR.HEADER_BG);

  // ---------- Título principal ----------
  var titulo = sheet.getRange('A1:I1');
  titulo.merge()
    .setValue('PANEL DE CONTROL — ASIGNACIÓN DE LEADS AUTOMÁTICOS')
    .setBackground(COLOR.HEADER_BG)
    .setFontColor(COLOR.HEADER_TEXT)
    .setFontSize(14)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 42);

  // ---------- Tarjetas KPI (filas 2 a 4) ----------
  crearTarjetaKPI(
    sheet, 'B2:C4', 'TOTAL LEADS AUTOMÁTICOS',
    "=COUNTA('" + HOJA_REGISTRO + "'!B2:B" + ULTIMA_FILA_DATOS + ")",
    COLOR.NUMBER_DARK, COLOR.CARD_BG, false
  );

  crearTarjetaKPI(
    sheet, 'E2:F4', 'LEADS REASIGNADOS',
    "=COUNTIFS('" + HOJA_REGISTRO + "'!F2:F" + ULTIMA_FILA_DATOS + ",\"<>No\",'" +
      HOJA_REGISTRO + "'!F2:F" + ULTIMA_FILA_DATOS + ",\"<>\")",
    COLOR.NUMBER_DARK, COLOR.CARD_BG, false
  );

  crearTarjetaKPI(
    sheet, 'H2:I4', 'ESTADO DEL REPARTO',
    'EQUILIBRADO',
    COLOR.GREEN_TEXT, COLOR.GREEN_BG, true
  );

  for (var f = 2; f <= 4; f++) sheet.setRowHeight(f, 30);

  // ---------- Tabla principal de resumen por comercial ----------
  var encabezados = [
    'Comercial',
    'Leads Dir. Académica',
    'Leads Calendly Directos',
    'Reasignados RECIBIDOS (+)',
    'Reasignados CEDIDOS (-)',
    'TOTAL NETO LEADS',
    'Estado Visual'
  ];

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

  // Filas de comerciales (8, 9, 10)
  for (var i = 0; i < COMERCIALES.length; i++) {
    var fila = 8 + i;
    var nombre = COMERCIALES[i];

    var fCol = "'" + HOJA_REGISTRO + "'!F2:F" + ULTIMA_FILA_DATOS;
    var dCol = "'" + HOJA_REGISTRO + "'!D2:D" + ULTIMA_FILA_DATOS;
    var eCol = "'" + HOJA_REGISTRO + "'!E2:E" + ULTIMA_FILA_DATOS;
    var gCol = "'" + HOJA_REGISTRO + "'!G2:G" + ULTIMA_FILA_DATOS;

    var formulaDirAcademica =
      '=COUNTIFS(' + dCol + ',"Dirección Académica",' + eCol + ',A' + fila + ')';
    var formulaCalendly =
      '=COUNTIFS(' + dCol + ',"Calendly Estándar",' + eCol + ',A' + fila + ')';
    var formulaRecibidos =
      '=COUNTIFS(' + fCol + ',"<>No",' + gCol + ',A' + fila + ',' + eCol + ',"<>"&A' + fila + ')';
    var formulaCedidos =
      '=COUNTIFS(' + fCol + ',"<>No",' + eCol + ',A' + fila + ',' + gCol + ',"<>"&A' + fila + ')';
    var formulaTotalNeto = '=B' + fila + '+C' + fila + '+D' + fila + '-E' + fila;
    var formulaEstado =
      '=IF(ABS(F' + fila + '-AVERAGE($F$8:$F$10))<=1,"EQUILIBRADO",' +
      'IF(ABS(F' + fila + '-AVERAGE($F$8:$F$10))<=3,"AJUSTAR","DESFASE"))';

    sheet.getRange(fila, 1).setValue(nombre).setFontWeight('bold');
    sheet.getRange(fila, 2).setFormula(formulaDirAcademica);
    sheet.getRange(fila, 3).setFormula(formulaCalendly);
    sheet.getRange(fila, 4).setFormula(formulaRecibidos);
    sheet.getRange(fila, 5).setFormula(formulaCedidos);
    sheet.getRange(fila, 6).setFormula(formulaTotalNeto);
    sheet.getRange(fila, 7).setFormula(formulaEstado);

    var bandaFondo = (i % 2 === 0) ? COLOR.ROW_WHITE : COLOR.ACCENT_BG;
    sheet.getRange(fila, 1, 1, 7)
      .setBackground(bandaFondo)
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle');
    sheet.getRange(fila, 1).setHorizontalAlignment('left');
  }

  // Fila de totales (11)
  var filaTotales = 8 + COMERCIALES.length;
  sheet.getRange(filaTotales, 1).setValue('TOTAL');
  sheet.getRange(filaTotales, 2).setFormula('=SUM(B8:B10)');
  sheet.getRange(filaTotales, 3).setFormula('=SUM(C8:C10)');
  sheet.getRange(filaTotales, 4).setFormula('=SUM(D8:D10)');
  sheet.getRange(filaTotales, 5).setFormula('=SUM(E8:E10)');
  sheet.getRange(filaTotales, 6).setFormula('=SUM(F8:F10)');
  sheet.getRange(filaTotales, 7).setValue('');

  sheet.getRange(filaTotales, 1, 1, 7)
    .setFontWeight('bold')
    .setBackground(COLOR.CARD_BG)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, false, false, false, false, false, COLOR.LABEL_MUTED, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
  sheet.getRange(filaTotales, 1).setHorizontalAlignment('left');

  // Bordes finos de toda la tabla (encabezado + datos + totales)
  var rangoTablaCompleta = sheet.getRange(7, 1, filaTotales - 7 + 1, 7);
  rangoTablaCompleta.setBorder(
    true, true, true, true, true, true,
    COLOR.BORDER, SpreadsheetApp.BorderStyle.SOLID
  );

  // ---------- Formato condicional columna "Estado Visual" ----------
  var rangoEstado = sheet.getRange(8, 7, COMERCIALES.length, 1);
  var reglas = sheet.getConditionalFormatRules();

  reglas.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('EQUILIBRADO')
      .setBackground(COLOR.GREEN_BG)
      .setFontColor(COLOR.GREEN_TEXT)
      .setBold(true)
      .setRanges([rangoEstado])
      .build()
  );
  reglas.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('AJUSTAR')
      .setBackground(COLOR.YELLOW_BG)
      .setFontColor(COLOR.YELLOW_TEXT)
      .setBold(true)
      .setRanges([rangoEstado])
      .build()
  );
  reglas.push(
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('DESFASE')
      .setBackground(COLOR.RED_BG)
      .setFontColor(COLOR.RED_TEXT)
      .setBold(true)
      .setRanges([rangoEstado])
      .build()
  );
  sheet.setConditionalFormatRules(reglas);

  // Formato numérico entero para las columnas de conteo
  sheet.getRange(8, 2, COMERCIALES.length + 1, 5).setNumberFormat('0');

  sheet.autoResizeColumns(1, 9);

  // Asegurar un ancho mínimo agradable para las tarjetas KPI
  sheet.setColumnWidth(1, Math.max(sheet.getColumnWidth(1), 110));
  for (var col = 2; col <= 9; col++) {
    sheet.setColumnWidth(col, Math.max(sheet.getColumnWidth(col), 130));
  }
}

/**
 * Crea una tarjeta KPI dentro de un rango de 2 columnas x 3 filas.
 * Fila 1 del rango -> título en mayúsculas pequeñas.
 * Filas 2-3 del rango (fusionadas) -> valor grande en negrita.
 */
function crearTarjetaKPI(sheet, rangoA1, titulo, valor, colorTexto, colorFondo, esTexto) {
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
  rangoValor.merge();
  if (esTexto) {
    rangoValor.setValue(valor);
  } else {
    rangoValor.setFormula(valor);
  }
  rangoValor.setFontSize(24)
    .setFontWeight('bold')
    .setFontColor(colorTexto)
    .setBackground(colorFondo)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
}

// ============================================================
// PESTAÑA 2: REGISTRO DIARIO
// ============================================================
function construirRegistroDiario(sheet) {
  sheet.setHiddenGridlines(true);
  sheet.setTabColor(COLOR.LABEL_MUTED);

  var encabezados = [
    'Fecha / Hora',
    'Nombre del Lead',
    'Programa / Máster',
    'Origen Calendario',
    'Asignación Inicial',
    '¿Reasignado?',
    'Asignación Definitiva',
    '¿Requiere Cambio de Hora?',
    'Notificado por Comercial'
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

  // ---------- Validación de datos (filas 2 a 100) ----------
  aplicarListaValidacion(sheet, 4, ['Dirección Académica', 'Calendly Estándar']); // D
  aplicarListaValidacion(sheet, 5, COMERCIALES); // E
  aplicarListaValidacion(sheet, 6, ['No', 'Sí - Ajuste Carga', 'Sí - Dir. Académica']); // F
  aplicarListaValidacion(sheet, 7, COMERCIALES); // G
  aplicarListaValidacion(sheet, 8, ['No', 'Sí']); // H
  aplicarListaValidacion(sheet, 9, ['No', 'Sí']); // I

  // ---------- Formato de columna Fecha / Hora ----------
  sheet.getRange(2, 1, numFilas, 1).setNumberFormat('dd/mm/yyyy hh:mm');

  // ---------- Filas alternas y bordes finos ----------
  var rangoDatos = sheet.getRange(2, 1, numFilas, numCols);
  var banda = rangoDatos.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, false, false);
  banda.setFirstRowColor(COLOR.ROW_WHITE).setSecondRowColor(COLOR.ROW_SOFT);

  sheet.getRange(1, 1, ULTIMA_FILA_DATOS, numCols)
    .setBorder(true, true, true, true, true, true, COLOR.BORDER, SpreadsheetApp.BorderStyle.SOLID);

  sheet.getRange(2, 1, numFilas, numCols)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  sheet.autoResizeColumns(1, numCols);
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

// ============================================================
// PESTAÑA 3: PROTOCOLO
// ============================================================
function construirProtocolo(sheet) {
  sheet.setHiddenGridlines(true);
  sheet.setTabColor(COLOR.BORDER);

  sheet.setColumnWidth(1, 24);
  for (var c = 2; c <= 9; c++) sheet.setColumnWidth(c, 95);

  // ---------- Título ----------
  var titulo = sheet.getRange('A1:I2');
  titulo.merge()
    .setValue('REGLAS OFICIALES DE ASIGNACIÓN DE LEADS AUTOMÁTICOS')
    .setBackground(COLOR.HEADER_BG)
    .setFontColor(COLOR.HEADER_TEXT)
    .setFontSize(15)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);
  sheet.setRowHeight(1, 30);
  sheet.setRowHeight(2, 30);

  // ---------- Subtítulo ----------
  var subtitulo = sheet.getRange('A3:I3');
  subtitulo.merge()
    .setValue('Documento interno · Coordinación Comercial · LISA Institute')
    .setFontColor(COLOR.LABEL_MUTED)
    .setFontStyle('italic')
    .setFontSize(10)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBackground(COLOR.ACCENT_BG);
  sheet.setRowHeight(3, 24);

  sheet.setRowHeight(4, 12); // espaciador

  // ---------- Puntos del protocolo ----------
  var puntos = [
    {
      titulo: '1. Prioridad Director Académico',
      texto: 'Se reparten equitativamente en orden rotativo.'
    },
    {
      titulo: '2. Prioridad Horaria del Lead',
      texto: 'Calendly asigna según disponibilidad. Si un comercial tiene más huecos libres, recibirá más leads automáticos.'
    },
    {
      titulo: '3. Corrección de Enfriamiento',
      texto: 'La coordinación reasignará leads sobrantes para nivelar la carga si un comercial acumula demasiados por tener agenda vacía.'
    },
    {
      titulo: '4. Compromiso de Avisos',
      texto: 'Cada comercial debe avisar proactivamente al Coordinador cuando le entre un lead automático.'
    }
  ];

  var filaActual = 5;
  for (var i = 0; i < puntos.length; i++) {
    filaActual = agregarPuntoProtocolo(sheet, filaActual, puntos[i].titulo, puntos[i].texto);
    filaActual += 1; // espaciador entre puntos
  }

  // ---------- Pie de página ----------
  var piePosicion = filaActual + 1;
  var pie = sheet.getRange(piePosicion, 2, 1, 8);
  pie.merge()
    .setValue('LISA Institute — Protocolo vigente desde su publicación. Cualquier excepción debe ser aprobada por Coordinación Comercial.')
    .setFontColor(COLOR.LABEL_MUTED)
    .setFontSize(9)
    .setFontStyle('italic')
    .setHorizontalAlignment('left')
    .setVerticalAlignment('middle')
    .setWrap(true);
  sheet.setRowHeight(piePosicion, 34);

  sheet.setColumnWidth(1, 24);
}

/**
 * Agrega un bloque tipo "punto de documento ejecutivo": barra de acento
 * a la izquierda, título en negrita + descripción en texto normal.
 * Devuelve la fila donde terminó el bloque.
 */
function agregarPuntoProtocolo(sheet, fila, tituloNegrita, descripcion) {
  var rango = sheet.getRange(fila, 2, 2, 8); // columnas B:I, 2 filas de alto
  rango.merge();
  rango.setWrap(true)
    .setVerticalAlignment('top')
    .setHorizontalAlignment('left')
    .setBackground(COLOR.ACCENT_BG)
    .setFontColor(COLOR.NUMBER_DARK)
    .setFontSize(11);

  var textoCompleto = tituloNegrita + ': ' + descripcion;
  var finNegrita = tituloNegrita.length + 1; // incluye el título y los ':'
  var textoEnriquecido = SpreadsheetApp.newRichTextValue()
    .setText(textoCompleto)
    .setTextStyle(0, finNegrita, SpreadsheetApp.newTextStyle()
      .setBold(true)
      .setForegroundColor(COLOR.HEADER_BG)
      .build())
    .setTextStyle(finNegrita, textoCompleto.length,
      SpreadsheetApp.newTextStyle()
        .setBold(false)
        .setForegroundColor('#334155')
        .build())
    .build();
  rango.setRichTextValue(textoEnriquecido);

  // Barra de acento a la izquierda (columna A de ese bloque de filas)
  sheet.getRange(fila, 1, 2, 1).setBackground(COLOR.HEADER_BG);

  sheet.setRowHeight(fila, 20);
  sheet.setRowHeight(fila + 1, 34);

  return fila + 1; // última fila ocupada por este bloque
}
