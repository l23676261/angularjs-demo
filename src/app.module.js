const appConfig = require('./config/app.config.js');

angular.module('system',appConfig.entry.module)
    .constant('restDomain', appConfig.restDomain)
    .config(systemConfig)
    .controller('mainController',mainController);

/** @ngInject */
function systemConfig($stateProvider, $httpProvider, restDomain, httpProvider) {
    httpProvider.domain = restDomain;
}
/** @ngInject */
function mainController($rootScope) {
    $rootScope.$on('$stateChangeStart',() => {
    });
}
