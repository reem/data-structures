var Stack = function() {
  this.storage = {};
  this.size_of_storage = 0;
};

var extend = function (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
};

var stackMethods = {
  push: function (value){
    this.storage[this.size_of_storage++] = value;
  },
  pop: function () {
    this.size_of_storage && this.size_of_storage--;
    var result = this.storage[this.size_of_storage];
    delete this.storage[this.size_of_storage];
    return result;
  },
  size: function() {
    return this.size_of_storage;
  }
};

extend(Stack.prototype, Object.create(stackMethods));
