const gulp = require('gulp');
const del = require('del');
const path = require('../config/path/path.base.js');

gulp.task('dev:clean', () => {
    return del.sync([
        `${path.tmp}`,
    ])
});
