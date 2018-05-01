/** @ngInject */
function Controller($rootScope, $scope, $element, $attrs, $transclude) {
    const select_ = this;
    let {
        data = [],
        activeData = {},
        toggleActiveCallback = () => {}
    } = $scope;
    let {
        isOpen = false,
        formKey = '',
        isRequire = false
    } = $attrs;
    select_.isRequire = isRequire;
    select_.hoverKey = 0;
    select_.hoverData = activeData;
    for( let key in data ){
        if( data[key].code === activeData.code ){
            select_.hoverKey = parseInt(key);
        }
    }
    select_.isOpen = isOpen;
    select_.toggleActive = function (item, index) {
        select_.hoverKey = index;
        select_.isOpen = false;
        $scope.activeData = item;
        toggleActiveCallback();
    };
    select_.toggleOpen = function (value, callback) {
        $rootScope.$emit('$sysFormToggleHide',formKey);
        select_.isOpen = value;
        if( value ){
            if( activeData ){
                select_.hoverData = $scope.activeData;
            }
            select_.initHoverKey();
            $rootScope.$emit('$changeSysKeyUpLimit',formKey);
        }
        if( callback && typeof callback === 'function'){
            callback(select_.isOpen);
        }
    };
    select_.setHoverKey = function (key) {
        select_.hoverKey = key;
    };
    select_.initHoverKey = function () {
        for( let key in $scope.data ){
            if( $scope.data[key].code === $scope.activeData.code ){
                select_.hoverKey = parseInt(key);
            }
        }
    };
    select_.submit = function () {
        $rootScope.$emit('$sysSelectEnter',{ formKey: formKey, value: select_.activeData});
    };
    $rootScope.$on('$sysFormToggleHide',function (event, msg) {
        select_.isOpen = false;
    });
    $rootScope.$on('$sysFormToggleShow',function (event, msg) {
        if( msg === formKey ){
            select_.isOpen = true;
            select_.hoverData = $scope.activeData;
            select_.initHoverKey();
        }
    });
}
module.exports = Controller;
