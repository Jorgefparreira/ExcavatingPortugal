var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-ruby-sass'),
  uglify = require('gulp-uglify'),
  pump = require('pump'),
  connect = require('gulp-connect'),
  htmlmin = require('gulp-htmlmin'),
  jsonminify = require('gulp-jsonminify'),
  imagemin = require('gulp-imagemin');


var jsMinSources = [
  'builds/development/js/scripts.js'
];

var jsCopySources = [
  'builds/development/js/scripts.js'

];

// sass production conversion

gulp.task('sass-pro', function () {
  return sass('components/sass/styles.scss', {
    sourcemap: true,
    style: 'compressed'
  })
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('builds/production/css'));
});

// sass development conversion

gulp.task('sass-dev', function () {
  return sass('components/sass/styles.scss', {
    sourcemap: true,
    style: 'expanded'
  })
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('builds/development/css'))
  .pipe(connect.reload())
});

//js minification
 
gulp.task('js-min', function (cb) {
  pump([
      gulp.src(jsMinSources),
      uglify(),
      gulp.dest('builds/production/js')
    ],
    cb
  );
});

// json minification

gulp.task('json-min', function () {
  return gulp.src(['builds/development/js/*.json'])
    .pipe(jsonminify())
    .pipe(gulp.dest('builds/production/js/'));
});

// html minification

gulp.task('html-min', function() {
  return gulp.src('builds/development/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('builds/production'));  
});

// image minification

gulp.task('image-min', function() {
  gulp.src('builds/development/img/**/*.*')
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({plugins: [{removeViewBox: true}]})
    ]))
    .pipe(gulp.dest('builds/production/img/'))
});

// gulp connect development

gulp.task('connect-dev', function(){
  connect.server({
    root: 'builds/development/',
    livereload: true
  });
});

// gulp connect production

gulp.task('connect-pro', function(){
  connect.server({
    root: 'builds/production/',
    livereload: true
  });
});

// gulp watch

gulp.task('watch', function() {
  gulp.watch('components/sass/*.scss', ['sass-dev']);
  gulp.watch('builds/development/*.html', ['html-copy']);
  gulp.watch('builds/development/partials/*.html', ['partials-copy']);  
  gulp.watch('builds/development/js/*.*', ['js-copy']);
});

// html changes

gulp.task('html-copy', function() {
  gulp.src('builds/development/*.html')
    .pipe(gulp.dest('builds/production'))
    .pipe(connect.reload())
});

// partials changes

gulp.task('partials-copy', function() {
  gulp.src('builds/development/partials/*.html')
    .pipe(gulp.dest('builds/production/partials'))
    .pipe(connect.reload())
});

// js changes

gulp.task('js-copy', function () {
  gulp.src('builds/development/js/*.*')
    .pipe(gulp.dest('builds/production/js'))
    .pipe(connect.reload())
});


gulp.task('live', ['watch', 'connect-dev']);

gulp.task('pro', ['sass-pro', 'js-min', 'json-min', 'image-min', 'html-min']);

gulp.task('default', ['sass-dev','js-copy', 'html-copy', 'partials-copy']);

