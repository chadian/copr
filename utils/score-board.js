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
  const moveTree = buildMoveTree(board, previousPlayer, nextPlayer);
  return recursiveScore(moveTree);
}

function recursiveScore(moveNode) {
  const { board, children } = moveNode;

  if (winnerOfBoard(board)) {
    return POINTS.WIN;
  }

  if (board.isFull()) {
    return POINTS.DRAW;
  }

  const childrenScores = children.map(node => recursiveScore(node) * -1);
  return mean(childrenScores);
};

module.exports = scoreBoard;
