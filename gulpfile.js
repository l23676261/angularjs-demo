const wrench = require('wrench');

wrench.readdirSyncRecursive('./gulp_build').filter(function(file) {
    return (/\.(js)$/i).test(file);
}).map(function (file) {
    require('./gulp_build/' + file);
});
