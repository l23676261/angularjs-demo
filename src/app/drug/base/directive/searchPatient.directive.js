window.onhelp = function () { return false; };
/** @ngInject */
function directive() {
    return {
        restrict: 'EA',
        templateUrl: '../src/app/drug/base/html/common/searchPatient.html',
        /**
         * Search Patient Directive
         * @param {array}            rules       支出的查询的数据 item 元素 例：{type: '1', name: '身份证'}
         * @param {string} || {JSON} currentRule 当前的查询类型 例： '1' || {type: '1', name '身份证'}
         * @param {string}           switchKey   切换查询类型的快捷键 例 'esc', 'w', 'f1' 等
         * @param {string}           searchValue 查询数据             例: '0000001'
         * @param {function}         search      运行查询的函数, 输入框 快捷键 enter 运行 例: function search(type, value)
         * @param {function}         clear       清理查询结果的函数, 输入框没有值时运行
         */
        scope: {
            rules: '=',
            currentRule: '=',
            switchKey: '@',
            searchValue: '@',
            // TODO: switchLimit: when rules larger then limit, open select tag
            search: '&',
            clear: '&'
        },
        /** @ngInject */
        controller: function ($scope, hotkeys) {
            $scope.current = null;
            hotkeys.bindTo($scope).add({
                combo: 'enter',
                description: '根据输入查询',
                action: 'keydown',
                allowIn: ['INPUT'],
                callback: function (event) {
                    if (angular.isString($scope.searchValue) && $scope.searchValue.length > 0) {
                        $scope.searchInfo();
                    }
                    if (event.preventDefault) event.preventDefault();
                    event.returnValue = false;
                    return false;
                }
            });

            $scope.searchInfo = function () {
                if ($scope.search() && $scope.current) {
                    $scope.search()($scope.current.type, $scope.searchValue);
                }
            };

            $scope.clearResult = function () {
                if ($scope.clear()) {
                    $scope.clear()();
                }
            };

            $scope.$watch('rules',function () {
                if(angular.isArray($scope.rules)) {
                    angular.forEach($scope.rules, function (rule) {
                        if (rule.active) $scope.current = rule;
                    });
                    if (!$scope.current) $scope.current = $scope.rules[0];
                }
            });

            $scope.$watch('searchValue', function () {
                let value = $scope.searchValue;
                if (angular.isUndefined(value) || (angular.isString(value) && value.length === 0)) {
                    $scope.clearResult();
                }
            });

            $scope.$watch('currentRule', function () {
                let type = $scope.currentRule;
                if (angular.isNumber(type)) type = String(type);
                if (angular.isObject(type)) type = type.type;
                if (type && angular.isArray($scope.rules)) {
                    angular.forEach($scope.rules, function (rule) {
                       if (type === rule.type) $scope.current = rule;
                    });
                }
            });
            $scope.$watch('switchKey', function (oldValue, newValue) {
                if (oldValue) hotkeys.del(oldValue);
                if (newValue) {
                    hotkeys.bindTo($scope).add({
                        combo: $scope.switchKey.toLowerCase() || 'f1',
                        description: '切换病人查询规则',
                        action: 'keydown',
                        allowIn: ['INPUT'],
                        callback: function (event) {
                            if (angular.isArray($scope.rules)) {
                                let i = $scope.rules.indexOf($scope.current);
                                if (i !== -1) {
                                    $scope.current = i === $scope.rules.length - 1 ? $scope.rules[0] : $scope.rules[i+1];
                                }
                            }
                            if (event.preventDefault) event.preventDefault();
                            event.returnValue = false;
                            return false;
                        }
                    });
                }
            });
        }
    };
}

module.exports = directive;
