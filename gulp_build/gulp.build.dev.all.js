const gulp = require('gulp');
const runSequence = require('run-sequence').use(gulp);
const runAll = require('npm-run-all');
const wrench = require('wrench');
const log = require('./gulp.log.js');
const path = require('../config/path/path.base.js');
const config = require('../config/gulp/gulp.config.js');

const getModules = () => {
    let array = [];
    wrench.readdirSyncRecursive(path.src).filter( file => {
        return (/[config]\.(json)$/i).test(file) && (/^app\\([a-zA-Z]+\\[config])/ig).test(file);
    }).map( ( config_position ) => {
        let folder_name = config_position.substr(4, config_position.length - 16);
        array.push(`dev:watch:module --name ${folder_name}`);
    });
    return array;
};
gulp.task('dev:start:all', () => {
    runSequence(
        'http:connect',
        'dev:clean',
        'dev:inject:app:index',
        "dev:watch:app",
        () => {
            log.info(`---------开始构建业务模块----------`);
            let module_array = [];
            if( config.compile === undefined || !config.compile.length ){
                module_array = getModules();
            }else{
                module_array = config.compile.map( (item) => (
                    `dev:watch:module --name ${item}`
                ));
            }
            let task_array = [
                ...module_array
            ];
            let promise = runAll(task_array, { parallel: true })
                .then( () => {
                    console.log("done!");
                })
                .catch( err => {
                    console.log("failed!");
                });
        }
    );
});
