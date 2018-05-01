const registerController = require('../controller/register.controller.js');
const chargeController = require('../controller/charge.controller.js');
const registerService = require('../service/register.service.js');

angular.module('system.app.register',[
    'system.components.ui.keyUp',
    'system.components.ui.searchInput',
    'system.components.ui.select',
    'system.components.ui.input',
    'system.components.ui.date',
    'system.components.ui.message',
    'ngDialog'
])
    .config(registerConfig)
    .service('registerService',registerService);

/** @ngInject */
function registerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/register/entry");
    $stateProvider
        .state('register', {
            url: '/register',
            template: '<div ui-view></div>',
            abstract: true,
            title: 'register'
        })
        .state('register.entry', {
            url: '/entry',
            templateUrl: '../src/app/register/base/html/register.html',
            controller: registerController,
            label: 'register'
        })
        .state('register.charge', {
            url: '/charge',
            templateUrl: '../src/app/register/base/html/charge.html',
            controller: chargeController,
            label: 'charge'
        });
}
