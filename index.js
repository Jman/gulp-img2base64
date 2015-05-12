/*
 * gulp-img2base64
 * https://github.com/jman/grunt-img2base64
 *
 * Copyright (c) 2015 Eugene Tereschenko
 * Licensed under the MIT license.
 */

'use strict';

var gutil = require('gulp-util'),
    path = require('path'),
    fs = require('fs'),
    through = require('through2'),
    imgSize = require('image-size'),
    _ = require('lodash'),
    PluginError = gutil.PluginError,
    File = gutil.File,
    template = fs.readFileSync(path.resolve(__dirname, 'lib/template.ejs')).toString(),
    types = {
      'svg' : 'svg+xml',
      'jpeg' : 'jpeg',
      'jpg' : 'jpeg',
      'gif' : 'gif',
      'png': 'png'
    };

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
template = _.template(template);

module.exports = function(options) {

  var content = [];

  var opt = _.extend({
    filename: 'icons.css',
    prefix : '.',
    postfix : ''
  }, options);

  var img2base64 = function(file, enc, callback) {

    if (file.isNull()) {
      return callback(null, file);
    }

    // dont do streams (yet)
    if (file.isStream()) {
      this.emit('error', new PluginError('gulp-img2base64',  'Streaming not supported'));
      return callback(null, file);
    }

    if (file.isBuffer()) {
      var ext = path.extname(file.path).toLowerCase().substr(1),
          dimensions = imgSize(file.contents);
      content.push(template({
          prefix : opt.prefix,
          class_name : path.basename(file.path, path.extname(file.path)),
          postfix : opt.postfix,
          base64 : file.contents.toString('base64'),
          width: dimensions.width,
          height: dimensions.height,
          type : types[ext]
      }));
      callback();
    }
  };

  var endStream = function(callback){
    var file = new File();
    file.path = opt.filename;
    file.contents = new Buffer(content.join('\n'));
    this.push(file);
    callback();
  };

  return through.obj(img2base64, endStream);

};
