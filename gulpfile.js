var gulp = require('gulp');
var less = require('gulp-less');
var concatCss = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var browserSync = require('browser-sync').create();
var yargs = require('yargs').argv;
var config = require('./config');

gulp.task('webpack_client', function (cb) {
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack_client]", stats.toString());
    cb();
  });
});

gulp.task('stylesheets', function () {
  return gulp.src([
    './src/**/*.less'
  ])
    .pipe(less().on('error', gutil.log))
    .pipe(concatCss('index.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('server', ['webpack_client', 'stylesheets'], function() {
  browserSync.init({
    proxy: `localhost:${config.port}`
  });
  gulp.start('watch');
});

gulp.task('less-watch', ['stylesheets'], function() {
  browserSync.reload();
});
gulp.task('js-watch', ['webpack_client'], function() {
  browserSync.reload();
});

gulp.task('watch', function() {
  gulp.watch([
    './src/**/*.js',
    './src/**/*.jsx',
  ], ['js-watch']);
  gulp.watch([
    './src/**/*.less'
  ], ['less-watch']);
});

gulp.task('default', function () {
  if (yargs.s) {
    gulp.start('server');
  } else {
    gulp.start('stylesheets');
    gulp.start('webpack_client');
  }
});
