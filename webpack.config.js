const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    entry: { main: './src/JS/index.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
            'file-loader',
            {
                loader: 'image-webpack-loader',
                options: {
                bypassOnDebug: true, 
                disable: true, 
                },
            },
            ],
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
};
const webpack = require('webpack');


new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
}) ;
