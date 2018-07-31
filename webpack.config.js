var webpack = require("webpack");
var path = require('path');

module.exports = {
    entry: {
        index: './src/main/js/index.js'
    },
    output: {
        path: path.join(__dirname, 'out/production/resources/static/'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src/main/js'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            }
        ]
    }
};