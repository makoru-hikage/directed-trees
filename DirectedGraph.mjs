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
  },

  /**
   * This is a directed graph. Edges 
   * `{ firstVertex: a, secondVertex: b}`
   * and `{ firstVertex: b, secondVertex: a}`
   * are treated differently.
   *
   * @param int fstVertexId
   * @param int sndVertexId
   * @returns bool
   */
  edgeExists (fstVertexId, sndVertexId) {
    for (let i = 0; i < self.edges.length; i++){
      let tail = self.edges[i].firstVertex
      let head = self.edges[i].secondVertex

      if (
        self.findVertex(fstVertexId) && self.findVertex(sndVertexId)
      ){
        return (fstVertexId === tail.id && sndVertexId === head.id)
      }
    }

    return false
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