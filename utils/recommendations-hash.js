const buildMoveTree = require('./build-move-tree');
const recommendBestMove = require('./recommend-best-move');

module.exports = function recommendationHash(board, playerX, playerO) {
  const hash = {};
  const moveTree = buildMoveTree(board, playerO, playerX);

  const moveForNode = (node) => {
    const board = node.board;
    const hashString = board.toArray().toString();

    // hash already exists, no work to be done
    if (hash[hashString]) return;

    let bestMove;
    try {
      bestMove = recommendBestMove(board, playerX, playerO);
    } catch (exception) {
      bestMove = null;
    }

    hash[hashString] = bestMove;
    node.children.forEach(node => moveForNode(node));
  }

  moveForNode(moveTree);
  return hash;
};
