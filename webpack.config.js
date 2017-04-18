const { resolve } = require('path')
const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')

const baseConfig = {
  context: resolve(__dirname, 'src'),
  entry: [ './index.js' ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
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
  resolve: {
    extensions: ['.js'],
    modules: [
      'node_modules',
      resolve(__dirname, './src')
    ],
    alias: {
      config: resolve(__dirname, 'config/'),
      constants$: resolve(__dirname, 'src/constants/index.js')
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  module.exports = Object.assign(baseConfig, {
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './index.js'
    ],
    devtool: 'inline-source-map',
    devServer: {
      hot: true,
      contentBase: resolve(__dirname, 'dist'),
      publicPath: '/',
      historyApiFallback: true,
      stats: { colors: true }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new DashboardPlugin()
    ]
  })
}

if (process.env.NODE_ENV === 'production') {
  module.exports = Object.assign(baseConfig, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin()
    ]
  })
}
