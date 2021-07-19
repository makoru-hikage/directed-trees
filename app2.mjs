import Vertex from './Vertex.mjs'
import {DirectedGraph} from './DirectedGraph.mjs'
import {TreeChecks} from './DirectedTree.mjs'
import Edge from './Edge.mjs'


const items = [
  { id: 2, seqId: 4, parent: 5, name: "index.tsx" },
  { id: 3, seqId: 3, parent: 1, name: "Sidebar" },
  { id: 4, seqId: 5, parent: 1, name: "Table" },
  { id: 7, seqId: 5, parent: 5, name: "SelectableDropdown.tsx" },
  { id: 5, seqId: 2, parent: 1, name: "AssignmentTable" },
  { id: 1, seqId: 1, parent: null, name: "components" },
  { id: 6, seqId: 2, parent: null, name: "controllers" },
];

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

const graph = DirectedGraph()

vertices
  .filter(v => v.content.parent !== null)
  .forEach(v => {
    graph.addConnectedVertexPair(
      vertices.find( vertex => v.content.parent === vertex.id),
      v
    )
  })

let a = TreeChecks.allHaveOneParent(graph)
//const finalItems = transformItems(vertices);

/*
Create a function `transformItems` that would return the desired output below
(should be able to support virtually unlimited depth and additional items)
*/

console.dir(a);

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