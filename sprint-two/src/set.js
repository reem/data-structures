var Set = function(){
  // Use a hashtable for storage.
  this._storage = new HashTable();
};

// Wrapper methods around the internal hashtable methods.

Set.prototype.add = function(item) {
  this._storage.insert(item, undefined);
};

Set.prototype.contains = function(item) {
  return this._storage.retrieve(item) !== null;
};

Set.prototype.remove = function(item) {
  this._storage.remove(item);
};