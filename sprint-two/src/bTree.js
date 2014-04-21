var _ = _;

/**
 * Constructor for any kind of node in a B-Tree.
 * @param {boolean} leaf - tags if a node is a leaf node. 
 * @param {number} arity - indicates the arity of the tree.
 */
var BTreeNode = function BTreeNodeConstructor(leaf, arity) {
  this.leaf = leaf;
  this.n = 0;
  this.keys = [];
  this.children = [];
  this.arity = arity;
};

/** 
 * Implements the interface for a B-Tree.
 * @param {number} arity - the arity of the B-Tree.
 */
var BTree = function BTreeConstructor(arity) {
  this.arity = arity || 8;
  this.root = new BTreeNode(true, this.arity);
};

var isFull = function isFull(node) {
  return node.n === 2 * node.arity - 1;
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

// BTree methods

BTree.prototype.insert = function BTreeInsert(key) {
  // Inserts into the tree.
  if (isFull(this.root)) {
    // Special case for a full root - this is the only place
    // where the height of the B-Tree could increase.
    var newRoot = new BTreeNode(false, this.arity);
    var oldRoot = this.root;
    this.root = newRoot;
    this.root.children[0] = oldRoot;
    this.root._splitChild(0);
  }

  // Since we just checked if the root is full and split
  // it if it was, we can now guarantee that we are now
  // inserting into a node that is not full.
  this.root._insertNotFull(key);
};

BTree.prototype.contains = function BTreeContains(key) {
  return this.find(key) !== null;
};

BTree.prototype.find = function BTreeFind(key) {
  // Returns either null or a value that compares equal to the key.

  // Delegates to the find operation of BTreeNodes
  return this.root.find(key);
};

// BTreeNode methods

BTreeNode.prototype.find = function BTreeNodeFind(key) {
  // Searches recursively down the tree looking for a key.
  // that compares === to key. Returns that key.

  // Is delegated to by BTree.find.
  if (_.contains(this.keys, key)) {
    // We return the key because it may contain metadata.
    return key;
  } else if (this.leaf) {
    // We have arrived at a leaf that does not contain
    // the key, meaning it is not present in the tree. 
    return null;
  } else {
    // We are not at a leaf and this value is not in the 
    // keys of the current node. Find the correct child
    // to recurse on and search inside of it.
    var childIndex = findIndex(this.keys, key);
    return this.children[childIndex].find(key);
  }
};

/**
 * Splits a child at the passed in index.
 * @param  {number} childIndex index of the child to split.
 */
BTreeNode.prototype._splitChild = function BTreeNodeSplitChild(childIndex) {
  var child = this.children[childIndex];

  // Create a new node. This is one of two places a node
  // can be created. This new node will be a sibling to the
  // split child.
  var sibling = new BTreeNode(child.leaf, this.arity);

  // Set the sibling and child's size to the minimum size. 
  sibling.n = child.n = child.arity - 1;

  // Take the right-side of the childs keys and place them in
  // the sibling.
  sibling.keys = child.keys.splice(this.arity, 
    Number.MAX_SAFE_INTEGER); // Splices until the end.

  if (!(child.leaf)) {
    // Only move children if this is not a leaf, meaning
    // it has children.

    // The sibling will be a leaf if the child is a leaf.
    sibling.children = child.children.splice(this.arity+1, 
      Number.MAX_SAFE_INTEGER);
  }

  // Insert the sibling into the correct index.
  this.children.splice(childIndex+1, 0, sibling);

  // Promote one of the child's keys to the parent.
  this.keys.splice(childIndex, 0, child.keys[child.arity]);
  // Increase the size of the parent.
  this.n++;
};

/**
 * Inserts into the correct position of a NOT FULL node.
 * @param  {orderable} key - the key to insert. 
 */
BTreeNode.prototype._insertNotFull = function BTreeNodeInsertNotFull(key) {
  if (this.leaf) {
    // If this is a leaf we can just insert into the array.
    // We know it is not full so we don't have to check for
    // overflow.
    this.keys.splice(findIndex(this.keys, key), 0, key);
    this.n++;
  } else {
    // We have to insert into a child. Even though
    // we know that 'this' is not full, it's children
    // might be.
    var childIndex = findIndex(this.keys, key);

    if (isFull(this.children[childIndex])) {
      // We have come across a filled internal node!
      // We should split it so if we have to bubble
      // up from a full leaf lower down we don't have
      // a problem trying to promote a value to a full node.
      this._splitChild(childIndex);

      if (key > this.keys[childIndex]) {
        // If we inserted a key lower than the index
        // we were just looking at, we have to bump
        // our childIndex.
        childIndex++;
      }
    }
    // We have made sure we are not about to call this
    // method on a full node, so recurse.
    this.children[childIndex]._insertNotFull(key);
  }
};
