const Controller = require('./keyup.controller.js');
/** @ngInject */
function Directive() {
    return {
        restrict : 'A',
        controller: Controller,
        controllerAs: 'keyup_',
        link ( scope, elem, attrs, keyup_ ) {
            let action = function (type) {
                if( type === 1 ){
                    if( keyup_.nextKey >= keyup_.data.length - 1 ) {
                        keyup_.nextKey = 0;
                    }else {
                        keyup_.nextKey++;
                    }
                }else if( type === 2 ){
                    if( keyup_.nextKey < 0 ) {
                        keyup_.nextKey = keyup_.data.length - 1;
                    }else {
                        keyup_.nextKey--;
                    }
                }
                keyup_.send(keyup_.data[keyup_.nextKey]);
                scope.$digest();
            };
            function onKeyUp(e){
                if( e.keyCode === 9 || e.keyCode === 34 ){
                    action(1);
                }
                if( e.keyCode === 33 ){
                    action(2);
                }
                if( (e.keyCode === 40 && e.shiftKey) ){
                    action(3);
                }
            }
            function onKeyDown(e) {
                if( e.keyCode === 9 ){
                    e.preventDefault();
                    return false;
                }
            }
            $(document).on('keyup',onKeyUp);
            $(document).on('keydown',onKeyDown);
            scope.$on('$destroy',function () {
                $(document).unbind('keyup',onKeyUp);
                $(document).unbind('keydown',onKeyDown);
            });
        }
    };
}
module.exports = Directive;
