const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  publicPath: '/',
  assetsPath: path.resolve(__dirname, '..', 'dist'),
  commonRules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.resolve(__dirname, '..', 'src'),
      exclude: /node-modules/
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: [
          {
            loader: 'css-loader',
            query: {
              localIdentName: '[hash:8]',
              modules: true
            }
          }
        ]
      })
    }
  ],
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ]
}
