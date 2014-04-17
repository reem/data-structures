var makeBinarySearchTree = function(value, left, right) {
  return extend({
    left : left || null,
    right : right || null,
    value: value
  }, binaryTreeMethods);
};

var binaryTreeMethods = {};

binaryTreeMethods.insert = function(value) {
  if (this.value < value) {
    if(this.right === null){
      return makeBinarySearchTree(this.value, this.left, makeBinarySearchTree(value));
    }
    return makeBinarySearchTree(this.value, this.left, this.right.insert(value));
  }
  if(this.value > value) {
    if(this.left === null) {
      return makeBinarySearchTree(this.value, makeBinarySearchTree(value), this.right);
    }
    return makeBinarySearchTree(this.value, this.left.insert(value), this.right);
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

binaryTreeMethods.depthFirstLog = function (callback) {
  callback(this.value);
  this.left  && this.left.depthFirstLog(callback);
  this.right && this.right.depthFirstLog(callback);
};

var extend = function(to, from){
  for(var key in from){
    to[key] = from[key];
  }
  return to;
};
