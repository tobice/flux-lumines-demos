var loaders = require('./base')('').module.loaders;

module.exports = {
    entry: __dirname + '/../node_modules/flux-lumines/src/Lumines.js',
    module: {
        loaders: loaders
    },
    output: {
        path: __dirname + '/../build/',
        filename: 'lumines.js',
        libraryTarget: 'umd',
        library: 'lumines'
    }
};
