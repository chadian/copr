const { Readable, PassThrough } = require('stream');
const fs = require('fs');
const zlib = require('zlib');

function saveToFile(string, filePath, gzip=false) {
  const readStream = new Readable();
  const passThroughStream = new PassThrough();
  const gzipStream = zlib.createGzip({ level: 9 });

  readStream._read = () => { };
  readStream.push(string);
  readStream.push(null);

  var writeStream = fs.createWriteStream(filePath);

  readStream
    .pipe(gzip ? gzipStream : passThroughStream)
    .pipe(writeStream)
    .on('finish', () => console.log(`Finished writing ${filePath}`));
};

module.exports = { saveToFile }
