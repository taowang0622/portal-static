// const mime = require('mime');
const path = require('path');

const mimeTypes =
{
   'txt': {
       type: 'text/plain',
       class: 'fiv-icon-txt'
   },
   'png': {
       type: 'image/png',
       class: 'fiv-icon-png'
   },
   'pdf': {
       type: 'application/pdf',
       class: 'fiv-icon-pdf'
   },
   'json': {
       type: 'application/json',
       class: 'fiv-icon-json'
   },
   'css': {
       type: 'text/css',
       class: 'fiv-icon-css'
   },
   'js': {
       type: 'application/x-javascript',
       class: 'fiv-icon-js'
   },
   '.gitignore': {
       type: 'text/plain',
       class: 'fiv-icon-gitignore'
   },
   'java': {
       type: 'text/plain',
       class: 'fiv-icon-java'
   },
   'html': {
       type: 'text/html',
       class: 'fiv-icon-html'
   },
   'zip': {
       type: 'application/zip',
       class: 'fiv-icon-zip'
   },
   'mkv': {
       type: 'video/x-matroska',
       class: 'fiv-icon-mkv'
   },
   'mp4': {
       type: 'video/mp4',
       class: 'fiv-icon-mp4'
   }
};

module.exports = (filePath) => {
    //splitting by . is because it's possibole that the path is like "jquery.min.js"
    let ext = path.extname(filePath).split('.').pop().toLowerCase();

    if (!ext) {
        ext = filePath;
    }

    return mimeTypes[ext] || mimeTypes['txt'];
}
