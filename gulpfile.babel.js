import babel from 'gulp-babel';
import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import util, { PluginError } from 'gulp-util';
import mocha from 'gulp-mocha';
import sequence from 'gulp-sequence';
import nodemon from 'gulp-nodemon';
import webpack from 'webpack';
import webpackProdConfig from './webpack.config.prod';

gulp.task('start-production', sequence('make', 'production-server'));

gulp.task('make', sequence('clean', ['build', 'static-assets', 'prod-webpack']));

gulp.task('production-server', () => {
  nodemon({
    env: { 'NODE_ENV': JSON.stringify('production') },
    script: 'out/server/index.js',
    verbose: false,
    ignore: ['*'],
  });
});

gulp.task('start', sequence('static-assets', 'build', 'watch', 'dev-server'));

gulp.task('run-tests', sequence('build', 'test', 'lint'));

gulp.task('test', () => {
  return gulp.src(['out/tests/**/*.spec.js'], { read: false }).pipe(mocha());
});

gulp.task('dev-server', () => {
  nodemon({
    env: { 'DEBUG': 'lunch:*' },
    script: 'out/server/index.js',
    ext: 'js',
    verbose: false,
    watch: ['out/server/**/*', 'out/shared/**/*'],
    ignore: [
      'out/client/**/*',
      'src/'
    ],
  });
});

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js'], ['run-tests']);
});

gulp.task('build', () => {
  return gulp.src(['src/**/*.js'], { base: './src' })
    .pipe(babel({
      stage: 0,
      env: {
        development: {
          plugins: ['react-transform'],
          extra: {
            "react-transform": {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
              }]
            }
          }
        }
      }
    }))
    .pipe(gulp.dest('out'));
});

gulp.task('static-assets', () => {
  return gulp.src(['src/server/index.html', 'src/server/favicon.ico'])
    .pipe(gulp.dest('out/server'));
});

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js', 'test/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('prod-webpack', (done) => {
  webpack(webpackProdConfig, (err, stats) => {
    if (err) throw  new PluginError('webpack', err);
    util.log('[webpack]', stats.toString());
    done();
  })
});

gulp.task('clean', () => del(['out/**']));
