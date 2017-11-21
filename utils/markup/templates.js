const { fullId, classFormat } = require('./formats');
const { BOARD_ELEMENT, PLAYER } = require('./constants');

const checkbox = (prefix, index) => {
  return `<input
    id="${fullId(prefix, BOARD_ELEMENT.CHECKBOX, index)}"
    class="${classFormat(prefix, BOARD_ELEMENT.CHECKBOX, index)}"
    type="checkbox">`;
};

const aiCheckbox = (index) => checkbox(PLAYER.AI_STRING, index);
const humanCheckbox = (index) => checkbox(PLAYER.HUMAN_STRING, index);

const label = (prefix, index) => {
  return `<label
    id="${fullId(prefix, BOARD_ELEMENT.LABEL, index)}"
    for="${fullId(prefix, BOARD_ELEMENT.CHECKBOX, index)}"
    class="${classFormat(prefix, BOARD_ELEMENT.LABEL, index)}">
    </label>`;
}

const aiLabel = (index) => label(PLAYER.AI_STRING, index);
const humanLabel = (index) => label(PLAYER.HUMAN_STRING, index);

const boardSquare = (index) => {
  return `
    <div class="${classFormat(null, BOARD_ELEMENT.SQUARE, index)}">
      <div id="${fullId(PLAYER.AI_STRING, BOARD_ELEMENT.RESULT, index)}"
           class="${classFormat(PLAYER.AI_STRING, BOARD_ELEMENT.RESULT, index)}">
      </div>
      ${humanLabel(index)}
    </div>
  `;
};

module.exports = {
  aiCheckbox, humanCheckbox,
  aiLabel, humanLabel,
  boardSquare
}