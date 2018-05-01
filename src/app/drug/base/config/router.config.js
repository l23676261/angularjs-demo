function templateUrl (name) {
    return `../src/app/drug/base/html/${name}.html`;
}
/** @ngInject */
function RouterConfig ($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.otherwise('/drug/distribution');
    $stateProvider
        .state('drug', {
            url: '/drug',
            template: '<div ui-view></div>',
            abstract: true,
            title: 'drug'
        })
        .state('drug.distribution',{
            url: '/distribution',
            templateUrl: templateUrl('distribution/index'),
            controller: 'distributionController',
            title: 'distribution'
        })
        .state('drug.distribution.tree',{
            templateUrl: templateUrl('distribution/patients'),
            params: {status: 'wait'},
            controller: 'patientController'
        });
}

module.exports = RouterConfig;
