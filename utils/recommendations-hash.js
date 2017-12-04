const buildMoveTree = require('./build-move-tree');
const recommendBestMove = require('./recommend-best-move');
const winnerOfBoard = require('./winner-of-board');
const Board = require('../board');

module.exports = function recommendationHash(board, player, opponent) {
  const hash = {};
  const moveTree = buildMoveTree(board, player, opponent);

  const moveForNode = (node) => {
    const board = node.board;
    const hashString = board.toArray().toString();

    // hash already exists, no work to be done
    if (hash[hashString]) return;

    node.children.forEach(node => moveForNode(node));

    let bestMove;
    try {
      bestMove = recommendBestMove(board, player, opponent);
    } catch (exception) {
      bestMove = null;
    }

    const totalMovesMade = board.toArray().filter(
      spot => spot === player.symbol || spot === opponent.symbol
    ).length;

    if (winnerOfBoard(board)) {
      hash[hashString] = 'WIN';
    } else if (totalMovesMade % 2 === 0) {
      // only provide recommendations on moves where the opponent
      // has already completed their move.
      return;
    } else if (typeof bestMove === 'number') {
      hash[hashString] = bestMove;
    } else {
      hash[hashString] = 'DRAW';
    }
  }

  moveForNode(moveTree);
  return hash;
};
