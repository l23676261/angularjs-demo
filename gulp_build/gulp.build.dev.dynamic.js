const gulp = require('gulp');
const wrench = require('wrench');
const inject = require('gulp-inject');
const path = require('../config/path/path.base.js');
const runSequence = require('run-sequence').use(gulp);
const config = require('../config/gulp/gulp.config.js');

let module_array = [];
/*
*   动态注册模块任务
* */
if( config.dynamic ){
    wrench.readdirSyncRecursive(path.src).filter( file => {
        return (/[config]\.(json)$/i).test(file);
    }).map( ( config_position ) => {
        let folder_name = config_position.substr(4, config_position.length - 16);
        /*
        *   注册模块注入任务
        *
        * */
        gulp.task(`dev:inject:app:update:module:${folder_name}`, () => {
            return gulp.src(`${path.tmp}/index.html`)
                .pipe(inject(
                    gulp.src(`${path.tmp}/app/${folder_name}/**/*.js`, { read: false }),
                    {
                        addPrefix: ``,
                        relative: true,
                        name: folder_name,
                    }
                ))
                .pipe(gulp.dest(`${path.tmp}`));
        });
    });
}
/*
*  获取所有模块任务
* */
gulp.task('dev:inject:app:update', ['dev:inject:app:index'], () => {
    module_array = [];
    const promise = new Promise( (resolve, reject) => {
        let array = [];
        wrench.readdirSyncRecursive(path.src).filter( file => {
            return (/[config]\.(json)$/i).test(file);
        }).map( ( config_position ) => {
            let folder_name = config_position.substr(4, config_position.length - 16);
            array.push(`dev:inject:app:update:module:${folder_name}`);
        });
        resolve(array);
    });
    return promise.then( (result) => {
        module_array = result;
    });
});

/*
*  遍历更新所有模块
* */
gulp.task('dev:inject:app:update:main', ['dev:inject:app:update'], () => {
    runSequence(...module_array);
});
