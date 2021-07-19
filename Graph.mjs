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
        for (let i = 0; i < vertices.length; i++){
            if (vertexId === vertices[i].id){
                return vertices[i]
            }
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

    edgeExists (firstVertex, secondVertex) {
        let result = false
        for (let i = 0; i < self.edges.length; i++){
            let edges = self.edges

            if (firstVertex !== null && secondVertex !== null){
                result = edges[i].firstVertex.id === firstVertex.id
                    && edges[i].secondVertex.id === secondVertex.id
            } else if (firstVertex === null && secondVertex !== null){
                result = edges[i].firstVertex === firstVertex
                    && edges[i].secondVertex.id === secondVertex.id
            } else if (firstVertex !== null && secondVertex === null){
                result = edges[i].firstVertex.id === firstVertex.id
                    && edges[i].secondVertex === secondVertex
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