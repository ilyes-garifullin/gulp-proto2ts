# gulp-proto2ts
Gulp module for generating TypeScript definitions from Protocol Buffers models 

# Usage

```
var gulp = require('gulp');
var proto2ts = require('gulp-proto2ts')

gulp.task('build-proto, buildProto)

function buildProto(){
	return gulp.src('source/proto/**/*.proto')
		.pipe(proto2ts())
		.pipe(gulp.dest('.temp/typings'))
}
```
