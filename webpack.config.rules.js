module.exports = function() {
    return [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.hbs/,
            loader: 'handlebars-loader'
        },
        {
            test: /\.(jpe?g|png|gif)$/i,
            loader: 'file-loader?name=images/[hash].[ext]'
        },
        {
            test: /\.(svg)$/i,
            loader: 'file-loader?name=images/[name].[ext]'
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[hash].[ext]'
        }
    ];
};
