'use strict';

const { series, parallel, src, dest, watch } = require('gulp');
const plumber = require('gulp-plumber');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const del = require('del');
const mqpacker = require('css-mqpacker');
const cleanCSS = require('gulp-cleancss');
const rename = require('gulp-rename');

const dirs = {
  source: 'src',  // папка с исходниками (путь от корня проекта)
  build: 'build', // папка с результатом работы (путь от корня проекта)
};

const jsList = [
  dirs.source + '/js/promise.polyfill.min.js',
  dirs.source + '/blocks/**/*.js',
  dirs.source + '/js/script.js'
];


function styles() {
  return src('./less/style.less')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 version']}),
      mqpacker({sort: true})
    ]))
    .pipe(sourcemaps.write('/'))
    .pipe(dest('./css/'))
    .pipe(rename('style.min.css'))
    .pipe(cleanCSS())
    .pipe(browserSync.stream())
    .pipe(dest('./css/'));
}
exports.styles = styles;


function html() {
  return src('/*.html')
    .pipe(dest(dirs.build));
}

function clean() {
  return del('./css')
}

function serve() {
  browserSync.init({
    server: './',
    startPath: 'index.html',
    open: false,
    port: 8080,
  });
  watch([
    './less/*.less',
    './less/blocks/*.less',
  ], { delay: 100 }, styles).on('change', browserSync.reload);;
  watch('./*.html').on('change', browserSync.reload);
  watch('./js/*.js').on('change', browserSync.reload);
}

exports.default = series(clean, styles, serve);
