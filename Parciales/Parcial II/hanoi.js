class Node {

  constructor(data, next) {

    this.data = data;
    this.next = next;

  }

}

class Stack {

  constructor() {

    this.top = null;
    this.size = 0;

  }

  push(data) {

    const newNode = new Node(data, null);

    if (!this.top) {

      this.top = newNode;

    } else {

      newNode.next = this.top;
      this.top = newNode;

    }

    this.size++;

  }

  pop() {

    if (!this.top) {

      return null;

    }

    const data = this.top.data;
    this.top = this.top.next;
    this.size--;

    return data;

  }

  peek() {

    if (!this.top) {

      return null;

    }

    return this.top.data;

  }

  getSize() {

    return this.size;

  }

  isEmpty() {

    if(!this.size){

      return true;

    } else {
      
      return false;

    }

  }

  toArray() {

    const arr = [];
    let current = this.top;

    while (current) {

      arr.push(current.data);
      current = current.next;

    }

    return arr;

  }

}

// --- Colores para los discos ---

const DISK_COLORS = [
  '#f87171', '#fb923c', '#fbbf24',
  '#34d399', '#60a5fa', '#a78bfa', '#f472b6'
];

// --- Estado del juego ---

let torres = [new Stack(), new Stack(), new Stack()];
let numDiscos = 3;
let movimientos = 0;
let selectedTower = null;
let autoRunning = false;
let autoTimeout = null;

// --- Inicializar ---

function inicializar(n) {

  torres = [new Stack(), new Stack(), new Stack()];
  movimientos = 0;
  selectedTower = null;
  numDiscos = n;

  for (let i = n; i >= 1; i--) {

    torres[0].push(i);

  }

  document.getElementById('moves-display').textContent = '0';
  document.getElementById('moves-sub').textContent = '';
  document.getElementById('min-moves').textContent = (Math.pow(2, n) - 1) + ' movimientos';
  document.getElementById('disk-count-display').textContent = n + ' discos';
  document.getElementById('estado-display').textContent = 'En juego';
  document.getElementById('log-list').innerHTML = '';
  document.getElementById('selected-info').classList.remove('visible');

  updateUI();

}

// --- Animar movimiento de disco ---

function animarMovimiento(desde, hacia, callback) {

  const desdeEl = document.getElementById('tower-' + desde);
  const haciaEl = document.getElementById('tower-' + hacia);
  const topDiscoEl = desdeEl.querySelector('.top-disk');

  if (!topDiscoEl) {

    callback();
    return;

  }

  const desdeRect = topDiscoEl.getBoundingClientRect();
  const haciaRect = haciaEl.getBoundingClientRect();

  const deltaX = haciaRect.left + haciaRect.width / 2 - (desdeRect.left + desdeRect.width / 2);
  const subirPx = 100;

  const keyframes = [
    { transform: 'translate(0px, 0px)', offset: 0 },
    { transform: `translate(0px, -${subirPx}px)`, offset: 0.3 },
    { transform: `translate(${deltaX}px, -${subirPx}px)`, offset: 0.7 },
    { transform: `translate(${deltaX}px, 0px)`, offset: 1 }
  ];

  const animation = topDiscoEl.animate(keyframes, {
    duration: 650,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    fill: 'forwards'
  });

  animation.onfinish = () => {

    callback();

  };

}

// --- Mover disco manualmente ---

function seleccionarTorre(idx) {

  if (autoRunning) return;

  if (selectedTower === null) {

    if (torres[idx].isEmpty()) {

      addLog('La torre está vacía', 'err');
      return;

    }

    selectedTower = idx;

    document.querySelectorAll('.tower-col')[idx].classList.add('selected');

    const disco = torres[idx].peek();
    const info = document.getElementById('selected-info');
    info.textContent = `Disco ${disco} seleccionado`;
    info.classList.add('visible');

  } else {

    if (selectedTower === idx) {

      selectedTower = null;
      document.querySelectorAll('.tower-col').forEach(t => t.classList.remove('selected'));
      document.getElementById('selected-info').classList.remove('visible');
      return;

    }

    const disco = torres[selectedTower].peek();
    const topDestino = torres[idx].peek();

    if (topDestino !== null && topDestino < disco) {

      addLog(`No puedes poner disco ${disco} sobre disco ${topDestino}`, 'err');
      selectedTower = null;
      document.querySelectorAll('.tower-col').forEach(t => t.classList.remove('selected'));
      document.getElementById('selected-info').classList.remove('visible');
      return;

    }

    const nombres = ['A', 'B', 'C'];
    const origenIdx = selectedTower;
    const destinoIdx = idx;

    selectedTower = null;
    document.querySelectorAll('.tower-col').forEach(t => t.classList.remove('selected'));
    document.getElementById('selected-info').classList.remove('visible');

    animarMovimiento(origenIdx, destinoIdx, () => {

      torres[destinoIdx].push(torres[origenIdx].pop());
      movimientos++;

      document.getElementById('moves-display').textContent = movimientos;
      addLog(`Disco ${disco} de Torre ${nombres[origenIdx]} → Torre ${nombres[destinoIdx]}`, 'move');

      verificarVictoria();
      updateUI();

    });

  }

}

// --- Verificar victoria ---

function verificarVictoria() {

  if (torres[2].getSize() === numDiscos) {

    document.getElementById('estado-display').textContent = '¡Resuelto!';
    document.getElementById('moves-sub').textContent = `¡Completado en ${movimientos} movimientos!`;
    addLog(`¡Torres resueltas en ${movimientos} movimientos!`, 'win');

  }

}

// --- Resolver automáticamente (recursivo con pilas) ---

function resolverAuto() {

  if (autoRunning) return;

  inicializar(numDiscos);

  const pasos = [];

  function hanoi(n, origen, destino, auxiliar) {

    if (n === 0) return;

    hanoi(n - 1, origen, auxiliar, destino);
    pasos.push({ desde: origen, hacia: destino });
    hanoi(n - 1, auxiliar, destino, origen);

  }

  hanoi(numDiscos, 0, 2, 1);

  autoRunning = true;
  document.getElementById('btn-auto').disabled = true;

  let i = 0;

  function ejecutarPaso() {

    if (i >= pasos.length) {

      autoRunning = false;
      document.getElementById('btn-auto').disabled = false;
      verificarVictoria();
      return;

    }

    const { desde, hacia } = pasos[i];
    const nombres = ['A', 'B', 'C'];

    animarMovimiento(desde, hacia, () => {

      const disco = torres[desde].pop();
      torres[hacia].push(disco);
      movimientos++;

      document.getElementById('moves-display').textContent = movimientos;
      addLog(`Disco ${disco} de Torre ${nombres[desde]} → Torre ${nombres[hacia]}`, 'move');

      updateUI();
      i++;
      autoTimeout = setTimeout(ejecutarPaso, 200);

    });

  }

  ejecutarPaso();

}

// --- Actualizar interfaz ---

function updateUI() {

  const nombres = ['A', 'B', 'C'];

  torres.forEach((torre, i) => {

    const disksEl = document.getElementById('tower-' + i);
    const stackEl = document.getElementById('stack-' + nombres[i].toLowerCase());
    const arr = torre.toArray();

    // Dibujar discos visuales
    disksEl.innerHTML = '';

    arr.forEach((disco, j) => {

      const maxW = disksEl.parentElement.offsetWidth || 160;
      const minW = 30;
      const w = minW + ((disco / numDiscos) * (maxW - minW - 20));
      const color = DISK_COLORS[(disco - 1) % DISK_COLORS.length];
      const isTop = j === 0;

      const el = document.createElement('div');
      el.className = 'disk' + (isTop ? ' top-disk' : '');
      el.style.width = w + 'px';
      el.style.background = color;
      el.textContent = disco;

      disksEl.appendChild(el);

    });

    // Dibujar nodos de pila
    if (arr.length === 0) {

      stackEl.innerHTML = '<div class="stack-empty">vacía</div>';
      return;

    }

    let html = '';

    arr.forEach((disco, j) => {

      const isTop = j === 0;
      html += `
        <div class="stack-node ${isTop ? 'top-node' : ''}">
          <span class="stack-node-val">Disco ${disco}</span>
          ${isTop ? '<span class="stack-badge">top</span>' : ''}
        </div>`;

    });

    html += '<div style="font-size:11px;color:var(--text-muted);text-align:center;padding:4px 0;">x — fondo</div>';
    stackEl.innerHTML = html;

  });

}

// --- Log ---

function addLog(msg, tipo) {

  const list = document.getElementById('log-list');
  const item = document.createElement('div');

  const iconMove = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const iconWin = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 7l3.5 3.5L11 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const iconErr = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M3 3l7 7M10 3l-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

  const icons = { move: iconMove, win: iconWin, err: iconErr };
  const clases = { move: 'log-move', win: 'log-win', err: 'log-err' };

  item.className = 'log-item ' + (clases[tipo] || '');
  item.innerHTML = `<div class="log-icon">${icons[tipo] || ''}</div><span>${msg}</span>`;

  list.insertBefore(item, list.firstChild);

}

// --- Eventos ---

document.querySelectorAll('.disk-btn').forEach(btn => {

  btn.addEventListener('click', () => {

    if (autoRunning) return;

    document.querySelectorAll('.disk-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    inicializar(parseInt(btn.dataset.n));

  });

});

document.querySelectorAll('.tower-col').forEach((col, idx) => {

  col.addEventListener('click', () => seleccionarTorre(idx));

});

document.getElementById('btn-reset').addEventListener('click', () => {

  if (autoTimeout) clearTimeout(autoTimeout);
  autoRunning = false;
  document.getElementById('btn-auto').disabled = false;
  inicializar(numDiscos);

});

document.getElementById('btn-auto').addEventListener('click', resolverAuto);

document.getElementById('btn-clear-log').addEventListener('click', () => {

  document.getElementById('log-list').innerHTML = '';

});

// --- Inicio ---

inicializar(3);