var expect = chai.expect;
var assert = chai.assert;

describe("Red-Black Tree", function () {
  var rbTree;

  beforeEach(function () {
    rbTree = new RedBlackTree();
    var stuff = [];
    var min = 0;
    var max = 100;
    var size = 100;
    for (var i = 0; i < size; i++) {
      stuff.push(Math.floor(Math.random()*(max - min + 1) + min));
    }
  });

  it("should have methods: insert, contains, lookup, insertMany", function () {
    expect(rbTree.insert).to.be.a('function');
    expect(rbTree.contains).to.be.a('function');
    expect(rbTree.lookup).to.be.a('function');
    expect(rbTree.insertMany).to.be.a('function');
  });

  it("should contain inserted values", function () {

  });
});
