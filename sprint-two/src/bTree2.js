var _ = _;

var BTreeNode = function BTreeNodeConstructor(leaf, t) {
  this.leaf = leaf;
  this.n = 0;
  this.keys = [];
  this.children = [];
  this.t = t;
};

var BTree = function BTreeConstructor(arity) {
  this.arity = arity || 8;
  this.root = new BTreeNode(true, this.arity);
};

var isFull = function isFull(node) {
  return node.n === 2 * node.arity - 1;
};

BTree.prototype.insert = function BTreeInsert(key) {
  if (isFull(this.root)) {
    var s = new BTreeNode(false, this.arity);
    this.root = s;
    this.root.children[0] = this.root; // this.root.keys = []
    this.root._splitChild(0); // this.root.keys.push(promoted_value_from_child)
  }
  this.root._insertNotFull(key);
};

BTreeNode.prototype._splitChild = function BTreeNodeSplitChild(childIndex) {
  var child = this.children[childIndex];
  var sibling = new BTreeNode(child.leaf, this.arity);
  sibling.n = child.n = child.arity - 1;

  sibling.keys = child.keys.splice(this.arity, Number.MAX_SAFE_INTEGER);

  if (!(child.leaf)) {
    sibling.children = child.children.splice(this.arity+1, Number.MAX_SAFE_INTEGER);
  }

  this.children.splice(childIndex+1, 0, sibling);
  this.keys.splice(childIndex, 0, child.keys[child.arity]);
  this.n++;
};

var findIndex = function findIndex(arr, key) {
  var index = 0;
  _.each(arr, function (val) {
    if (key > val) {
      index++;
    }
  });
  return index;
};

BTreeNode.prototype._insertNotFull = function BTreeNodeInsertNotFull(key) {
  if (this.leaf) {
     // insert key into the correct location in a NOT FULL node.
    this.keys.splice(findIndex(this.keys, key), 0, key);
    this.n++;
  } else {
    var childIndex = findIndex(this.keys, key);
    if (isFull(this.children[childIndex])) {
      this._splitChild(childIndex);
      if (key > this.keys[childIndex]) {
        childIndex++;
      }
    }
    this.children[childIndex]._insertNotFull(key);
  }
};
