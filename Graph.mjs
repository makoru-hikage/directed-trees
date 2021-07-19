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

  findEdgesOfVertex (vertex) {
    let result = []
    for (let i = 0; i < self.edges.length; i++){
      let edges = self.edges
      if (edges.hasVertex(vertex)){
        result.push(edges[i])
      }
    }

    return result
  },

  findEdgesOfVertex(vertexId) {
    return self.edges.filter( edge => {
      let vertex = self.findVertex(vertexId)
      let tail = edge.firstVertex
      let head = edge.secondVertex

      if( tail === null || head === null ){
        return vertex === tail || vertex === head
      }
      return vertexId === tail.id || vertexId === head.id
    })
  },

  edgeExists (firstVertex, secondVertex) {
    for (let i = 0; i < self.edges.length; i++){
      let tail = self.edges[i].firstVertex
      let head = self.edges[i].secondVertex
      let targetTail = firstVertex
      let targetHead = secondVertex
      let bothTailsAreNull = targetTail === null && tail === null
      let bothHeadsAreNull = targetHead === null && head === null

      if( bothTailsAreNull && bothHeadsAreNull ){
        return bothTailsAreNull && bothHeadsAreNull
      }

      if (! bothTailsAreNull && ! bothHeadsAreNull){
        return 
          firstVertex.id === tail.id || secondVertex.id === head.id
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
      let tailAndHeadNotNull = tail !== null && head !== null

      if (vertex !== null && tailAndHeadNotNull) {
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
        // Also every vertex must have only one parent,
        // only the `rootVertex` has no parent.
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