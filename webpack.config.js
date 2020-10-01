const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

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
                use: [
                    (isDev? 'style-loader': MiniCssExtractPlugin.loader),
                                         'css-loader',
                                         'postcss-loader'
                                        ]
            },
            {
            test: /\.(gif|png|jpe?g|svg)$/,
            use: [
                'file-loader?name=./images/[name].[ext]',
                {
                    loader: 'image-webpack-loader',
                    options: {},
                },
            ],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                loader: 'file-loader?name=./vendor/[name].[ext]'
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
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
    }),
        new HtmlWebpackPlugin({
            inject: false,
            template: './index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]  
    
};



