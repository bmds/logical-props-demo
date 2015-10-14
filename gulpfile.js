'use strict';

'use strict';

var gulp         = require('gulp');

// General dependencies
var sourcemaps   = require('gulp-sourcemaps');
var gutil        = require('gulp-util');
var rename       = require('gulp-rename');
var connect      = require('gulp-connect');

// css dependencies
var postcss      = require('gulp-postcss');
var sass         = require('gulp-sass');
var logicalProps = require('postcss-logical-props');

var projectPaths  = require('./FEConfig/paths.json');
var projectConfig = require(__dirname + '/FEConfig/project.js').getConfig(projectPaths);


function processCss(mode) {
	gulp.src(projectConfig.source.styles + 'main.scss')
		.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(postcss([
				logicalProps({
					dir: mode
				})
			]))
			.pipe(rename(function (path) {
				path.basename += '.' + mode;
			}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(projectConfig.build.styles));

}

gulp.task('css', function () {
	gutil.log(gutil.colors.green('CSS...'));
	processCss('ltr');
	processCss('rtl');
});

gulp.task('connect', function() {
	connect.server({
		port: 8888,
		root: projectConfig.build.root
	});
});

gulp.task('watch', function () {
	gulp.watch([
		projectConfig.source.styles  +  '/includes/*.scss',
		projectConfig.source.styles  +  '/src/*.scss',
		projectConfig.source.styles  +  '/main.scss'
	], ['css']);
	gutil.log(gutil.colors.green('WATCHING...'));
});

gulp.task('default', ['connect', 'css', 'watch'], function(){
	gutil.log(gutil.colors.green('DEFAULT TASK FINISHED...'));
});
