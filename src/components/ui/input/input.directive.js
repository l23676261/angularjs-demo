const Controller = require('./input.controller.js');
/** @ngInject */
function Directive() {
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        templateUrl: '../src/components/ui/input/index.html',
        replace: true,
        controller: Controller,
        controllerAs: 'input_'
    }
}
module.exports = Directive;
