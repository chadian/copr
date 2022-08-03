/*global window*/

import { BOARD_ELEMENT, PLAYER } from "../src/utils/markup/constants";
import * as position from "./stubs/position";
import { uniq } from "ramda";
import { classFormat, fullId } from "../src/utils/markup/formats";
import puppeteer from "puppeteer";
import * as statik from "node-static";
import { jest } from "@jest/globals";
import * as http from "http";

jest.setTimeout(15000);

const dist = new URL("../dist/", import.meta.url)
  .toString()
  .replace("file://", "");
const STATIC_SERVER_PORT = 2222;
const STATIC_SERVER_URL = `http://localhost:${STATIC_SERVER_PORT}`;

async function createServer() {
  const file = new statik.Server(dist);

  let server;

  await new Promise(resolve => {
    server = http
      .createServer(function(request, response) {
        request
          .addListener("end", function() {
            file.serve(request, response);
          })
          .resume();
      })
      .listen(STATIC_SERVER_PORT, resolve);
  });

  return {
    async close() {
      return new Promise(resolve => {
        server.close(resolve);
      });
    }
  };
}

let browser;
let server;

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

describe("Acceptance", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch();
    server = await createServer();
  });

  afterAll(async () => {
    await browser.close();
    await server.close();
  });

  it("sees a rendered board", async () => {
    const page = await browser.newPage();
    await page.goto(STATIC_SERVER_URL);
    const styles = computedStyle(page);

    const boardSquareSelector = classFormat(null, `.${BOARD_ELEMENT.SQUARE}`);
    const display = uniq(await styles(boardSquareSelector, "display"));

    expect(display.length).toBe(1);
    expect(display).toContain("block");

    await page.close();
  });

  it("plays the game to a stalemate", async () => {
    const page = await browser.newPage();
    await page.goto(STATIC_SERVER_URL);
    const styles = computedStyle(page);

    const humanSpotSelector = index =>
      `.${fullId(PLAYER.HUMAN_STRING, BOARD_ELEMENT.LABEL, index)}`;
    const clickSpot = index => page.click(humanSpotSelector(index));
    const aiMove = async function() {
      let { x, y } = await page.$eval(".window", gameWindow => {
        const { x, y, width, height } = gameWindow.getBoundingClientRect();
        return { x: x + width / 2, y: y + height / 2 };
      });
      await page.mouse.click(x, y);
    };

    const tieGameDisplay = async () => uniq(await styles("#aiDraw", "display"));

    // initial tie game screen is display: none
    expect(await tieGameDisplay()).toContain("none");

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
    expect(await tieGameDisplay()).toContain("block");
  });
});
