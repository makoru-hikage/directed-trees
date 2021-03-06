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
    return self.edges
      .filter(edge => vertexId === edge.secondVertex.id)
      .map(edge => edge.firstVertex)
  },

  /**
   * Find the heads of the edges of a vertex
   *
   * @param int vertexId of the supposed tail 
   * @returns array of head Vertices
   */
  findVertexHeads (vertexId) {
    return self.edges
      .filter(edge => vertexId === edge.firstVertex.id)
      .map(edge => edge.secondVertex)
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

      if (fstVertexId === tail.id && sndVertexId === head.id){
        return true
      }
    }

    return false
  }
})

/**
 * All its edges now has a direction
 *
 * @param array of vertices 
 * @param array of edges 
 * @returns 
 */
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