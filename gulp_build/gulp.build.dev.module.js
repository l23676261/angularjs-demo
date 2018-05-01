const gulp = require('gulp');
const inject = require('gulp-inject');
const order = require('gulp-order');
const ngAnnotate = require('gulp-ng-annotate');
const log = require('./gulp.log.js');
const path = require('../config/path/path.base.js');
const sort = require('../config/gulp/gulp.sort');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const errorHandle = function(error) {
    log.error(error.toString());
    this.emit('end');
};

gulp.task('dev:module:js', () => {
    let module_name = gulp.env.name;
    if( !module_name || module_name === true ){
        log.error(`没有指定模块名[合并js任务]`);
    }else {
        log.info(`开始构建开发环境下[${module_name}][js]文件`);
        return browserify({
            entries: `${path.app}/${module_name}/${module_name}.entry.js`,
            debug: false
        })
            .transform(babelify,{presets:['es2015']})
            .bundle()
            .on('error', errorHandle)
            .pipe(source(`${module_name}.concat.js`))
            .pipe(buffer())
            .pipe(ngAnnotate())
            .pipe(gulp.dest(`${path.tmp}/app/${module_name}/js`));
    }
});
/*
*  向主模块注入业务模块
*  gulp dev:inject:module:to:app --name 模块名
* */
gulp.task('dev:inject:module:to:app',['dev:module:clean', 'dev:module:js', 'dev:css:module', 'dev:image'], () => {
    let module_name = gulp.env.name;
    if( !module_name || module_name === true ){
        log.error(`没有指定模块名[构建模块任务]`);
    }else{
        log.info(`开始构建开发环境下${module_name}模块`);
        let lib = require(`../src/app/${module_name}/config.json`);
        let lib_array_js = [];
        let lib_array_css = [];
        for( let item of lib["vendor"] ){
            lib_array_js.push(`${path.vendor}/${item}/**/*.js`);
            lib_array_css.push(`${path.vendor}/${item}/**/*.css`);
        }
        for( let item of lib["components"] ){
            lib_array_js.push(`../src/app/${module_name}/components/${item}/**/*.js`);
        }
        return gulp.src(`${path.tmp}/index.html`)
            .pipe(inject(
                gulp.src([
                    ...lib_array_js,
                    `${path.tmp}/app/${module_name}/**/*.js`
                ]).pipe(order(sort.module)),
                {
                    addPrefix: ``,
                    relative: true,
                    name: module_name,
                }
            ))
            .pipe(inject(
                gulp.src([
                    ...lib_array_css,
                    `${path.tmp}/css/modules/${module_name}.css`
                ]),
                {
                    addPrefix: ``,
                    relative: true,
                    name: module_name,
                }
            ))
            .pipe(gulp.dest(path.tmp));
    }
});
