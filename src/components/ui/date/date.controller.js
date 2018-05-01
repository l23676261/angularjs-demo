/** @ngInject */
function Controller($rootScope, $scope, $element, $attrs) {
    const date_ = this;
    let {
        data = '',
    } = $scope;
    let {
        formKey = '',
        isRequire = false
    } = $attrs;
    date_.isRequire = isRequire;
    date_.click = function () {
        $rootScope.$emit('$changeSysKeyUpLimit',formKey);
    };
    $rootScope.$on('$sysFormToggleHide',function (event, msg) {
        if( msg !== formKey ){
            $($element).find('.input').fdatepicker('hide');
        }
    });
    $rootScope.$on('$sysFormToggleShow',function (event, msg) {
        if( msg === formKey ){
            $($element).find('.input').fdatepicker('show');
        }
    });
}
module.exports = Controller;
