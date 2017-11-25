const { BOARD_ELEMENT, PLAYER } = require('./constants');
const { fullId } = require('./formats');

class Style {
  constructor(selectors, style) {
    if (typeof selectors === 'string') selectors = [ selectors ];
    this.selectors = selectors;
    this.style = style;
  }

  toString() {
    const selectors = this.selectors.join(',');
    const styles = Object.keys(this.style).map((prop) => `${prop}:${this.style[prop]};`).join('');
    return `${ selectors } {${ styles }}`;
  }
}

const style = {};

style.boardSquare = new Style(
  `.${BOARD_ELEMENT.SQUARE}`,
  {
    float: 'left',
    width: '50px',
    height: '50px',
    position: 'relative',
  }
);

style.horizontalGrid = new Style(
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(1),` +
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(2),` +
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(3),` +
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(4),` +
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(5),` +
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(6)`,
  {
    'border-bottom': '5px solid #94b7ed'
  }
);

style.verticalGrid = new Style(
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(1),` +
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(2),` +
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(4),` +
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(5),` +
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(7),` +
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(8)`,
  {
    'border-right': '5px solid #94b7ed'
  }
);


style.boardSquareClear = new Style(
  // clear float for every third piece
  `.${BOARD_ELEMENT.SQUARE}:nth-child(3n + 1)`,
  { clear: 'left' }
)

// reflect either the human label or the resulting ai-choice
// within the square, to take up the full width of the square
style.playerResult = new Style(
  [
    `.${BOARD_ELEMENT.SQUARE} .${PLAYER.HUMAN_STRING}-${BOARD_ELEMENT.LABEL}`,
    `.${BOARD_ELEMENT.SQUARE} .${PLAYER.AI_STRING}-${BOARD_ELEMENT.RESULT}`
  ],
  {
    position: 'absolute',
    top: '0',
    right: '0',
    left: '0',
    bottom: '0'
  }
);

style.hideAllCheckboxes = new Style(
  'input[type=checkbox]', { 'display': 'none' }
);

style.windowBorder = new Style('html', {
  'border': '0.5rem solid #fff',
  'width': '100 %',
  'height': '100 %',
  'box-sizing': 'border-box'
});

style.textGlow = new Style('*', {
  'text-shadow': '0px 0px 13px rgba(255, 255, 255, 0.5)'
});

style.h1 = new Style('h1', { 'letter-spacing': '0.75rem' });

const mapBoardToSelector = (board, forSymbol, prefix) => {
  const selector = i =>  `#${ fullId(prefix, BOARD_ELEMENT.CHECKBOX, i) }`;

  return board
    .map((boardSymbol, i) => {
      const pseudo = boardSymbol === forSymbol ? ':checked' : ':not(:checked)';
      return selector(i) + pseudo;
    })
    .join(' ~ ');
};

const computedStyles = {
  humanResult(index) {
    const selector = `#${fullId(PLAYER.HUMAN_STRING, BOARD_ELEMENT.CHECKBOX, index)}:checked`
      + ` ~ .${BOARD_ELEMENT.SQUARE} #${fullId(PLAYER.HUMAN_STRING, BOARD_ELEMENT.LABEL, index)}`;

    return new Style(
      selector,
      { 'background-color': 'blue' }
    );
  },

  aiResult(index) {
    const selector = `#${fullId(PLAYER.AI_STRING, BOARD_ELEMENT.CHECKBOX, index)}:checked`
      + ` ~ .${BOARD_ELEMENT.SQUARE} #${fullId(PLAYER.AI_STRING, BOARD_ELEMENT.RESULT, index)}`;

    return new Style(
      selector,
      { 'background-color': 'black' }
    );
  },

  aiChoice(board, recommendationIndex) {
    if (!recommendationIndex) return '';

    // given the board:
    //  create a selector for the human state of checkboxes,
    //  the ai state of checkboxes
    //  and choice (represented by a label) the ai should take
    const selector = mapBoardToSelector(board, PLAYER.HUMAN_SYMBOL, PLAYER.HUMAN_STRING) +
      ' ~ ' +
      mapBoardToSelector(board, PLAYER.AI_SYMBOL, PLAYER.AI_STRING) +
      ' ~ ' +
      '#' + fullId(PLAYER.AI_STRING, BOARD_ELEMENT.LABEL, recommendationIndex);

    return new Style(selector, {
        'display': 'block',
        'width': '20px',
        'height': '20px',
        'background': 'green'
    });
  }
};

module.exports = {
  Style,
  baseStyles: style,
  computedStyles
};
