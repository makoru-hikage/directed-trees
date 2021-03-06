import Edge from './Edge.mjs'

/**
 * A graph is a tree when:
 * 1. There is only one root vertex which has
 * no 'parent', meaning, there are no edges in
 * a graph where it is a head.
 * 2. All vertices other than the root has only
 * one parent. None of the vertices have more
 * than one parent. Any vertex can have none or
 * more children.
 * 3. All paths from root to any children are
 * unforked and acyclic. Meaning, no circular
 * path or forked paths... in the same vein that
 * all non-root vertices must have a pedigree where
 * the earliest ascendant is the root.
 *
 */
const DirectedTreeTrait = (directedGraph) => ({
  /**
   * Find the root of a directedGraph.
   * It looks for the first vertex that
   * isn't a head of an edge.
   * 
   * @returns Vertex | null
   */
  findRootVertex (){
    if (directedGraph.vertices.length <= 0) {
      return null
    }

    let root = directedGraph.vertices.filter((vertex) =>{
      let vertexId = vertex.id
      let numOfTails = directedGraph.findVertexTails(vertexId).length
      return numOfTails <= 0
    })

    if ( root.length === 1 ){
      return root[0]
    }

    return null

  },

  /**
   * Checks if all of the vertices, except the root,
   * have only one parent. Returns false when no vertices
   * exist.
   *
   * @returns bool
   */
  allHaveOneParent () {
    if (directedGraph.vertices.length <= 0) {
      return false
    }

    for (let i = 0; i < directedGraph.vertices.length; i++) {
      let vertexId = directedGraph.vertices[i].id
      let numOfTails = directedGraph.findVertexTails(vertexId).length

      if (numOfTails > 1) {
        return false
      }
    }

    return true
  },

  /**
   * This will return an empty array if the vertexId
   * belongs to root or the path is forked.
   * If there is an edge with a head that matches
   * any other edge's tail, it indicates a circular path
   *
   *
   * @param DirectedGraph directedGraph 
   * @param int vertexId - the starting vertex
   * @param edgesPassed 
   * @return array of Edges
   */
  findPathToRoot (vertexId, edgesPassed = []) {
    let vertex = directedGraph.findVertex(vertexId)

    if (vertex === null){
      return edgesPassed
    }

    // Find all the edges where the vertex is a head,
    // in this context a child.
    let edges = directedGraph
      .findEdgesOfVertex(vertexId)
      .filter(edge => edge.secondVertex.id === vertexId )

    // A child must have only one parent,
    // if edges.length === 0, perhaps, it's the root
    if (edges.length !== 1) {
      return edgesPassed
    }

    // Get the tail, in this context, the parent
    let nextVertexId = edges[0].firstVertex.id

    // Record the edges
    edgesPassed.push(edges[0])

    // Check the passedEdges, should there be
    // edges whose head matches the parent 
    // aforementioned, it indicates a cycle
    let cyclePoints = edgesPassed.filter(
      edge => edge.secondVertex.id === nextVertexId
    )

    // End immediately if there's a cycle
    // The cycle will be indicated
    if (cyclePoints.length > 0){
      return edgesPassed
    }

    return directedGraph.findPathToRoot(nextVertexId, edgesPassed)

  },

  /**
   * Check whether all non-root children have 
   * acyclic and non-forked path
   *
   * @returns bool
   */
  allEndsToRoot(){
    let vertices = directedGraph.vertices
    let root = directedGraph.findRootVertex()

    if (root === null){
      return false
    }

    for (let i = 0; i < vertices.length; i++) {
      const vertex = vertices[i]

      // Save us a recursion: findPathToRoot(root.id)
      if (vertex.id === root.id){
        continue
      }

      // This is a series of Edges
      const pedigree = directedGraph.findPathToRoot(vertex.id)

      // If `pedigree.length === 0`, it's forked.
      if (pedigree.length > 0){
        // The last edge of the aforementioned series
        const topEdge = pedigree[pedigree.length - 1]

        // It's supposed to be root
        const supposedRoot = topEdge.firstVertex
        if (supposedRoot.id !== root.id){
          return false
        }
      }
    }

    return true
  },

  /**
   * Checks if the graph is a tree.
   *
   * @returns bool
   */
  isValidTree(){

    let root = directedGraph.findRootVertex()

    return (
      // Do they have a root vertex?
      root !== null
        // Do all vertices have one parent?
        && directedGraph.allHaveOneParent()
        // and do all vertices have an acyclic
        // non-forked path to the root?
        && directedGraph.allEndsToRoot()
    )
  },


  /**
   * To nidify is to create a nest.
   * Create a nest of vertices and
   * makes it a property of a graph
   *
   * @returns DirectedGraph
   */
  nidifyVertices () {
    let vertices = directedGraph.vertices

    const nidify = vertex => {
      vertex.children = directedGraph
        .findVertexHeads(vertex.id)
        .sort((v1, v2) => v1.seqId - v2.seqId)
      return vertex
    }

    directedGraph.treeRoot = vertices
      .map(nidify)
      .filter( x => directedGraph.findRootVertex().id === x.id )
      [0]

    return directedGraph
  },

  /**
   * Returns a nested object
   *
   * @returns Vertex | null
   */
  toTree(){
    if (directedGraph.isValidTree()){
      directedGraph.vertices = directedGraph.vertices.map(
        vertex => {
          let path = directedGraph.findPathToRoot(vertex.id)
          vertex.depth = path.length
          return vertex
        }
      )
      directedGraph.nidifyVertices()
      return directedGraph.treeRoot
    }

    return null
  }
})

export { DirectedTreeTrait }
