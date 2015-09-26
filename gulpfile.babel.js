import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import util from 'gulp-util';
import mocha from 'gulp-mocha';
import nodemon from 'gulp-nodemon';


gulp.task('dev-server', ['build', 'watch', 'app-server']);

gulp.task('app-server', () => {
  nodemon({ script: 'out/server/index.js', ignore: ['src/client/**/*.js']});
});

gulp.task('watch', () => {
  gulp.watch(['src/server/**/*.js', 'stc/shared/**/*.js'], ['build']);
});

gulp.task('build', ['html', 'lint'], () => {
  gulp.src(['src/server/index.js', 'src/shared/**/*.js'], { base: './src' })
    .pipe(babel({
      "stage": 0,
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

gulp.task('html', () => {
  gulp.src('src/server/index.html').pipe(gulp.dest('out/server'))
});

gulp.task('lint', () => {
  gulp.src(['src/**/*.js', 'test/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
});