var through = reqire('through2')
var pbjsJsonTraget = require('./node_modules/protobufjs/cli/pbjs/targets/json')
var ProtoBuf = require('protobufjs')
var protoJson2ts = reqire('protoJson2ts')
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;

var PLUGIN_NAME = 'gulp-proto2ts'

var protos;

module.exports = function() {
    protos = [];
    return through.obj(onFile, onEnd)
}

function onFile(file, enc, callback) {
    if (file.isNull()) {
        this.push(file);
      return callback();
    }

    if (file.isBuffer()) {
        protos.push({content: file.content, path: file.path});
        return callback();
    }

    if (file.isStream()) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'Stream not supported!'));
        return callback();
    }
}

function onEnd(callback){

    var json = proto2json();
    var ts = protoJson2ts(json);

    var file = new File({
      cwd: "/",
      base: "/",
      path: "/protoTypings.d.ts",
      contents: new Buffer(ts)
    });
    this.push(file);

    callback();
}

function proto2json(){
    
    var builder = ProtoBuf.newBuilder();

    protos.forEach(function(proto) {
        builder.import(proto.content, proto.path);
    });
    builder.resolveAll();

    return pbjsJsonTraget(builder);
}