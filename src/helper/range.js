/**
 * Resolve incoming requests. If it's a range request, then return the status code, the range start and end if applicable, and 
 * set the response headers properly.
 * @param {number} totalSize is the size of the requested file
 * @param {object} req 
 * @param {object} res 
 * @returns {object} in the form of {code: 200 or 416 or 206, start: undefined or any number, end: undefined or any number}
 */
module.exports = (totalSize, req, res) => {
    let range = req.headers['range'];

    if (!range) {
        return { code: 200 };
    }

    //single part ranges
    let sizes = range.match(/bytes=(\d*)-(\d*)/);
    let start = sizes[1] || 0;
    let end = sizes[2] || totalSize - 1;

    if(start > end || start < 0 || end >= totalSize){
        return {code: 416}
    }

    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`);
    res.setHeader('Content-Length', end - start + 1);
    return {
        code: 206,
        start: parseInt(start),
        end: parseInt(end)
    }
}