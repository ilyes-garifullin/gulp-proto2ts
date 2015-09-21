# gulp-proto2ts
Gulp module for generating TypeScript definitions from Protocol Buffers models 

# Install
```
// TODO: npm install gulp-proto2ts -save-dev
npm install https://github.com/ilyes-garifullin/gulp-proto2ts.git -save-dev
```
# Usage
```
var gulp = require('gulp');
var proto2ts = require('gulp-proto2ts')

gulp.task('build-proto', buildProto)

function buildProto(){
	return gulp.src('source/proto/**/*.proto')
		.pipe(proto2ts())
		.pipe(gulp.dest('.temp/typings/proto'))
}
```
