const buildMoveTree = require('./build-move-tree');
const recommendBestMove = require('./recommend-best-move');
const Board = require('../board');

module.exports = function recommendationHash(board, player, opponent) {
  const hash = {};
  const moveTree = buildMoveTree(board, player, opponent);

  const moveForNode = (node) => {
    const board = node.board;
    const hashString = board.toArray().toString();

    // hash already exists, no work to be done
    if (hash[hashString]) return;

    let bestMove;
    try {
      bestMove = recommendBestMove(board, player, opponent);
    } catch (exception) {
      bestMove = null;
    }

    hash[hashString] = bestMove;
    node.children.forEach(node => moveForNode(node));
  }

  moveForNode(moveTree);
  return hash;
};
