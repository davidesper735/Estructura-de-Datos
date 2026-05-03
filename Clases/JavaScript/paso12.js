class node{

    constructor(value, next){
        this.value = value;
        this.next = null;
    }

}

class linkedList{

    constructor(value){
        
        this.head = {
            this:value = value,
            this:next = null
        }
        this.tail = this.head;
        length = length + 1;

    }

    append(value){
        const newNode = new node(value);
        this.tail.next = newNode;
        this.tail = newNode;
        length++;
    }

    prepend(value){
        const newNode = new node(value);
        newNode.next = this.head;
        this.head = newNode;
        lenght++;
    }

}

const ArrayList = new linkedList();

ArrayList.append(900);
console.log(ArrayList)