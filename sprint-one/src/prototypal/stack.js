var makeStack = function() {
   var instance = Object.create(stackMethods);

  // Use an object with numeric keys to store values
  instance.storage = {};
  instance.size_of_storage = 0;

  return instance;
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
