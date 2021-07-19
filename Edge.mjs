const hasVertex  = (self) => ({
  /**
   * Check whether an edge is connecting
   * a certain vertex
   * 
   * @param vertex 
   * @returns 
   */
  containsVertex (vertex) {
    return self.firstVertex.id === vertex.id 
      || self.secondVertex.id === vertex.id
  }
})

/**
 * A part of a Graph that connects two Vertices
 * 
 * @param Vertex firstVertex 
 * @param Vertex secondVertex 
 * @returns Edge
 */
export default function Edge (firstVertex, secondVertex) {
  let edge = {
    firstVertex,
    secondVertex
  }

  return Object.assign(
    edge,
    hasVertex(edge)
  )
}
