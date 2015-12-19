const babel = require('gulp-babel');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const util = require('gulp-util');
const mocha = require('gulp-mocha');
const sourcemaps = require('gulp-sourcemaps');
const sequence = require('gulp-sequence');
const nodemon = require('gulp-nodemon');
const webpack = require('webpack');
const path = require('path');
const PluginError = util.PluginError;

const webpackProdConfig = require('./webpack.config.prod.js');
const babelConfig = {
  'presets': ['react', 'es2015', 'stage-0'],
  'plugins': ['transform-decorators-legacy'],
};
const buildArtifactsOut = './build-artifacts';
const lintSources = ['src/**/*.js', 'gulpfile.js', 'webpack.config.prod.js'];
const sourceMapConfig = {
  debug: true,
  includeContent: false,
  sourceRoot: (file) => (path.join(path.relative(file.path, path.join(__dirname, 'src')), 'src')),
};

gulp.task('start', sequence('build', 'server:dev'));

gulp.task('start:production', sequence('make', 'server:prod'));

gulp.task('make', sequence('clean', ['build:server', 'static-assets', 'webpack:prod']));

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

gulp.task('test:xml', (done) => {
  return sequence('clean', 'build', 'test:junit', 'lint:file')(done);
});

gulp.task('test', (done) => {
  return sequence('clean', 'build', 'test:spec', 'lint')(done);
});

gulp.task('test:client', (done) => {
  return sequence('build:client', ['test:min', 'lint'])(done);
});

gulp.task('test:server', (done) => {
  return sequence('build:server', ['test:min', 'lint'])(done);
});

gulp.task('test:junit', () => {
  return gulp.src(['out/tests/**/*.spec.js'], { read: false })
    .pipe(mocha({
      reporter: 'mocha-junit-reporter',
      reporterOptions: {
        mochaFile: `${buildArtifactsOut}/tests.xml`,
      },
    }));
});

gulp.task('test:spec', () => {
  return gulp.src(['out/tests/**/*.spec.js'], { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('test:min', () => {
  return gulp.src(['out/tests/**/*.spec.js'], { read: false })
    .pipe(mocha({ reporter: 'min' }));
});

gulp.task('watch:client', () => {
  gulp.watch([
    'src/client/**/*.js',
    'src/tests/client/**/*.js'],
    ['test:client']
  );
});

gulp.task('watch:server', () => {
  gulp.watch([
    'src/server/**/*.js',
    'src/shared/**/*.js',
    'src/tests/**/*.js',
  ], ['test:server']);
});

// gulp.task('build', ['static-assets', 'build:client', 'build:server']);
gulp.task('build', ['static-assets', 'build:server']);

gulp.task('build:client', () => {
  return gulp.src(['src/tests/**/*.js'], { base: './src' })
    .pipe(sourcemaps.init())
    .pipe(babel(babelConfig))
    .pipe(sourcemaps.write('.', sourceMapConfig))
    .pipe(gulp.dest('out'));
});

gulp.task('build:server', () => {
  return gulp.src([
    'src/server/**/*.js',
    'src/shared/**/*.js',
    'src/tests/**/*.js',
  ], { base: './src' })
    .pipe(sourcemaps.init())
    .pipe(babel(babelConfig))
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
