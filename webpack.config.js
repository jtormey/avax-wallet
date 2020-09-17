const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = require('node-env-file')

let resolve = (file) => path.resolve(__dirname, file)

if (process.env.NODE_ENV == null) {
  env('.env')
}

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map',
  entry: resolve('src/index.js'),
  output: {
    path: resolve('build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new HtmlWebpackPlugin({
      template: resolve('public/index.html')
    })
  ]
}
