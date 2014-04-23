var LinkedList = function() {
  this.head = null;
  this.tail = null;
};

LinkedList.prototype.addToTail = function(value) {
  if (this.tail === null) {
    this.tail = this.head = new ListNode(value);
  } else {
    this.tail = this.tail.next = new ListNode(value);
  } return this;
};

LinkedList.prototype.removeHead = function() {
  var returnVal = this.head.value;
  this.head = this.head.next;
  if (this.head === null) {
    this.tail = null;
  }
  return returnVal;
};

LinkedList.prototype.contains = function(target, node) {
  if (node === null) {
    return false;
  }
  node = node || this.head;
  return node.value === target || this.contains(target, node.next);
};

var ListNode = function(value){
  this.value = value;
  this.next = null;
};
