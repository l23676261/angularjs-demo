/** @ngInject */
function Controller($rootScope, $scope, $element, $attrs) {
    const input_ = this;
    let {
        data = '',
    } = $scope;
    let {
        formKey = '',
        isRequire = false,
        isDisabled = false
    } = $attrs;
    input_.isRequire = isRequire;
    input_.isDisabled = isDisabled;
    input_.click = function () {
        $rootScope.$emit('$changeSysKeyUpLimit',formKey);
    };
    $rootScope.$on('$sysFormToggleShow',function (event, msg) {
        if( msg === formKey ){
            $($element).focus();
        }
    });
}
module.exports = Controller;
