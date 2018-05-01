const zhCN = require('../i18n/zh-CN');
/** @ngInject */
function TranslateConfig ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.translations('zh-CN', zhCN);
    $translateProvider.preferredLanguage('zh-CN');
}

module.exports = TranslateConfig;
