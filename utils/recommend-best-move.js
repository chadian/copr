const Board = require('../board');
const scoreBoard = require('./score-board');
const { memoizeWith } = require('ramda');

function recommendBestMove(board, player, opponent) {
  const emptySpots = board.spotsForSymbol(Board.EMPTY_SPOT_SYMBOL);
  const bestMove = emptySpots.reduce((bestMove, emptySpot) => {
    const score = scoreBoard(board.makeMove(emptySpot, player.symbol), player, opponent);

    const move = {
      spot: emptySpot,
      score
    };

    return bestMove.score >= move.score ? bestMove : move;
  }, {});

  return bestMove.spot;
}

module.exports = memoizeWith(
  (board, player, opponent) => {
    const PLAYER_CACHE_CHAR = 'X';
    const OPPONENT_CACHE_CHAR = 'O';
    const cacheKey = board
      .toArray()
      .join(',')
      .replace(player.symbol, PLAYER_CACHE_CHAR)
      .replace(opponent.symbol, OPPONENT_CACHE_CHAR);

    return cacheKey;
  },
  recommendBestMove
);
