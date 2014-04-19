var expect = chai.expect;
var assert = chai.assert;

describe("b-tree", function () {
  var bTree;
  var stuff = [];
  var min = 0;
  var max = 100;
  var size = 10000;
  for (var i = 0; i < size; i++) {
    stuff.push(Math.floor(Math.random()*(max - min + 1) + min));
  }

  beforeEach(function () {
    bTree = new BTree();
  });

  it("should have methods: insert, contains, find", function () {
    expect(bTree.insert).to.be.a('function');
    expect(bTree.contains).to.be.a('function');
    expect(bTree.find).to.be.a('function');
  });

  it("should insert and contain one value", function(){
    bTree.insert(7);
    expect(bTree.contains(7));
  });

  it("should insert and contain several values", function(){
    _.each(stuff, function(val){
      bTree.insert(val);
    });

    var result = true;
    _.each(stuff, function(val){
      result = result && bTree.contains(val);
    });

    expect(result);
  });
});
