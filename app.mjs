import { Vertex } from './Vertex.mjs'
import { DirectedGraph } from './DirectedGraph.mjs'
import { DirectedTreeTrait } from './DirectedTree.mjs';
import { ForestTrait } from './Forest.mjs';


const items = [
  { id: 2, seqId: 4, parent: 5, name: "index.tsx" },
  { id: 3, seqId: 3, parent: 1, name: "Sidebar" },
  { id: 4, seqId: 5, parent: 1, name: "Table" },
  { id: 7, seqId: 5, parent: 5, name: "SelectableDropdown.tsx" },
  { id: 5, seqId: 2, parent: 1, name: "AssignmentTable" },
  { id: 1, seqId: 1, parent: null, name: "components" },
  { id: 6, seqId: 2, parent: null, name: "controllers" },
];



/**
 * From: https://github.com/cantidio/node-tree-flatten/tree/v1.0.0
 * Copyright (c) 2016 Cantidio Fontes
 * 
 * @param array - of Nodes
 * @returns array
 */
const flattenTree = (root, key) => {
  // Make a copy of the vertex to the array
  let flatten = [Object.assign({}, root)];
  // Delete the chosen property of the copy, 
  // the 'vertex' is not modified in any way
  delete flatten[0][key];

  // If the chosen property exists and it's
  // a non-empty array
  if (root[key] && root[key].length > 0) {

    return flatten.concat(
      root[key]
        // Do the same to the child vertices
        // with the aforementioned property
        .map((child)=>flattenTree(child, key))
        // Concatenate the arrays of children
        .reduce((a, b)=>a.concat(b), [])
    );
  }
  // End
  return flatten;
}

const transformItems = (items) => {

  // Turn them into Vertices
  const vertices = items.map( (item) => {
    return Vertex(
      item.id,
      item.seqId,
      {
        parent: item.parent,
        name: item.name
      }
    )
  })

  // Create a Graph
  const graph = DirectedGraph([],[])
  const potentialForest = Object.assign(
    graph,
    DirectedTreeTrait(graph),
    ForestTrait(graph)
  )

  // Introduce the aforementioned vertices
  // onto the graph
  vertices
    .forEach(v => {
      // This creates Edges that connects
      // a parent and child
      if (v.content.parent !== null){
        graph.addConnectedVertexPair(
          vertices.find( vertex => v.content.parent === vertex.id),
          v
        )
      } else {
        // This is meant for isolated vertices
        graph.addVertex(v)
      }
    })

  // Transform them based on the expected output
  return potentialForest
    // Create two nested objects
    .toForest()
    // flattenTree returns an array
    .map(x => flattenTree(x, 'children'))
    // so it must be flattened thereafter
    .flat(1)
    // transform according to the expected output
    .map(x => ({
      id: x.id,
      seqId: x.seqId,
      parent: x.content.parent,
      depth: x.depth,
      name: x.content.name
    }))
}

const finalItems = transformItems(items);

/*
Create a function `transformItems` that would return the desired output below
(should be able to support virtually unlimited depth and additional items)
*/

console.log(finalItems);

/* Output:
// The seqId is used for ordering within siblings.
// The depth would depend on the number of ancestors.
[
  { id: 1, seqId: 1, parent: null, depth: 0, name: 'components' },
  { id: 5, seqId: 2, parent: 1, depth: 1, name: 'AssignmentTable' },
  { id: 2, seqId: 4, parent: 5, depth: 2, name: 'index.tsx' },
  { id: 7, seqId: 5, parent: 5, depth: 2, name: 'SelectableDropdown.tsx' },
  { id: 3, seqId: 3, parent: 1, depth: 1, name: 'Sidebar' },
  { id: 4, seqId: 5, parent: 1, depth: 1, name: 'Table' },
  { id: 6, seqId: 2, parent: null, depth: 0, name: 'controllers' }
]
*/