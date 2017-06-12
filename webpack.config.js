const path = require('path');
const webpack = require('webpack');

const config = {
    entry: {
        app: [
            './src/js/main.js'
        ]
    },

    output: {
        path: path.resolve(__dirname, '../fb-auth/dist/'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },

            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ],

    devServer: {
        hot: true,
        contentBase: './'
    },
};

module.exports = config;