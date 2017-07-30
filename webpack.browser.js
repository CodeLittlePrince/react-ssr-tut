const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const path = require('path');

let browserConfig = {
    entry: './src/browser/index.jsx',
    output: {
        path: __dirname,
        filename: 'public/browser.js',
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
                    publicPath: url => url.replace(/public/, "")
                },
                exclude: '/node_modules/'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }),
                exclude: '/node_modules/'
            },
            {
                test: /\.jsx$/,
                use: [
                    'babel-loader'
                ],
                exclude: '/node_modules/'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'public/css/main.css'
        })
    ]
}

module.exports = browserConfig;