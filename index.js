var through = require('through2')
var fs = require('fs')
var path = require('path')
var gutil = require('gulp-util')
var protobufjs = require('protobufjs')
var protoJson2ts = require('protoJson2ts')
var pbjsJsonTragetPath = findPbjsJsonTragetPath()
var pbjsJsonTraget = require(pbjsJsonTragetPath)
var PluginError = gutil.PluginError
var File = gutil.File

var PLUGIN_NAME = 'gulp-proto2ts'

var protos;

module.exports = function() {
    protos = [];
    return through.obj(onFile, onEnd)
}

function onFile(file, enc, callback) {
    if (file.isNull()) {
      return callback();
    }
    if (file.isBuffer()) {
        protos.push({content: file._contents.toString('utf8'), path: file.path});
        return callback();
    }

    if (file.isStream()) {
        this.emit('error', new PluginError(PLUGIN_NAME, 'Stream not supported!'));
        return callback();
    }
}

function onEnd(callback){

    var jsonStr = proto2json();
    var _this = this;
    protoJson2ts(jsonStr, function(ts, json){

        var file = new File({
          cwd: "/",
          base: "/",
          path: "/proto.ts",
          contents: new Buffer(ts)
        });
        _this.push(file);

        callback();
    });
}

function proto2json(){
    
    var builder = protobufjs.newBuilder();

    protos.forEach(function(proto) {
        var parser = new protobufjs.DotProto.Parser(proto.content);
        var data = parser.parse();
        builder.import(data, proto.path);
    });
    builder.resolveAll();

    return pbjsJsonTraget(builder);
}

function findPbjsJsonTragetPath() {
    var prptpbufjsPath = path.join(__dirname, './node_modules/protobufjs/');
    if(fs.existsSync(prptpbufjsPath))
        return './node_modules/protobufjs/cli/pbjs/targets/json';

    prptpbufjsPath = path.join(__dirname, '../protobufjs/');
    if(fs.existsSync(prptpbufjsPath))
        return '../protobufjs/cli/pbjs/targets/json';
    
    throw new Error('protobufjs not found') 
}
