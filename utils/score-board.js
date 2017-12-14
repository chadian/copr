const Board = require('../board');
const Player = require('../player');
const winnerOfBoard = require('./winner-of-board');
const buildMoveTree = require('./build-move-tree');

const POINTS = {
  WIN: 1,
  DRAW: 0,
  LOSS: -1
}

function scoreBoard(board, favouredPlayer, previousPlayer, nextPlayer) {
  const moveTree = buildMoveTree(board, previousPlayer, nextPlayer);
  return recursiveScore(moveTree, favouredPlayer);
}

function recursiveScore(moveNode, favouredPlayer) {
  const { board, children, previousPlayer, nextPlayer } = moveNode;

  const winner = winnerOfBoard(board);
  if (winner !== null) {
    return winner === favouredPlayer.symbol ? POINTS.WIN : POINTS.LOSS;
  }

  if (board.isFull()) {
    return POINTS.DRAW;
  }

  const childrenScores = children.map(node => recursiveScore(node, favouredPlayer));
  // maximize for favoured player's turn, minimize for opponent
  const limitingFunction = nextPlayer === favouredPlayer ? Math.max : Math.min;
  return limitingFunction(...childrenScores);
};

module.exports = scoreBoard;
