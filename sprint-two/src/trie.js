var Trie = function (val) {
  this.value = val || null;
  this.children = {};
};

Trie.prototype.insert = function (str, val) {
  if (str === "") { this.value = val; return undefined; }
  // this.value is assigned to undefined in the case
  // where no val is passed in.

  if(!(str[0] in this.children)) {
    this.children[str[0]] = new Trie();
  }

  this.children[str[0]].insert(str.slice(1));
};

Trie.prototype.contains = function (str) {
  return (this.lookup(str) !== null);
  // undefined SHOULD pass!
};

Trie.prototype.lookup = function (key) {
  var node = this;
  for (var i = 0; i < key.length; i++) {
    if (!(key[i] in node.children)) {
      return null;
    } else {
      node = node.children[key[i]];
    }
  }
  // Returns undefined, NOT NULL if used as assoc array.
  return node.value;
};

Trie.prototype.stringsFromPrefix = function (prefix) {
  return _.reduce(this.children, function (result, child, chr) {
    if (chr === prefix[0]) {
      return result.concat(child.stringsFromPrefix);
    } else {
      return result;
    }
  }, []);
};
