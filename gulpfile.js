let gulp = require('gulp');
let sass = require('gulp-sass');
let csso = require('gulp-csso');

const rename = require('gulp-rename');

function watchFiles() {
	gulp.watch('scss/*.scss', css);
}

gulp.task('default', function () {
	watchFiles();
});

function css() {
	return gulp
		.src('scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('css'))
		.pipe(csso())
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest('dist/'));
}
