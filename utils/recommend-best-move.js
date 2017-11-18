const Board = require('../board');
const scoreBoard = require('./score-board');
const { memoizeBoardWithPlayer } = require('./cache');

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

module.exports = memoizeBoardWithPlayer(recommendBestMove);
