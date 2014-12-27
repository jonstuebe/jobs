var gulp = require('gulp'),
	notify = require('gulp-notify'),
	minifyCSS = require('gulp-minify-css'),
	changed = require('gulp-changed'),
	rename = require("gulp-rename"),
	sourcemaps   = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	bourbon = require('node-bourbon'),
	neat = require('node-neat'),
    refills = require('node-refills'),
    mainBowerFiles = require('main-bower-files'),
    bowerNormalizer = require('gulp-bower-normalize'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    gulpFilter = require('gulp-filter'),
    minifyCSS = require('gulp-minify-css'),
    gutil = require('gulp-util');

var paths = {
	scripts: './assets/js/**/*.js',
	styles: './assets/sass/**/*.scss',
	output: {
		styles: './assets/css'
	}
}

gulp.task('bower', function(){

    del([
        'assets/vendor/**'
    ], function(){

        gulp.src(mainBowerFiles(), { base: 'bower_components' })
            .pipe(bowerNormalizer({ bowerJson: './bower.json' }))
            .pipe(gulp.dest('./assets/vendor'));

    });

});

gulp.task('bower:prod', function(){

    del([
        'assets/vendor/**'
    ], function(){

        var jsFilter = gulpFilter('**/*.js'),
            cssFilter = gulpFilter('**/*.css');

        gulp.src(mainBowerFiles(), { base: 'bower_components' })
            .pipe(bowerNormalizer({ bowerJson: './bower.json' }))
            .pipe(jsFilter)
            .pipe(uglify())
            .pipe(jsFilter.restore())
            .pipe(cssFilter)
            .pipe(minifyCSS())
            .pipe(cssFilter.restore())
            .pipe(gulp.dest('./assets/vendor'));            

    });

});

gulp.task('styles.prod', function(){

	gulp.src(paths.styles)
    	.pipe(changed(paths.output.styles, { extension: '.css' }))
    	.pipe(sass({
    		includePaths: refills.includePaths,
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(minifyCSS({
        	keepSpecialComments: 0
        }))
        .pipe(rename({
        	extname: '.min.css'
        }))
        .pipe(notify("production sass compiled"))
        .pipe(gulp.dest(paths.output.styles));

});

gulp.task('styles', function()
{
    gulp.src(paths.styles)
    	.pipe(changed(paths.output.styles, { extension: '.css' }))
    	.pipe(sourcemaps.init())
    	.pipe(sass({
    		includePaths: refills.includePaths,
    		sourceMap: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(notify("sass compiled"))
        .pipe(gulp.dest(paths.output.styles));
});

gulp.task('watch', function()
{
	gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['bower', 'styles', 'watch']);
gulp.task('prod', ['styles.prod']);