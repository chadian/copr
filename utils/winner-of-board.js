const Board = require('../board');

function winnerOfBoard(board) {
  const winners = Board.LINES.map(line => {
    const symbol = board.symbolAtSpot(line[0]);

    if (symbol === Board.EMPTY_SPOT_SYMBOL) {
      return null;
    }

    const isWinner = line.every(
      spot => board.symbolAtSpot(spot) === symbol
    );

    return isWinner ? symbol : null;
  })
  .filter(winner => winner !== null);

  if (winners.length > 1) {
    console.log(winners);
    throw 'should not be more than winner on the board';
  }

  if (winners.length === 0) {
    return null;
  }

  return winners[0];
}

module.exports = winnerOfBoard;
