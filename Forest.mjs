import {DirectedTree} from './DirectedTree.mjs'

function Forest (rootVertices) {
    let forest = {
        rootVertices
    }

    forest.rootVertices.map( vertex => DirectedTree(vertex) )

    return Object.assign(forest)
}

export {Forest}
