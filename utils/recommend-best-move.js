const Board = require('../board');
const winnerOfBoard = require('./winner-of-board');

function recommendBestMove(board, player) {
  const emptySpots = board.spotsForSymbol(Board.EMPTY_SPOT_SYMBOL);

  const moves = emptySpots.map(emptySpot => {
    return {
      spot: emptySpot,
      board: board.makeMove(emptySpot, player.symbol)
     };
  });

  const winningMoves = moves.filter(
    move => winnerOfBoard(move.board) === player.symbol
  );

  return winningMoves.length ? winningMoves.pop().spot : null;
}

module.exports = recommendBestMove;
