/*
*   生产构建配置
* */
const build = {
    //基本配置
    option: {
        //是否开启hash路径
        hash: true,
        //html配置
        html: {
            mini:  true,
            repalcePath: {
                src: '../src',
                dist: 'html'
            }
        },
        //js配置
        js: {
            main: {
                mini: true
            },
            module: {
                mini: true,
                concat: true
            }
        },
        //css配置:
        css: {
            compatibility: 'ie8',
            level: 2
        },
        //字体文件
        font: {
            path: 'static'
        }
    },
    //build模块
    modules: [
        'drug'
    ]
};
module.exports = build;
