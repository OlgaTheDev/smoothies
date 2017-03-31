'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create(),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer');


//for changing environment: NODE_ENV=production gulp
var env = process.env.NODE_ENV || 'development';

gulp.task('sass', function () {
    var config = {};

    // if (env === 'development') {
    //     config.sourceComments = 'map';
    // }

    if (env === 'production') {
        config.outputStyle = 'compressed';
    }

    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass(config).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
});

gulp.task('pug', function () {
    return gulp.src('./src/views/index.pug')
        .pipe(pug({
            'pretty': true
        }))
        .pipe(gulp.dest('./dist'))
});

gulp.task('js', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('img', function(){
    gulp.src('./src/images/*.{png,jpg,jpeg,gif,webp,svg}')
        .pipe(gulpif(env === 'production', imagemin()))
        .pipe(gulp.dest('./dist/images'))
});

gulp.task('browser-sync', ['sass','pug', 'js'], function() {
    browserSync.init({
        startPath:'./dist',
        server:{
            baseDir: './'
        },
        directory: true
    });
});

gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/views/**/*.pug', ['pug']);
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch('./dist/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'img', 'browser-sync']);
