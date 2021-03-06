export function dijskstra(grid, startNode, finishNode) {
    const visitedNodeInOrder = [];
    const unvisistedNode = getAllNodes(grid);
    startNode.distance = 0;
    while (!!unvisistedNode.length) {
        sortNodeByDistance(unvisistedNode)
        const closetNode = unvisistedNode.shift();
        if (closetNode.isWall) continue;
        if (closetNode.distance === Infinity) {
            return visitedNodeInOrder;
        }
        closetNode.isVisited = true;
        visitedNodeInOrder.push(closetNode);
        if (closetNode === finishNode) {
            return visitedNodeInOrder;
        }
        updateUnvisitedNeighbors(closetNode, grid);
    };
}


function sortNodeByDistance(unvisistedNode) {
    unvisistedNode.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);

};
function updateUnvisitedNeighbors(node, grid) {
    const neighborNodes = getNeighborNodes(node, grid);
    for (const neighbors of neighborNodes) {
        if (neighbors.isWeight) {
            neighbors.distance = node.distance + 15;
        } else {
            neighbors.distance = node.distance + 1;
        }
        neighbors.previousNode = node;
    };
}
function getNeighborNodes(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
};

function getAllNodes(grid) {
    const allNodes = [];
    for (const row of grid) {
        for (const node of row) {
            allNodes.push(node);
        }
    }
    return allNodes;
};
export function getNodesinShortestPathOrder(finishNode) {
    const nodeInShortestPath = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodeInShortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodeInShortestPath;

};