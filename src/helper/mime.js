const mime = require('mime');
const path = require('path');

module.exports = (filePath) => {
    //splitting by . is because it's possibole that the path is like "jquery.min.js"
    let ext = path.extname(filePath).split('.').pop().toLowerCase();

    if (!ext){
        ext == filePath;
    }

    return mime.getType(ext) || mime.getType('txt');
}
