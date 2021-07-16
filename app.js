const treeTools = require('./treetools');
const funcTools = require('./functools');

const setDescendants = treeTools.setDescendants;
const addDepthProperty = treeTools.addDepthProperty;
const appendById = treeTools.appendById;
const flattenTree = treeTools.flattenTree;

const curry = funcTools.curry;
const swapArgs = funcTools.swapArgs;

// An array of files:
// (in some OSs such as Linux) folders are (treated as) files.
// When represented in a tree, non-folder files are the leaves.
// THIS REPRESENTS AN ACYCLIC GRAPH, so each node has only one
// parent, yet has a pedigree (a chain of ancestors). Symbolic
// links are a topic for another day.
const items = [
  { id: 2, seqId: 4, parent: 5, name: "index.tsx" },
  { id: 3, seqId: 3, parent: 1, name: "Sidebar" },
  { id: 4, seqId: 5, parent: 1, name: "Table" },
  { id: 7, seqId: 5, parent: 5, name: "SelectableDropdown.tsx" },
  { id: 5, seqId: 2, parent: 1, name: "AssignmentTable" },
  { id: 1, seqId: 1, parent: null, name: "components" },
  { id: 6, seqId: 2, parent: null, name: "controllers" }
];

// Items sorted by 'id'
const sortedItems = items.reduce(appendById, []);

const folderTree = sortedItems
  // We must determine the depth of the nodes
  // with regards to the 'graph' which is the
  // sortedItems
  .map(curry(addDepthProperty)(sortedItems))
  // We must sort them by `seqItems`
  .sort((n1, n2) => n1.seqId - n2.seqId)
  // We shan't need the `ancestors` property later
  .map(node => {
    delete node.ancestors;
    return node;
  });

// Due to the `setDescendants` function,
// at this point the trees are deeply nested
const transformItems = setDescendants(folderTree)

  // We need only the nodes whose parents are
  // `null`, we call then 'roots'
  .filter(node => node.parent === null)

  // Those 'roots' represent the trees
  // They shall be flattened... depth-first.
  .map(curry(swapArgs(flattenTree))('children'))

  // They are now flattened, yet at this point,
  // The tier of nesting is still two. Only one
  // tier there shall be.
  .flat(1)

  // Just rearrange the properties.
  .map(node => (
    { 
      id: node.id,
      seqId: node.seqId, 
      parent: node.parent,
      depth: node.depth,
      name: node.name }
  ));


/*
Create a function `transformItems` that would return the desired output below
(should be able to support virtually unlimited depth and additional items)
*/
console.log(transformItems);

/* Output:
// The seqId is used for ordering within siblings.
// The depth would depend on the number of ancestors.
[
{ id: 1, seqId: 1, parent: null, depth: 0, name: 'components' },
{ id: 5, seqId: 2, parent: 1, depth: 1, name: 'AssignmentTable' },
{ id: 2, seqId: 4, parent: 5, depth: 2, name: 'index.tsx' },
{ id: 7, seqId: 5, parent: 5, depth: 2, name: 'SelectableDropdown.tsx' },
{ id: 3, seqId: 3, parent: 1, depth: 1, name: 'Sidebar' },
{ id: 4, seqId: 5, parent: 1, depth: 1, name: 'Table' },
{ id: 6, seqId: 2, parent: null, depth: 0, name: 'controllers' }
]
*/