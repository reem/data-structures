var HashTable = function(maxLoadFactor, limit){

  // The current size of the internal storage of this table.
  this._limit = limit || 8;

  // Internal storage.
  // makeLimitedArray is a wrapper around an array with
  // bounds checking for get and set.
  this._storage = makeLimitedArray(this._limit);

  // The maximum load factor of the hashtable.
  // A higher value means fewer resizes but worse
  // performance as you approach higher load factors.
  this._maxLoadFactor = maxLoadFactor || 0.75; // 0 is nonsense.

  // The current load factor. Updated in insertion and removal.
  this._currentLoad = 0;
};

HashTable.prototype.insert = function (k, v) {
  // Hash the key.
  var i = getIndexBelowMaxForKey(k, this._limit);

  // Insert into the bucket indexed by the hashed key. 
  if (this._storage.get(i) !== undefined) {
    // Check if this key is already in the table.
    if (!this.retrieve(k)){
      // All clear, just push it on to the bucket.
      this._storage.get(i).push(new HashEntry(k, v));
    }  else {
      // We have to find the entry in the bucket
      // that contains this key and change its value.
      _.each(this._storage.get(i), function (entry){
        if(entry.key === k){
          entry.value = v;
        }
      });
    }
  } else {
    // There was no bucket at this value, so make one.
    // Buckets are arrays of HashEntry objects.
    this._storage.set(i, [new HashEntry(k, v)]);
  }
  // Increment the current load and resize the table
  // if the load factor is above the max.
  this._currentLoad++;
  if (this._currentLoad / this._limit > this._maxLoadFactor) {
    this.resize(true);
  }
};

HashTable.prototype.retrieve = function (k) {
  // Hash the key.
  var i = getIndexBelowMaxForKey(k, this._limit);

  // Get the bucket.
  var arr = this._storage.get(i);

  // If there is no key like this in the table, return null.
  if (!arr) { return null; }

  // Great! No collisions yet so just grab the value.
  if (arr.length === 1) {
    return arr[0].value;
  } else {
    // Search through the bucket and try to find the keys.
    var result = null;
    _.each(arr, function (entry){
      if(entry.key === k){
        result = entry.value;
      }
    });
    return result;
  }
};

HashTable.prototype.remove = function (k) {
  // Hash the key.
  var i = getIndexBelowMaxForKey(k, this._limit);

  // If there is no key, we are done.
  if (this.retrieve(k) === null) {
    return;
  }

  // Find the correct index, remove it.
  _.each(this._storage.get(i), function (entry, index, arr) {
    if(entry.key === k){
      arr.splice(index, 1);
      this._currentLoad--;
    }
  });

  // If that was the last key, set this bucket to undefined.
  if (this._storage.get(i).length === 0) {
    this._storage.set(i, undefined);
  }

  // Resize if necessary.
  if (this._currentLoad / this._limit < (this._maxLoadFactor / 2)) {
    this.resize(false);
  }
};

HashTable.prototype.resize = function (increase) {
  // Create a new table that is either half the size or twice
  // the size.
  var newTable;
  if (increase) {
    newTable = new HashTable(this._maxLoadFactor, this._limit * 2);
  } else {
    newTable = new HashTable(this._maxLoadFactor, Math.floor(this._limit / 2));
  }

  // Go through our storage and re-add every entry to the new table.
  this._storage.each(function (entries) {
    _.each(entries, function (entry) {
      newTable.insert(entry.key, entry.value);
    });
  });

  // Overload every property of this to the properties of the new table.
  // you can read this as: this = newTable.
  this._maxLoadFactor = newTable._maxLoadFactor;
  this._storage = newTable._storage;
  this._currentLoad = newTable._currentLoad;
  this._limit = newTable._limit;
};

///// HashEntry

var HashEntry = function (k, v) {
  // Wrapper for an entry.
  this.key = k;
  this.value = v;
};


