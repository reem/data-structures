var makeBinarySearchTree = function(value, left, right) {
  // Persistent Binary Search Tree data structure.
  // Uses the Functional instantiation style.

  // Provides an immutable interface for insertion that
  // supports memory sharing.
  return extend({
    left : left || null, // null represents a "leaf" node.
    right : right || null,
    value: value
  }, binaryTreeMethods);
};

// Will contain the "prototype" of this data-structure.
var binaryTreeMethods = {};

binaryTreeMethods.insert = function(value) {
  if (this.value < value) {
    // must check here or we might try to access a property on null 
    if(this.right === null) {
      return makeBinarySearchTree(this.value, this.left, 
        makeBinarySearchTree(value));
    }
    return makeBinarySearchTree(this.value, this.left, 
      this.right.insert(value));
  }
  if(this.value > value) {
    if(this.left === null) {
      return makeBinarySearchTree(this.value, 
        makeBinarySearchTree(value), this.right);
    }
    return makeBinarySearchTree(this.value, 
      this.left.insert(value), this.right);
  }
  if (this.value === value) {
    return this;
  }
};

binaryTreeMethods.contains = function(value){
  if (this.value < value) {
    if(this.right === null) {
      return false;
    }
    return this.right.contains(value);
  }
  if(this.value > value) {
    if(this.left === null) {
      return false;
    }
    return this.left.contains(value);
  }
  if (this.value === value) {
    return true;
  }
};

binaryTreeMethods.each = function (callback) {
  callback(this.value);
  // Check that left and right are not null before
  // we try and recurse on them.
  this.left  && this.left.each(callback);
  this.right && this.right.each(callback);
};

var extend = function(to, from){
  // Pseudo-copy of _.extend, returns to.
  for(var key in from){
    to[key] = from[key];
  }
  return to;
};
