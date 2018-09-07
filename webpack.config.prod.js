var webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var path = require('path');

module.exports = {
    entry: {
        app: ['./src/main/js/index.js'],
		serviceworker: './src/main/js/serviceworker.js'
    },
    output: {
        path: path.join(__dirname, 'build/resources/main/static/'),
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
    },
	plugins: [
		new webpack.DefinePlugin({
		  'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new UglifyJsPlugin()
	]
};