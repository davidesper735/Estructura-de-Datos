const tarifaBase = 40000;

const visitante = {

    nombre: "David",
    edad: 60,
    esEstudiante: true,
    diaSemana: "miercoles",
    tieneCuponDescuento: true

};

calcularPrecioEntrada(visitante);

function calcularPrecioEntrada(visitante){

    let precioFinal = tarifaBase;
    let categoria = "";

    if(visitante.edad < 5){

        precioFinal = 0;
        categoria = "Niñez";

    } else if (visitante.edad >= 5 && visitante.edad <= 12){

        precioFinal = calculoDescuento1(0.5, precioFinal)

        categoria = "Niñez";

    } else if (visitante.edad >= 13 && visitante.edad <= 26 && visitante.esEstudiante){

        precioFinal = calculoDescuento1(0.3, precioFinal)

        categoria = "Joven Estudiante";

    } else if (visitante.edad >= 60){

        precioFinal = calculoDescuento1(0.4, precioFinal)

        categoria = "Adulto Mayor"

    } else {

        precioFinal = tarifaBase;
        
        categoria = "Adulto";

    }

    if (precioFinal > 0){

        if(visitante.diaSemana.toLowerCase() == "miercoles" || visitante.diaSemana.toLowerCase() == "miércoles"){

            precioFinal = calculoDescuento2(0.2, precioFinal)

        }

        if(visitante.tieneCuponDescuento){

            precioFinal = calculoDescuento2(0.1, precioFinal)

        }

    }

    console.log(`Hola ${visitante.nombre}, categoría: ${categoria}. Precio final de tu entrada: ${precioFinal}`);

}

function calculoDescuento1(decimal, precio){

    let descuento = tarifaBase * decimal;
    precio = tarifaBase - descuento;

    return precio;

}

function calculoDescuento2(decimal, precio){

    let descuento = precio * decimal;
    precio = precio - descuento;

    return precio;

}


