import Player from '../../player';

export const BOARD_ELEMENT = {
  CHECKBOX: 'checkbox',
  SQUARE: 'square',
  LABEL: 'label',
  RESULT: 'result'
};

export const PLAYER = {
  HUMAN_STRING: 'human',
  HUMAN_SYMBOL: 'X',
  HUMAN: new Player('X'),
  AI_STRING: 'ai',
  AI_SYMBOL: 'O'
};

export const BOARD_INDEXES = [0, 1, 2, 3, 4, 5, 6, 7, 8];
