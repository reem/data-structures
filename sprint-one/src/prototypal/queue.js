var makeLinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    if (list.tail === null) {
      list.head = makeNode(value);
      list.tail = list.head;
    } else {
      list.tail.next = makeNode(value)
      list.tail = list.tail.next;
    }
  };

  list.removeHead = function() {
    var returnVal = list.head.value;
    list.head = list.head.next;
    if (list.head === null) {
      list.tail = null;
    };
    return returnVal;
  };

  list.contains = function(target, node) {
    if (node === null) {
      return false;
    }
    node = node || list.head;
    return node.value === target || list.contains(target, node.next);
  };

  return list;
};

var makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;

  return node;
};

var makeQueue = function(){
  var instance = Object.create(queueMethods);

  // Use an object with numeric keys to store values
  instance.storage = makeLinkedList();
  // Implement the methods below
  instance.sizeOfQueue = 0;



  return instance;
};

var queueMethods = {
  enqueue : function(value){
    this.storage.addToTail(value);
    this.sizeOfQueue++;
  },

  dequeue : function(){
    if (this.sizeOfQueue === 0){
      return;
    }
    this.sizeOfQueue--;
    return this.storage.removeHead();
  },

  size : function(){
    return this.sizeOfQueue;
  }
};


