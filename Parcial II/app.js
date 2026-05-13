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

  print() {

    if (!this.size) {

      return null;

    }

    let current = this.top;
    let result = '';

    while (current) {

      result += current.data + '->';
      current = current.next;

    }

    result += 'x';
    return result;

  }

  getSize() {

    return this.size;

  }

  isEmpty() {

    return !this.size ? true : false;

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

class BankAccount {

  constructor(saldoInicial) {

    this.saldo = saldoInicial;
    this.historial = new Stack();

  }

  depositar(cantidad) {

    if (cantidad <= 0) {

      return { ok: false, msg: "El monto debe ser mayor a 0" };

    }

    this.historial.push({ operacion: 'Depósito', cantidad, saldoAnterior: this.saldo });
    this.saldo += cantidad;

    return { ok: true, tipo: 'deposito', cantidad, msg: `Depósito de $${cantidad}. Saldo actual: $${this.saldo}` };

  }

  retirar(cantidad) {

    if (cantidad <= 0) {

      return { ok: false, msg: "El monto debe ser mayor a 0" };

    }

    if (cantidad > this.saldo) {

      return { ok: false, msg: "Fondos insuficientes" };

    }

    this.historial.push({ operacion: 'Retiro', cantidad, saldoAnterior: this.saldo });
    this.saldo -= cantidad;

    return { ok: true, tipo: 'retiro', cantidad, msg: `Retiro de $${cantidad}. Saldo actual: $${this.saldo}` };

  }

  deshacer() {

    if (this.historial.isEmpty()) {

      return { ok: false, msg: "No hay operaciones para deshacer" };

    }

    const entrada = this.historial.pop();
    this.saldo = entrada.saldoAnterior;

    return { ok: true, tipo: 'undo', msg: `Operación revertida. Saldo restaurado: $${this.saldo}` };

  }

  getSaldo() {

    return this.saldo;

  }

}



const account = new BankAccount(0);



const iconDeposit = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M3 6l4-4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const iconWithdraw = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 12V2M3 8l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const iconUndo = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 6A4.5 4.5 0 1 1 4 9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M2.5 2.5v3.5H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const iconError = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.4"/><path d="M7 4.5V7M7 9.5h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;



function updateUI(cambio) {

  const saldoEl = document.getElementById('saldo-display');
  const subEl = document.getElementById('balance-change');

  saldoEl.textContent = '$' + account.getSaldo().toLocaleString();

  if (cambio) {

    subEl.className = 'balance-sub ' + cambio.clase;
    subEl.textContent = cambio.texto;

    setTimeout(() => {
      subEl.textContent = '';
      subEl.className = 'balance-sub';
    }, 2500);

  }

  document.getElementById('stack-size').textContent = account.historial.getSize() + ' ops';

  const p = account.historial.peek();
  document.getElementById('stack-peek').textContent = p !== null ? `${p.operacion} $${p.cantidad.toLocaleString()}` : '—';

  const pilaWrap = document.getElementById('pila-visual');
  const arr = account.historial.toArray();

  if (arr.length === 0) {

    pilaWrap.innerHTML = `
      <div class="pila-empty">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/>
          <path d="M11 16h10M16 11v10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span>La pila está vacía</span>
      </div>`;
    return;

  }

  let html = '';

  arr.forEach((val, i) => {

    if (i === 0) {

      html += `
        <div class="pila-node top-node">
          <span class="pila-node-val">${val.operacion} $${val.cantidad.toLocaleString()}</span>
          <span class="pila-badge">top</span>
        </div>`;

    } else {

      html += `<div class="pila-connector">|</div>
        <div class="pila-node">
          <span class="pila-node-val">${val.operacion} $${val.cantidad.toLocaleString()}</span>
        </div>`;

    }

  });

  html += `<div class="pila-connector">|</div>
    <div class="pila-bottom-label">x — fondo de la pila</div>`;

  pilaWrap.innerHTML = html;

}

function addLog(msg, tipo) {

  const list = document.getElementById('log-list');
  const item = document.createElement('div');

  let clase = 'log-neutral';
  let icon = iconError;

  if (tipo === 'deposito') { clase = 'log-ok'; icon = iconDeposit; }
  else if (tipo === 'retiro') { clase = 'log-ok'; icon = iconWithdraw; }
  else if (tipo === 'undo') { clase = 'log-undo'; icon = iconUndo; }
  else if (tipo === 'err') { clase = 'log-err'; icon = iconError; }

  item.className = 'log-item ' + clase;
  item.innerHTML = `<div class="log-icon">${icon}</div><span>${msg}</span>`;

  list.insertBefore(item, list.firstChild);

}

document.getElementById('btn-dep').addEventListener('click', () => {

  const val = parseFloat(document.getElementById('monto-input').value);

  if (isNaN(val) || val <= 0) {

    addLog("Ingresa un monto válido", 'err');
    return;

  }

  const res = account.depositar(val);
  addLog(res.msg, res.ok ? res.tipo : 'err');

  if (res.ok) {

    document.getElementById('monto-input').value = '';
    updateUI({ clase: 'up', texto: `+$${val.toLocaleString()} depositado` });

  } else {

    updateUI(null);

  }

});

document.getElementById('btn-ret').addEventListener('click', () => {

  const val = parseFloat(document.getElementById('monto-input').value);

  if (isNaN(val) || val <= 0) {

    addLog("Ingresa un monto válido", 'err');
    return;

  }

  const res = account.retirar(val);
  addLog(res.msg, res.ok ? res.tipo : 'err');

  if (res.ok) {

    document.getElementById('monto-input').value = '';
    updateUI({ clase: 'down', texto: `-$${val.toLocaleString()} retirado` });

  } else {

    updateUI(null);

  }

});

document.getElementById('btn-undo').addEventListener('click', () => {

  const res = account.deshacer();
  addLog(res.msg, res.ok ? res.tipo : 'err');
  updateUI(res.ok ? { clase: 'undo', texto: 'Operación revertida' } : null);

});

updateUI(null);