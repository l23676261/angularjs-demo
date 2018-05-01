const Controller = require('./date.controller.js');
/** @ngInject */
function Directive() {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: '../src/components/ui/date/index.html',
        replace: true,
        controller: Controller,
        controllerAs: 'date_',
        link: function (scope, elem, attrs, date_) {
            const $elem = $(elem),
                   $input = $elem.find('.input');
            $input.fdatepicker({
                language: 'zh-CN',
                format: 'yyyy-mm-dd'
            }).on('changeDate', function (ev) {
                let value = $(ev.target).val();
                scope.$apply(function () {
                    scope.data = value;
                });
            });
            $input.on('click',function () {
                scope.$apply(function () {
                    date_.click();
                });
            });
        }
    }
}
module.exports = Directive;
