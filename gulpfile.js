'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');

gulp.task('html', function() {
  return gulp.src('*.html')
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass', function () {
  gulp.src('*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watcher', function() {
  gulp.watch('*.html', ['html']);
  gulp.watch('*.scss', ['sass']);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    port: 8080,
    open: true,
    notify: false
  });
});

gulp.task('default', ['sass', 'watcher', 'browserSync']);
