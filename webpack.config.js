var webpack = require("webpack");
var path = require('path');

module.exports = {
    entry: {
        app: ['./src/main/js/index.js'],
		serviceworker: './src/main/js/serviceworker.js'
    },
    output: {
        path: path.join(__dirname, 'out/production/resources/static/'),
        filename: '[name]-bundle.js'
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