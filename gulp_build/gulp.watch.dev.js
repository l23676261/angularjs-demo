const gulp = require('gulp');
const log = require('./gulp.log.js');
const path = require('../config/path/path.base.js');
const watch = require('gulp-watch');
const es = require('event-stream');
const runSequence = require('run-sequence').use(gulp);

/*
*  监控入口主模块文件
*
* */
gulp.task('dev:watch:app',['dev:inject:app:index:tmp'], () => {
    log.info(`开始生成监听入口模块[监听任务]`);
    const arr = [
        watch([
            `${path.src}/*js`,
        ], () => {
            log.info('更新入口模块文件[app - js].........');
            return runSequence('dev:app:js');
        }),
        watch([
            `${path.src}/config/*js`,
        ], () => {
            log.info('更新配置文件[app config - js].........');
            return runSequence('dev:app:js');
        }),
        watch([
            `${path.src}/components`,
        ], () => {
            log.info('更新入口模块文件[components - js].........');
            return runSequence('dev:app:components');
        }),
        watch([
            `${path.src}/less/common/**/*`
        ], () => {
            log.info('更新入口模块文件[less].........');
            return runSequence('dev:app:css:common');
        }),
        watch([
            `${path.image}`
        ], (vinyl) => {
            log.info('更新图片资源[image].........');
            return runSequence('dev:image');
        }),
        watch([
            `${path.src}/index.html`
        ], () => {
            log.info('更新入口模块文件[html].........');
            return runSequence('dev:inject:app:index');
        })
    ];
    return es.merge.apply(null, ...arr);
});
/*
*  单独监控 公共样式 变更
*
* */
gulp.task('dev:watch:app:css', () => {
    return watch(`${path.src}/less/common/**/*.less`,['dev:app:css:common'] );
});
/*
*   监控模块文件变化
*   gulp dev:watch:module --name 模块名
* */
gulp.task('dev:watch:module', [ 'dev:inject:module:to:app'],() => {
    let module_name = gulp.env.name;
    if( !module_name || module_name === true ){
        log.error(`没有指定模块名 [监听任务]`);
    }else {
        log.info(`开始生成监听模块 - ${module_name}[监听任务]`);
        const arr = [
            watch([
                `${path.app}/${module_name}/**/*`,
            ], (vinyl) => {
                let array = vinyl.path.split('.'),
                    _length = array.length - 1;
                if( ['js','json'].indexOf(array[_length]) !== - 1 ){
                    log.info(`更新模块文件[${module_name} - js/json].........`);
                    return runSequence('dev:module:js');
                }
            }),
            watch([
                `${path.src}/less/modules/${module_name}.less`
            ], () => {
                log.info(`更新模块文件[${module_name} - less].........`);
                return runSequence('dev:css:module');
            })
        ];
        return es.merge.apply(null, ...arr);
    }
});
