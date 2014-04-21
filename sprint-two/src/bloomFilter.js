var BitArray = function (size) {
  // Provides a clean interface for an array of
  // 0s and 1s. 

  // Use a Uint8Array for memory efficiency and speed.
  this._storage = new Uint8Array(size);
  for (var i = 0; i < size; i++) {
    this._storage[i] = 0;
  }
};

BitArray.prototype.activate = function (index) {
  // Activates a bit in the array. Returns itself
  // for chaining.

  // Could be optimized to use a bit mask and store
  // 8 bits per byte. For now we are fine with the
  // memory inefficiency.
  this._storage[index] = 1;
  return this;
};

BitArray.prototype.deactivate = function (index) {
  // Deactivates a bit in the array. Returns itself
  // for chaining.
  this._storage[index] = 0;
  return this;
};

BitArray.prototype.get = function (index) {
  // Reads the value of a bit in the array.
  return this._storage[index];
};

BitArray.prototype.length = function () {
  // Provides access to the internal length of the array. 
  return this._storage.length;
};

BitArray.prototype.used = function () {
  // Basically a sum operation.
  return _.reduce(this._storage, function (a, b) { return a + b; });
};

var BloomFilter = function (initSize, numHashFunctions) {
  this._storage = new BitArray(initSize || 200);
  this._hashFunctions = [];
  for (var i = 0; i < (numHashFunctions || 40); i++) {
    this._hashFunctions.push(
      generateHashFunction(this._storage.length));
  }
  this.load = 0;
};

BloomFilter.prototype.insert = function (value){
  // We use a reverse-map operation to hash the value with
  // every hash function and activate that bit.
  _.each(reverseMap(this._hashFunctions, value), function(index) {
    this._storage.activate(index);
  }, this);
  return this;
};

BloomFilter.prototype.insertMany = function (values) {
  // Inserts a list of values into a filter.
  return _.reduce(values, function (filter, value) {
    return filter.insert(value);
  }, this);
};

BloomFilter.prototype.contains = function (value){
  return _.every(reverseMap(this._hashFunctions, value), function(index){
    return this._storage.get(index);
  }, this);
};

var reverseMap = function (funcs, value) {
  // Maps a value onto a list of functions

  // reverseMap([console.log, alert, console.log], 7) =>
  // 7 is logged, then alerted, then logged again.
  return _.map(funcs, function (func) {
    return func(value);
  });
};

var hashString = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

var generateHashFunction = function (maxIndex) {
  // Generates a bad family of random hash functions.
  var randomPart = Math.random();

  return function (obj) {
    var number = hashString(JSON.stringify(obj), maxIndex * 10);
    return Math.floor(number / randomPart) % maxIndex;
  };
};
