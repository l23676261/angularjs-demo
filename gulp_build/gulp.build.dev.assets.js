const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const log = require('./gulp.log.js');
const path = require('../config/path/path.base.js');

/*
*  压缩图片
* */
gulp.task('dev:image', () => (
    gulp.src(`${path.image}/**/*.{jpg,png,gif,ico,jpeg}`)
        // .pipe(imagemin())
        .pipe(gulp.dest(`${path.tmp}/assets/image`))
));
