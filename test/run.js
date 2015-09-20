var proto2ts = require('../index')
var gulp = require('gulp')

gulp.src('./test/proto/**/*.proto')
	.pipe(proto2ts())
	.pipe(gulp.dest('./test/ts'))