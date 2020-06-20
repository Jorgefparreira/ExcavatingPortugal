'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;

// Static server
function server() {
    browserSync.init({
        proxy: "localhost:8000"
    });
};

const sassDev = () => {
    return gulp.src('./src/scss/styles.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./public/css'))
      
  
  }

function watchFiles() {
    gulp.watch('src/scss/*.scss', sassDev);
    gulp.watch("./public/**/*.*").on("change", reload);
  }



exports.default = gulp.parallel(server,watchFiles);

// const sass = require('gulp-sass');
// sass.compiler = require('node-sass');
// const concat = require('gulp-concat');
// const htmlmin = require('gulp-htmlmin');

// // INDEX PAGE

// const concatPHP = () => {
//   return gulp.src(['./src/components/php/header.php','./src/index.php','./src/components/php/footer.php'])
//     .pipe(concat('index.php'))
//     .pipe(gulp.dest('./public/'))
// }

// const movePages = () => {
//   return gulp.src('./src/pages/*.js')
//     .pipe(gulp.dest('./public/js/'))
// }

// const sassDev = () => {
//   return gulp.src('./src/scss/styles.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./public/css'))
    

// }

// function watchFiles() {
//   gulp.watch('src/scss/*.scss', sassDev);
//   gulp.watch('src/pages/index.php', concatPHP);
//   gulp.watch('src/components/php/*.php', concatPHP);
//   gulp.watch('src/*.php', concatPHP);
//   gulp.watch('src/pages/*.js', movePages);
// }

// exports.default = gulp.parallel(watchFiles);


// const sassBuild = () => {
//   return gulp.src('./src/scss/styles.scss')
//     .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//     .pipe(gulp.dest('./build/css'));
// }

// const htmlMinify = () => {
//   return gulp.src('public/*.php')
//     .pipe(htmlmin({ collapseWhitespace: true }))
//     .pipe(gulp.dest('build'));
// }

// exports.build = gulp.parallel(sassBuild, htmlMinify);
