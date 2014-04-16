var makeSet = function(){
  var set = Object.create(setPrototype);
  set._storage = undefined;
  return set;
};

var setPrototype = {};

setPrototype.add = function(item){
};

setPrototype.contains = function(item){
};

setPrototype.remove = function(item){
};
