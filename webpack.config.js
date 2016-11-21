const webpack = require('webpack')
const path = require('path')
const production = process.env.NODE_ENV === 'production'

const config = {
  entry: {
    vendor: ['vue', 'vue-router'],
    app: ['./demo/index.js'],
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    path: path.resolve('./assets'),
    publicPath: '/assets/',
  },
  module: {
    preLoaders: [
      {
        test: /\.(vue|js)$/,
        exclude: [/node_modules/],
        loader: 'eslint',
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel',
      },
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.(css)$/,
        exclude: [/node_modules/],
        loader: 'style!css!postcss',
      },
    ],
  },
  resolve: {
    root: [path.resolve('./src'), path.join('./node_modules')],
    extensions: ['', '.js', '.vue'],
    alias: {
      src: path.resolve('./src'),
      demo: path.resolve('./demo'),
    },
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: production ? JSON.stringify('production') : JSON.stringify('development'),
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  debug: !production,
  postcss() {
    return [require('autoprefixer'), require('precss')]
  },
  vue: {
    loaders: { css: 'style!css!postcss' },
    postcss() {
      return [require('autoprefixer'), require('precss')]
    },
  },
  devServer: {
    stats: {
      colors: true,
    },
    hot: true,
    publicPath: '/assets/',
    contentBase: path.resolve('./demo'),
    historyApiFallback: true,
  },
}

if (!production) {
  config.devtool = '#source-map'
}

module.exports = config
