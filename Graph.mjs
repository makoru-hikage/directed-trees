import Edge from './Edge.mjs'
import {compareVertices} from './Vertex.mjs'

const Graphness = (self) => ({
  /**
   * Find a particular vertex by its id;
   * return null if it does not exist
   *
   * @param int vertexId 
   * @returns Vertex | null
   */
  findVertex (vertexId) {
    let vertices = self.vertices
    let vertex = vertices.find(v => vertexId === v.id)

    if (vertex){
      return vertex
    }

    return null
  },

  /**
   * Find the edges where a vertex belongs,
   * whether vertex there is a head or a tail
   *
   * @param int vertexId
   * @returns array of Edges
   */
  findEdgesOfVertex (vertexId) {
    let result = []
    let vertex = self.findVertex(vertexId)

    // First of all, the vertex must exist.
    if (vertex === null) {
      return result
    }

    // Scour through the list of edges that contain the
    // target vertex
    for (let i = 0; i < self.edges.length; i++){
      let edge = self.edges[i]
      if (edge.containsVertex(vertex)){
        result.push(edge)
      }
    }

    return result
  },

  /**
   * We'll assume that this is an
   * undirected graph. Edges 
   * `{ firstVertex: a, secondVertex: b}`
   * and `{ firstVertex: b, secondVertex: a}`
   * are treated the same.
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

      if (fstVertexId === head.id && sndVertexId === tail.id){
        return true
      }
    }

    return false
  },

  /**
   * Find the adjacent vertices by 
   * looking at the edges
   *
   * @param int
   * @returns array of Vertices
   */
  findAdjacentVertices(vertexId){
    let result = []
    let vertex = self.findVertex(vertexId)
    let edges = self.findEdgesOfVertex(vertexId)
    for (let i = 0; i < edges.length; i++){
      let tail = edges[i].firstVertex
      let head = edges[i].secondVertex

      if (vertex !== null) {
        if (vertexId === tail.id){
          result.push(head)
        } else if (vertexId === head.id) {
          result.push(tail)
        }
      }
    }

    return result
  },

  /**
   * Finds any isolated vertices.
   *
   * @returns array of Vertices
   */
  findIsolatedVertices(){
    return self.vertices.filter(
      vertex => {
        return self.findAdjacentVertices(vertex.id) <= 0
      }
    )
  },

  /**
   * Sorts all the vertices by seqId
   * @param id 
   * @returns 
   */
  sortVerticesBySeqId() {
    self.vertices.sort(compareVertices)
    return self
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
    if (self.edgeExists(firstVertex.id, secondVertex.id)){
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
    if (firstVertex !== null && secondVertex !== null) {
      self.edges.push(Edge(firstVertex, secondVertex))
      return true
    }

    return false
  }
})

/**
 * A an ordinary graph, all it needs is
 * just one vertex. Allows isolated vertices
 *
 * @param vertices 
 * @param edges 
 * @returns 
 */
function Graph (vertices, edges) {
  let graph = {
    vertices,
    edges
  }

  return Object.assign(
    graph,
    Graphness(graph),
    AddsVertices(graph)
  )
}

export {
  Graph,
  Graphness,
  AddsVertices
}
