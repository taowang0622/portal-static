const { exec } = require('child_process');

/**
 * Create a child process which is the default shell/terminal/interpreter to execute platform-specific command to open URL 
 * @param {string} url 
 */
module.exports = url => {
    switch (process.platform) {
        case 'win32':
            exec(`start ${url}`);
            break;
        case 'darwin':
            exec(`open ${url}`);
            break;
        //Todo: add the support of linux
    }
}