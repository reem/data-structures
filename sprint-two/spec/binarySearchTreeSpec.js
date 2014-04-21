var assert = chai.assert;

describe("binarySearchTree", function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = makeBinarySearchTree(5);
  });

  it("should have methods named 'insert', 'contains', and 'depthFirstLog", function() {
    expect(binarySearchTree.insert).to.be.a('function');
    expect(binarySearchTree.contains).to.be.a('function');
    expect(binarySearchTree.each).to.be.a('function');
  });

  it("should insert values at the correct location in the tree", function(){
    binarySearchTree = binarySearchTree.insert(2);
    binarySearchTree = binarySearchTree.insert(3);
    binarySearchTree = binarySearchTree.insert(7);
    binarySearchTree = binarySearchTree.insert(6);
    expect(binarySearchTree.left.right.value).to.equal(3);
    expect(binarySearchTree.right.left.value).to.equal(6);
  });

  it("should have a working 'contains' method", function(){
    binarySearchTree = binarySearchTree.insert(2);
    binarySearchTree = binarySearchTree.insert(3);
    binarySearchTree = binarySearchTree.insert(7);
    assert.isTrue(binarySearchTree.contains(7));
    assert.isFalse(binarySearchTree.contains(8));
  });

  it("should execute a callback on every value in a tree using 'depthFirstLog'", function(){
    var array = [];
    var func = function(value){ array.push(value); };
    binarySearchTree = binarySearchTree.insert(2);
    binarySearchTree = binarySearchTree.insert(3);
    binarySearchTree.each(func);
    assert.notStrictEqual(array, [5,2,3]);
  });
});
