const { fullId, classFormat } = require('./formats');
const { BOARD_ELEMENT, PLAYER } = require('./constants');

const checkbox = (prefix, index) => {
  return `<input
    id="${ fullId(prefix, BOARD_ELEMENT.CHECKBOX, index) }"
    class="${ classFormat(prefix, BOARD_ELEMENT.CHECKBOX, index) }"
    type="checkbox">`;
};

const aiCheckbox = (index) => checkbox(PLAYER.AI_STRING, index);
const humanCheckbox = (index) => checkbox(PLAYER.HUMAN_STRING, index);

const label = (prefix, index, labelText="") => {
  return `<label
    id="${ fullId(prefix, BOARD_ELEMENT.LABEL, index) }"
    for="${ fullId(prefix, BOARD_ELEMENT.CHECKBOX, index) }"
    class="${ classFormat(prefix, BOARD_ELEMENT.LABEL, index) }">
      ${labelText}
    </label>`;
}

const aiLabel = (index) => label(PLAYER.AI_STRING, index, `Best move calculated. <span class="button">Proceed</span>`);
const humanLabel = (index) => label(PLAYER.HUMAN_STRING, index);

const boardSquare = (index) => {
  return `
    <div class="${ classFormat(null, BOARD_ELEMENT.SQUARE, index) }">
      <div id="${ fullId(PLAYER.AI_STRING, BOARD_ELEMENT.RESULT, index) }"
           class="${ classFormat(PLAYER.AI_STRING, BOARD_ELEMENT.RESULT, index) }">
      </div>
      <div id="${ fullId(PLAYER.HUMAN_STRING, BOARD_ELEMENT.RESULT, index) }"
           class="${ classFormat(PLAYER.HUMAN_STRING, BOARD_ELEMENT.RESULT, index) }">
      </div>
      ${humanLabel(index)}
    </div>
  `;
};

const starOnGithub = `<a class="button" href="https://github.com/chadian/copr">Star on Github</a>`;
const playAgain = `<a class="button" href=".">Play again</a>`;

const containerStart = ({ head }) => `
<!DOCTYPE html>
<html>
  <head>
    <title>COPR, CSS Operation Plan Response</title>
    <meta charset="utf-8"/>
    ${ head ? head : '' }
  </head>
  <body><div class="window">`;

const containerEnd = () => '<link href="https://fonts.googleapis.com/css?family=VT323" rel="stylesheet"></div></body></html>';

module.exports = {
  humanCheckbox,
  aiCheckbox,
  aiLabel,
  boardSquare,
  containerStart,
  containerEnd,
  starOnGithub,
  playAgain
}
