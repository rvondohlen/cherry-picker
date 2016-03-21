// Load plugins
var gulp = require('gulp'),
    livereload = require('gulp-livereload');
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// Styles
gulp.task('styles', function() {
  return gulp.src('scss/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass({ style: 'expanded', }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
});

// Scripts
gulp.task('scripts', function () {
   return gulp.src(['js/vendor/*.js', 'js/*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      //.pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('./dist/js'));
});

// Browser-sync 
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./dist"
        },
        port: 5000
    });
});

gulp.task('default', ['styles', 'scripts', 'browser-sync'], function () {
    gulp.watch(['scss/*.scss', 'scss/resets/*.css', 'scss/components/*.scss', 'scss/components//modules/*.scss'], ['styles', reload]);
    gulp.watch(['js/*.js', 'js/vendor/*.js'], ['scripts', reload]);
    gulp.watch('dist/*.html', reload);
});
