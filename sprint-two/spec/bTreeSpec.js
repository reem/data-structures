var expect = chai.expect;
var assert = chai.assert;

describe("b-tree", function () {
  var bTree;

  beforeEach(function () {
    bTree = new BTree();
  });

  it("should have methods: ", function () {
    expect(bTree.method).to.be.a('function');
  });
});
