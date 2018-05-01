/** @ngInject */
function Controller ($scope, $stateParams, $cacheFactory, drugService, drugConstant) {
    $scope.current = $stateParams.status;
    $scope.patients = [];
    $scope.activePatientId = null;

    $scope.hasActive = function () {
        return !!$scope.activePatientId;
    };

    $scope.setActive = function (patient) {
        $scope.activePatientId = patient.id;
    };

    $scope.isActive = function (patient) {
        return patient.id === $scope.activePatientId;
    };

    $scope.init = function () {
        $scope.getRecipes();
    };

    // call parent controller to change current tab name;
    $scope.$emit('activeTab', $scope.current);

    // Load recipes from services
    $scope.getRecipes = function (options) {
        let cache = $cacheFactory.get('distribution');
        let config = cache.get('config');
        let params = {
            window: config.drugWindowCode || '01',
            type: drugConstant.tabMap[$scope.current]
        };
        let get = drugService.getRecipes;
        if (options) {
            params.searchType = options.type;
            params.searchValue = options.value;
            get = drugService.searchRecipes;
        }
        get(params).then((data) => {
            let items = data ? data : [];
            let patients = angular.isArray(items) ? items : [items];
            if ($scope.hasActive()) {
                let patient;
                for (let i=0; i<patients.length; i++) {
                    let p = patients[i];
                    if ($scope.isActive(p)) {
                        patient = p;
                        angular.forEach(p.recipes, function (recipe) {
                            recipe.selected = $scope.$parent.selectedRecipes.indexOf(recipe.id) !== -1;
                        });
                        break;
                    }
                }
                if (patient) $scope.showDetail(patient);
            } else {
                if (patients.length > 0) {
                    $scope.setActive(patients[0]);
                    $scope.showDetail(patients[0]);
                }
            }
            $scope.patients = patients;
        });
    };

    // Wait parent message to refresh current data;
    $scope.$on('reload', function (e, clean, options) {
        if (clean) $scope.activePatientId = null;
        $scope.getRecipes(options);
    });

    $scope.showDetail = function (node) {
        let patient = node.$modelValue || node;
        let selected = [];
        if (!$scope.isActive(patient)) $scope.setActive(patient);
        angular.forEach(patient.recipes, function (recipe) {
           if ($scope.isSelected(recipe)) selected.push(recipe.id);
        });
        $scope.$emit('showDetail', patient, selected, $scope.current);
    };

    $scope.select = function (node) {
        let recipe = node.$modelValue;
        recipe.selected = !$scope.isSelected(recipe);
        $scope.showDetail(node.$parent.$parent);
    };

    $scope.isSelected = function (recipe) {
      return angular.isUndefined(recipe.selected) || recipe.selected;
    };
}

module.exports = Controller;
