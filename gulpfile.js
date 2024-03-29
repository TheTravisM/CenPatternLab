/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GULP
 * The gulp wrapper around patternlab-node core, providing tasks to interact with the core library.
******************************************************/
const gulp = require('gulp');
const sass = require('gulp-sass');
const argv = require('minimist')(process.argv.slice(2));

/******************************************************
 * PATTERN LAB  NODE WRAPPER TASKS with core library
******************************************************/
const config = require('./patternlab-config.json');
const patternlab = require('@pattern-lab/patternlab-node')(config);

function build() {
  return patternlab.build({
    watch: argv.watch,
    cleanPublic: config.cleanPublic
  }).then(() =>{
    // do something else when this promise resolves
  });
}

function serve() {
  return patternlab.serve({
    cleanPublic: config.cleanPublic
  }
).then(() => {
  // do something else when this promise resolves
  });
}

gulp.task('sass', function(){
  gulp.src('./source/css/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./source/css'));

    // Modular Static
    gulp.src('./source/css/modular-css/**/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./source/css/modular-css'));
});

gulp.task('sass:watch',function(){
  gulp.watch('./source/css/scss/**/*.scss',['sass']);
});

gulp.task('patternlab:version', function () {
  patternlab.version();
});

gulp.task('patternlab:help', function () {
  patternlab.help();
});

gulp.task('patternlab:patternsonly', function () {
  patternlab.patternsonly(config.cleanPublic);
});

gulp.task('patternlab:liststarterkits', function () {
  patternlab.liststarterkits();
});

gulp.task('patternlab:loadstarterkit', function () {
  patternlab.loadstarterkit(argv.kit, argv.clean);
});

gulp.task('patternlab:build', function () {
  build().then(() => {
    // do something else when this promise resolves
  });
});

gulp.task('patternlab:serve', function () {

  gulp.watch('./source/css/scss/**/*.scss',['sass']);

  serve().then(() => {
    // do something else when this promise resolves

  });
});

gulp.task('patternlab:installplugin', function () {
  patternlab.installplugin(argv.plugin);
});

gulp.task('default', ['patternlab:help']);

