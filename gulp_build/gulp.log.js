const util = require('gulp-util');
const font = require('../config/gulp/gulp.font.js');

module.exports = {
    success(title) {
        util.log(
            util.colors.green(`[${font.system.name}]：${title}`)
        )
    },
    error(title) {
        util.log(
            util.colors.red(`[${font.system.name}]：${title}`)
        )
    },
    info(title) {
        util.log(
            util.colors.blue(`[${font.system.name}]：${title}`)
        )
    }
};
