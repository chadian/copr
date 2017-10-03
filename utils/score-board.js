const Board = require('../board');
const Player = require('../player');
const winnerOfBoard = require('./winner-of-board');
const { mean } = require('ramda');

const POINTS = {
  WIN: 1,
  DRAW: 0,
  LOSS: -1,
}

function scoreBoard(board, previousPlayer, nextPlayer) {
  if (winnerOfBoard(board)) {
    return POINTS.WIN;
  }

  if (board.isFull()) {
    return POINTS.DRAW;
  }

  const emptySpots = board.spotsForSymbol(Board.EMPTY_SPOT_SYMBOL);
  const nextPlayerMoveScores = emptySpots.map(emptySpot => {
    const newBoard = board.makeMove(emptySpot, nextPlayer.symbol)
    return scoreBoard(newBoard, nextPlayer, previousPlayer) * -1;
  });

  return mean(nextPlayerMoveScores);
}

module.exports = scoreBoard;
