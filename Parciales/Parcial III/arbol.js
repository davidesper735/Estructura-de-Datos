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