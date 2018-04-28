## HIS Plus 前端工程 v 0.0.2

### 工程依赖的第三方框架或函数库
- angular.js-1.2.30
- angular-ui-router - 0.3.2
- ( jquery )

`模块/组件/业务/逻辑` 需要依据angular.js进行开发。
### 总体目录
```
-config       (工程基础配置)
    -gulp     (构建配置)
    -path     (路径配置)
    -template (基础模板)
- data        (mock数据)
- dist        (生产文件)
- gulp_build  (构建任务)
- src         (开发目录)
    -app      (应用模块目录)
        - demo (demo模块)
            - base
                - controller
                - html
                - module
                - service
                - filter
                - directive
            api.js (接口定义)
            config.json (模块配置文件)
            demo.entry.js (模块入口文件)
    -assets   (资源目录)
    -components (组件目录)
        - page (页面级)
        - require (引用的模块类)
        - ui (UI控件级)
        - util (工具级)
        - components.entry.js (入口)
        - config.json 
    -config   (配置文件)
    -less     (样式目录)
        -common (公共/组件样式)
        -modules(业务模块样式)
    app.module.js (入口模块)
    index.html    (入口html)
-static       (第三方)
-tmp          (运行时生成目录)
    
```
### 环境操作

#### 安装中间件
`( 已经安装完成 nodejs - v 8.9.* )`
1. cd 进入工程根目录
2. npm install

#### cli 命令行工具
> 前端服务包含 `web server` 和 `mock server`
```
web server启动： npm start
mock server启动： npm run mock

```
> 创建业务模块
```
npm run init:module --name 模块名
```
> 开发命令
```
1.编译主模块： npm run dev:build:main
2.监控主模块： npm run dev:watch:main
3.编译业务模块: npm run dev:build:module --name 模块名
4.监控业务模块: npm run dev:watch:module --name 模块名     
5.开启server并监控所有模块任务：npm run dev 
( 对哪些模块进行编译配置在 config/gulp/gulp.config.js中, 缺省下为全部模块)

```
> mock 
```
启动mock：  npm run mock
``` 

> 生成命令

`生成时构建的业务模块通过配置文件进行配置(config/gulp/gulp.production.js)`
```
npm run build
```
### 主模块

> 主模块是公共模块和入口模块的并集，包含主模块的定义、常量配置的注入、基础服务
公共服务的注入，主样式的定义等等。

> index.html(src/index.html) 该文件为主页面也可以是唯一的入口页面。
含有类似注释的标记为工程预编译时js/css 的注入位置标记， 不可随意删除。

`标记说明：`
#### 生产环境 css 标记
```
<!-- inject:css -->
<!-- endinject -->
```
#### 第三方css标记
```
<!-- vendor:css -->
<!-- endinject -->
```
#### 主模块css标记
```
<!-- common:css -->
<!-- endinject -->
```
#### 业务模块css标记 (创建业务模块时自动生成)
```
<!-- demo:css -->
<!-- endinject -->
```
#### 第三方js标记
```
<!-- vendor:js -->
<!-- endinject -->
```
#### 组件js标记
```
<!-- components:js -->
<!-- endinject -->
```
#### 生成环境js标记
```
<!-- inject:js -->
<!-- endinject -->
```
#### 主模块js标记
```
<!-- main:js -->
<!-- endinject -->
```
#### 业务模块js标记（创建模块时自动生成）
```
<!-- demo:js -->
<!-- endinject -->
```
#### 创建业务模块的位置标记
```
<!--HisPlusModuleInjectPositionCSS-->
<!--HisPlusModuleInjectPositionJS--> 
```

### 业务模块

> 业务模块的建立 原则上必须依赖于命令行( `命令行一章中` )创建，工程会自动生成基础的文件
夹结构。其中重要的为对 根目录index.html 创建js/css的注入标记。

### 关于模块依赖的第三方

业务模块依赖的 *第三方* 库或组件。 构建时目前不会识别重复引用，需约定第三方的作用范围。
```
1. 将第三方源文件拷贝目录至static下，且需要有明确的二级目录名称, 且文件命名为 *.min.js / *.min.css

2. 在模块目录下配置依赖:
    `第三方依赖`(vendor):  如工程的示例模块 register 依赖 bootstrap
    `模块级依赖(components)`: 如上
   
    - 在src/app/register/config.json下的vendor对象中配置
    {
        "name": "register",
        "description": "门诊挂号模块",
        "version": "1.0",
        "mode": "dev",
        "components": [
            "my-components"
        ],
        "vendor": [
            "bootstrap"
        ]
    } 
```
### 配置
约定和可配置主要区分于环境的变换和相关需求的变化, 实现在构建的配置和代码中的引用配置。

### 开发
> js 可以使用部分es6的语法，这个部分使用babel 转义es6的语法，但目前不对es6 API进行
转码(IE8下的转义还有一些问题待解决)。
在编译过程中，采用模块化预编译的方式对依赖文件进行处理(require)。

> css 引用了 less 对css语法规则进行预编译。
对于模块的less文件，文件名需要与模块名相同才会对其进行编译和打包。

### 项目级组件
项目需求所定制的公共组件，这部分目前分为三个部分。
> page 页面类

> ui UI类

> util 工具类

通过require文件夹内的引用定义和component.entry进行引入加载。

### 代码检查
用于检查代码格式风格 和 基础规则。
1. 检测命令
```
> npm run lint 路径
(如： 检测 register 模块 则为 npm run lint src/app/register)

```
2. 修复命令
```
> npm run lint:fix 路径
(如： 修复 register 模块 则为 npm run lint:fix src/app/register)

```
`修复操作可能会导致一些特殊改变，谨慎操作`

3. 代码规则
> 规则依赖于 eslint:recommended 提供的规则；

[点击前往](http://eslint.cn/docs/rules/)

### 与 v 0.0.1 对比

1. 增加模块化的预编译处理。
2. 业务模块的`API`区分环境。
3. 业务模块依赖的组件合并规则移至其目录下的`config.json`里。  
4. 工程组件部分增加配合预编译模块化的配置引用。
5. 取消了图片的压缩。(暂时)

### TODO
 
 1. 构建模块的细分（包含js/css部分）。
 2. 优化构建速度。
 3. 可配置的引用路径。
 4. 业务模块多样式文件的构建。
 5. 服务器的可配置项优化。
 6. 单元测试、e2e测试。
 7. CDN 的引用加载。
 
 

















