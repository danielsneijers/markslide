const { publicPath, assetsPath, commonRules, plugins } = require('./common.config')
const path = require('path')

module.exports = {
  devtool: 'eval',
  name: 'client',
  context: path.resolve(__dirname, '..', 'src'),
  entry: './client.js',
  output: {
    path: assetsPath,
    publicPath,
    filename: 'client.js'
  },
  module: {
    loaders: commonRules
  },
  plugins: plugins
}
