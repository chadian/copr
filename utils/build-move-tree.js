const Board = require('../board');
const { memoizeWith } = require('ramda');

function buildMoveTree(parent, board, previousPlayer, nextPlayer) {
  const node = {
    parent,
    board,
  };

  const childNodes = board.spotsForSymbol(Board.EMPTY_SPOT_SYMBOL).map(
    spot => buildMoveTree(node, board.makeMove(spot, nextPlayer.symbol), nextPlayer, previousPlayer)
  );

  node.children = childNodes;

  return node;
};

module.exports = buildMoveTree;
