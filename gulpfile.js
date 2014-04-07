/**
 * User: sirzach
 * Date: 3/2/14
 * Time: 9:37 PM
 */

'use strict';

var path = require('path'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    handlebars = require('gulp-ember-handlebars'),

    //FILE PATHS
    stylesPath = 'js/**/*.styl',
    handleBarsPath = 'js/**/templates/**/*.hbs';

function createTemplateName (name) {
  //remove the extension
  var n = path.extname(name).length;
  name = n === 0 ? name : name.slice(0, -n);

  var dirs = name.split(path.sep);

  return path.join.apply(null, dirs.slice(dirs.indexOf('templates') + 1));
}

gulp.task('styles', function () {
  return gulp.src(stylesPath)
      .pipe(stylus())
      .pipe(concat('app.css'))
      .pipe(gulp.dest('./css'));
});

gulp.task('templates', function(){
  return gulp.src([handleBarsPath])
      .pipe(handlebars({
        outputType: 'browser',
        processName: createTemplateName
      }))
      .pipe(concat('templates.js'))
      .pipe(gulp.dest('js/'));
});

gulp.task('default', ['styles', 'templates'], function () {
  gulp.watch(stylesPath, ['styles']);
  gulp.watch(handleBarsPath, ['templates']);
});