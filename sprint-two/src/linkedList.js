var makeLinkedList = function() {
  var list = { head: null, tail: null };

  list.addToTail = function(value) {
    if (list.tail === null) {
      list.tail = list.head = makeNode(value);
    } else {
      list.tail = list.tail.next = makeNode(value);
    } return list;
  };

  list.removeHead = function() {
    var returnVal = list.head.value;
    list.head = list.head.next;
    if (list.head === null) {
      list.tail = null;
    }
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
