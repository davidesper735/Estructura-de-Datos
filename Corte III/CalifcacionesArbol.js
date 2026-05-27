// ================================================
// arbol.js — Implementación del Árbol Binario de Búsqueda
// (Estructura de datos base, no modificar)
// ================================================

class NodoEstudiante {

  constructor(cedula, nombre, corte1, corte2, corte3) {

    this.cedula = cedula;
    this.nombre = nombre;
    this.corte1 = corte1;
    this.corte2 = corte2;
    this.corte3 = corte3;
    this.promedio = (corte1 * 0.30) + (corte2 * 0.30) + (corte3 * 0.40);
    this.izquierdo = null;
    this.derecho = null;

  }

}

class ArbolCalificaciones {

  constructor() {

    this.raiz = null;

  }

  insertar(cedula, nombre, corte1, corte2, corte3) {

    const nuevoEstudiante = new NodoEstudiante(cedula, nombre, corte1, corte2, corte3);

    if (this.raiz === null) {

      this.raiz = nuevoEstudiante;

    } else {

      this._insertarNodo(this.raiz, nuevoEstudiante);

    }

  }

  _insertarNodo(nodoActual, nuevoEstudiante) {

    if (nuevoEstudiante.cedula < nodoActual.cedula) {

      if (nodoActual.izquierdo === null) {

        nodoActual.izquierdo = nuevoEstudiante;

      } else {

        this._insertarNodo(nodoActual.izquierdo, nuevoEstudiante);

      }

    } else {

      if (nodoActual.derecho === null) {

        nodoActual.derecho = nuevoEstudiante;

      } else {

        this._insertarNodo(nodoActual.derecho, nuevoEstudiante);

      }

    }

  }

  buscar(cedula) {

    return this._buscarNodo(this.raiz, cedula);

  }

  _buscarNodo(nodoActual, cedula) {

    if (nodoActual === null) {

      return null;

    }

    if (cedula === nodoActual.cedula) {

      return nodoActual;

    }

    if (cedula < nodoActual.cedula) {

      return this._buscarNodo(nodoActual.izquierdo, cedula);

    } else {

      return this._buscarNodo(nodoActual.derecho, cedula);

    }

  }

}


// ================================================
// ejercicio.js — Sistema de notificaciones
// con promedio ponderado de tres cortes
// ================================================

function obtenerEstado(promedio) {

  if (promedio >= 3.0) {

    return "APROBADO ✓";

  } else {

    return "REPROBADO ✗";

  }

}

function mostrarNotificacion(estudiante) {

  if (estudiante === null) {

    console.log("================================================");
    console.log("  NOTIFICACIÓN: Estudiante no encontrado");
    console.log("================================================\n");
    return;

  }

  console.log("================================================");
  console.log("  NOTIFICACIÓN DE CALIFICACIONES");
  console.log("================================================");
  console.log(`  Estudiante : ${estudiante.nombre}`);
  console.log(`  Cédula     : ${estudiante.cedula}`);
  console.log("------------------------------------------------");
  console.log(`  Corte 1 (30%) : ${estudiante.corte1.toFixed(1)}`);
  console.log(`  Corte 2 (30%) : ${estudiante.corte2.toFixed(1)}`);
  console.log(`  Corte 3 (40%) : ${estudiante.corte3.toFixed(1)}`);
  console.log("------------------------------------------------");
  console.log(`  Promedio final : ${estudiante.promedio.toFixed(2)}`);
  console.log(`  Estado         : ${obtenerEstado(estudiante.promedio)}`);
  console.log("================================================\n");

}

// Inicializar árbol
const registro = new ArbolCalificaciones();

// Registrar estudiantes con sus tres cortes
registro.insertar(1050, "Carlos Pérez",     3.5, 4.0, 4.2);
registro.insertar(1030, "Ana Gómez",        2.5, 2.8, 3.1);
registro.insertar(1070, "Luis Martínez",    4.5, 4.8, 5.0);
registro.insertar(1020, "María Torres",     1.5, 2.0, 1.8);
registro.insertar(1040, "Juan Rodríguez",   3.0, 2.5, 2.8);
registro.insertar(1060, "Sofía Hernández",  4.0, 3.5, 4.5);

// Enviar notificaciones buscando por cédula
mostrarNotificacion(registro.buscar(1050));
mostrarNotificacion(registro.buscar(1030));
mostrarNotificacion(registro.buscar(1070));
mostrarNotificacion(registro.buscar(1020));
mostrarNotificacion(registro.buscar(1040));
mostrarNotificacion(registro.buscar(1060));

// Búsqueda de estudiante inexistente
mostrarNotificacion(registro.buscar(9999));