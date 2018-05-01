/*
*   基础路径配置
* */
const path = {
    //根目录
    src: './src',
    //入口模块
    app: './src/app',
    //开发编译目标
    tmp: './tmp',
    //配置文件
    config: './config',
    //样式目录
    less: './src/less',
    //资源目录
    assets: './src/assets',
    //图片目录
    image: './src/assets/image',
    //生产目录
    dist: './dist',
    //第三方目录
    vendor: './static',
    //动态JS注入标识
    injectJsSign: '<!--HisPlusModuleInjectPositionJS-->',
    //动态CSS注入标识
    injectCssSign: '<!--HisPlusModuleInjectPositionCSS-->'
};
module.exports = path;
