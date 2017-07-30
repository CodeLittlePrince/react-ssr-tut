const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const path = require('path');

let serverConfig = {
    entry: './src/server/index.jsx',
    target: "node",
    output: {
        path: __dirname,
        filename: 'server.js',
        libraryTarget: "commonjs2"
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.png', '.jpg', 'svg']
    },
    module: {
        rules: [
            {
                test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: "file-loader",
                options: {
                    name: "public/img/[name].[ext]",
                    publicPath: url => url.replace(/public/, ""),
                    emit: false
                },
                exclude: '/node_modules/'
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "css-loader/locals"
                    }
                ]
            },
            {
                test: /\.jsx$/,
                use: [
                    'babel-loader'
                ],
                exclude: '/node_modules/'
            }
        ]
    }
}

module.exports = serverConfig;