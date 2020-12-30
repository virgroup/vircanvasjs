const path = require('path');

// const MinifyPlugin = require("babel-minify-webpack-plugin");

const minifyOpts = {};
const pluginOpts = {};

module.exports = {
    entry: {
        canvas: './src/index.js',
    },
    output: {
        filename: 'bundle.js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
        {
            test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    },
    // mode: "development",
    plugins: [
    // new MinifyPlugin(minifyOpts, pluginOpts)
    ]
};