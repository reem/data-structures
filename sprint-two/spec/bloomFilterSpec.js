var assert = chai.assert;

describe("bitarray", function() {
  var bitarray;

  beforeEach(function() {
    bitarray = new BitArray(10);
  });

  it("should have methods named 'activate', 'get', 'used' and 'deactivate'", function() {
    expect(bitarray.activate).to.be.a('function');
    expect(bitarray.deactivate).to.be.a('function');
    expect(bitarray.get).to.be.a('function');
    expect(bitarray.used).to.be.a('function');
  });

  it("should properly set a value to 1", function () {
    expect(bitarray.activate(3).get(3)).to.equal(1);
  });

  it("should properly set a value to 0" , function () {
    expect(bitarray.activate(3).deactivate(3).get(3)).to.equal(0);
  });


});

describe("bloom filter", function () {
  var bloomFilter;

  beforeEach(function () {
    bloomFilter = new BloomFilter();
  });

  it("should have methods named: insert, contains, resize", function(){
    expect(bloomFilter.insert).to.be.a('function');
    expect(bloomFilter.contains).to.be.a('function');
  });

  it("should add values with insert", function(){
    expect(bloomFilter.insert(5).contains(5)).to.equal(true);
  });

  it("should not have false negatives", function(){
    expect(bloomFilter.contains(5)).to.equal(false);
    expect(bloomFilter.insert(6).insert(5).insert(4).contains(4)).to.equal(true);
    expect(bloomFilter.contains(5)).to.equal(true);
    expect(bloomFilter.contains(6)).to.equal(true);
  });
});

