// ================================================
// Fase 1 — Estructura de nodos
// ================================================

class NodoDecision {

  constructor(nodo_id, variable, operador, valor) {

    this.nodo_id = nodo_id;
    this.variable = variable;
    this.operador = operador;
    this.valor = valor;
    this.hijo_verdadero = null;
    this.hijo_falso = null;

  }

}

class NodoHoja {

  constructor(nodo_id, accion) {

    this.nodo_id = nodo_id;
    this.accion = accion;
    this.hijo_verdadero = null;
    this.hijo_falso = null;

  }

}

// ================================================
// Fase 2 — Construcción del árbol desde JSON
// ================================================

const comportamientoNPC = {
  "nodo_id": 1, "tipo": "decision", "variable": "distancia_jugador", "operador": "<", "valor": 20,
  "hijo_verdadero": {
    "nodo_id": 2, "tipo": "decision", "variable": "salud_robot", "operador": ">", "valor": 30,
    "hijo_verdadero": {
      "nodo_id": 4, "tipo": "decision", "variable": "municion", "operador": ">", "valor": 0,
      "hijo_verdadero": { "nodo_id": 6, "tipo": "hoja", "accion": "ATACAR" },
      "hijo_falso":    { "nodo_id": 7, "tipo": "hoja", "accion": "RECARGAR" }
    },
    "hijo_falso": { "nodo_id": 5, "tipo": "hoja", "accion": "HUIR" }
  },
  "hijo_falso": { "nodo_id": 3, "tipo": "hoja", "accion": "PATRULLAR" }
};

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

function evaluar(nodo, estado, caminoActivo = []) {

  caminoActivo.push(nodo.nodo_id);

  if (nodo instanceof NodoHoja) {

    return { accion: nodo.accion, camino: caminoActivo };

  }

  const valorEstado = estado[nodo.variable];
  let condicion = false;

  if (nodo.operador === '<')  condicion = valorEstado < nodo.valor;
  if (nodo.operador === '>')  condicion = valorEstado > nodo.valor;
  if (nodo.operador === '==') condicion = valorEstado === nodo.valor;

  if (condicion) {

    return evaluar(nodo.hijo_verdadero, estado, caminoActivo);

  } else {

    return evaluar(nodo.hijo_falso, estado, caminoActivo);

  }

}

// ================================================
// UI
// ================================================

const arbol = construirArbol(comportamientoNPC);

const ICONOS = {
  PATRULLAR: '🚶',
  ATACAR: '⚔️',
  RECARGAR: '🔄',
  HUIR: '💨'
};

const LABELS = {
  distancia_jugador: 'distancia',
  salud_robot: 'salud',
  municion: 'munición'
};

function renderArbol(caminoActivo = []) {

  const NODE_W = 130;
  const NODE_H = 48;
  const LEVEL_H = 110;

  // Posiciones fijas de cada nodo
  const nodos = [
    { id: 1, x: 300, y: 40,  tipo: 'decision', label1: 'distancia < 20',  label2: 'Nodo 1' },
    { id: 2, x: 150, y: 150, tipo: 'decision', label1: 'salud > 30',       label2: 'Nodo 2' },
    { id: 3, x: 450, y: 150, tipo: 'hoja',     label1: '🚶 PATRULLAR',    label2: '',        accion: 'PATRULLAR' },
    { id: 4, x: 70,  y: 260, tipo: 'decision', label1: 'munición > 0',    label2: 'Nodo 4' },
    { id: 5, x: 230, y: 260, tipo: 'hoja',     label1: '💨 HUIR',         label2: '',        accion: 'HUIR' },
    { id: 6, x: 20,  y: 370, tipo: 'hoja',     label1: '⚔️ ATACAR',       label2: '',        accion: 'ATACAR' },
    { id: 7, x: 130, y: 370, tipo: 'hoja',     label1: '🔄 RECARGAR',     label2: '',        accion: 'RECARGAR' },
  ];

  // Aristas: [desde, hacia, label]
  const aristas = [
    { desde: 1, hacia: 2, label: 'sí', lado: 'izq' },
    { desde: 1, hacia: 3, label: 'no', lado: 'der' },
    { desde: 2, hacia: 4, label: 'sí', lado: 'izq' },
    { desde: 2, hacia: 5, label: 'no', lado: 'der' },
    { desde: 4, hacia: 6, label: 'sí', lado: 'izq' },
    { desde: 4, hacia: 7, label: 'no', lado: 'der' },
  ];

  const SVG_W = 600;
  const SVG_H = 450;

  let svgContent = '';

  // Dibujar aristas
  aristas.forEach(arista => {

    const origen  = nodos.find(n => n.id === arista.desde);
    const destino = nodos.find(n => n.id === arista.hacia);

    const x1 = origen.x + NODE_W / 2;
    const y1 = origen.y + NODE_H;
    const x2 = destino.x + NODE_W / 2;
    const y2 = destino.y;
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;

    const activoArista = caminoActivo.includes(arista.desde) && caminoActivo.includes(arista.hacia);

    svgContent += `
      <path class="tree-edge ${activoArista ? 'active' : ''}"
        d="M ${x1} ${y1} C ${x1} ${y1 + 40}, ${x2} ${y2 - 40}, ${x2} ${y2}"
        style="${activoArista ? `animation-delay: ${caminoActivo.indexOf(arista.hacia) * 120}ms` : ''}"
      />
      <text class="tree-edge-label ${activoArista ? 'active' : ''}" x="${mx + (arista.lado === 'izq' ? -14 : 10)}" y="${my}" text-anchor="middle">${arista.label}</text>
    `;

  });

  // Dibujar nodos
  nodos.forEach(nodo => {

    const activo = caminoActivo.includes(nodo.id);
    let claseNodo = 'tree-svg-node';

    if (nodo.tipo === 'hoja') claseNodo += ` hoja-${nodo.accion}`;
    if (activo) claseNodo += ' active';

    svgContent += `
      <g class="${claseNodo}" transform="translate(${nodo.x}, ${nodo.y})">
        <rect width="${NODE_W}" height="${NODE_H}" rx="10" stroke="rgba(255,255,255,0.08)" stroke-width="1" fill="rgba(255,255,255,0.04)"/>
        <text x="${NODE_W / 2}" y="20" text-anchor="middle" dominant-baseline="middle" font-size="12">${nodo.label1}</text>
        <text x="${NODE_W / 2}" y="35" text-anchor="middle" dominant-baseline="middle" font-size="10" opacity="0.5">${nodo.label2}</text>
      </g>
    `;

  });

  document.getElementById('tree-wrap').innerHTML = `
    <svg width="${SVG_W}" height="${SVG_H}" viewBox="0 0 ${SVG_W} ${SVG_H}">
      ${svgContent}
    </svg>
  `;

}

function actualizarArbol(camino) {

  renderArbol(camino);

}

function actualizarAccion(accion) {

  const el = document.getElementById('accion-display');
  el.textContent = accion;
  el.className = 'accion-display ' + accion.toLowerCase();

}

function addLog(distancia, salud, municion, accion) {

  const list = document.getElementById('log-list');
  const item = document.createElement('div');

  item.className = `log-item log-${accion}`;
  item.innerHTML = `
    <div class="log-icon">${ICONOS[accion]}</div>
    <span>D:${distancia} S:${salud} M:${municion} → <strong>${accion}</strong></span>`;

  list.insertBefore(item, list.firstChild);

}

function ejecutarEvaluacion() {

  const distancia = parseInt(document.getElementById('distancia').value);
  const salud = parseInt(document.getElementById('salud').value);
  const municion = parseInt(document.getElementById('municion').value);

  if (isNaN(distancia) || isNaN(salud) || isNaN(municion)) {

    document.getElementById('accion-sub').textContent = 'Ingresa todos los valores';
    return;

  }

  const estado = {
    distancia_jugador: distancia,
    salud_robot: salud,
    municion: municion
  };

  const { accion, camino } = evaluar(arbol, estado, []);

  actualizarAccion(accion);
  actualizarArbol(camino);
  addLog(distancia, salud, municion, accion);

  document.getElementById('accion-sub').textContent =
    `D: ${distancia}m | Salud: ${salud}% | Munición: ${municion}`;

}

function generarAleatorios() {

  const distancia = Math.floor(Math.random() * 80) + 1;
  const salud     = Math.floor(Math.random() * 100) + 1;
  const municion  = Math.floor(Math.random() * 20);

  document.getElementById('distancia').value = distancia;
  document.getElementById('salud').value     = salud;
  document.getElementById('municion').value  = municion;

  document.querySelectorAll('.frame-btn').forEach(b => b.classList.remove('active'));

  ejecutarEvaluacion();

}

// --- Eventos ---

document.getElementById('btn-evaluar').addEventListener('click', ejecutarEvaluacion);

document.querySelectorAll('.frame-btn').forEach(btn => {

  btn.addEventListener('click', () => {

    document.querySelectorAll('.frame-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.getElementById('distancia').value = btn.dataset.d;
    document.getElementById('salud').value = btn.dataset.s;
    document.getElementById('municion').value = btn.dataset.m;

    ejecutarEvaluacion();

  });

});

document.getElementById('btn-clear').addEventListener('click', () => {

  document.getElementById('log-list').innerHTML = '';

});

document.getElementById('btn-random').addEventListener('click', generarAleatorios);

// --- Inicio ---

actualizarArbol([]);