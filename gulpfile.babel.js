import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import util from 'gulp-util';
import mocha from 'gulp-mocha';
import sequence from 'gulp-sequence';
import nodemon from 'gulp-nodemon';

gulp.task('start', sequence(['static-assets', 'build', 'watch', 'app-server']));

gulp.task('run-tests', sequence(['build', 'test', 'lint']));

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
  gulp.watch(['src/server/**/*.js', 'src/tests/**/*.js'], ['build', 'lint', 'test']);
});

gulp.task('build', () => {
  gulp.src(['src/server/**/*.js', 'src/shared/**/*.js', 'src/tests/**/*.js'], { base: './src' })
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
              }, {
                "transform": "react-transform-catch-errors",
                "imports": ["react", "redbox-react"]
              }]
            }
          }
        }
      }
    }))
    .pipe(gulp.dest('out'));
});

gulp.task('static-assets', () => {
  gulp.src(['src/server/index.html', 'src/server/favicon.ico'])
    .pipe(gulp.dest('out/server'));
});

gulp.task('lint', () => {
  gulp.src(['src/**/*.js', 'test/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
});