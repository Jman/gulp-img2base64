# gulp-img2base64

> Encode images to base64 and generate stylesheet file, ported from [grunt-img2base64](https://github.com/Jman/grunt-img2base64) plugin

## Getting Started

```shell
npm install gulp-img2base64 --save-dev
```


## The "img2base64" task

### Overview
In your project's Gruntfile, add a section named `img2base64` to the data object passed into `grunt.initConfig()`.

```js
var img2base64 = require('./index');

gulp.task('img2base64', function(){
  return gulp.src('source/folder/with/images/*')
    .pipe(img2base64(options))
    .pipe(gulp.dest('destination/folder/to/save/css/file/'))
});
```

### Options

#### options.filename
Type: `String`
Default value: `'icons.css'`

Stylesheet filename to create

#### options.prefix
Type: `String`
Default value: `'.'`

Prefix for selector

#### options.postfix
Type: `String`
Default value: `''`

Postfix for selector


### Usage Examples

#### Default Options
The generated result will be file `icons.css` 
contains rules like `.filename { background-image:url(base64Url); width:imgWidth; height:imgHeight; }`

```js
gulp.src('./src/img/icons/*')
  .pipe(img2base64())
  .pipe(gulp.dest('./dest/css/'));
```

#### Define custom prefix and postfix
The generated result will be file `icons.css` 
contains rules like `.icon-filename span { background-image:url(base64Url); width:imgWidth; height:imgHeight; }`

```js
gulp.src('./src/img/icons/*')
  .pipe(img2base64({
    prefix: '.icon-',
    postfix: ' span'
   }))
  .pipe(gulp.dest('./dest/css/'));
```

## Release History

#### 0.0.1
  * port [grunt-img2base64](https://github.com/Jman/grunt-img2base64) plugin
