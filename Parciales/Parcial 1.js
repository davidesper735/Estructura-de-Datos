class Node{

    constructor(data, next){
        this.data = data;
        this.next = next;
    };
};

class LinkedList{

    constructor(){
        this.head = null;
        this.size = 0;
    };

    add(data){
        const newNode = new Node(data, null);
        if(!this.head){
            this.head = newNode;
        } else {
            let current = this.head;
            while(current.next){
                current = current.next;
            };
            current.next = newNode;
        };
        this.size++;
    };

    insertAt(data, index){
        if(index < 0 || index > this.size){
            return null;
        }

        const newNode = new Node(data);
        let current = this.head;
        let previous;

        if(index === 0){
            newNode.next = current;
            this.head = newNode;
        } else {
            for(let i = 0; i < index; i++){
                previous = current;
                current = current.next;
            };

            newNode.next = current;
            previous.next = newNode;
        };

        this.size++;
    };

    print(){
        if(!this.size){
            return null;
        };
        
        let current = this.head;
        let result = '';
        while(current){
            result += current.data + '->';
            current = current.next;
        }
        result += 'x';
        return result;
    }

    removeData(data){
        let current = this.head;
        let previous = null;

        while(current != null){
            if(current.data === data){
                if(!previous){
                    this.head = current.next;
                } else {
                    previous.next = current.next
                };

                this.size--;
                return current.data;
            };
            previous = current;
            current = current.next;
        };
        return null;
        
    };

    removeFrom(index){
        if(index < 0 || index > this.size){
            return null;
        };

        let current = this.head;
        let previous = null;

        if(index === 0){
            this.head = current.next;
        } else {
            for(let i = 0; i < index; i++){
                previous = current;
                current = current.next;
            };
            previous.next = current.next;
        };
        this.size--;
        return current.data;
    };

    getSize(){
        return this.size;
    }

    isEmpty(){
        return !this.size ? true : false;
    }
};


const notas = new LinkedList();
entrada = true;

let opcion;

do{

    mostrarMenu();

    opcion = prompt("Ingresa la opción a elegir: ");
    opcion = parseInt(opcion);

    procesarOpcion(opcion);


} while (opcion != 5);

function mostrarMenu(){

    console.log("======================");
    console.log("         MENU         ");
    console.log("======================");
    console.log(" ");
    console.log("1. Ingreso de notas.");
    console.log("2. Eliminar notas.");
    console.log("3. Editar notas.");
    console.log("4. Mostrar Notas");
    console.log("5. Salir.")

}

function procesarOpcion(opcion){

    switch(opcion){

        case 1:

            agregarNota();
            break;
            
        case 2:
            borrarNota();
            break;

        case 3:
            editarNota();
            break;

        case 4:
            mostrarNotas();
            break;

        case 5:
            console.log("Chao.")

        default:
            alert("Esa opción no es válida. ");
            break;
    }

}

function agregarNota(){

    console.log("==============================");
    console.log("         AGREGAR NOTA         ");
    console.log("==============================");

    let cantidad = prompt("Cuantas notas quieres agregar: ");
    cantidad = parseInt(cantidad);

    for(let i = 1; i <= cantidad; i++){

        let nota = prompt("Ingresa la nota número " + i + ": ");
        nota = parseFloat(nota);

        notas.add(nota);

    }

}

function borrarNota(){

    console.log("==============================");
    console.log("         BORRAR NOTA          ");
    console.log("==============================");

    console.log("Notas actuales: " + notas.print());

    if(notas.isEmpty()){

        console.log("No hay notas para eliminar");
        return;

    }

    let posicionNota = prompt("Ingresa el indice de la nota a borrar empezando desde 0");
    posicionNota = parseInt(posicionNota);

    if(posicionNota < 0 || posicionNota >= notas.getSize()){

        console.log("Esta nota no existe.");

    } else {

        const notaEliminada = notas.removeFrom(posicionNota);
        console.log("Nota eliminada: " + notaEliminada);

    }

}

function editarNota(){

    console.log("==============================");
    console.log("         EDITAR NOTA          ");
    console.log("==============================");

    if(notas.isEmpty()){
        console.log("No hay notas para editar.");
        return;
    }

    console.log("Notas actuales: " + notas.print());

    let posicion = prompt("Ingresa el índice de la nota a editar (desde 0): ");
    posicion = parseInt(posicion);

    if(posicion < 0 || posicion >= notas.getSize()){

        console.log("Esta nota no existe.");
        return;
    }

    let nuevaNota = prompt("Ingresa la nueva nota: ");
    nuevaNota = parseFloat(nuevaNota);


    const eliminada = notas.removeFrom(posicion);
    notas.insertAt(nuevaNota, posicion);

    console.log("Nota anterior: " + eliminada);
    console.log("Nota actualizada correctamente.");
    console.log("Lista actual: " + notas.print());

}

function mostrarNotas(){

    console.log("==============================");
    console.log("         MOSTRAR NOTAS        ");
    console.log("==============================");

    if(notas.isEmpty()){
        console.log("No hay notas registradas.");
        return;
    }

    const size = notas.getSize();

    console.log("Índice | Nota");
    console.log("----------------");

    for(let i = 0; i < size; i++){

        let nota = notas.removeFrom(i);

        console.log(i + "      | " + nota);

        notas.insertAt(nota, i);
    }

}

