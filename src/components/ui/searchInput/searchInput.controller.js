/** @ngInject */
function Controller($rootScope, $scope, $element, $attrs, $transclude) {
    const this_ = this;
    let {
        data = [],
        activeData = {},
        searchValue = '',
        openCallback = () => {},
        toggleActiveCallback = () => {}
    } = $scope;
    let {
        isOpen = false,
        placeholder = '',
        formKey = '',
        isRequire = false
    } = $attrs;
    this_.isRequire = isRequire;
    this_.hoverKey = 0;
    this_.hoverData = activeData;
    for( let key in data ){
        if( data[key].code === activeData.code ){
            this_.hoverKey = key;
            return;
        }
    }
    this_.isOpen = isOpen;
    this_.placeholder = placeholder;

    this_.toggleActive = function (item, index) {
        if( item.limitCount === item.registedCount ){
            return false;
        }
        this_.hoverKey = index;
        this_.isOpen = false;
        $scope.activeData = item;
        toggleActiveCallback();
    };
    this_.toggleOpen = function (value, callback) {
        $rootScope.$emit('$sysFormToggleHide',formKey);
        this_.isOpen = value;
        if( value ){
            if( $scope.activeData ){
                this_.hoverData = $scope.activeData;
            }
            this_.initHoverKey();
            $rootScope.$emit('$changeSysKeyUpLimit',formKey);
            openCallback();
        }
        if( callback && typeof callback === 'function'){
            callback(this_.isOpen);
        }
    };
    this_.setHoverKey = function (key) {
        this_.hoverKey = key;
    };
    this_.initHoverKey = function () {
        for( let key in $scope.data ){
            if( $scope.data[key].code === $scope.activeData.code ){
                this_.hoverKey = parseInt(key);
            }
        }
    };
    this_.submit = function () {
        $rootScope.$emit('$sysSearchInputEnter',{ formKey: formKey, value: $scope.activeData});
    };
    $rootScope.$on('$sysFormToggleHide',function (event, msg) {
        this_.isOpen = false;
    });
    $rootScope.$on('$sysFormToggleShow',function (event, msg) {
        if( msg === formKey ){
            this_.isOpen = true;
            this_.hoverData = $scope.activeData;
            this_.initHoverKey();
            openCallback();
        }
    });
}
module.exports = Controller;
