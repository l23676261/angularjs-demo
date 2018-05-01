const gulp = require('gulp');
const connect = require('gulp-connect');
const config = require('../config/gulp/gulp.http.js');
const log = require('./gulp.log.js');

gulp.task('http:connect', function () {
    connect.server({
        host: 'localhost',
        root: config.root,
        port: config.port,
        livereload: false
    });
    log.success(config.message.success);
    connect.serverClose();
});
