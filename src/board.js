import { splitEvery } from 'ramda';

class Board {
  constructor(board) {
    if (!Array.isArray(board)) {
      board = [];
    }

    if (board.length < 9) {
      const difference = 9 - board.length;
      board = board.concat(Array(difference).fill(Board.EMPTY_SPOT_SYMBOL));
    }

    if (board.length > 9) {
      board = board.slice(0, 8);
    }

    this.board = board;
  }

  symbolAtSpot(index) {
    return this.board[index] || null;
  }

  isFull() {
    return this.board.includes(Board.EMPTY_SPOT_SYMBOL) !== true;
  }

  spotsForSymbol(symbol) {
    return this.board
      .map((currentSymbol, index) => (currentSymbol === symbol ? index : null))
      .filter(symbol => symbol !== null);
  }

  makeMove(index, symbol) {
    const newBoardArray = Array.from(this.board);
    newBoardArray[index] = symbol;
    return new Board(newBoardArray);
  }

  toArray() {
    return this.board;
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
Board.WINNING_LINES = (function() {
  const combinations = [];

  // horizontal rows
  for (let x = 0; x <= 2; x++) {
    combinations.push([0, 1, 2].map(multiple => 3 * multiple + x));
  }

  // vertical rows
  for (let x = 0; x <= 8; x = x + 3) {
    combinations.push([x, x + 1, x + 2]);
  }

  // diagonals
  combinations.push([0, 4, 8]);
  combinations.push([2, 4, 6]);

  return combinations;
})();

Board.generateEmptyBoard = () =>
  new Board(Array(8).fill(Board.EMPTY_SPOT_SYMBOL));

export default Board;
