const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'index.bundle.js',
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3001'
    },
    contentBase: path.join(__dirname, './public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.png$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}