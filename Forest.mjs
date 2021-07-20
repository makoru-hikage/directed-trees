const ForestTrait = (directedGraph) => ({
  /**
   * Find any vertex that isn't a head of any edge
   * 
   * @returns Vertex | null
   */
   findRootVertices (){
    if (directedGraph.vertices.length <= 0) {
      return []
    }

    return directedGraph.vertices.filter((vertex) =>{
      let vertexId = vertex.id
      let numOfTails = directedGraph.findVertexTails(vertexId).length
      return numOfTails <= 0
    })
  },

  /**
   * To nidify is to create a nest.
   * Create a nest of vertices and
   * makes it a property of a graph
   *
   * @returns DirectedGraph
   */
   toForest () {
    let vertices = directedGraph.vertices

    const nidify = vertex => {
      if (!('depth' in vertex)){
        vertex.depth = 0
      }
      vertex.children = directedGraph
        .findVertexHeads(vertex.id)
        .sort((v1, v2) => v1.seqId - v2.seqId)
        .map(child => {
          child.depth = vertex.depth + 1
          return child
        })
      return vertex
    }

    return vertices
      .map(nidify)
      .filter( potentialRoot => 
        directedGraph
          .findRootVertices()
          .some(vertex => vertex.id === potentialRoot.id)
      )
  }
})

export {ForestTrait}
