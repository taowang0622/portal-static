const fs = require('fs');
const conf = require('../config/defaultConfig');
const path = require('path');
const mime = require('../helper/mime');

const promisify = require('util').promisify
//promisify two functions which expect callbacks!!
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const pug = require('pug');
//__dirname and __filename are absolute
//When reading files, use absolute paths
const templatePath = path.join(__dirname, '../template/dir.pug');
//Code below relys on source so it should be sync
//According the property of loading module, this is run just once!
const source = fs.readFileSync(templatePath);
const template = pug.compile(source.toString());
const compress = require('../helper/compress');


module.exports = async function (req, res, filePath) {
    try {
        var stats = await stat(filePath);

        if (stats.isFile()) {
            res.statusCode = 200;
            const contentType = mime(filePath).type;
            res.setHeader('Content-Type', contentType);
            //All streams are instances of EventEmitter=>all streams are asynchronous!!
            let rs = fs.createReadStream(filePath);
            //only compress specified files
            if(filePath.match(conf.compress)){
                rs = compress(rs, req, res);
            }
            rs.pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            //Caveat: when filePath is root, dir is ""!!
            const dir =  path.relative(conf.root, filePath);
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '', //When dir is "", the resulting URL would be "//fileName" that is illegal!!
                files: files.map(file => {
                    return {
                        name: file,
                        //don't ever construct file path using '+', instead, use path module
                        icon: fs.statSync(path.join(filePath, file)).isDirectory() ? 'fiv-icon-folder': mime(file).class
                    }
                })
            }
            res.end(template(data));
        }
    } catch (ex) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or a file`);
    }
}
