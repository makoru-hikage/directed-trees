
const vertexChecks = (self) => ({
    /**
     * Should this return a negative number, 
     * it means that it precedes `anotherVertex`,
     * should it be zero, it has the same precedence
     * if this has positive precedence, it follows.
     *
     * @param Vertex anotherVertex 
     * @returns int
     */
    compareVertex (anotherVertex) {
        return self.seqId - anotherVertex.seqId
    },

    findInVertices (vertices) {
        vertices.find( vertex => vertex.id === self.id )
    }
})

/**
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
