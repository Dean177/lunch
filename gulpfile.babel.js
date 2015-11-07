import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';
import fs from 'fs';
import gulp from 'gulp';
import util, { PluginError } from 'gulp-util';
import mocha from 'gulp-mocha';
import sourcemaps from 'gulp-sourcemaps';
import sequence from 'gulp-sequence';
import nodemon from 'gulp-nodemon';
import webpack from 'webpack';
import path from 'path';
import webpackProdConfig from './webpack.config.client.prod.js';

const babelConfig = { stage: 0 };
const buildArtifactsOut = './build-artifacts';
const lintSources = ['src/**/*.js', 'gulpfile.babel.js', 'webpack.config.prod.js'];
const sourceMapConfig = {
  debug: true,
  includeContent: false,
  sourceRoot: (file) => { return path.join(path.relative(file.path, path.join(__dirname, '/src/')), '/src/'); },
};

gulp.task('start', sequence('build', ['watch:client', 'watch:server'], 'server:dev'));

gulp.task('start-production', sequence('make', 'server:prod'));

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
    watch: ['out/server/**/*', 'out/shared/**/*'],
    ignore: [
      'out/client/**/*',
      'src/**/*',
    ],
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

gulp.task('build', ['static-assets', 'build:client', 'build:server']);

gulp.task('build:client', () => {
  return gulp.src(['src/client/**/*.js', 'src/tests/**/*.js'], { base: './src' })
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

gulp.task('lint', () => {
  return gulp.src(lintSources)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint:file', () => {
  return gulp.src(lintSources)
    .pipe(eslint())
    .pipe(eslint.format('checkstyle', fs.createWriteStream(`${buildArtifactsOut}/codestyle.xml`)));
});

gulp.task('webpack:prod', (done) => {
  webpack(webpackProdConfig, (err, stats) => {
    if (err) throw new PluginError('webpack', err);
    util.log('[webpack]', stats.toString());
    done();
  });
});

gulp.task('clean', () => del(['out/**', 'build-artifacts']));
