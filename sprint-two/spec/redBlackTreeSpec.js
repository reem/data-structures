var expect = chai.expect;
var assert = chai.assert;

describe("Red-Black Tree", function () {
  var rbTree;
  var stuff;

  beforeEach(function () {
    rbTree = new RedBlackTree();
    stuff = [];
    var min = 0;
    var max = 100;
    var size = 100;
    for (var i = 0; i < size; i++) {
      stuff.push(Math.floor(Math.random()*(max - min + 1) + min));
    }
  });

  it("should have methods: insert, contains, lookup, insertMany, traversals, map", function () {
    expect(rbTree.insert).to.be.a('function');
    expect(rbTree.contains).to.be.a('function');
    expect(rbTree.lookup).to.be.a('function');
    expect(rbTree.insertMany).to.be.a('function');
    expect(rbTree.preOrderTraverse).to.be.a('function');
    expect(rbTree.postOrderTraverse).to.be.a('function');
    expect(rbTree.inOrderTraverse).to.be.a('function');
    expect(rbTree.map).to.be.a('function');
  });

  it("should insert and contain one value", function(){
    rbTree.insert(7);
    expect(rbTree.contains(7)).to.equal(true);
  });

  it("should insert and contain several values", function(){
    _.each(stuff, function(val){
      rbTree.insert(val);
    });

    var result = true;
    _.each(stuff, function(val){
      result = result && rbTree.contains(val);
    });

    expect(result).to.equal(true);
  });
});
