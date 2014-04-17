var Graph = function () {
  this.nodes = {};
};

var Node = function (value) {
  this.value = value;
  this.edges = {};
};

Graph.prototype.addNode = function(newNode, toNode){
  this.nodes[newNode] = new Node(newNode);
  if (toNode !== undefined) {
    this.nodes[newNode].edges[toNode] = this.nodes[toNode];
  }
};

Graph.prototype.contains = function(node){
  return (node in this.nodes);
};

Graph.prototype.removeNode = function(node){
  _.each(this.nodes[node].edges, function (otherNode) {
    delete otherNode.edges[node];
  });
  delete this.nodes[node];
};

Graph.prototype.getEdge = function(fromNode, toNode){
  return (toNode in this.nodes[fromNode].edges);
};

Graph.prototype.addEdge = function(fromNode, toNode){
  this.nodes[fromNode].edges[toNode] = this.nodes[toNode];
  this.nodes[toNode].edges[fromNode] = this.nodes[fromNode];
};

Graph.prototype.removeEdge = function(fromNode, toNode){
  delete this.nodes[fromNode].edges[toNode];
  delete this.nodes[toNode].edges[fromNode];
  if (Object.keys(this.nodes[toNode].edges).length === 0) {
    delete this.nodes[toNode];
  }
  if (Object.keys(this.nodes[fromNode].edges).length === 0) {
    delete this.nodes[fromNode];
  }
};
