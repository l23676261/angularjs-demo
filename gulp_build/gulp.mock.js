const gulp = require('gulp');
const mockServer = require('gulp-mock-server');
const proxy = require('http-proxy-middleware');

gulp.task('mock', function() {
    gulp.src('.')
        .pipe(mockServer({
            host: 'localhost',
            port: 8301,
            allowCrossOrigin : true,
            https: false
            // middleware: [
            //     proxy('/distributeDrug',  {
            //         target: 'http://10.9.248.97:8301',
            //         changeOrigin: true
            //     })
            // ]
        }));
});
