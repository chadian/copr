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

style.base = new Style(['html', 'body'], {
  'background-color': '#101721',
  'font-family': 'VT323, Helvetica Neue, Helvetica, Arial, sans-serif',
  'font-size': '30px',
  'color': '#94b7ed',
  'padding': '0',
  'margin': '0',
  'position': 'relative',
  'height': '100%'
});

style.boardSquare = new Style(
  `.${BOARD_ELEMENT.SQUARE}`,
  {
    'float': 'left',
    'width': '125px',
    'height': '125px',
    'position': 'relative',
    'max-width': '30%'
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
    'border-bottom': '10px solid #94b7ed'
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
    'border-right': '10px solid #94b7ed'
  }
);


style.boardSquareClear = new Style(
  // clear float for every third piece
  `.${BOARD_ELEMENT.SQUARE}:nth-of-type(3n+1)`,
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

style.window = new Style('.window', {
  'border': '0.5rem solid #fff',
  'width': '650px',
  'max-width': '100%',
  'box-sizing': 'border-box',
  'padding': '25px',
  'position': 'absolute',
  'top': '50%',
  'left': '50%',
  'transform': 'translate(-50%, -50%)'
});

style.textGlow = new Style('*', {
  'text-shadow': '0px 0px 13px rgba(255, 255, 255, 0.5)'
});

style.h1 = new Style('h1', {
  'font-size': '1rem',
  'letter-spacing': '1.5rem',
});

style.h2 = new Style('h2', {
  'font-size': '1.25rem',
});

style.headings = new Style(['h1', 'h2', 'h3'], {
  'font-family': 'Helvetica Neue, Helvetica, Arial, sans-serif',
  'color': '#fff'
});

style.button = new Style('.button', {
  'display': 'inline-block',
  'color': '#fff',
  'text-decoration': 'none',
  'border': '1px solid white',
  'padding': '0.25rem 0.75rem'
});

style.clearFix = new Style('.clear-fix', {
  'clear': 'both',
  'height': '0',
  'margin': '0'
});

style.beforeBoard = new Style('.before-board', {

});

style.afterBoard = new Style('.after-board', {
  'margin-top': '1.5em'
});


style.verticalRhythmReset = new Style(
  [
    '*',
    `.${BOARD_ELEMENT.SQUARE}`,
    `.${BOARD_ELEMENT.SQUARE} > *`,
  ], {
  'margin-top': '0',
  'margin-bottom': '0',
  'padding-top': '0',
  'padding-bottom': '0'
});

style.verticalRhythm = new Style('* + *', {
  'margin-top': '0.5em'
});
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

    const svg = `<svg width="110" height="110" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg"><title>x</title><path d="M5 5l100 100m0-100L5 105" stroke="#94B7ED" stroke-width="15" fill="none" /></svg>`
    return new Style(
      selector,
      {
        'background-image': `url("data:image/svg+xml;base64,${Buffer(svg).toString('base64')}")`,
        'background-size': '85%',
        'background-position': 'center',
        'background-repeat': 'no-repeat'
      }
    );
  },

  aiResult(index) {
    const selector = `#${fullId(PLAYER.AI_STRING, BOARD_ELEMENT.CHECKBOX, index)}:checked`
      + ` ~ .${BOARD_ELEMENT.SQUARE} #${fullId(PLAYER.AI_STRING, BOARD_ELEMENT.RESULT, index)}`;

    const svg = `<svg width="110" height="110" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg"><title>Oval</title><circle cx="55.25" cy="55.25" r="47.25" stroke-width="15" stroke="#94B7ED" fill="none" fill-rule="evenodd"/></svg>`;
    return new Style(
      selector,
      {
        'background-image': `url("data:image/svg+xml;base64,${Buffer(svg).toString('base64')}")`,
        'background-size': '85%',
        'background-position': 'center',
        'background-repeat': 'no-repeat'
      }
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
