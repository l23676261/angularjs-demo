const gulp = require('gulp');
const gulpif = require('gulp-if');
const angularTemplatecache = require('gulp-angular-templatecache');
const htmlmin = require('gulp-htmlmin');
const inject = require('gulp-inject');
const order = require('gulp-order');
const concat = require('gulp-concat');
const ngAnnotate = require('gulp-ng-annotate');
const uglify = require('gulp-uglify');
const series = require('stream-series');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');
const runSequence = require('run-sequence').use(gulp);
const replace = require('gulp-replace');
const rev = require('gulp-rev');
const rename = require('gulp-rename');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const es = require('event-stream');

const path = require('../config/path/path.base.js');
const config = require('../config/gulp/gulp.production.js');
const sort = require('../config/gulp/gulp.sort');

/*
*   生成模块 html js模板
* */
gulp.task('build:module:html:to:js', () => {
    const modules_html = config.modules.map( (item) => (
        path.app + '/' + item + '/**/*.html'
    ));
    return gulp.src(modules_html)
        .pipe(angularTemplatecache('modules.templates.js',{
            module: 'system',
            root: `${path.dist}/modules`,
        }))
        .pipe(gulp.dest(`${path.dist}/js/cache`));
});
/*
*   生成主模块 html js模板
* */
gulp.task('build:main:html:to:js', () => {
    return gulp.src(`${path.src}/components/**/*.html`)
        .pipe(angularTemplatecache('main.templates.js',{
            module: 'system',
            root: `${path.dist}/modules`,
        }))
        .pipe(gulp.dest(`${path.dist}/js/cache`));
});
/*
*   压缩模块html文件
* */
gulp.task('build:module:html', () => {
    const modules_html = config.modules.map( (item) => (
        path.app + '/' + item + '/**/*.html'
    ));
    return gulp.src(modules_html, { base: path.src})
        .pipe(
            htmlmin({
                collapseWhitespace: true
            })
        )
        .pipe(gulp.dest(`${path.dist}/html`));
});
/*
*   压缩 主模块 components/html 文件
* */
gulp.task('build:main:html', () => {
    return gulp.src([
        `${path.src}/components/**/*.html`
    ], { base: path.src})
        .pipe(gulpif(config.option.html.mini,
            htmlmin({
                collapseWhitespace: true
            })
        ))
        .pipe(gulp.dest(`${path.dist}/html`));
});
/*
*   合并主模块 js组件
* */
gulp.task('build:main:components', () => {
    return browserify({
        entries: `${path.src}/components/components.entry.js`
    })
        .transform(babelify,{presets:['es2015']})
        .bundle()
        .pipe(source('components.concat.js'))
        .pipe(buffer())
        .pipe(ngAnnotate())
        .pipe(replace(config.option.html.repalcePath.src,config.option.html.repalcePath.dist))
        .pipe(gulpif(config.option.js.main.mini,uglify()))
        .pipe(gulp.dest(`${path.dist}/js/main/components`));
});
/*
/*
*   合并主模块js
* */
gulp.task('build:main:js', () => {
    return browserify({
        entries: `${path.src}/app.module.js`
    })
        .transform(babelify,{presets:['es2015']})
        .bundle()
        .pipe(source('app.concat.js'))
        .pipe(buffer())
        .pipe(ngAnnotate())
        .pipe(replace(config.option.html.repalcePath.src,config.option.html.repalcePath.dist))
        .pipe(gulpif(config.option.js.main.mini,uglify()))
        .pipe(gulp.dest(`${path.dist}/js/main`));
});
/*
*   合并第三方js库
* */
gulp.task('build:vendor:js', () => {
    let vendor = require(`../config/path/path.vendor.json`)["js"];
    let vendor_array = [];
    for( let item of vendor ){
        vendor_array.push(`${path.vendor}/${item}/**/*.js`);
    }
    return gulp.src(vendor_array)
        .pipe(concat('vendor.concat.js'))
        .pipe(gulp.dest(`${path.dist}/static/js`));
});
/*
*   合并第三方css库
* */
gulp.task('build:vendor:css', () => {
    let vendor = require(`../config/path/path.vendor.json`)["css"];
    let vendor_array = [];
    for( let item of vendor ){
        vendor_array.push(`${path.vendor}/${item}/**/*.css`);
    }
    for( let item of config.modules ){
        let ven =  require(`../src/app/${item}/config.json`)["vendor"];
        if( ven.length ){
            for( let key of ven ){
                vendor_array.push(`./static/${key}/**/*.css`);
            }
        }
    }
    return gulp.src(vendor_array)
        .pipe(concat('vendor.concat.css'))
        .pipe(gulp.dest(`${path.dist}/static/css`));
});
/*
*   拷贝 字体文件
* */
gulp.task('build:vendor:font', () => {
    return gulp.src(`./${config.option.font.path}/**/*.{otf,eot,svg,ttf,woff,woff2}`)
        .pipe(rename({ dirname: 'fonts'}))
        .pipe(gulp.dest(`${path.dist}/static`));
});
/*编译压缩模块依赖的第三方文件*/
gulp.task('build:module:js:vendor', () => {
    let modules_vendor_array_js = [];
    for( let item of config.modules ){
        let ven =  require(`../src/app/${item}/config.json`)["vendor"];
        let com =  require(`../src/app/${item}/config.json`)["components"];
        if( ven.length ){
            for( let key of ven ){
                modules_vendor_array_js.push(`./static/${key}/**/*.js`);
            }
        }
        if( com.length ){
            for( let key of com ){
                modules_vendor_array_js.push(`./src/${key}/components/**/*.js`);
            }
        }
    }
    return gulp.src(modules_vendor_array_js)
        .pipe(concat('module.vendor.concat.js'))
        .pipe(gulp.dest(`${path.dist}/static/js`));
});
/*
*   编译压缩模块js文件
* */
gulp.task('build:module:js', () => {
    const task = config.modules.map( (item) => {
        let src = path.app + '/' + item + `/${item}.entry.js`;
        return browserify({
            entries: src
        })
            .transform(babelify,{presets:['es2015']})
            .bundle()
            .pipe(source(`${item}.concat.js`))
            .pipe(buffer())
            .pipe(ngAnnotate())
            .pipe(replace(config.option.html.repalcePath.src,config.option.html.repalcePath.dist))
            .pipe(gulpif(config.option.js.module.mini, uglify()))
            .pipe(gulp.dest(`${path.dist}/js/modules`));
    });
    return es.merge.apply(null, task);
});
/*
*   编译公共less
* */
gulp.task('build:main:css', () => {
    return gulp.src(path.less + '/common/**/*.less', { base: path.src })
        .pipe(less())
        .pipe(concat('common.css'))
        .pipe(cleanCss({
            compatibility: config.option.css.compatibility,
            level: config.option.css.level
        }))
        .pipe(gulp.dest(`${path.dist}/css/common`));
});
/*
*   编译模块less
* */
gulp.task('build:module:css', () => {
    const modules_css = config.modules.map( (item) => (
        path.less + '/modules/' + item + '.less'
    ));
    return gulp.src(modules_css)
        .pipe(less())
        .pipe(concat('modules.css'))
        .pipe(cleanCss({
            compatibility: config.option.css.compatibility,
            level: config.option.css.level
        }))
        .pipe(gulp.dest(`${path.dist}/css/modules`));
});
/*
*  压缩图片
* */
gulp.task('build:image', () => (
    gulp.src(`${path.image}/**/*.{jpg,png,gif,ico,jpeg}`)
        // .pipe(imagemin())
        .pipe(gulp.dest(`${path.dist}/assets/image`))
));
/*
*  注入index.html
* */
gulp.task('build:inject', () => {
    const css = gulp.src([
        `${path.dist}/css/**/*.css`
    ]);
    const vendor_css = gulp.src([
        `${path.dist}/static/css/**/*.css`
    ]);
    const vendor_js = gulp.src([
        `${path.dist}/static/**/*.js`
    ]);
    const main = gulp.src([
        `${path.dist}/js/main/**/*.js`
    ]);
    const modules = gulp.src(config.modules.map( (item) => {
        return path.dist + '/js/modules/' + item + '.concat.js'
    }));
    const cache = gulp.src([
        `${path.dist}/js/cache/**/*.js`
    ]);
    gulp.src(`${path.src}/index.html`)
        .pipe(inject(
            series(vendor_css, css, vendor_js, main, modules, cache ).pipe(order(sort.production)), {
                ignorePath: '../dist',
                relative: true,
            }
        ))
        .pipe(gulpif(config.option.html.mini,
            htmlmin({
                collapseWhitespace: true,
                removeComments: true,
            })
        ))
        .pipe(gulp.dest(path.dist));
});


gulp.task('build', () => {
    runSequence(
        'dist:clean',
        'build:image',
        'build:main:html:to:js',
        'build:module:html:to:js',
        'build:module:html',
        'build:main:html',
        'build:main:components',
        'build:main:js',
        'build:vendor:js',
        'build:vendor:css',
        'build:vendor:font',
        'build:module:js:vendor',
        'build:module:js',
        'build:module:css',
        'build:main:css',
        'build:inject'
    );
});
