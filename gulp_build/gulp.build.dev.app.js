const gulp = require('gulp');
const inject = require('gulp-inject');
const ngAnnotate = require('gulp-ng-annotate');
const log = require('./gulp.log.js');
const path = require('../config/path/path.base.js');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const errorHandle = function(error) {
    log.error(error.toString());
    this.emit('end');
};

/*
*  转义合并 公共模块
*
* */
gulp.task('dev:app:components', () => {
    log.info(`开始注入开发环境主模块公共组件`);
    return browserify({
            entries: `${path.src}/components/components.entry.js`
        })
        .transform(babelify,{presets:['es2015']})
        .bundle()
        .on('error', errorHandle)
        .pipe(source('components.concat.js'))
        .pipe(buffer())
        .pipe(ngAnnotate())
        .pipe(gulp.dest(`${path.tmp}/components`));
});
/*
*  转义合并 主入口
*
* */
gulp.task('dev:app:js', () => {
    log.info(`开始合并开发环境主模块脚本`);
    return browserify({
            entries: `${path.src}/app.module.js`
        })
        .transform(babelify,{presets:['es2015']})
        .bundle()
        .on('error', errorHandle)
        .pipe(source('app.concat.js'))
        .pipe(buffer())
        .pipe(ngAnnotate())
        .pipe(gulp.dest(`${path.tmp}`));
});
/*
*向html注入主模块、公共模块脚本
* 来源： tmp
* */
gulp.task('dev:inject:app:index:tmp', ['dev:app:js', 'dev:app:components','dev:app:css:common', 'dev:image'], () => {
    log.info(`开始向开发环境主模块HTML注入脚本`);
    let vendor = require(`../config/path/path.vendor.json`)["js"];
    let vendor_array = [];
    for( let item of vendor ){
        vendor_array.push(`${path.vendor}/${item}/**/*.js`);
    }
    let vendorCss = require(`../config/path/path.vendor.json`)["css"];
    let vendor_array_css = [];
    for( let item of vendorCss ){
        vendor_array_css.push(`${path.vendor}/${item}/**/*.css`);
    }
    return gulp.src(`${path.tmp}/index.html`)
        .pipe(inject(
            gulp.src(`${path.tmp}/*.js`, {read: false}),
            {
                addPrefix: '',
                relative: true,
                name: 'main',
            }
        ))
        .pipe(inject(
            gulp.src([...vendor_array, ...vendor_array_css],{read: false}), {
                addPrefix: '',
                relative: true,
                name: 'vendor',
            }
        ))
        .pipe(inject(
            gulp.src(`${path.tmp}/components/**/*.js`,{read: false}), {
                addPrefix: '',
                relative: true,
                name: 'components',
            }
        ))
        .pipe(inject(
            gulp.src(`${path.tmp}/css/common/**/*.css`, {read: false}),
            {
                addPrefix: '',
                relative: true,
                name: 'common',
            }
        ))
        .pipe(gulp.dest(`${path.tmp}`));
});
/*
*  向html注入主模块、公共模块脚本
*   来源： 可配 src , tmp
* */
gulp.task('dev:inject:app:index', ['dev:app:js', 'dev:app:components','dev:app:css:common', 'dev:image'], () => {
    log.info(`开始向开发环境主模块HTML注入脚本`);
    let from_path = gulp.env.tmp ? path.tmp : path.src;
    let vendor = require(`../config/path/path.vendor.json`)["js"];
    let vendor_array = [];
    for( let item of vendor ){
        vendor_array.push(`${path.vendor}/${item}/**/*.js`);
    }
    let vendorCss = require(`../config/path/path.vendor.json`)["css"];
    let vendor_array_css = [];
    for( let item of vendorCss ){
        vendor_array_css.push(`${path.vendor}/${item}/**/*.css`);
    }
    return gulp.src(`${from_path}/index.html`)
        .pipe(inject(
            gulp.src(`${path.tmp}/*.js`, {read: false}),
            {
                addPrefix: '',
                relative: true,
                name: 'main',
            }
        ))
        .pipe(inject(
            gulp.src([...vendor_array, ...vendor_array_css],{read: false}), {
                addPrefix: '',
                relative: true,
                name: 'vendor',
            }
        ))
        .pipe(inject(
            gulp.src(`${path.tmp}/components/**/*.js`,{read: false}), {
                addPrefix: '',
                relative: true,
                name: 'components',
            }
        ))
        .pipe(inject(
            gulp.src(`${path.tmp}/css/common/**/*.css`, {read: false}),
            {
                addPrefix: '',
                relative: true,
                name: 'common',
            }
        ))
        .pipe(gulp.dest(`${path.tmp}`));
});



