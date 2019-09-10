/*global require*/
"use strict";
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');

const prettier = require('gulp-prettier');

var paths = {
    public: './public/',
    images: './public/images',
    sass: './src/sass/',
    css: './public/css/',

};

gulp.task('assets', function () {
    return gulp.src('./src/images/*')
        .pipe(gulp.dest(paths.images));
});

gulp.task('js', function () {
    return gulp.src('./src/**/*.js*')
        .pipe(gulp.dest(paths.public))
        .pipe(prettier({ singleQuote: true }))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('html', function () {
    return gulp.src('./src/*.html*')
        .pipe(gulp.dest(paths.public))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('scss', function () {
    return gulp.src(paths.sass + '*.scss')
        .pipe(sass({
            includePaths: [paths.sass],
            outputStyle: 'compressed'
        }))
        .on('error', sass.logError)
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', function () {
    gulp.watch(paths.sass + '**/*.scss', ['scss']);
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('browser-sync', ['html', 'scss', 'assets', 'js'], function () {
    browserSync({
        server: {
            baseDir: paths.public
        },
        notify: false
    });
});

gulp.task('build', ['scss', 'html', 'assets', 'js']);

gulp.task('start', ['browser-sync', 'watch']);