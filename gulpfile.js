var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var plumber = require('gulp-plumber');
var gulp = require('gulp');
var order = require('gulp-order');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

var paths = {
    scss: ['./html/scss/**/*.scss'],
    js: './html/js/**/*.js',
    html: './html/view/**/*.html'
};

// If true it allow you to not minify your html, css, js
var debug = false;

gulp.task('default', ['scss']);

/*
gulp.task('scss', function () {
    gulp.src(paths.scss)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./html/css'));
});
*/

gulp.task('scss', function () {
    var b = gulp.src(paths.scss)
        .pipe(order([
            "variables.scss",
            "common.scss",
            "*.scss"
        ], {base:'HTML/scss/'}))
        .pipe(concat('app.scss'))
        .pipe(sass().on('error', sass.logError));
    b = b.pipe(concat('app.css'))
    if (!debug) {
        b = b.pipe(cleanCSS())
    }
    return b.pipe(gulp.dest('./html/css'));
});


gulp.task('watchcss', function () {
    gulp.watch(paths.scss, ['scss']);
});

gulp.task('watch', ['watchcss']);