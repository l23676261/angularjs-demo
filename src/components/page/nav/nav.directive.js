const Controller = require('./nav.controller.js');

/** @ngInject */
function Directive() {
    return {
        restrict : 'E',
        scope: {
        },
        templateUrl: '../src/components/page/nav/nav.html',
        replace : true,
        controller: Controller,
        controllerAs: 'this_',
        link ( scope, elem, attrs ) {

        }
    };
}
module.exports = Directive;
