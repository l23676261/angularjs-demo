const gulp = require('gulp');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const inject = require('gulp-inject');
const plumber = require('gulp-plumber');
const log = require('./gulp.log.js');
const path = require('../config/path/path.base.js');

/*
* 合并第三方样式库
* */
gulp.task('dev:vendor:css', () => {
    log.info(`开始合并第三方样式库`);
});
/*
*   编译 公共 less文件;
*
* */
gulp.task('dev:app:css:common', () => {
    log.info(`开始合并开发环境Less`);
    return gulp.src(`${path.less}/common/entry.less`)
        .pipe(plumber({
            errorHandler: function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(cleanCss({
            compatibility: 'ie8',
            level: 2
        }))
        .pipe(gulp.dest(`${path.tmp}/css/common`));
});

/*
*   注入公共 css文件;
*
* */
gulp.task('dev:inject:app:css:common', ['dev:app:css:common'],() => {
    log.info(`开始注入开发环境Less`);
    return gulp.src(`${path.src}/index.html`)
        .pipe(inject(
            gulp.src(`${path.tmp}/css/common/**/*.css`, {read: false}),
            {
                addPrefix: '',
                relative: true,
                name: 'common',
            }
        ))
        .pipe(gulp.dest(`${path.src}`));
});
/*
*   编译模块的 less / css 文件
* */
gulp.task('dev:css:module', () => {
    let module_name = gulp.env.name;
    if( !module_name || module_name === true ){
        log.error(`没有指定模块名[编译模块less任务]`);
    }else {
        log.info(`开始构建开发环境下${module_name}模块Less文件`);
        return gulp.src(`${path.less}/modules/${module_name}.less`)
            .pipe(plumber({
                errorHandler: function(err) {
                    console.log(err);
                    this.emit('end');
                }
            }))
            .pipe(less({
                compatibility: 'ie8',
                level: 2
            }))
            .pipe(concat(`${module_name}.css`))
            .pipe(cleanCss())
            .pipe(gulp.dest(`${path.tmp}/css/modules`));
    }
});
