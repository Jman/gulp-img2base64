var gulp = require('gulp'),
    img2base64 = require('./index'),
    del = require('del'),
    runSequence = require('run-sequence'),
    nodeunit = require('gulp-nodeunit');

gulp.task('img2base64-empty', function(){
  return gulp.src('./test/fixtures/*')
    .pipe(img2base64({filename:'empty.css'}))
    .pipe(gulp.dest('./tmp/'))
});
gulp.task('img2base64-prefix',function(){
  return gulp.src('./test/fixtures/*')
    .pipe(img2base64({filename:'prefix.css', prefix:'.icon-'}))
    .pipe(gulp.dest('./tmp/'));
});
gulp.task('img2base64-postfix', function(){
  return gulp.src('./test/fixtures/*')
    .pipe(img2base64({filename:'postfix.css', postfix:' span'}))
    .pipe(gulp.dest('./tmp/'));
});
gulp.task('img2base64-main', function(){
  return gulp.src('./test/fixtures/*')
    .pipe(img2base64({filename:'main.css', prefix:'.icon-', postfix:' span', use_quotes: false}))
    .pipe(gulp.dest('./tmp/'));
});

gulp.task('prepare', function(cb){
  del(['./tmp/'], function(){
    runSequence(['img2base64-empty', 'img2base64-prefix', 'img2base64-postfix', 'img2base64-main'], cb);
  });
});

gulp.task('default', ['prepare'], function() {
  gulp.src('./test/img2base64_test.js').pipe(nodeunit());
});
