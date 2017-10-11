const Board = require('../board');
const Player = require('../player');
const winnerOfBoard = require('./winner-of-board');
const { mean } = require('ramda');
const buildMoveTree = require('./build-move-tree');

const POINTS = {
  WIN: 1,
  DRAW: 0,
  LOSS: -1,
}

function scoreBoard(board, previousPlayer, nextPlayer) {
  const moveTree = buildMoveTree(null, board, previousPlayer, nextPlayer);

  const traverseTree = moveNode => {
    const { board, children } = moveNode;

    if (winnerOfBoard(board)) {
      return POINTS.WIN;
    }

    if (board.isFull()) {
      return POINTS.DRAW;
    }

    const childrenScores = children.map(node => traverseTree(node) * -1);
    return mean(childrenScores);
  };

  return traverseTree(moveTree);
}

module.exports = scoreBoard;
