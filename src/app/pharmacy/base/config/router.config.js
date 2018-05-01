function templateUrl (name) {
    return `../src/app/pharmacy/base/html/${name}.html`;
}

/** @ngInject */
function config ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/pharmacy/distribution');
    $stateProvider
        .state('pharmacy', {
            url: '/pharmacy',
            template: '<div ui-view></div>',
            abstract: true,
            title: 'pharmacy'
        })
        .state('pharmacy.distribution',{
            url: '/distribution',
            templateUrl: templateUrl('distribution/index'),
            controller: 'distributionController',
            title: 'distribution'
        });
        // .state('pharmacy.distribution.patients',{
        //     templateUrl: templateUrl('distribution/patients'),
        //     params: {status: 'wait'},
        //     controller: 'patientsController'
        // });
}

module.exports = config;
