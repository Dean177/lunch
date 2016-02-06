const babel = require('gulp-babel');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const path = require('path');

const sourceMapConfig = {
  debug: true,
  includeContent: false,
  sourceRoot: (file) => (path.join(path.relative(file.path, path.join(__dirname, 'src')), 'src')),
};

gulp.task('server:prod', () => {
  nodemon({
    env: {
      NODE_ENV: JSON.stringify('production'),
      DEBUG: 'lunch:*',
    },
    script: 'out/server/index.js',
    verbose: false,
    ignore: ['*'],
    watch: ['noop/'],
    ext: 'noop',
  });
});

gulp.task('server:dev', () => {
  nodemon({
    env: {
      NODE_ENV: JSON.stringify('development'),
      DEBUG: 'lunch:*',
    },
    delay: 10,
    script: 'out/server/index.js',
    ext: 'js',
    verbose: false,
    ignore: ['*'],
    watch: ['out/server/**/*', 'out/shared/**/*'],
  });
});

gulp.task('build:server', () => {
  return gulp.src([
    'src/server/**/*.js',
    'src/shared/**/*.js',
    'src/tests/**/*.js',
  ], { base: './src' })
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.', sourceMapConfig))
    .pipe(gulp.dest('out'));
});
