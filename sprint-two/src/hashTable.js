var HashTable = function(maxLoadFactor){
  this._limit = 8;
  this._storage = makeLimitedArray(this._limit);
  this._maxLoadFactor = maxLoadFactor || 0.75; // 0 is nonsense.
  this._currentLoad = 0;
};

HashTable.prototype.insert = function (k, v) {
  var i = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage.get(i) !== undefined) {
    if (!this.retrieve(k)){
      this._storage.get(i).push(new HashEntry(k, v));
    }  else {
      _.each(this._storage.get(i), function (entry){
        if(entry.key === k){
          entry.value = v;
        }
      });
    }
  } else {
    this._storage.set(i, [new HashEntry(k, v)]);
  }
  this._currentLoad++;
};

HashTable.prototype.retrieve = function (k) {
  var i = getIndexBelowMaxForKey(k, this._limit);
  var arr = this._storage.get(i);
  if (!arr) { return null; }
  if (arr.length === 1) {
    return arr[0].value;
  } else {
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
  var i = getIndexBelowMaxForKey(k, this._limit);
  if (this.retrieve(k) === null) {
    return;
  }
  _.each(this._storage.get(i), function (entry, index, arr) {
    if(entry.key === k){
      arr.splice(index, 1);
    }
  });
  if (this._storage.get(i).length === 0) {
    this._storage.set(i, undefined);
  }
};

HashTable.prototype.resize = function () {

};

///// HashEntry

var HashEntry = function (k, v) {
  this.key = k;
  this.value = v;
};
