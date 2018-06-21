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
const range = require('../helper/range');
const isFresh = require('../helper/cache');


module.exports = async function (req, res, filePath) {
    try {
        var stats = await stat(filePath);

        if (stats.isFile()) {
            const contentType = mime(filePath).type;
            res.setHeader('Content-Type', contentType);

            if(isFresh(stats, req, res)){
                res.statusCode = 304;
                res.end(); //close the stream to prevent memory leak!
                return;
            }

            let {code, start, end} = range(stats.size, req, res); //according to the doc of the function range, start and end may be undefined!
            let rs;
            if(code === 200){
                res.statusCode = 200;
                rs = fs.createReadStream(filePath);
            } else if (code === 206){
                res.statusCode = 206;
                rs = fs.createReadStream(filePath, {start, end});
            }
            // Todo: process the situation of 416
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
