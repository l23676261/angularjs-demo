const Directive = require('./layout.directive.js');
angular.module('system.components.page.layout',[
    'system.components.page.nav'
])
    .directive('sysLayout', Directive);
