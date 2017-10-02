const Board = require('./board');
const Player = require('./player');

const board = new Board();
const david = new Player('X');
const copr = new Player('O');

console.log('Starting with:');
console.log(board.toString());

calculateBestMove(board, david);

function calculateBestMove(board, player) {
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
