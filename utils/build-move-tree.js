const Board = require('../board');
const { memoizeBoardWithPlayer } = require('./cache');
const winnerOfBoard = require('./winner-of-board');

const memoizedBuild = memoizeBoardWithPlayer(buildMoveTree);

function buildMoveTree(board, previousPlayer, nextPlayer) {
  const node = { board };

  let children;
  if (winnerOfBoard(board)) {
    children = [];
  } else {
    children = board.spotsForSymbol(Board.EMPTY_SPOT_SYMBOL).map(
      spot => memoizedBuild(
        board.makeMove(spot, nextPlayer.symbol),
        nextPlayer,
        previousPlayer
      )
    );
  }

  node.children = children;

  return node;
};

module.exports = memoizedBuild;
