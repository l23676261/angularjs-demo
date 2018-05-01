const Controller = require('./layout.controller.js');

/** @ngInject */
function Directive() {
    return {
        restrict : 'EA',
        scope: {
        },
        templateUrl: '../src/components/page/layout/layout.html',
        replace : true,
        controller: Controller,
        controllerAs: 'this_',
        link ( scope, elem, attrs ) {
        }
    };
}
module.exports = Directive;
