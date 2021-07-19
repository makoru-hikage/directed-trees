import Edge from './Edge.mjs'

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

    if (vertex === null) {
      return result
    }

    for (let i = 0; i < self.edges.length; i++){
      let edge = self.edge[i]
      if (edge.hasVertex(vertex)){
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
   * @param fstVertexId int
   * @param sndVertexId int
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
          || (fstVertexId === head.id && sndVertexId === tail.id)
      }
    }

    return false
  },

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
    Graphness
}