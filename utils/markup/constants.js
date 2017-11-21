const Player = require('../../player');
module.exports = {
  BOARD_ELEMENT: {
    CHECKBOX: 'checkbox',
    SQUARE: 'square',
    LABEL: 'label',
    RESULT: 'result',
  },

  PLAYER: {
    HUMAN_STRING: 'human',
    HUMAN_SYMBOL: 'X',
    HUMAN: new Player('X'),
    AI_STRING: 'ai',
    AI_SYMBOL: 'O',
    HUMAN: new Player('O'),
  },

  BOARD_INDEXES: [0, 1, 2, 3, 4, 5, 6, 7, 8]
};
