const gulp = require('gulp');
const makeDir = require('make-dir');
const wrench = require('wrench');
const replace = require('gulp-replace');
const log = require('./gulp.log.js');
const path = require('../config/path/path.base.js');
const rename = require('gulp-rename');
const runSequence = require('run-sequence').use(gulp);

const checkModuleName = ( module_name ) => {
    return new Promise( (resolve, reject) => {
        let is_have = false;
        wrench.readdirSyncRecursive(path.src).filter( file => {
            return (/[config]\.(json)$/i).test(file);
        }).map( ( config_position ) => {
            let folder_name = config_position.substr(4, config_position.length - 16);
            if( folder_name === module_name ){
                is_have = true;
            }
        });
        resolve(is_have);
    });
};
/*
*   创建模块文件夹 注入index
*  （内部）
* */
gulp.task('init:module:inject:to:html', () => {
    let module_name = gulp.env.name;
    if( !module_name || module_name === true ){
        log.error(`没有指定模块名`);
    }else {
        checkModuleName(module_name).then( (result) => {
            if( result ){
                log.error(`已经存在相同的[${module_name}]模块， 需更换模块名!`);
                return false;
            }else {
                log.info(`开始在/src/index.html生成${module_name}模块注入标识`);
                const inject_str_js =
`<!-- ${module_name}:js -->
<!-- endinject -->
${path.injectJsSign}`;
                const inject_str_css =
                    `<!-- ${module_name}:css -->
    <!-- endinject -->
    ${path.injectCssSign}`;
                return gulp.src(`${path.src}/index.html`)
                    .pipe(replace(path.injectJsSign, inject_str_js))
                    .pipe(replace(path.injectCssSign, inject_str_css))
                    .pipe(gulp.dest(`${path.src}`));
            }
        });
    }
});
gulp.task('init:module:inject:to:html:tmp', () => {
    let module_name = gulp.env.name;
    if( !module_name || module_name === true ){
        log.error(`没有指定模块名`);
    }else {
        checkModuleName(module_name).then( (result) => {
            if( result ){
                log.error(`已经存在相同的[${module_name}]模块， 需更换模块名!`);
                return false;
            }else {
                log.info(`开始在/tmp/index.html生成${module_name}模块注入标识`);
                const inject_str_js =
                    `<!-- ${module_name}:js -->
<!-- endinject -->
${path.injectJsSign}`;
                const inject_str_css =
                    `<!-- ${module_name}:css -->
    <!-- endinject -->
    ${path.injectCssSign}`;
                return gulp.src(`${path.tmp}/index.html`)
                    .pipe(replace(path.injectJsSign, inject_str_js))
                    .pipe(replace(path.injectCssSign, inject_str_css))
                    .pipe(gulp.dest(`${path.tmp}`));
            }
        });
    }
});
/*
*  创建业务模块文件目录;
*  npm run init:module --name 模块名称
* */
gulp.task('init:module',  () => {
    let module_name = gulp.env.name;
    if( !module_name || module_name === true ){
        log.error(`没有指定模块名`);
    }else{
        checkModuleName(module_name).then( (result) => {
            if( result ){
                log.error(`已经存在相同的[${module_name}]模块， 需更换模块名!`);
                return false;
            }else{
                log.info(`开始创建${module_name}模块`);
                let root_path = `${path.app}/${module_name}`;
                makeDir(root_path).then ( path => {
                    let base_path = root_path + '/base';
                    makeDir(base_path).then( path => {
                        Promise.all([
                            makeDir(`${base_path}/controller`),
                            makeDir(`${base_path}/service`),
                            makeDir(`${base_path}/directive`),
                            makeDir(`${base_path}/html`),
                            makeDir(`${base_path}/module`),
                            makeDir(`${base_path}/filter`)
                        ]).then( (paths) => {
                            gulp.src('./config/template/config.json')
                                .pipe(replace('module_name', module_name))
                                .pipe(gulp.dest(`${root_path}/`));
                            gulp.src('./config/template/module.entry.js')
                                .pipe(replace('模块名', module_name))
                                .pipe(rename(`${module_name}.entry.js`))
                                .pipe(gulp.dest(`${root_path}/`));
                            gulp.src('./config/template/api.js')
                                .pipe(gulp.dest(`${root_path}/`));
                            runSequence('init:module:inject:to:html','init:module:inject:to:html:tmp', 'dev:inject:app:index:tmp');
                            log.success(`已经成功生成${module_name}模块目录`);
                        });
                    });
                    makeDir(root_path + '/components').then (path => {});
                });
            }
        });
    }
});

