/** @ngInject */
function Controller($rootScope, $attrs) {
    const keyup_ = this;
    let {
        sysKeyUp = [],
        nextKey = 0
    } = $attrs;
    keyup_.nextKey = nextKey;
    keyup_.data = sysKeyUp.split(',');
    keyup_.send = function (key) {
        $rootScope.$emit('$sysFormToggleHide',key);
        $rootScope.$emit('$sysFormToggleShow', key);
    };
    $rootScope.$on('$changeSysKeyUpLimit',function (event, msg) {
        if( msg ){
            for( let key in keyup_.data ){
                if( msg === keyup_.data[key] ){
                    keyup_.nextKey = key;
                }
            }
        }
    });
}
module.exports = Controller;
