import Edge from "./Edge.mjs"
import {Graphness} from './Graph.mjs'

const Directedness = (self) => ({
  /**
   * In a Tree Graph each vertex has only
   * one parent, only the root node has a
   * null parent
   *
   * @param int vertexId of the child
   * @returns Vertex | null
   */
  findVertexParent (vertexId) {
    let edges = self.edges
    for (let i = 0; i < edges.length; i++){
      let edge = edges[i]
      if (vertexId === edge.secondVertex.id){
        return edge.firstVertex
      }

      if (vertexId === self.rootVertexId){
        return self.rootVertex
      }
    }

    return null
  },

  /**
   * Find a the children of a particular
   * vertex; a 'leaf' has no children.
   *
   * @param int vertexId of the supposed parent 
   * @returns array of Vertices
   */
  findVertexChildren (vertexId) {
    let edges = self.edges
    for (let i = 0; i < edges.length; i++){
      let edge = edges[i]
      let children = []
      if (vertexId === edge.firstVertex.id){
        children.push(edge.secondVertex)
      }

      return children
    }
  },

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

export default function TreeGraph (rootVertex) {
  let graph = {
    rootVertex,
    rootVertexId: rootVertex,
    vertices: [],
    edges: []
  }

  graph.vertices.push(rootVertex)
  graph.rootVertexId = rootVertex.id

  return Object.assign(
    graph,
    Graphness(graph),
    Directedness(graph)
  )
}
