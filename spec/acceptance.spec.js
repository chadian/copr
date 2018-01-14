/*global window*/

const { BOARD_ELEMENT, PLAYER } = require('../utils/markup/constants');
const position = require('./stubs/position');
const { uniq } = require('ramda');
const { classFormat, fullId } = require('../utils/markup/formats');
const puppeteer = require('puppeteer');
const StaticServer = require('static-server');
const path = require('path');

const dist = path.resolve(__dirname, '../dist/');

let server;
let browser;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const selectAll = page => selector =>
  page.$$(selector).then(promisedElements => Promise.all(promisedElements));

const computedStyle = page => (selector, styleProp) =>
  selectAll(page)(selector).then(elements => {
    return Promise.all(
      elements.map(async element => {
        return page.evaluate(
          (element, styleProp) =>
            window.getComputedStyle(element).getPropertyValue(styleProp),
          element,
          styleProp
        );
      })
    );
  });

describe('Acceptance', () => {
  beforeAll(async () => {
    server = new StaticServer({
      port: 5000,
      rootPath: dist
    });

    const serverStart = new Promise(resolve => server.start(resolve));
    browser = await puppeteer.launch();

    return Promise.all([Promise.resolve(browser), serverStart]);
  });

  afterAll(async done => {
    await browser.close();
    server.stop();
    done();
  });

  it('sees a rendered board', async done => {
    const page = await browser.newPage();
    await page.goto('http://localhost:5000');
    const styles = computedStyle(page);

    const boardSquareSelector = classFormat(null, `.${BOARD_ELEMENT.SQUARE}`);
    const display = uniq(await styles(boardSquareSelector, 'display'));

    expect(display.length).toBe(1);
    expect(display).toContain('block');

    page.close();
    done();
  });

  it('plays the game to a stalemate', async done => {
    const page = await browser.newPage();
    await page.goto('http://localhost:5000');
    const styles = computedStyle(page);

    const humanSpotSelector = index =>
      `.${fullId(PLAYER.HUMAN_STRING, BOARD_ELEMENT.LABEL, index)}`;
    const clickSpot = index => page.click(humanSpotSelector(index));
    const aiMove = async function() {
      let { x, y } = await page.$eval('.window', gameWindow => {
        const { x, y, width, height } = gameWindow.getBoundingClientRect();
        return { x: x + width / 2, y: y + height / 2 };
      });
      await page.mouse.click(x, y);
    };

    const tieGameDisplay = async () => uniq(await styles('#aiDraw', 'display'));

    // initial tie game screen is display: none
    expect(await tieGameDisplay()).toContain('none');

    // play a game to a tie
    await clickSpot(position.TOP_LEFT);
    await aiMove();
    await clickSpot(position.BOTTOM_RIGHT);
    await aiMove();
    await clickSpot(position.TOP_MIDDLE);
    await aiMove();
    await clickSpot(position.BOTTOM_LEFT);
    await aiMove();
    await clickSpot(position.MIDDLE_RIGHT);

    // expect tie game screen to display: block
    expect(await tieGameDisplay()).toContain('block');
    done();
  });
});
