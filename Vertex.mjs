

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
const compareVertices = (vertex1, vertex2) => {
    return vertex1.seqId - vertex2.seqId
}

/**
 * Find a certain vertex in an array of vertices
 *
 * @param array - haystack
 * @param int - needle
 * @returns Vertex - itself
 */
const findInVertices = (haystack, needle) => {
    return haystack.find( vertex => vertex.id === needle )
}


/**
 * When it has sibs, the seqId shall determine its 
 * place in the order of siblings
 * 
 * @param int id - its unique identifier in a graph 
 * @param int seqId
 * @param any content
 * @returns 
 */
function Vertex (id, seqId, content){
    let vertex = {
        id,
        seqId,
        content
    }

    return Object.assign(
        vertex
    )
}

export {
    Vertex,
    compareVertices,
    findInVertices
}
