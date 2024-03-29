/* eslint no-console: 0 */
import { Readable, PassThrough } from "stream";

import fs from "fs";
import path from "path";
import zlib from "zlib";
import postcss from "postcss";
import cssnano from "cssnano";

const hasAccess = dir => {
  try {
    fs.accessSync(dir);
    return true;
  } catch (exception) {
    return false;
  }
};

export function processCss(rawCssString, compress = false) {
  const cssMinifier = postcss([cssnano]).process(rawCssString);
  const processedCss = compress
    ? cssMinifier
    : Promise.resolve({ css: rawCssString });
  return processedCss;
}

export function saveToFile(string, filePath, gzip = false) {
  const dirPath = path.dirname(filePath);
  if (!hasAccess(dirPath)) fs.mkdirSync(dirPath);

  const readStream = new Readable();
  const passThroughStream = new PassThrough();
  const gzipStream = zlib.createGzip({ level: 9 });

  readStream._read = () => {};
  readStream.push(string);
  readStream.push(null);

  var writeStream = fs.createWriteStream(filePath);

  readStream
    .pipe(gzip ? gzipStream : passThroughStream)
    .pipe(writeStream)
    .on("finish", () => console.log(`Finished writing ${filePath}`));
}
