const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyjs');
const rename = require('gulp-rename');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const sprite = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
const csso = require('gulp-csso');
const sassLint = require('gulp-sass-lint');
const headhesive = require('headhesive');

// gulp.task('headhesive', function () {
//   return gulp.src('node_modules/headhesive/dist/headhesive.js')
//     .pipe(gulp.dest('app/libs'))
// })

// gulp.task('sass-lint', function () {
//   return gulp.src('sass/**/*.s+(a|c)ss')
//     .pipe(sassLint({
//       options: {
//         formatter: 'stylish',
//         'merge-default-rules': false
//       },
//       files: {
//         include: 'app/sass**/*+s(a|c)ss',
//         ignore: ''},
//       rules: {
//         'no-ids': 1,pamp
//         'no-mergeable-selectors': 0
//       },
//       configFile: '.sass-lint.yml'
//     }))
//     .pipe(sassLint.format())
//     .pipe(sassLint.failOnError())
//  });
gulp.task('jquery', function () {
  return gulp.src(['node_modules/jquery/dist/jquery.slim.js', 'node_modules/jquery-validation/dist/jquery.validate.js,' +
  'node_modules/owl-carousel-2/owl.carousel.min.js'])
    .pipe(gulp.dest('app/libs'))
});
gulp.task('clean', function() {
  return del.sync('app/fonts/*/')
});

gulp.task('imagemin', function() {
  gulp.src('app/img/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function() {
  return gulp.src('..app/libs/open-sans-fontface/fonts/**/*.+(eot|svg|ttf|woff|woff2)')
    .pipe(gulp.dest('..app/fonts/OpenSans'))
});

gulp.task('sprite', function() {

  var spriteData = gulp.src('app/img/icons/**/*.png')
    .pipe(sprite({
      imgName: 'icons.png',
      cssName: 'icons.sass',
      algorithm: 'top-down',
      padding: 20
    }));
  spriteData.img
    .pipe(buffer())
    .pipe(gulp.dest('app/img/'));
  spriteData.css
    .pipe(gulp.dest('app/sass/'));

});


gulp.task('sass', function() {
  return gulp.src(['!app/sass/bg.sass',
      '!app/sass/buttons.sass',
      '!app/sass/icons.sass',
      '!app/sass/fonts.scss',
      '!app/sass/libs.sass',
      '!app/sass/meadia-query.scss',
      'app/sass/**/*.+(sass|scss)/'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 50 versions', '> 1%', 'ie 6', 'ie 7', 'ie 8' ], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('sass-libs', function() {
  return gulp.src('app/sass/libs.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/css/'))
    .pipe(browserSync.reload({ stream: true }))
});


gulp.task('scripts', function() {
  return gulp.src(['node_modules/jquery/dist/jquery.slim.js',
      'node_modules/jquery-validation/dist/jquery.validate.js',
      'node_modules/owl-carousel-2/owl.carousel.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('pug', function() {
  return gulp.src(['!app/views/**/_*.pug', 'app/views/**/index.pug', 'app/views/**/index_inner.pug'])
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.reload({ stream: true }))

});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app',
      scrollProportionally: false,
      notify: false
    }
  })
});



gulp.task('watch', ['sass', 'sass-libs', 'pug', 'scripts', 'browserSync'], function() {
  gulp.watch('app/libs/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss', ['sass-libs'], browserSync.reload);
  gulp.watch('app/sass/**/*.+(sass|scss)', ['sass', 'sass-libs'], browserSync.reload);
  gulp.watch('app/**/*.pug', ['pug']);
  gulp.watch('app/**/*.html', browserSync.reload);
  gulp.watch('app/css/**/*.css', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/libs/**/*+(sass|scss)', browserSync.reload);
  gulp.watch('browserSync', ['sass', 'sass-libs', 'pug', 'scripts']);
});

gulp.task('clean', function() {
  return del.sync('dist');
});


gulp.task('build', ['clean', 'sass', 'scripts'], function() {
  var buildCss = gulp.src(['app/css/main.css', 'app/css/libs.css'])
    .pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  var builsJs = gulp.src(['app/js/**/*'])
    .pipe(gulp.dest('dist/js'));

  var builsJs = gulp.src(['app/img/**/*'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
    .pipe(gulp.dest('dist/img'));

  // var builPug = gulp.src('app/views/**/*')
  //   .pipe(gulp.dest('dist/views'));

  var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});
