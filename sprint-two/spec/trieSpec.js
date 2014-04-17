var expect = chai.expect;
var assert = chai.assert;

describe("trie", function () {
  var trie;

  beforeEach(function () {
    trie = new Trie();
  });

  it("should have methods: insert, contains", function () {
    expect(trie.insert).to.be.a('function');
    expect(trie.contains).to.be.a('function');
  });

  it("should allow insertions and contain them", function () {
    trie.insert("party", 5);
    trie.insert("paltry", 6);
    expect(trie.contains("party")).to.equal(true);
    expect(trie.contains("paltry")).to.equal(true);
  });

  it("should not 'contain' substrings of inserted strings", function () {
    trie.insert("paltry", 8);
    expect(trie.contains("pal")).to.equal(false);
  });

  it("should return all strings matching a prefix", function () {
    trie.insert("party");
    trie.insert("paltry");
    assert.notStrictEqual(trie.stringsFromPrefix("pa"), ["party", "paltry"]);
  });

});
