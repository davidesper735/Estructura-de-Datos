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

function isBalanced(str) {
    
  const stack = new Stack();

  for (let i = 0; i < str.length; i++) {

    const char = str[i];

    if (char === '(') {

      stack.push(char);

    } else if (char === ')') {

      if (stack.isEmpty()) {

        return false;

      }

      stack.pop();

    }
  }

  return stack.isEmpty();
}


console.log(isBalanced("())"));