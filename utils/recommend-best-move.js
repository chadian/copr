const Board = require('../board');
const scoreBoard = require('./score-board');

function recommendBestMove(board, player, opponent) {
  const emptySpots = board.spotsForSymbol(Board.EMPTY_SPOT_SYMBOL);
  const bestMove = emptySpots.reduce((bestMove, emptySpot) => {
    const move = {
      spot: emptySpot,
      score: scoreBoard(board.makeMove(emptySpot, player.symbol), player, opponent)
    };

    return bestMove.score >= move.score ? bestMove : move;
  }, {});

  return bestMove.spot;
}

module.exports = recommendBestMove;
