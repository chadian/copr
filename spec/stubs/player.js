import Board from '../../src/board';
import Player from '../../src/player';

export const _ = Board.EMPTY_SPOT_SYMBOL;
export const X = 'X';
export const O = 'O';
export const playerX = new Player(X);
export const playerO = new Player(O);
