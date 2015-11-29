const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const sequence = require('gulp-sequence');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const path = require('path');
const util = require('gulp-util');
const webpack = require('webpack');
const webpackProdConfig = require('./config/webpack.prod');

const PluginError = util.PluginError;
const buildArtifactsOut = './build-artifacts';
const tsProject = ts.createProject('tsconfig.json');
const sourceMapConfig = {
  debug: true,
  includeContent: false,
  sourceRoot: (file) => { return path.join(path.relative(file.path, path.join(__dirname, '/src/')), '/src/'); },
};


gulp.task('start', sequence('clean', ['transpile', 'static-assets'], 'server:dev'));

gulp.task('start-production', sequence('clean', ['transpile', 'static-assets', 'webpack:prod'], 'server:prod'));

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
    watch: ['out/server/**/*', 'out/shared/**/*'],
    ignore: [
      'out/client/**/*',
      'src/**/*',
    ],
  });
});

gulp.task('test', sequence('clean', 'transpile', 'test:min'));

gulp.task('test:xml', sequence('clean', 'transpile', 'test:junit'));

gulp.task('test:junit', () => {
  return gulp.src(['out/tests/**/*.spec.js'], { read: false })
    .pipe(mocha({
      reporter: 'mocha-junit-reporter',
      reporterOptions: {
        mochaFile: `${buildArtifactsOut}/tests.xml`,
      },
    }));
});

gulp.task('test:min', () => {
  return gulp.src(['out/tests/**/*.spec.js'], { read: false })
    .pipe(mocha({ reporter: 'min' }));
});

gulp.task('transpile', () => {
  const tsOpts =  {
    target: 'es5',
    module: 'commonjs',
    jsx: 'react',
    noEmit: false,
    experimentalDecorators: true,
  };

  return gulp.src([
    'app/**/*.ts',
    'app/**/*.tsx',
    'tests/**/*.ts',
    'tests/**/*.tsx'
  ], { base: './app' })
    .pipe(sourcemaps.init())
    .pipe(ts(tsOpts))
    .pipe(sourcemaps.write('.', sourceMapConfig))
    .pipe(gulp.dest('out'));
});

gulp.task('static-assets', () => {
  return gulp.src(['app/server/index.html', 'app/server/favicon.ico'])
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
