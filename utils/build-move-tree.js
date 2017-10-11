const Board = require('../board');
const { memoizeWith } = require('ramda');

function buildMoveTree(parent, board, previousPlayer, nextPlayer) {
  const node = {
    parent,
    board,
  };

  node.children = board.spotsForSymbol(Board.EMPTY_SPOT_SYMBOL).map(
    spot => buildMoveTree(node, board.makeMove(spot, nextPlayer.symbol), previousPlayer, nextPlayer)
  );

  return node;
};

module.exports = buildMoveTree;
