class Nodo {

  constructor(clave, valor) {

    this.clave = clave;
    this.valor = valor;
    this.izquierdo = null;
    this.derecho = null;

  }

}

class ArbolBST {

  constructor() {

    this.raiz = null;

  }

  insertar(clave, valor) {

    const nuevoNodo = new Nodo(clave, valor);

    if (this.raiz === null) {

      this.raiz = nuevoNodo;

    } else {

      this._insertarNodo(this.raiz, nuevoNodo);

    }

  }

  _insertarNodo(nodoActual, nuevoNodo) {

    if (nuevoNodo.clave < nodoActual.clave) {

      if (nodoActual.izquierdo === null) {

        nodoActual.izquierdo = nuevoNodo;

      } else {

        this._insertarNodo(nodoActual.izquierdo, nuevoNodo);

      }

    } else {

      if (nodoActual.derecho === null) {

        nodoActual.derecho = nuevoNodo;

      } else {

        this._insertarNodo(nodoActual.derecho, nuevoNodo);

      }

    }

  }

  buscar(clave) {

    return this._buscarNodo(this.raiz, clave);

  }

  _buscarNodo(nodoActual, clave) {

    if (nodoActual === null) {

      return null;

    }

    if (clave === nodoActual.clave) {

      return nodoActual.valor;

    }

    if (clave < nodoActual.clave) {

      return this._buscarNodo(nodoActual.izquierdo, clave);

    } else {

      return this._buscarNodo(nodoActual.derecho, clave);

    }

  }

}


// Usamos el árbol como estructura nativa
const registro = new ArbolBST();

// Registrar estudiantes: clave = cédula, valor = datos del estudiante
registro.insertar(1050, { nombre: "Carlos Pérez",    corte1: 3.5, corte2: 4.0, corte3: 4.2 });
registro.insertar(1030, { nombre: "Ana Gómez",       corte1: 2.5, corte2: 2.8, corte3: 3.1 });
registro.insertar(1070, { nombre: "Luis Martínez",   corte1: 4.5, corte2: 4.8, corte3: 5.0 });
registro.insertar(1020, { nombre: "María Torres",    corte1: 1.5, corte2: 2.0, corte3: 1.8 });
registro.insertar(1040, { nombre: "Juan Rodríguez",  corte1: 3.0, corte2: 2.5, corte3: 2.8 });
registro.insertar(1060, { nombre: "Sofía Hernández", corte1: 4.0, corte2: 3.5, corte3: 4.5 });

// Función para calcular promedio ponderado
function calcularPromedio(estudiante) {

  return (estudiante.corte1 * 0.30) + (estudiante.corte2 * 0.30) + (estudiante.corte3 * 0.40);

}

// Función para mostrar la notificación
function mostrarNotificacion(cedula) {

  const estudiante = registro.buscar(cedula);

  if (estudiante === null) {

    console.log("================================================");
    console.log("  NOTIFICACIÓN: Estudiante no encontrado");
    console.log("================================================\n");
    return;

  }

  const promedio = calcularPromedio(estudiante);
  const estado = promedio >= 3.0 ? "APROBADO ✓" : "REPROBADO ✗";

  console.log("================================================");
  console.log("  NOTIFICACIÓN DE CALIFICACIONES");
  console.log("================================================");
  console.log(`  Estudiante : ${estudiante.nombre}`);
  console.log(`  Cédula     : ${cedula}`);
  console.log("------------------------------------------------");
  console.log(`  Corte 1 (30%) : ${estudiante.corte1.toFixed(1)}`);
  console.log(`  Corte 2 (30%) : ${estudiante.corte2.toFixed(1)}`);
  console.log(`  Corte 3 (40%) : ${estudiante.corte3.toFixed(1)}`);
  console.log("------------------------------------------------");
  console.log(`  Promedio final : ${promedio.toFixed(2)}`);
  console.log(`  Estado         : ${estado}`);
  console.log("================================================\n");

}

// Consultar notificaciones
mostrarNotificacion(1050);
mostrarNotificacion(1030);
mostrarNotificacion(1070);
mostrarNotificacion(1020);
mostrarNotificacion(1040);
mostrarNotificacion(1060);
mostrarNotificacion(9999);