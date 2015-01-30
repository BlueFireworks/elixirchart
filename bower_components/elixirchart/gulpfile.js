var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('scripts', function() {
    //single entry point to browserify
    gulp.src(['lib/elixirchart.js'])
        .pipe(browserify({
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
  gulp.watch('./lib/**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);
