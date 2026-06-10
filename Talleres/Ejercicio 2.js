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

class CarritoDeCompras {

  constructor() {

    this.totalProductos = 0;
    this.historial = new Stack();

  }

  agregarProducto(producto) {

    this.historial.push(this.totalProductos);
    this.totalProductos++;

    console.log(`Producto agregado: ${producto}. Total productos: ${this.totalProductos}`);

  }

  eliminarProducto(producto) {

    if (this.totalProductos === 0) {

      console.log(`El carrito está vacío`);
      return;

    }

    this.historial.push(this.totalProductos);
    this.totalProductos--;

    console.log(`Producto eliminado: ${producto}. Total productos: ${this.totalProductos}`);

  }

  deshacerUltima() {

    if (this.historial.isEmpty()) {

      console.log("No hay acciones para deshacer");
      return;

    }

    this.totalProductos = this.historial.pop();

    console.log(`Acción revertida. Total productos: ${this.totalProductos}`);

  }

  mostrarCarrito() {

    if (this.totalProductos === 0) {

      console.log("El carrito está vacío");
      return;

    }

    console.log(`Total productos en carrito: ${this.totalProductos}`);

  }

}

const carrito = new CarritoDeCompras();

carrito.mostrarCarrito();               // El carrito está vacío
carrito.agregarProducto("Camiseta");    //[Camiseta]
carrito.agregarProducto("Zapatos");     //[Camiseta, Zapatos]
carrito.agregarProducto("Pantalón");    //[Camiseta, Zapatos, Pantalón]
carrito.mostrarCarrito();               //[Camiseta, Zapatos, Pantalón]

carrito.eliminarProducto("Zapatos");    //[Camiseta, Pantalón]
carrito.eliminarProducto("Gorra");      

carrito.deshacerUltima();              //[Camiseta, Zapatos, Pantalón]
carrito.deshacerUltima();              //[Camiseta, Zapatos]
carrito.deshacerUltima();              //[Camiseta]
carrito.deshacerUltima();              //[]
carrito.deshacerUltima();              