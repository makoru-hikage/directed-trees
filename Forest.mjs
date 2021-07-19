import TreeGraph from './TreeGraph.mjs'

export default function Forest (rootVertices) {
    let forest = {
        rootVertices
    }

    forest.rootVertices.map( vertex => TreeGraph(vertex) )

    return Object.assign(forest)
}
