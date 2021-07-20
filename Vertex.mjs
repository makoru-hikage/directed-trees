
const vertexChecks = (self) => ({
    /**
     * Should this return a positive number, 
     * it means that `vertex2` precedes `vertex1`,
     * should it be zero, it has the same precedence.
     * If `vertex2` has negative precedence, it follows.
     * Made for Array.prototype.sort()
     *
     * @param Vertex anotherVertex 
     * @returns int
     */
    compareVertex (vertex1, vertex2 = self) {
        return vertex1.seqId - vertex2.seqId
    },

    /**
     * Find a certain vertex in an array of vertices
     *
     * @param vertices - haystack
     * @returns Vertex - itself
     */
    findInVertices (vertices) {
        vertices.find( vertex => vertex.id === self.id )
    }
})

/**
 * When it has sibs, the seqId shall determine its 
 * place in the order of siblings
 * 
 * @param int id - its unique identifier in a graph 
 * @param int seqId
 * @param any content
 * @returns 
 */
export default function Vertex (id, seqId, content){
    let vertex = {
        id,
        seqId,
        content
    }

    return Object.assign(
        vertex,
        vertexChecks(vertex)
    )
}
