import Edge from "./Edge.mjs"
import {Graphness} from './Graph.mjs'
import {Directedness} from './DirectedGraph.mjs'

const AddsVertices = (self) => ({
  /**
   * Returns true if the vertex is successfully
   * added, otherwise false.
   *
   *
   * @param Vertex vertex 
   * @param int parentVertexId 
   * @returns bool
   */
   addVertex (vertex, parentVertexId) {
    let vertexId = vertex.id
    let parentVertex = self.findVertex(parentVertexId)

    // A vertex's uniqueness is determined by its `id`:
    // should it exist amongst the tree's vertices...
    // Also every vertex must have only one parent,
    // only the `rootVertex` has no parent.
    if (self.findVertex(vertexId) || parentVertex === null){
      return false
    }

    self.vertices.push(vertex)
    self.edges.push(Edge(parentVertex, vertex))
    return true

  }
})

/**
 * Each vertex has only one parent if there are any
 * Only the rootVertex has no parent
 *
 * @param Vertex rootVertex 
 * @returns 
 */
function DirectedTree (rootVertex) {
  let graph = {
    rootVertex,
    vertices: [],
    edges: []
  }

  graph.vertices.push(rootVertex)

  return Object.assign(
    graph,
    Graphness(graph),
    Directedness(graph),
    AddsVertices(graph)
  )
}

export {
  DirectedTree
}