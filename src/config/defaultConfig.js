//Todo: all properties should be configurable through the command line arguments!!
module.exports = {
    root: process.cwd(),
    hostname: "127.0.0.1",
    port: 9527,
    compress: /\.(html|css|js|md|png)/,
    //configure what kinds of cache-related headers the server supports.
    cache: {
        maxAge: 30, //in seconds
        expires: false, //for the recent browsers, it's replaced by Cache-Control which is for relative time contrary to Expires
        cacheControl: true,
        lastModified: true, //relatively weak cache validation
        eTag: true //strong cache validation
    }
}
