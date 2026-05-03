// Array
let notas = [2, 2.5, 5, 4, 3.8];

function calcularMaxYMin(){

    var max = notas[0];
    var min = notas[0];

    for(let i = 0; i <= notas.length; i++){
        
        if(notas[i] > max){
            
            max = notas[i];
        
        } else if (notas[i] < min){
            
            min = notas[i];
        }
    }
    
    console.log("Nota maxima: " + max);
    console.log("Nota minima: " + min);

}

function calcularAprobadosYReprobados(){

    aprobados = 0;
    reprobados = 0;
    suma = 0;

    for(let n of notas){
        
        if (n >= 3.0){
            
            aprobados++;

        } else if (n < 3.0) {
            
            reprobados++;
        }
        
        suma = suma + n;
    }
    
    console.log("Aprobados: " + aprobados);
    console.log("Reprobados: " + reprobados);
    console.log("Promedio: " + suma / notas.length);
}

calcularMaxYMin();
calcularAprobadosYReprobados();