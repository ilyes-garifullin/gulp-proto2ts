var through = reqire('through2')
var proto2ts = reqire('proto2ts')
var PluginError = require('gulp-util').PluginError;

var PLUGIN_NAME = 'gulp-proto2ts'

module.exports = function() {
    return through.obj(function (file, enc, callback) {
        if (file.isNull()) {
            this.push(file); // Do nothing if no contents
          return callback();
        }

        if (file.isBuffer()) {
            file.content = proto2ts(file.content);

            return callback();
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Stream not supported!'));
            return callback();
        }
    })
}