var BitArray = function (size) {
  this._storage = [];
  for (var i = 0; i < size; i++) {
    this._storage[i] = 0;
  }
};

BitArray.prototype.activate = function (index) {
  this._storage[index] = 1;
  return this;
};

BitArray.prototype.deactivate = function (index) {
  this._storage[index] = 0;
  return this;
};

BitArray.prototype.get = function (index) {
  return this._storage[index];
};

BitArray.prototype.length = function () {
  return this._storage.length;
};

BitArray.prototype.used = function () {
  return _.reduce(this._storage, function (a, b) { return a + b; });
};

var BloomFilter = function (initSize, numHashFunctions) {
  this._items = [];
  this._storage = new BitArray(initSize || 8);
  this._hashFunctions = [];
  for (var i = 0; i < (numHashFunctions || 4); i++) {
    this._hashFunctions.push(
      generateHashFunction(this._storage.length));
  }
  this.load = 0;
};

BloomFilter.prototype.insert = function (value){
  this._items.push(value);
  _.each(reverseMap(this._hashFunctions, value), function(index) {
    this._storage.activate(index);
  }, this);
  if ((++this.load * this._hashFunctions.length) /
         this._storage.length() > 0.75) {
    this.resize();
  }
  return this;
};

BloomFilter.prototype.insertMany = function (values) {
  return _.reduce(values, function (filter, value) {
    return filter.insert(value);
  }, this);
};

BloomFilter.prototype.contains = function (value){
  return _.every(reverseMap(this._hashFunctions, value), function(index){
    return this._storage.get(index);
  }, this);
};

BloomFilter.prototype.resize = function () {
  var newFilter = new BloomFilter(this._storage.length() * 2,
    Math.floor(((2 * this._storage.length()) / this.load) * 0.63));
  _.extend(this, newFilter.insertMany(this._items));
};

var reverseMap = function (funcs, value) {
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
  var randomPart = Math.random();

  return function (obj) {
    var number = hashString(JSON.stringify(obj), maxIndex * 10);
    return Math.floor(number / randomPart) % maxIndex;
  };
};
