const Board = require('../board');
const scoreBoard = require('./score-board');
const { memoizeBoardWithPlayers } = require('./cache');

function recommendBestMove(board, previousPlayer, nextPlayer) {
  const emptySpots = board.spotsForSymbol(Board.EMPTY_SPOT_SYMBOL);

  // with an empty board, choose the middle
  if (emptySpots.length === 9) {
    return 4;
  }

  const bestMove = emptySpots.reduce((bestMove, emptySpot) => {
    const score = scoreBoard(board.makeMove(emptySpot, nextPlayer.symbol), nextPlayer, nextPlayer, previousPlayer);

    const move = {
      spot: emptySpot,
      score
    };

    return bestMove.score > move.score ? bestMove : move;
  }, {});

  return bestMove.spot || null;
}

module.exports = memoizeBoardWithPlayers(recommendBestMove);
