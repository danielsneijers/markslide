const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolve(__dirname, 'src'),
        exclude: /node-modules/
      },
      {
        test: /\.md/,
        use: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            query: {
              localIdentName: '[local]__[hash:base64:5]',
              modules: true,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    extensions: ['.js'],
    modules: [
      'node_modules',
      resolve(__dirname, './src')
    ],
    alias: {
      constants$: resolve(__dirname, 'src/constants/index.js')
    }
  }
}
