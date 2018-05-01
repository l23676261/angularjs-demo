const gulp = require('gulp');
const del = require('del');
const replace = require('gulp-replace');
const log = require('./gulp.log.js');
const path = require('../config/path/path.base.js');

/*
*  清除html, 模块标记
* */
gulp.task('dev:module:clean:html', () => {
    let module_name = gulp.env.name;
    log.info(`开始删除[${module_name}]模块标记`);
    return gulp.src(`${path.src}/index.html`)
        .pipe(replace(
`<!-- ${module_name}:css -->
<!-- endinject -->`,
            ''
        ))
        .pipe(replace(
`<!-- ${module_name}:js -->
<!-- endinject -->`,
        ''
        ))
        .pipe(gulp.dest(`${path.src}`));
});
/*
*   清空模块文件夹
*   --name
* */
gulp.task('dev:module:clean', () => {
    let module_name = gulp.env.name;
    if( !module_name || module_name === true ){
        log.error(`没有指定模块名[清除任务]`);
    }else {
        log.info(`开始清理[${module_name}]模块tmp文件`);
        return del.sync([
            `${path.tmp}/app/${module_name}`,
            `${path.tmp}/css/modules/${module_name}`,
        ])
    }
});
/*
*  删除模块文件
* */
gulp.task('dev:module:delete', ['dev:module:clean:html'], () => {
    let module_name = gulp.env.name;
    if( !module_name || module_name === true ){
        log.error(`没有指定模块名[清除任务]`);
    }else {
        log.info(`开始清理[${module_name}]模块tmp文件`);
        return del.sync([
            `${path.tmp}/app/${module_name}`,
            `${path.tmp}/css/modules/${module_name}`,
        ])
    }
});
/*
*  清理主模块tmp文件
*
* */
gulp.task('dev:app:clean', () => {
    log.info(`开始清理主模块tmp文件`);
    return del.sync([
        `${path.tmp}/*.js`,
        `${path.tmp}/components`,
        `${path.tmp}/css/common`,
    ]);
});
/*
*  清理dist
*
* */
gulp.task('dist:clean', () => {
    log.info(`开始清理dist文件`);
    return del.sync(`${path.dist}/**/*`);
});
