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
  }
})

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

    // A vertex's uniqueness is determined by its `id`:
    // should it exist amongst the tree's vertices...
    if (self.findVertex(vertexId)){
      return false
    }

    self.vertices.push(vertex)
    return true
  }
})

function DirectedGraph (rootVertex) {
  let graph = {
    vertices,
    edges
  }

  return Object.assign(
    graph,
    Graphness(graph),
    Directedness(graph),
    AddsVertices(graph)
  )
}

export {
  Directedness,
  DirectedGraph
}