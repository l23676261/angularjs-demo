/** @ngInject */
function directive() {
    return {
        restrict: 'EA',
        templateUrl: '../src/app/drug/base/html/distribution/recipeDetail.html',
        scope: {
            patient: '=',
            selected: '=',
        },
        /** @ngInject */
        controller: function ($scope, drugConstant) {
            $scope.show = function (recipe) {
                return !recipe.disabled;
            };

            $scope.gender = function () {
                return drugConstant.genderMap[$scope.patient.gender];
            };

            $scope.age = function () {
              return `${$scope.patient.age}岁`;
            };

            $scope.formatPrice = function (price) {
                return Number(price).toFixed(2);
            };

            $scope.colorCode = function (recipe) {
                let type = recipe.type || '0';
                return drugConstant.recipeTypeMap[String(type)];
            };

            $scope.group = function (drug, array) {
                let top = '┏';
                let middle = '┠';
                let bottom = '┗';
                if (drug.group) {
                    let index = array.indexOf(drug);
                    let before = array[index - 1];
                    let after = array[index + 1];
                    if (!before || before.group !== drug.group) {
                        if (after && after.group === drug.group) {
                            return top;
                        }
                    } else if (!after || after.group !== drug.group) {
                        if (before && before.group === drug.group) {
                            return bottom;
                        }
                    } else if (before && after && before.group === drug.group && after.group === drug.group){
                        return middle;
                    }
                }
            };
            $scope.$watch('selected', function () {
                if ($scope.patient) {
                    angular.forEach($scope.patient.recipes, function (recipe) {
                        recipe.disabled = $scope.selected.indexOf(recipe.id) === -1;
                    });
                }
            });
        }
    };
}
module.exports = directive;
