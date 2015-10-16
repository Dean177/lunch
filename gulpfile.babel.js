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

gulp.task('make', sequence('clean', ['make-server', 'static-assets', 'prod-webpack']));

gulp.task('start', sequence('static-assets', 'make-server', 'watch', 'app-server'));

gulp.task('run-tests', sequence('make-server', 'test', 'lint'));

gulp.task('test', () => {
  return gulp.src(['out/tests/**/*.spec.js'], { read: false }).pipe(mocha());
});

gulp.task('app-server', () => {
  nodemon({
    script: 'out/server/index.js',
    ext: 'js',
    "verbose": false,
    "watch": ["out/server/**/*", "out/shared/**/*"],
    "ignore": [
      "out/client/**/*",
      "src/"
    ],
  });
});

gulp.task('watch', () => {
  gulp.watch(['src/server/**/*.js', 'src/tests/**/*.js'], ['make-server', 'lint', 'test']);
});

gulp.task('make-server', () => {
  return gulp.src(['src/server/**/*.js', 'src/shared/**/*.js', 'src/tests/**/*.js'], { base: './src' })
    .pipe(babel({
      "stage": 1,
      "env": {
        "development": {
          "plugins": ["react-transform"],
          "extra": {
            "react-transform": {
              "transforms": [{
                "transform": "react-transform-hmr",
                "imports": ["react"],
                "locals": ["module"]
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
