var Graph = function () {
  // Wrapper object that knows about all nodes.
  this.nodes = {};
};

var Node = function (value) {
  // Node object. Has a value and a link to its neighbors.
  this.value = value;
  this.edges = {};
};

Graph.prototype.addNode = function(newNode, toNode){
  // Create and add a node to the graph.
  this.nodes[newNode] = new Node(newNode);
  if (toNode !== undefined) {
    // Create a bidirectional edge.
    this.nodes[newNode].edges[toNode] = this.nodes[toNode];
  }
};

Graph.prototype.contains = function(node){
  // We have a master object, so we don't have to
  // iterate through the nodes.
  return (node in this.nodes);
};

Graph.prototype.removeNode = function(node){
  // Delete every edge that points to this node.
  _.each(this.nodes[node].edges, function (otherNode) {
    delete otherNode.edges[node];
  });
  // Delete this node.
  delete this.nodes[node];
};

Graph.prototype.getEdge = function(fromNode, toNode){
  // Boolean result for the presence of an edge.
  return (toNode in this.nodes[fromNode].edges);
};

Graph.prototype.addEdge = function(fromNode, toNode){
  this.nodes[fromNode].edges[toNode] = this.nodes[toNode];
  this.nodes[toNode].edges[fromNode] = this.nodes[fromNode];
};

Graph.prototype.removeEdge = function(fromNode, toNode){
  delete this.nodes[fromNode].edges[toNode];
  delete this.nodes[toNode].edges[fromNode];
  
  // If there are no edges to a node, delete that node.
  if (Object.keys(this.nodes[toNode].edges).length === 0) {
    delete this.nodes[toNode];
  }
  if (Object.keys(this.nodes[fromNode].edges).length === 0) {
    delete this.nodes[fromNode];
  }
};
