var makeSet = function(){
  var set = Object.create(setPrototype);
  set._storage = new HashTable();
  return set;
};

var setPrototype = {};

setPrototype.add = function(item){
  this._storage.insert(item, undefined);
};

setPrototype.contains = function(item){
  return this._storage.retrieve(item) !== null;
};

setPrototype.remove = function(item){
  this._storage.remove(item);
};

// HashTable!

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

// Hashtable Helpers!

var makeLimitedArray = function(limit){
  var storage = [];

  var limitedArray = {};
  limitedArray.get = function(index){
    checkLimit(index);
    return storage[index];
  };
  limitedArray.set = function(index, value){
    checkLimit(index);
    storage[index] = value;
  };
  limitedArray.each = function(callback){
    for(var i = 0; i < storage.length; i++){
      callback(storage[i], i, storage);
    }
  };

  var checkLimit = function(index){
    if(typeof index !== 'number'){ throw new Error('setter requires a numeric index for its first argument'); }
    if(limit <= index){ throw new Error('Error trying to access an over-the-limit index'); }
  };

  return limitedArray;
};

// This is a "hashing function". You don't need to worry about it, just use it
// to turn any string into an integer that is well-distributed between the
// numbers 0 and `max`
var getIndexBelowMaxForKey = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};
