var gulp = require('gulp'),
browserSync = require('browser-sync').create(),
sass = require('gulp-sass'),
uglify = require('gulp-uglify'),
autoprefixer = require('gulp-autoprefixer'),
concatCss = require('gulp-concat-css'),
concat = require('gulp-concat');

//serve
gulp.task('serve', function () {
	browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});
// libs-js
gulp.task('libs-js', function () {
	gulp.src(['./node_modules/angular/angular.min.js',
			'./node_modules/angular-ui-router/release/angular-ui-router.min.js',
			'./node_modules/jquery/dist/jquery.min.js'])
	.pipe(gulp.dest('./build/js/libs'))
	.pipe(browserSync.stream());
});

// concat-app
gulp.task('concat-app', function() {
	return gulp.src('src/**/*.js')
	.pipe(concat('app.js'))
	// .pipe(uglify())
	.pipe(gulp.dest('./build/js'))
	.pipe(browserSync.stream());
});

// concat-css-libs
gulp.task('concat-css', function () {
  return gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest('build/css'))
	.pipe(browserSync.stream());
});

// html
gulp.task('html', function () {
	gulp.src('src/app/templates/**/*.html')
	.pipe(gulp.dest('./build/templates'))
	.pipe(browserSync.stream());
});

// main-html
gulp.task('main', function(){
	gulp.src('src/index.html')
	.pipe(gulp.dest('./build'))
	.pipe(browserSync.stream());
});

// sass
gulp.task('sass', function () {
	gulp.src('src/scss/main.scss')
	.pipe(sass({outputStyle: 'compressed' }).on('error', sass.logError))
	.pipe(autoprefixer('last 5 versions'))
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.stream());
});

// images
gulp.task('img', function () {
	gulp.src('./src/scss/img/*.*')
	.pipe(gulp.dest('./build/css/img'))
	.pipe(browserSync.stream());
});
// json
gulp.task('json', function () {
	gulp.src('./src/app/*.json')
	.pipe(gulp.dest('./build/js'))
	.pipe(browserSync.stream());
});
//watch
gulp.task('watch', function () {
	gulp.watch('src/app/**/**/*.js',['concat-app']).on('change', browserSync.reload);
	gulp.watch('src/scss/img',['img']).on('change', browserSync.reload);
	gulp.watch('src/app/templates/**/*.html', ['html']).on('change', browserSync.reload);
	gulp.watch('src/index.html',['main']).on('change', browserSync.reload);
	gulp.watch('src/scss/**/*.scss',['sass']).on('change', browserSync.reload);
});

gulp.task('default',
	['watch',
	'serve',
	'libs-js',
	'json',
	'main',
	'html',
	'sass',
	'concat-app',
	'concat-css',
	'img']);