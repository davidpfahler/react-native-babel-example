// source of this file: https://github.com/roman01la/react-native-babel/blob/9eafa8071983c6a97390547066b075b61fde8b68/webpack.config.js
var webpack = require('webpack')
var path = require('path')
var AnybarWebpackPlugin = require('anybar-webpack')

module.exports = {

  entry: path.join(__dirname, '/src/app.jsx'),
  module: {
    loaders: [
      { test: /\.(jsx|es6)$/, exclude: /node_modules/, loaders: ['babel-loader?optional=runtime'] },
      { test: /\.json$/, loaders: ['json'] }
    ]
  },
  output: {
    path: path.join(__dirname, '/'),
    filename: 'index.ios.js',
    libraryTarget: 'commonjs'
  },
  resolve: {
    modulesDirectories: ['web_modules', 'node_modules'],
    extensions: ['', '.js', '.jsx', '.es6']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new AnybarWebpackPlugin()
  ]
}
