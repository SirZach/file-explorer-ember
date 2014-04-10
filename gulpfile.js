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
    spawn = require('gulp-spawn'),
    handlebars = require('gulp-ember-handlebars'),

    //FILE PATHS
    stylesPath = 'js/**/*.styl',
    handleBarsPath = 'js/**/templates/**/*.hbs',
    jsPath = 'js/**/*.js';

function createTemplateName (name) {
  //remove the extension
  var n = path.extname(name).length;
  name = n === 0 ? name : name.slice(0, -n);

  var dirs = name.split(path.sep);

  return path.join.apply(null, dirs.slice(dirs.indexOf('templates') + 1));
}

gulp.task('styles', function () {
  return gulp.src(stylesPath)
      .pipe(stylus().on('error', function (error) {
        console.log('stylus error - ' + error);
      }))
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

gulp.task('zip', function () {
  return gulp.src([stylesPath, handleBarsPath])
      .pipe(spawn({
        cmd: 'zip',
        args: [
          '-r',
          'app.nw',
          '.',
          '-x',
          '.*',
          'modules/*',
          'node_modules/*'
        ]
      }))
      .pipe(gulp.dest('.'));
});

gulp.task('default', ['styles', 'templates', 'zip'], function () {
  gulp.watch(stylesPath, ['styles', 'zip']);
  gulp.watch(handleBarsPath, ['templates', 'zip']);
  gulp.watch(jsPath, ['zip']);
});