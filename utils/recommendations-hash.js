const buildMoveTree = require('./build-move-tree');
const recommendBestMove = require('./recommend-best-move');
const winnerOfBoard = require('./winner-of-board');

module.exports = function recommendationHash(board, player, opponent) {
  const hash = {};
  const moveTree = buildMoveTree(board, player, opponent);

  const moveForNode = node => {
    const board = node.board;

    // recursive early to determine best moves for children
    node.children.forEach(node => moveForNode(node));

    const hashString = board.toArray().toString();

    // hash already exists, no work to be done
    if (hash[hashString]) return;

    const totalMovesMade = board
      .toArray()
      .filter(spot => spot === player.symbol || spot === opponent.symbol)
      .length;

    if (winnerOfBoard(board)) {
      hash[hashString] = 'WIN';
    } else if (totalMovesMade === board.toArray().length) {
      // the board is completely full
      hash[hashString] = 'DRAW';
    }

    if (totalMovesMade % 2 === 0 || totalMovesMade === 0) {
      // only provide recommendations on moves where the opponent
      // has already completed their move.
      return;
    }

    let bestMove;
    try {
      bestMove = recommendBestMove(board, opponent, player);
    } catch (exception) {
      // skip when unable to determine the best move
      return;
    }

    hash[hashString] = bestMove;
  };

  moveForNode(moveTree);
  return hash;
};
