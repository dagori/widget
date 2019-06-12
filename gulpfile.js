'use strict';
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
//const del = require('del');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const imageminSvgo = require('imagemin-svgo');

function styles() {
  return gulp.src('scss/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(cleanCSS({
    level: 2
  }))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.stream())
}

function watch() {
  browserSync.init({
       server: {
           baseDir: "./"
       }
   })
   gulp.watch('images-widget/*', image)
   gulp.watch('scss/style.scss', styles)
   gulp.watch('*.html').on('change', browserSync.reload)
}

function image() {
  return gulp.src('images-widget/**')
        .pipe(imagemin([
          imagemin.svgo({
            plugins: [
              {removeViewBox: false},
              {cleanupIDs: false}
            ]
          })
        ]))
        .pipe(gulp.dest('images'))
}
gulp.task('styles', styles);
gulp.task('watch', watch);
gulp.task('image', image);

gulp.task('build', gulp.series(styles, image));
gulp.task('default', gulp.series('build', 'watch'));
