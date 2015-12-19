const babel = require('gulp-babel');
const del = require('del');
const gulp = require('gulp');
const util = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const webpack = require('webpack');
const path = require('path');
const PluginError = util.PluginError;

const webpackProdConfig = require('./webpack.config.prod.js');

const sourceMapConfig = {
  debug: true,
  includeContent: false,
  sourceRoot: (file) => (path.join(path.relative(file.path, path.join(__dirname, 'src')), 'src')),
};

gulp.task('server:prod', () => {
  nodemon({
    env: {
      'NODE_ENV': JSON.stringify('production'),
      'DEBUG': 'lunch:*',
    },
    script: 'out/server/index.js',
    verbose: false,
    ignore: ['*'],
  });
});

gulp.task('server:dev', () => {
  nodemon({
    env: {
      'NODE_ENV': JSON.stringify('development'),
      'DEBUG': 'lunch:*',
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

gulp.task('static-assets', () => {
  return gulp.src(['src/server/index.html', 'src/server/favicon.ico'])
    .pipe(gulp.dest('out/server'));
});

gulp.task('webpack:prod', (done) => {
  webpack(webpackProdConfig, (err, stats) => {
    if (err) throw new PluginError('webpack', err);
    util.log('[webpack]', stats.toString());
    done();
  });
});

gulp.task('clean', () => del(['out/**', 'build-artifacts']));
