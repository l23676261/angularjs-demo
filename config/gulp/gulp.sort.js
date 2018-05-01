/*
*   预编译 合并文件排序规则
* */
const data = {
    //基础模块规则
    base: [
        '**/*.config.js',
        '**/*.util.js',
        '**/*.module.js',
        '**/*.service.js',
        '**/*.directive.js',
        '**/*.filter.js',
        '**/*.controller.js',
        '**/*.js'
    ],
    module: [
        '**/*.min.js',
        '**/*.config.js',
        '**/*.util.js',
        '**/*.module.js',
        '**/*.service.js',
        '**/*.directive.js',
        '**/*.filter.js',
        '**/*.controller.js',
    ],
    //生产环境规则
    production: [
        '**/vendor.concat.css',
        '**/common.css',
        '**/*.css',
        '**/vendor.concat.js',
        '**/module.vendor.concat.js',
        '**/*.concat.js',
        '**/*.js',
        '**/*.templates.js'
    ],
    //第三方依赖规则
    vendor: [
        '**/angular.min.js',
        '**/angular.js',
        '**/angular-ui-router.min.js'
    ]
};
module.exports = data;
