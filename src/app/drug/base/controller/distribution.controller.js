/** @ngInject */
function Controller ($scope, drugService, $state, $q, ngDialog, $interval, $cacheFactory, $translate, drugConstant) {
    // Controller default config
    $scope.currentTab = drugConstant.defaultTab;
    $scope.reLoadInterval = drugConstant.reLoadInterval;
    $scope.activeRules = [];
    $scope.currentPatient = null;

    // Load System Config
    $scope.init = function () {
        $scope.getConfig().then((config) => {
            $scope.activeRules = config.activeRules;
            if (config.reLoadInterval) {
                let interval = Number(config.reLoadInterval);
                if (isNaN(interval) || interval < drugConstant.minInterval) {
                    interval = drugConstant.minInterval;
                }
                $scope.reLoadInterval = interval;
            }
            $state.go('.tree',{status: $scope.currentTab});
        });
    };

    // Load System config function
    $scope.getConfig = function () {
        let defer = $q.defer();
        let promise = defer.promise;
        let cache = $cacheFactory.get('distribution') || $cacheFactory('distribution');
        let config = cache.get('config');
        if (!config) {
            drugService.getConfig().then((data) => {
                cache.put('config', data);
                defer.resolve(data);
            });
        } else {
            defer.resolve(config);
        }
        return promise;
    };

    // switch tab
    $scope.openTab = function (tab) {
        if (tab !== $scope.currentTab) $state.go('drug.distribution.tree',{status: tab});
    };

    // search patient
    $scope.search = function (type, value) {
        $scope.block = true;
        $scope.searchOptions = {type: type, value: value};
        $scope.reload();
    };

    // clear search result
    $scope.clear = function () {
        $scope.block = false;
        delete $scope.searchOptions;
        $scope.reload(true);
    };

    // reload result
    $scope.reload = function (clean = false) {
        $scope.$broadcast('reload', clean,  $scope.searchOptions);
    };

    function confirmDialog (allowed = false, message = '') {
        if (allowed) {
            $scope.alertMessage = message;
            return ngDialog.openConfirm({
                template: '../src/app/drug/base/html/common/confirm.html',
                scope: $scope,
            });
        } else {
            let defer = $q.defer();
            defer.resolve();
            return defer.promise;
        }
    }
    // confirm selected recipes
    $scope.confirmRecipes = function () {
        if ($scope.currentTab !== 'sent') {
            confirmDialog(drugConstant.confirmDialog, $translate.instant('DIS_BUTTON_CONFIRM')).then(() => {
                postRecipes('confirm');
            });
        }
    };

    $scope.delayRecipes = function () {
        if ($scope.currentTab !== 'sent' && $scope.currentTab !== 'delay') {
            confirmDialog(drugConstant.delayDialog, $translate.instant('DIS_BUTTON_DELAY')).then(() => {
                postRecipes('delay');
            });
        }
    };

    $scope.cancelRecipes = function () {
        if ($scope.currentTab !== 'sent') {
            confirmDialog(drugConstant.cancelDialog, $translate.instant('DIS_BUTTON_CANCEL')).then(() => {
                postRecipes('cancel');
            });
        }
    };

    function postRecipes (type) {
        if ($scope.currentPatient) {
            let store = {
                confirm: drugService.confirmRecipes,
                delay: drugService.delayRecipes,
                cancel: drugService.cancelRecipes
            };
            let api = store[type];
            let block = $scope.block;
            $scope.block = true;
            api($scope.selectedRecipes).then(function () {
                delete $scope.currentPatient;
                $scope.selectedRecipes = [];
                $scope.block = block;
                $scope.reload(true);
            });
        }
    }

    // pause auto refresh
    $scope.pauseReload = function () {
      $scope.pause = !$scope.pause;
    };

    // print
    $scope.print = function () {
        let LODOP = getLodop();
        LODOP.PRINT_INIT('print1');
        LODOP.ADD_PRINT_TEXT(20,20,100,100,'测试');
        LODOP.PRINT();
    };
    // show Detail after click on the patient tree
    $scope.$on('showDetail', function (e, patient, selected, type) {
        if ($scope.currentPatient
            && $scope.currentPatient.id === patient.id
            && $scope.detailType === type) {
            $scope.selectedRecipes = selected;
        } else {
            $scope.getDetail(patient, selected);
        }
    });

    $scope.getDetail = function(patient, selected) {
        let window = $cacheFactory.get('distribution').get('config').drugWindowCode || '01';
        drugService
            .getDetail({window: window, type: drugConstant.tabMap[$scope.currentTab], patientId: patient.id})
            .then((patient) => {
                $scope.detailType = $scope.currentTab;
                $scope.currentPatient = patient;
                $scope.selectedRecipes = selected;
            });
    };

    // get message from sub controller
    $scope.$on('activeTab', function(e, tab) {
        $scope.currentTab = tab;
    });

    // add auto reload interval
    $scope.$watch('reLoadInterval', function () {
        if ($scope.reloadTimer) {
            $interval.cancel($scope.reloadTimer);
        }
        if ($scope.reLoadInterval) {
            $scope.reloadTimer = $interval(function () {
                if (!$scope.pause&&!$scope.block&&$scope.currentTab === 'wait') {
                    $scope.reload();
                }
            }, $scope.reLoadInterval * 1000);
        }
    });
}

module.exports = Controller;
