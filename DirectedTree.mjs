import Edge from './Edge.mjs'
import {Graphness} from './Graph.mjs'
import {Directedness} from './DirectedGraph.mjs'


const TreeCheck = (directedGraph) => ({
  findRootVertex (){
    if (directedGraph.vertices.length <= 0) {
      return null
    }

    return directedGraph.vertices.find((vertex) =>{
      let vertexId = vertex.id
      let numOfTails = directedGraph.findVertexTails(vertexId).length
      return numOfTails <= 0
    })
  },

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

    let edges = directedGraph.findVertexTails(vertexId)

    if (edges.length !== 1) {
      return edgesPassed
    }

    let tail = edges[0].firstVertex.id

    edgesPassed.push(edges[0])
    return directedGraph.findPathToRoot(tail, edgesPassed)

  },

  nidifyVertices () {
    let vertices = directedGraph.vertices
  
    const nidify = vertex => {
      let children = directedGraph.findVertexHeads(vertex.id)
  
      vertex.children = children
      vertex.children.sort( (v1, v2) => v1.seqId - v2.seqId )
      return vertex
  
    }
  
    directedGraph.treeRoot = vertices
      .map(nidify)
      .filter( x => directedGraph.findRootVertex().id === x.id )
      [0]
  
    return directedGraph
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
  addVertex (vertex, parentVertexId) {
    let vertexId = vertex.id
    let parentVertex = self.findVertex(parentVertexId)

    // A vertex's uniqueness is determined by its `id`:
    // should it exist amongst the tree's vertices...
    // Also every vertex must have only one parent,
    // only the `rootVertex` has no parent.
    if (self.findVertex(vertexId) || parentVertex === null){
      return false
    }

    self.vertices.push(vertex)
    self.edges.push(Edge(parentVertex, vertex))
    return true

  }
})

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
 * path or forked paths.
 *
 * @param Vertex rootVertex 
 * @returns 
 */
function DirectedTree (rootVertex) {
  let graph = {
    rootVertex,
    vertices: [],
    edges: []
  }

  graph.vertices.push(rootVertex)

  return Object.assign(
    graph,
    Graphness(graph),
    Directedness(graph),
    AddsVertices(graph),
  )
}

export {
  DirectedTree,
  TreeCheck
}