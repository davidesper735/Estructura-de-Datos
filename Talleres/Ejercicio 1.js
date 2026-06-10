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

      result += current.data += '->';
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

}

class BankAccount {

  constructor(saldoInicial) {

    this.saldo = saldoInicial;
    this.historial = new Stack();

  }

  depositar(cantidad) {

    if (cantidad <= 0) {

      console.log("El monto debe ser mayor a 0");
      return;

    }

    this.historial.push(this.getSaldo);
    this.getSaldo += cantidad;

    console.log(`Depósito de $${cantidad}. Saldo actual: $${this.getSaldo}`);

  }

  retirar(cantidad) {

    if (cantidad <= 0) {

      console.log("El monto debe ser mayor a 0");
      return;

    }

    if (cantidad > this.getSaldo) {

      console.log("Fondos insuficientes");
      return;

    }

    this.historial.push(this.getSaldo);
    this.getSaldo -= cantidad;

    console.log(`Retiro de $${cantidad}. Saldo actual: $${this.getSaldo}`);

  }

  deshacer() {

    if (this.historial.isEmpty()) {

      console.log("No hay operaciones para deshacer");
      return;

    }

    this.saldo = this.historial.pop();

    console.log(`Operación revertida. Saldo restaurado: $${this.getSaldo}`);

  }

  getSaldo() {

    console.log(`Saldo actual: $${this.getSaldo}`);

  }

}

const account = new BankAccount(1000);

account.getSaldo();       //$1000
account.depositar(500);       //$1500
account.retirar(200);      //$1300
account.getSaldo();       //

account.deshacer();         // $1500
account.deshacer();         //$1000
account.deshacer();         