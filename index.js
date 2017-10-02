const { splitEvery, uniq } = require('ramda');

class Board {
  constructor(board) {
    const _ = Board.EMPTY_SPOT_SYMBOL;
    this.board = Array.isArray(board) ? board : [
      'X',  _ , _ ,
      'O', 'X', _ ,
      'O',  _ , _ ,
    ];
  }

  symbolAtSpot(index) {
    return this.board[index] || null;
  }

  spotsForSymbol(symbol) {
    return this.board
      .map((currentSymbol, index) => currentSymbol === symbol ? index : null)
      .filter(symbol => symbol !== null);
  }

  makeMove(index, symbol) {
    const newBoardArray = Array.from(this.board);
    newBoardArray[index] = symbol;
    return new Board(newBoardArray);
  }

  toHash() {
    return this.board.join('-');
  }

  toString() {
    return splitEvery(3, this.board)
      .map(row => row.join(' '))
      .join('\n');
  }
}

Board.EMPTY_SPOT_SYMBOL = '_';
Board.LINES = (function() {
  const combinations = [];

  // horizontal rows
  for (let x=0; x <= 2; x++) {
    combinations.push(
      [0, 1, 2].map(multiple => 3 * multiple + x)
    );
  }

  // vertical rows
  for (let x=0; x <= 8; x=x+3) {
    combinations.push([x, x+1, x+2])
  }

  // diagonals
  combinations.push([0, 4, 8]);
  combinations.push([2, 4, 6]);

  return combinations;
})();

console.log('LINES', Board.LINES);

class Player {
  constructor(symbol) {
    this.symbol = symbol;
  }
}

const board = new Board();
const david = new Player('X');
const copr = new Player('O');
console.log('Starting with:');
console.log(board.toString());
console.log('...and...');

function calculateBestDecision(board, player) {
  const emptySpots = board.spotsForSymbol(Board.EMPTY_SPOT_SYMBOL);

  const results = emptySpots
    .map(emptySpot => {
      return {
        spot: emptySpot,
        board: board.makeMove(emptySpot, player.symbol)
      };
    })
    .map(result => {
      result.winner = winnerOfBoard(result.board)
      return result;
    });

  return results.filter(result => result.winner !== null);
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

calculateBestDecision(board, david);
