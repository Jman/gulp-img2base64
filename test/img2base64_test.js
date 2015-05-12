'use strict';

var fs = require('fs');

exports.img2base64 = {
  setUp: function(done) {
    done();
  },
  main : function(test) {
    test.expect(1);

    var actual = fs.readFileSync('tmp/main.css').toString();
    var expected = fs.readFileSync('test/expected/main.css').toString();
    test.equal(actual, expected, 'Generated file needs to be equal');

    test.done();
  },
  empty : function(test) {
    test.expect(1);

    var actual = fs.readFileSync('tmp/empty.css').toString();
    var expected = fs.readFileSync('test/expected/empty.css').toString();
    test.equal(actual, expected, 'Generated file needs to be equal');

    test.done();
  },
  prefix : function(test) {
    test.expect(1);

    var actual = fs.readFileSync('tmp/prefix.css').toString();
    var expected = fs.readFileSync('test/expected/prefix.css').toString();
    test.equal(actual, expected, 'Generated file needs to be equal');

    test.done();
  },
  postfix : function(test) {
    test.expect(1);

    var actual = fs.readFileSync('tmp/postfix.css').toString();
    var expected = fs.readFileSync('test/expected/postfix.css').toString();
    test.equal(actual, expected, 'Generated file needs to be equal');

    test.done();
  }
};
