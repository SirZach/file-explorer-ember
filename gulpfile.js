/**
 * User: sirzach
 * Date: 3/2/14
 * Time: 9:37 PM
 */

'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),

    //FILE PATHS
    stylesPath = 'js/**/*.styl';

gulp.task('styles', function () {
  return gulp.src(stylesPath)
      .pipe(stylus())
      .pipe(concat('app.css'))
      .pipe(gulp.dest('./css'));
});

gulp.task('default', ['styles'], function () {
  gulp.watch(stylesPath, ['styles']);
});