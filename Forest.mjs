/**
 * A Forest is a graph whose subgraphs
 * are valid trees.
 *
 */
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
   * nidify (n.) - to create a nest.
   * Create nests of vertices
   *
   * @returns array of nested objects
   */
   toForest () {
    let vertices = directedGraph.vertices

    /**
     * A function made just to recurse well
     */
    const nidify = vertex => {
      // Define 'depth' property should
      // it not exist.
      if (!('depth' in vertex)){
        vertex.depth = 0
      }

      vertex.children = directedGraph
        // Find children
        .findVertexHeads(vertex.id)
        // Sort them
        .sort((v1, v2) => v1.seqId - v2.seqId)
        // Add their corresponding depth
        .map(child => {
          child.depth = vertex.depth + 1
          return child
        })

      return vertex
    }


    return vertices
      // Find the 'roots' of the forest
      .filter( potentialRoot => 
        directedGraph
          .findRootVertices()
          .some(vertex => vertex.id === potentialRoot.id)
      )
      // Nidify them
      .map(nidify)
  }
})

export {ForestTrait}
