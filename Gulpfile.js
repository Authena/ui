const gulp = require('gulp')
const gutil = require("gulp-util")
const babel = require("gulp-babel")
const rimraf = require("rimraf")
const sourcemaps = require('gulp-sourcemaps')
const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = require('./webpack.config.js')

gulp.task("webpack", function(callback) {
  webpackConfig.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      chunks: [],
      template: path.resolve('./demo/index.html'),
      filename: path.resolve('./assets/index.html')
    })
  )
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      colors: true,
    }))
    callback()
  })
})

gulp.task('webpack-dev-server', function(callback) {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
  webpackConfig.entry.app.push(
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
  )
  const compiler = webpack(webpackConfig)

  new WebpackDevServer(compiler, webpackConfig.devServer).listen(3000, "localhost", function(err) {
    if(err) throw new gutil.PluginError('webpack-dev-server', err)
    gutil.log('[webpack-dev-server]', 'http://localhost:3000/index.html')
    callback()
  })
})

gulp.task('clean-lib', function (cb) {
  rimraf(path.resolve('./lib'), cb)
})

gulp.task('compile-css', function () {
  const postcss = require('gulp-postcss')
  return gulp.src('src/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([require('autoprefixer'), require('precss')]))
    .pipe(gulp.dest('lib/'))
})

gulp.task('compile-js', function () {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest("lib/"))
})
gulp.task("compile", ["clean-lib", "compile-css", "compile-js"])
gulp.task("default", ["webpack-dev-server"])
