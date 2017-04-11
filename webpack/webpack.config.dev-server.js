const { publicPath, assetsPath, commonRules, plugins } = require('./common.config')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  name: 'render',
  context: path.join(__dirname, '..', 'src'),
  entry: './render.js',
  output: {
    path: assetsPath,
    filename: 'render.js',
    libraryTarget: 'commonjs2',
    publicPath
  },
  target: 'node',
  externals: nodeExternals(),
  module: {
    loaders: commonRules
  },
  plugins: plugins
}
