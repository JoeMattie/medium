'use strict';

var gulp 		 = require('gulp');
// var browserSync  = require('browser-sync');
var nodemon      = require('gulp-nodemon'); 
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var riot         = require('riot');
var fs 			 = require('fs');
var source 		 = require('vinyl-source-stream');
var vinylBuffer  = require('vinyl-buffer');
// var reload		 = browserSync.reload;

var dest = './public',
     src = './src';

gulp.task('sass', function () {
	setTimeout(function(){
		return gulp.src(src + '/scss/*.scss')
	        .pipe(sourcemaps.init())
	        .pipe(sass())
	        .pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
	        .pipe(sourcemaps.write('./maps'))
	        .pipe(gulp.dest(dest + '/css'));
	        // .pipe(reload({stream:true}));
	}, 500);
});

gulp.task('fonts', function() {
  return gulp.src(dest + '/lib/materialize/font/**/*.{ttf,woff,eof,eot,svg}')
    .pipe(gulp.dest(dest + '/font'));
});

gulp.task('riot', function() {
	setTimeout(function(){
	fs.readFile(src + '/tag/medium.tag', 'utf8', function (err, data) { 
		if (err) throw err; 
		var tagdata = riot.compile(data, {compact:true});
	    var stream = source('medium.js');
	    stream.write(tagdata);

	    process.nextTick(function() { stream.end(); });
	    return stream.pipe(vinylBuffer()).pipe(gulp.dest(dest + '/js/'))
	    		// .pipe(reload({stream:true}));
  	});
	}, 500);
});

gulp.task('nodemon', function () { nodemon({ script: 'app.js', ignore: ['gulpfile.js', 'public/*', 'src/*', 'views/*'] }) });

// gulp.task('browser-sync', ['nodemon'], function() { 
// 	browserSync.init({
// 		  proxy: "http://localhost:8000",
// 		  files: ["./public/**/*.*"],
// 		  // files: [dest+'/css/*.css', dest+'/js/*.js','/views/*.jade'],
// 		  port: 3000		
// 		}); 
// });

gulp.task('default', ['sass', 'fonts', 'riot', 'nodemon'], function() {
	gulp.watch(src + '/scss/**/*.*',  ['sass']);
  	gulp.watch(src + '/tag/medium.tag', ['riot']);
  	// gulp.watch('views/*.jade', function() { reload({stream:true});});
});







