const {cache} = require('../config/defaultConfig');

/**
 * Set the response cache-related headers properly according to the configurations 
 * @param {object} stats is the stats object of rge requested static source 
 * @param {object} res 
 * @returns {null}
 */
function refreshRes(stats, res){
    const {maxAge, expires, cacheControl, lastModified, eTag} = cache;

    if(expires){
        res.setHeader('Expires', new Date(Date.now() + maxAge * 1000).toUTCString());
    }

    if(cacheControl){
        res.setHeader('Cache-Control', `max-age=${maxAge}`);
    }

    if(lastModified){
        //stats.mtime is an Date object.
        res.setHeader('Last-Modified', stats.mtime.toUTCString());
    }

    if(eTag){
        //simplistic way of generating ETag string
        res.setHeader('ETag', `${stats.size}-${stats.mtime}`);
    }
}

/**
 * Check if the requested static resource is fresh in cache. 
 * @param {object} stats 
 * @param {object} req 
 * @param {object} res
 * @returns {boolean} true means the client side can load from the cache, otherwise request new version.  
 */
module.exports = function isFresh(stats, req, res){
    refreshRes(stats, res);

    //cache validations
    const lastModified = req.headers['if-modified-since'];
    const etag = req.headers['if-none-match'];

    //The first request
    if(!lastModified && !etag){
        return false;
    }

    if(lastModified && lastModified !== res.getHeader('Last-Modified')){
        return false;
    }

    if(etag && etag !== res.getHeader('ETag')){
        return false;
    }

    return true;
}