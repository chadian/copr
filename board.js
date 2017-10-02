const { splitEvery } = require('ramda');

class Board {
  constructor(board) {
    this.board = Array.isArray(board) ? board : [].fill(Board.EMPTY_SPOT_SYMBOL, 0, 9);
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

module.exports = Board;
