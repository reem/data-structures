var makeTree = function(value){
  var newTree = Object.create(treeMethods);
  newTree.value = value;
  newTree.children = [];
  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value){
  this.children.push(makeTree(value));
};

treeMethods.contains = function(target){
  if (this.value === target){
    return true;
  }
  if(this.children.length === 0){
    return false;
  }

  return some(this.children, function(child){
    return child.contains(target);
  });
};

var some = function(collection, test){
  var result = false;
  for (var i = 0; i < collection.length; i++){
    result = result || test(collection[i]);
  }
  return result;
}
