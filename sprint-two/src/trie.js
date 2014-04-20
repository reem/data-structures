var Trie = function (val) {
  this.value = val || null;
  this.children = {};
};

Trie.prototype.insert = function (str, val) {
  if (str === "") { this.value = val; return undefined; }
  // this.value is assigned to undefined in the case
  // where no val is passed in. (i.e. we have reached
  // the end of a string.)

  if(!(str[0] in this.children)) {
    // Create the children if they don't exist.
    this.children[str[0]] = new Trie();
  }

  // Insert into all the appropriate children.
  this.children[str[0]].insert(str.slice(1));
};

Trie.prototype.contains = function (str) {
  return (this.lookup(str) !== null);
  // undefined SHOULD pass! null is used as our indicator value.
};

Trie.prototype.lookup = function (key) {
  // This uses an iterative version of a recursive algorithm
  // for clarity and speed, given that js doesn't have tco.
  var node = this;
  for (var i = 0; i < key.length; i++) {
    if (!(key[i] in node.children)) {
      // We have reached the end! No such val.
      return null;
    } else {
      // "recurse" down the right tree.
      node = node.children[key[i]];
    }
  }
  // Returns undefined, NOT NULL if used as assoc array.
  return node.value;
};

Trie.prototype.stringsFromPrefix = function (prefix) {
  // Just a quick sample application of a trie.
  return _.reduce(this.children, function (result, child, chr) {
    if (chr === prefix[0]) {
      return result.concat(child.stringsFromPrefix);
    } else {
      return result;
    }
  }, []);
};
