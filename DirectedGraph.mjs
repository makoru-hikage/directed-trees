import Edge from "./Edge.mjs"
import { Graphness, AddsVertices } from './Graph.mjs'

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