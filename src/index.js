const yargs = require('yargs');
const Server = require('./app');

const argv = yargs
    .command('portal [options]', 'Create a web server serving static resources')
    .option('p', {
        alias: 'port',
        describe: 'port number',
        default: 9527 //Actually not necessary as we have set default values in defaultConfig.js
    })
    .option('h', {
        alias: 'hostname',
        describe: 'host name',
        default: '127.0.0.1'
    })
    .option('d', {
        alias: 'root',
        describe: 'root path',
        default: process.cwd()
    })
    .version()
    .alias('v', 'version')
    .help()
    .argv;

const server = new Server(argv);
server.start();
