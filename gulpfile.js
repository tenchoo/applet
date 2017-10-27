const gulp = require("gulp");
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const less = require('gulp-less');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('autoprefixer');
const uglify = require('gulp-uglify');
const babel = require("gulp-babel");
const clean = require('gulp-clean');

gulp.task('watch', function () {
  gulp.watch('src/**', ['style', 'js', 'img', 'carry']);
});

gulp.task('js', function () {
  gulp
    .src(['src/app.js', 'src/common/js/**/*.js','src/config/**/*.js','src/common/template/*.js', 'src/pages/**/*.js'], {base: 'src'})
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('img', function () {
  gulp
    .src(['src/img/**/*'], {base: 'src'})
    .pipe(gulp.dest('dist'));
});


gulp.task('style', function () {
  gulp
    .src(['src/app.wxss', 'src/common/style/**/*.wxss', 'src/pages/**/*.wxss'], {base: 'src'})
    .pipe(less())
    .pipe(postcss([autoprefixer(['iOS >= 8', 'Android >= 4.1'])]))
    .pipe(
      cssnano({
        zindex: false,
        autoprefixer: false,
        discardComments: {removeAll: true}
      })
    )
    .pipe(
      rename(function (path) {
        path.extname = '.wxss';
      })
    )
    .pipe(gulp.dest('dist'));
});

gulp.task('carry', function () {
  gulp
    .src(
      [
        'src/app.json',
        'src/pages/**/*.wxml',
        'src/pages/**/*.json',
        'src/lib/**/*',
        'src/utils/**',
        'src/common/template/*.wxml'
      ],
      {base: 'src'}
    )
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return gulp.src('dist/', {reload: false})
    .pipe(clean());
});

gulp.task('default', ['watch', 'style', 'js', 'img', 'carry']);
