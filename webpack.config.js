const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rules = require('./webpack.config.rules')();
const path = require('path');

rules.push({
    test: /\.scss$/,
    use:[MiniCssExtractPlugin.loader,'css-loader', 'sass-loader'],
    
}, {
    test: /\.css$/,
    use:[MiniCssExtractPlugin.loader,'css-loader']
    
});

module.exports = {
    context: path.resolve(__dirname, "resources"),
    entry: './index.js',
    output: {
        filename: 'build.js',
        path: path.resolve('public/dist')
    },
    devtool: 'source-map',
    module: { rules },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
        new CleanWebpackPlugin()
    ],
    watchOptions: {
        aggregateTimeout: 100,
        poll:1000
    }
};
