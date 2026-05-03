// Tienda - Ventas

const ventas = [
['Portatil', 5, 1000000, '2026-02-01'],
['Mouse', 10, 25000, '2026-02-15'],
['Teclado', 3, 50000, '2026-02-20'],
['Portatil', 2, 1000000, '2026-03-01'],
['Monitor', 1, 200000, '2026-02-25'],
['Mouse', 15, 25000, '2026-03-01'],
['Teclado', 7, 50000, '2026-03-03'],
['Monitor', 3, 200000, '2026-03-04']
];

vendidoMenos30Dias(ventas);
totalVentasProducto(ventas);
ProductoMasVendido(ventas);
ProductosMasRentables(ventas);


function vendidoMenos30Dias(ventas){

    const hoy = new Date();
    const fecha30Dias = new Date();
    fecha30Dias.setDate(hoy.getDate() - 30);

    var masVendido30 = {};

    for(var i = 0; i < ventas.length; i++){

        var fechaVenta = new Date(ventas[i][3]);

        if(fechaVenta >= fecha30Dias && fechaVenta <= hoy){

            var nombre = ventas[i][0];
            var cantidad = ventas[i][1];

            if(masVendido30[nombre]){

                masVendido30[nombre] = masVendido30[nombre] + cantidad;

            } else {

                masVendido30[nombre] = cantidad;
            }

        }

    }

    var masVendido = "";
    var masCantidad30 = 0;
    
    for (var articulo in masVendido30) {
        
        if (masVendido30[articulo] > masCantidad30) {

            masCantidad30 = masVendido30[articulo];
            masVendido = articulo;
        }
    }

    console.log(masVendido);

}

function totalVentasProducto(ventas){

    var total = {};

    let nombre = "";
    let cantidad = 0;
    let precioProducto = 0;
    let totalVenta = 0;

    for(let i = 0; i < ventas.length; i++){

        nombre = ventas[i][0];
        cantidad = ventas[i][1];
        precioProducto = ventas[i][2];

        totalVenta = precioProducto * cantidad;

        if(total[nombre]){

                total[nombre] = total[nombre] + totalVenta;

            } else {

                total[nombre] = totalVenta;
            }
    }

    console.log(total);

}

function ProductoMasVendido(ventas) {

    const productosMap = new Map();

    for (let i = 0; i < ventas.length; i++) {

        let nombre = ventas[i][0];
        let cantidad = ventas[i][1];

        if (productosMap.has(nombre)) {

            productosMap.set(nombre, productosMap.get(nombre) + cantidad);

        } else {
            
            productosMap.set(nombre, cantidad);

        }
    }

    
    let masVendido = "";
    let maxCantidad = 0;

    
    for (let [producto, cantidad] of productosMap) {
        
        if (cantidad > maxCantidad) {

            maxCantidad = cantidad;
            masVendido = producto;

        }
    }

    console.log("Producto más vendido:", masVendido, "con", maxCantidad, "unidades");

}

function ProductosMasRentables(ventas) {

    var rentabilidadMap = new Map();

    for (var i = 0; i < ventas.length; i++) {

        var nombre = ventas[i][0];
        var cantidad = ventas[i][1];
        var precio = ventas[i][2];

        var totalVenta = cantidad * precio;

        if (rentabilidadMap.has(nombre)) {

            rentabilidadMap.set(nombre, rentabilidadMap.get(nombre) + totalVenta);

        } else {

            rentabilidadMap.set(nombre, totalVenta);

        }
    }

    var productosFiltrados = [];

    for (var [producto, total] of rentabilidadMap) {

        if (total > 4000000) {

            productosFiltrados.push({ producto: producto, total: total });

        }
    }

    productosFiltrados.sort(function(a, b) {

        return b.total - a.total;

    });

    console.log("Productos más rentables con total > 4,000,000:");
    console.log(productosFiltrados);

}