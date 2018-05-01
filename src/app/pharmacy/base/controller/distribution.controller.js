/** @ngInject */
function Controller ($scope, $cacheFactory, $q, pharmacyConstant, pharmacyService) {
    // Controller default config
    $scope.currentTab = pharmacyConstant.defaultTab;
    $scope.reLoadInterval = pharmacyConstant.reLoadInterval;
    $scope.activeRules = [];

    $scope.getConfig = function () {
        let defer = $q.defer();
        let promise = defer.promise;
        let cache = $cacheFactory.get('distribution') || $cacheFactory('distribution');
        let config = cache.get('config');
        if (!config) {
            pharmacyService.getConfig().then((data) => {
                cache.put('config', data);
                defer.resolve(data);
            });
        } else {
            defer.resolve(config);
        }
        return promise;
    };

    $scope.init = function () {

    };
}

module.exports = Controller;
