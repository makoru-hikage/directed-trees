import Vertex from './Vertex.mjs'
import Forest from './Forest.mjs'
import {Graph} from './Graph.mjs'
import {DirectedGraph} from './DirectedGraph.mjs'


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

const graph = DirectedGraph([], [])

vertices
  .filter(x => x.content.parent !== null )
  .forEach((vertex) => {
    graph.addConnectedVertexPair(
      vertices.find(x => x.id === vertex.content.parent ),
      vertex)
  })

const forest = graph.edges.map(
  edge => {
    let pair = { id: null, parent: null }
    if (edge.firstVertex !== null) {
      pair.parent = edge.firstVertex.id
    }

    if (edge.secondVertex !== null) {
      pair.id = edge.secondVertex.id
    }

    return pair
  }
)

//const finalItems = transformItems(vertices);

/*
Create a function `transformItems` that would return the desired output below
(should be able to support virtually unlimited depth and additional items)
*/

console.dir(graph.edges);

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