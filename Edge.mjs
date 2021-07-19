const hasVertex  = (self) => (
    (vertex) => {
        return self.firstVertex.id === vertex.id ||
            self.secondVertex.id === vertex.id
    }
)

export default function Edge (firstVertex, secondVertex) {
    let edge = {
        firstVertex,
        secondVertex
    }

    return Object.assign(
        edge
    )
}
