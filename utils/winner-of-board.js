const Board = require('../board');
const { uniq } = require('ramda');

function winnerOfBoard(board) {
  let winners = Board.WINNING_LINES
    .map(line => {
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

  winners = uniq(winners);

  if (winners.length === 0) {
    return null;
  }

  if (winners.length > 1) {
    throw 'There should not be more than one winner of the board';
  }

  return winners[0];
}

module.exports = winnerOfBoard;
