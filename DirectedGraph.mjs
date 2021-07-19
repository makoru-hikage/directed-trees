import Edge from "./Edge.mjs"
import {Graphness} from './Graph.mjs'

const Directedness = (self) => ({
  /**
   * Find the tails of the edges where
   * a vertex is a head.
   *
   * @param int vertexId of the child
   * @returns array
   */
  findVertexTails (vertexId) {
    let edges = self.edges
    let results = []
    for (let i = 0; i < edges.length; i++){
      let edge = edges[i]
      if (vertexId === edge.secondVertex.id){
        results.push(edge.firstVertex)
      }
    }

    return results
  },

  /**
   * Find the heads of the edges of a vertex
   *
   * @param int vertexId of the supposed tail 
   * @returns array of head Vertices
   */
  findVertexHeads (vertexId) {
    let edges = self.edges
    let heads = []
    for (let i = 0; i < edges.length; i++){
      let edge = edges[i]
      if (vertexId === edge.firstVertex.id){
        heads.push(edge.secondVertex)
      }

      return heads
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
  addVertex (vertex) {
    let vertexId = vertex.id

    // A vertex's uniqueness is determined by its `id`:
    // should it exist amongst the tree's vertices...
    if (self.findVertex(vertexId)){
      return false
    }

    self.vertices.push(vertex)
    return true
  },

  /**
   * Returns true if the edge is successfully
   * added, otherwise false.
   *
   *
   * @param Vertex vertex 
   * @param int parentVertexId 
   * @returns bool
   */
   addConnectedVertexPair (firstVertex, secondVertex) {

    // An edge's uniqueness is determine by its pair
    // This is a one-way edge
    if (self.edgeExists(firstVertex, secondVertex)){
      return false
    }

    // Add the first of the pair in the list if not
    // yet added, the second shall be added also
    if (firstVertex !== null){
      self.addVertex(firstVertex)
    }

    if (secondVertex !== null){
      self.addVertex(secondVertex)
    }

    // Create and add the Edge
    self.edges.push(Edge(firstVertex, secondVertex))

    return true
  }
})

function DirectedGraph (vertices, edges) {
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