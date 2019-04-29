const path = require('path');
module.exports = {
    entry: './src/main.js',
    mode: 'production', //production,development
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[chunkhash].js'
    },
    rules: [
        { test: /\.css$/, use: 'css-loader' }
    ]
};