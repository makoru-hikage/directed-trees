/**
 * Find the children of a node
 *
 * @param Graph graph 
 * @param Node supposedParent 
 * @returns array -- of Nodes
 */
 const findChildren = (graph, supposedParent) => {
  return graph.filter(
    child => child.parent === supposedParent.id
  );
}

/**
 * Updates all nodes: A deep mapping that 
 * sets the `children` attribute of the nodes.
 * 
 * @param Graph graph 
 * @returns graph
 */
const setDescendants = (graph) => {
  return graph.map( node => {
    node.children = findChildren(graph,node);
    return node;
  });
}

/**
 * Find the ancestors of a node in a certain graph
 *
 * @param Graph graph
 * @param Node node
 * @param array pedigree
 * @returns int
 */
const findAncestors = (graph, node, pedigree = []) => {
  if (node.parent === null) {
    return pedigree;
  }

  let updatedPedigree = pedigree.concat([graph[node.parent],]);
  return findAncestors (graph, graph[node.parent], updatedPedigree);
}

/**
 * Updates a node: details its ancestors within
 * a given graph.
 * 
 * @param Graph graph
 * @param Node node
 * @return Node
 */
const addAncestorsProperty = (graph, node) => {
  node.ancestors = findAncestors(graph, node, []);
  return node;
}

/**
 * Updates a node: Counts the ancestors of a node
 *
 * @param Node node 
 * @returns Node
 */
const addDepthProperty = (graph, node) => {
  let updatedNode = addAncestorsProperty(graph, node);

  updatedNode.depth = updatedNode.ancestors.length;

  return updatedNode;
}

/**
 * Append a node to a chosen array, its
 * index shall be determined by its 'id'
 * property which must be a natural number.
 *
 * @param array - of nodes
 * @returns array - of nodes
 */
 const appendById = (arr, node) => {
  if ('id' in node) {
    // I should be using Typescr--oh wait...
    // TS's Number does not distinguish ints from floats.
    if (typeof(node.id) === 'number' && Number.isInteger(node.id)){
      // Indices are usually integers, but I prefer natural numbers.
      if (node.id > 0) {
        arr[node.id] = node;
      }
    }
  }
  return arr;
}

/**
 * From: https://github.com/cantidio/node-tree-flatten/tree/v1.0.0
 * Copyright (c) 2016 Cantidio Fontes
 * 
 * @param array - of Nodes
 * @returns array
 */
 const flattenTree = (root, key) => {
  let flatten = [Object.assign({}, root)];
  delete flatten[0][key];

  if (root[key] && root[key].length > 0) {
    return flatten.concat(root[key]
      .map((child)=>flattenTree(child, key))
      .reduce((a, b)=>a.concat(b), [])
    );
  }

  return flatten;
}

module.exports = {
  findChildren: findChildren,
  findAncestors: findAncestors,
  setDescendants: setDescendants,
  addDepthProperty: addDepthProperty,
  appendById: appendById,
  flattenTree: flattenTree
}