var RedBlackTree = function (key, value, color, left, right) {
  this.color = color || "Black";
  this.left = left || null;
  this.right = right || null;
  this.key = key;
  this.value = value || null;
  this.parent = parent || null;
};

var makeSwitchObject = function (obj) {
  var that = this;
  return function (index) {
    return function () {
      return obj[index].apply(that, arguments)
    };
  };
};

RedBlackTree.prototype.insert = function(key, value) {
  // Normal insertion
  this.caseInsertRebalance(1)(key, value);
};

RedBlackTree.prototype.caseInsertionRebalance = makeSwitchObject({
  1: function (key, value) {
    if (this.parent === null) {
      this.color = "Black";
    } else {
      this.caseInsertionRebalance[2](this, key, value);
    }
  },
  2: function () {

  },
  3: function () {

  },
  4: function () {

  },
  5: function () {

  }
});

RedBlackTree.prototype._grandparent = function RBTreeGrandparent() {
  return this.parent && this.parent.parent;
};

RedBlackTree.prototype._uncle = function RBTreeUncle() {
  var grandparent = this._grandparent;
  if (grandparent === null) {
    return null;
  } else {
    if (this.parent === grandparent.left) {
      return grandparent.right;
    } else {
      return grandparent.left;
    }
  }
};

RedBlackTree.prototype.contains = function() {

};

RedBlackTree.prototype.delete = function() {

};


RedBlackTree.prototype.lookup = function() {

};

RedBlackTree.prototype.insertMany = function() {

};

RedBlackTree.prototype.map = function () {

};

RedBlackTree.prototype.inOrderTraverse = function () {
  // look down left tree
  // look at value
  // look down right tree
};

RedBlackTree.prototype.preOrderTraverse = function () {
  // look at value
  // look at left
  // look at right
};

RedBlackTree.prototype.postOrderTraverse = function () {
  // look at right
  // look at left
  // look at value
};
