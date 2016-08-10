var gulp = require('gulp');
var clean = require('gulp-clean'); // Removing files and folders
var cleanCSS = require('gulp-clean-css'); //Minify css with clean-css
var concat = require('gulp-concat'); // Concat/Add all SASS files in one file
var sass = require('gulp-sass'); //Convert SASS to CSS
var order = require('gulp-order'); //Set SASS file Order
var uglify = require('gulp-uglify'); //Minify JS
var htmlmin = require("gulp-htmlmin"); //Minify HTMLs
var connect = require("gulp-connect"); // Runs a local dev server
var open = require("gulp-open"); // Open a URL in a Web browser
var flatten = require('gulp-flatten'); //remove or replace relative path for files
var plumber = require('gulp-plumber'); //Prevent pipe breaking caused by errors from gulp plugins
var svgmin = require('gulp-svgmin'); //minifyed SVG icons
var runSequence = require('run-sequence'); //Run task in order
/*var gnf = require('gulp-npm-files');  Copy dependencies from node_module to your project location*/

var browserify = require('browserify');
//var babel = require('babelify');
var _ = require('underscore');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var ngAnnotate = require('gulp-ng-annotate');


var paths = {
    scss: ['./html/app/scss/**/*.scss'],
    js: './html/js/**/*.js',
    htmlindex: './html/app/index.html',
    html: './html/app/view/*.html',
    htmltemplates: './html/app/view/templates/*.html',
    img: './html/app/img/*.*',
    svg: './html/app/img/icons/*.svg'
};

// If true it allow you to not minify your html, css, js
var debug = false;

/*
gulp.task('copyNpmDependenciesAtDifferentFolder', function() {
  gulp
    .src(gnf(null, './package.json'), {base:'./'})
    .pipe(gulp.dest('./html/app/js/test'));
});
*/

gulp.task("cleanfolder", function () {
    return gulp.src('html/dist', {
            read: false
        })
        .pipe(clean());
});

gulp.task("connect", function () {
    var b = connect.server({
        root: ["HTML/dist"],
        port: 8282,
        base: "http://localhost",
        livereload: true
    });
    return b;
});

gulp.task("open", ["connect"], function () {
    var b = gulp.src("HTML/dist/index.html")
        .pipe(open({
            uri: "http://localhost:8282/#/",
            "app": "chrome"
        }));
    return b;
});

gulp.task('scss', function () {
    var b = gulp.src(paths.scss)
        .pipe(order([
            "variables.scss",
            "common.scss",
            "*.scss"
        ], {
            base: 'HTML/app/scss/'
        }))
        .pipe(concat('app.scss'))
        .pipe(sass().on('error', sass.logError));
    b = b.pipe(concat('app.min.css'));
    if (!debug) {
        b = b.pipe(cleanCSS());
    }
    return b
        .pipe(gulp.dest('./html/dist/css'))
        .pipe(gulp.dest('./html/app/css'));
});

gulp.task('vendors-css', function () {
    var b = gulp.src([
            './node_modules/**/angular-material.min.css',
            './node_modules/**/md-data-table.min.css'
        ])
        .pipe(plumber());
    if (!debug) {
        b = b.pipe(cleanCSS());
    }
    return b
        .pipe(concat('vendors.min.css'))
        .pipe(gulp.dest('./html/dist/css'))
        .pipe(gulp.dest('./html/app/css'));
});


gulp.task('htmlindex', function () {
    var b = gulp.src(paths.htmlindex);
    if (!debug) {
        b = b.pipe(htmlmin({
            collapseWhitespace: true
        }));
    }
    return b
        .pipe(flatten())
        .pipe(gulp.dest('./html/dist'));
});

gulp.task('html', function () {
    var b = gulp.src(paths.html);
    if (!debug) {
        b = b.pipe(htmlmin({
            collapseWhitespace: true
        }));
    }
    return b
        .pipe(flatten())
        .pipe(gulp.dest('./html/dist/view'));
});

gulp.task('htmltemplates', function () {
    var b = gulp.src(paths.htmltemplates);
    if (!debug) {
        b = b.pipe(htmlmin({
            collapseWhitespace: true
        }));
    }
    return b
        .pipe(flatten())
        .pipe(gulp.dest('./html/dist/view/templates'));
});

gulp.task('vendors-js', function () {
    var b = browserify();
    getNPMPackageIds().forEach(function (id) {
        b.require(id);
    });

    b = b.bundle()
        .pipe(source('vendors.min.js'))
        .pipe(buffer());

    if (!debug) {
        b = b.pipe(uglify());
    }
    return b
        .pipe(gulp.dest('./html/dist/js'))
        .pipe(gulp.dest('./html/app/js'));
});

gulp.task('app-js', function () {
    var b = browserify('./html/app/js/app.js');

    getNPMPackageIds().forEach(function (id) {
        b.external(id);
    });

    b = b.transform('babelify', {
            presets: ['es2015']
        })
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(buffer())
        .pipe(ngAnnotate());
    if (!debug) {
        b = b.pipe(uglify());
    }
    return b
        .pipe(gulp.dest('./html/dist/js'))
        .pipe(gulp.dest('./html/app/js'));
});


gulp.task('copyimg', function () {
    var b = gulp.src([paths.img, '!' + paths.svg])
        .pipe(flatten());
    return b.pipe(gulp.dest('./html/dist/img/'));
});

gulp.task('copysvg', function () {
    var b = gulp.src([paths.svg]);
    if (!debug) {
        b = b.pipe(svgmin())
    }
    return b.pipe(flatten())
        .pipe(gulp.dest('./html/dist/img/icons'));
});

/* gulp : Default tasks*/
gulp.task('default', ['scss', 'htmlindex', 'html', 'htmltemplates', 'vendors-css', 'vendors-js', 'app-js', 'copyimg', 'copysvg']);
/* gulp serve : to run the app with server*/

/* First run all default task and then open the server */
gulp.task('build', function (cb) {
  runSequence('cleanfolder', 'default', ['open'], cb)
});

//gulp.task('serve', ['default', 'open']);

gulp.task('watchcss', function () {
    gulp.watch(paths.scss, ['default']);
});

gulp.task('watch', ['watchcss']);

/**
 * Helper functions
 * Get all dependencies from package.json
 */

function getNPMPackageIds() {
    var packageManifest = {};
    try {
        packageManifest = require('./package.json');
    } catch (e) {
        // does not have a package.json manifest
    }
    return _.keys(packageManifest.dependencies) || [];
}