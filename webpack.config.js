const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const webpack = require('webpack'); //?



module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: { main: 
        ['@babel/polyfill', './JS/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            { 
            test: /\.js$/,
            exclude: /node_modules/, 
            loader: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env',
                        {
                            targets: { 
                                  edge: "17",
                                  ie: "11",
                                  firefox: "50",
                                  chrome: "64",
                                  safari: "11.1",
                            },
                            useBuiltIns: "usage", 
                            corejs: "3.6.5" 
                          }
                        ]
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
             }, 
             
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
                /*use: ['style-loader', 'css-loader'] */
            },
            {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
            'file-loader',
            /*{
                loader: 'image-webpack-loader',
                options: {
                bypassOnDebug: true, 
                disable: true, 
                },
            },*/
            ],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            }  
        ],
    },
    devServer: {
        port: 4200
    },
    plugins: [ 
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({ //?
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV) //?
        })
    ]  
    
};



