var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    include = require('gulp-file-include'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    package = require('./package.json');

var cssWatchPath = 'src/scss/*.scss',
    cssInputPath = 'src/scss/style.scss',
    cssOutputPath = 'app/assets/css',
    jsWatchPath = 'src/js/*.js',
    jsInputPath = 'src/js/scripts.js',
    jsOutputPath = 'app/assets/js',
    htmlWatchPath = 'src/*.html',
    htmlFolderWatchPath = 'src/*/*.html',
    htmlInputPath = ['src/*.html'],
    htmlOuputPath = 'app/';

var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

gulp.task('html', function() {
  gulp.src(htmlInputPath)
    .pipe(include({
      prefix: '@@@',
      basepath: '@file'
    }))

    .pipe(gulp.dest(htmlOuputPath))
    .pipe(browserSync.stream());
});

gulp.task('css', function () {
   return gulp.src(cssInputPath)

    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer('last 4 version'))
    .pipe(header(banner, { package : package })) // package.json에 있는 프로젝트 정보를 .min 파일 상단에 주석으로 넣어줌
    .pipe(gulp.dest(cssOutputPath))

    .pipe(cssnano()) // 압축해
    .pipe(rename({ suffix: '.min' })) // 뒤에 .min 이름 붙여
    .pipe(gulp.dest(cssOutputPath))

    .pipe(browserSync.stream());
});

gulp.task('js',function(){
  gulp.src(jsInputPath)

    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest(jsOutputPath))

    .pipe(uglify()) // 압축해
    .pipe(header(banner, { package : package }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(jsOutputPath))

    .pipe(browserSync.stream());
});

gulp.task('css-watch', ['css'], reload);
gulp.task('js-watch', ['js'], reload);
gulp.task('html-watch', ['html'], reload);

gulp.task('default', ['css', 'js', 'html'], function () {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    });
    gulp.watch(htmlFolderWatchPath, ['html-watch']);
    gulp.watch(htmlWatchPath, ['html-watch']);
    gulp.watch(cssWatchPath, ['css-watch']);
    gulp.watch(jsWatchPath, ['js-watch']);
});
