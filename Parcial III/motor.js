const fs = require('fs');
const { NodoDecision, NodoHoja } = require('./arbol');

// ================================================
// Fase 2 — Parseo del JSON y construcción del árbol
// ================================================

function construirArbol(nodo) {

  if (nodo.tipo === 'hoja') {

    return new NodoHoja(nodo.nodo_id, nodo.accion);

  }

  const nodoDecision = new NodoDecision(
    nodo.nodo_id,
    nodo.variable,
    nodo.operador,
    nodo.valor
  );

  nodoDecision.hijo_verdadero = construirArbol(nodo.hijo_verdadero);
  nodoDecision.hijo_falso = construirArbol(nodo.hijo_falso);

  return nodoDecision;

}

// ================================================
// Fase 3 — Motor de evaluación
// ================================================

function evaluar(nodo, estado) {

  if (nodo instanceof NodoHoja) {

    return nodo.accion;

  }

  const valorEstado = estado[nodo.variable];
  let condicion = false;

  if (nodo.operador === '<') condicion = valorEstado < nodo.valor;
  if (nodo.operador === '>') condicion = valorEstado > nodo.valor;
  if (nodo.operador === '==') condicion = valorEstado === nodo.valor;

  if (condicion) {

    return evaluar(nodo.hijo_verdadero, estado);

  } else {

    return evaluar(nodo.hijo_falso, estado);

  }

}

// ================================================
// Ejecución
// ================================================

const json = JSON.parse(fs.readFileSync('comportamiento_npc.json', 'utf8'));
const arbol = construirArbol(json);

const lineas = fs.readFileSync('estado_juego.csv', 'utf8').trim().split('\n');
const frames = lineas.slice(1);

console.log("================================================");
console.log("  REPORTE DE DECISIONES — GUARDIA ROBÓTICO");
console.log("================================================");

let csvSalida = 'ID_FRAME,DISTANCIA_JUGADOR,SALUD_ROBOT,MUNICION,ACCION\n';

frames.forEach(linea => {

  const valores = linea.split(',').map(v => v.trim());

  const estado = {
    distancia_jugador: parseInt(valores[1]),
    salud_robot: parseInt(valores[2]),
    municion: parseInt(valores[3])
  };

  const accion = evaluar(arbol, estado);

  console.log(`  Frame ${valores[0]} | Distancia: ${valores[1]} | Salud: ${valores[2]} | Munición: ${valores[3]} => ${accion}`);

  csvSalida += `${valores[0]},${valores[1]},${valores[2]},${valores[3]},${accion}\n`;

});

console.log("================================================");

// Guardar reporte CSV
fs.writeFileSync('reporte_decisiones.csv', csvSalida, 'utf8');
console.log("\n  Reporte guardado en reporte_decisiones.csv");