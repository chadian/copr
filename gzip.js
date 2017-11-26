var fs = require('fs');
var zlib = require('zlib');

var gzip = zlib.createGzip();
var rstream = fs.createReadStream('dist/index.html');
var wstream = fs.createWriteStream('dist/index.html.gz');

rstream   // reads from myfile.txt
  .pipe(gzip)  // compresses
  .pipe(wstream)  // writes to myfile.txt.gz
  .on('finish', function () {  // finished
    console.log('done compressing');
  });
