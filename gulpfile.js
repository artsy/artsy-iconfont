var fs = require('fs');
var del = require('del');
var path = require('path');
var glob = require('glob');
var gulp = require('gulp');
var rename = require('gulp-rename');
var gulpicon = require('gulpicon/tasks/gulpicon');
var svgmin = require('gulp-svgmin');

var colors = [
  'white',
  'purple'
];

var namedColors = { purple: "#6a0bc1" };

gulp.task('clean', function(done) {
  del(['output/**/*'], done);
});

gulp.task('optimize', ['clean'], function() {
  return gulp.src('svg/*.svg')
    .pipe(svgmin({ plugins: [{ removeDimensions: true }]}))
    .pipe(gulp.dest('output/svg'));
});

gulp.task('temp', ['optimize'], function() {
  return gulp.src('output/svg/*.svg')
    .pipe(rename(function(path) {
      path.basename = path.basename + '.colors-' + colors.join('-');
    }))
    .pipe(gulp.dest('output/tmp'));
});

gulp.task('build', ['temp'], function(done) {
  var files = glob.sync('output/tmp/*.svg');

  gulpicon(files, {
    dest: 'output',
    datasvgcss: "icons.data.svg.css",
    datapngcss: "icons.data.png.css",
    urlpngcss: "icons.fallback.css",
    previewhtml: "preview.html",
    enhanceSVG: false,
    corsEmbed: false,
    pngfolder: "png",
    cssprefix: ".icon-",
    defaultWidth: "32px",
    defaultHeight: "32px",
    colors: namedColors,
    dynamicColorOnly: false,
    previewTemplate: path.join(__dirname, 'preview.hbs')
  })(done);
});

gulp.task('json', ['build'], function(done) {
  var files = glob.sync('output/svg/*.svg');
  var svgs = files.reduce(function(memo, path) {
    var filename = path.split('/').pop();
    memo[filename.replace('.svg', '')] = filename;
    return memo;
  }, {});
  var out = path.join(__dirname, 'output/icons.json');
  var output = JSON.stringify(svgs, null, 4);
  fs.writeFile(out, output, done);
});

gulp.task('default', ['json'], function(done) {
  del(['output/tmp'], done);
});
