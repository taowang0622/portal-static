const fs = require('fs');

const promisify = require('util').promisify
//promisify two functions which expect callbacks!!
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

module.exports = async function (req, res, filePath) {
    try {
        var stats = await stat(filePath);

        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            //Although it's also async, it's much slower than stream!
            // fs.readFile(filePath, (err, data) => {
            //     res.end(data);
            // })
            fs.createReadStream(filePath).pipe(res); //All streams are instances of EventEmitter=>all streams are asynchronous!!
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(files.join(', '));
        }
    } catch (ex) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or a file`);
    }
}
