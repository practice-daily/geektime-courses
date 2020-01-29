// const { task, src, dest, series } = require('gulp');

const gulp = require('gulp');
const watch = require('gulp-watch');
const batch = require('gulp-batch');
const ts = require('gulp-typescript');
const typescript = require('gulp-tsc');

// function tsc() {
//   return src(tsProject.config.include)
//     .pipe(tsProject())
//     .pipe(dest(tsProject.config.compilerOptions.outDir))
// }
// function watchRoutes() {
//   return watch('./routes/**/*.ts', ['tsc'])
// }

// exports.default = series(watchRoutes)


const tsProject = ts.createProject('./tsconfig.json');
// console.log(tsProject.config);
// console.log(tsProject.config.compilerOptions.outDir);

// gulp.task('tsc', () => {
//   console.log('tsc===')
//   gulp.src(tsProject.config.include)
//     .pipe(tsProject())
//     .pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
// })
// gulp.task('watch', () => {
//   console.log('watch===')
//   watch('./routes/**/*.ts', batch((evets, done) => {
//     console.log('watch batch===')
//     // gulp.start('tsc', done)
//     gulp.series(['tsc'])
//   }))
// })

function tsc() {
  console.log('tsc===')
  return gulp.src(tsProject.config.include)
    .pipe(tsProject())
    .pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
}
function doTask() {
  return watch('./routes/**/*.ts', { ignoreInitial: false })
    // .pipe(gulp.series(tsc))
    .pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
}

// gulp.task('default', gulp.series(doTask))

let build = gulp.series(doTask, tsc)
exports.default = build
