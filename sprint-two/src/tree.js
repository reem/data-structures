var Tree = function(value){
  // Basic Tree structure.
  this.value = value;
  this.children = [];
};

Tree.prototype.addChild = function(value){
  this.children.push(new Tree(value));
};

Tree.prototype.contains = function(target){
  if (this.value === target){
    return true;
  }
  if(this.children.length === 0){
    return false;
  }

  return _.some(this.children, function(child){
    return child.contains(target);
  });
};
