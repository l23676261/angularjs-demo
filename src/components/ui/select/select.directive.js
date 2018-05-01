const Controller = require('./select.controller.js');

/** @ngInject */
function Directive() {
    return {
        restrict : 'E',
        scope: {
            data: '=',
            activeData: '=',
            toggleActiveCallback: '&'
        },
        templateUrl: '../src/components/ui/select/index.html',
        replace : true,
        controller: Controller,
        controllerAs: 'select_',
        link ( scope, elem, attrs, select_ ) {
            const apply_ = function (callback) {
                scope.$apply(callback);
            };
            let $elem = $(elem);
            $elem.find('.content').on('click', function () {
                apply_(function () {
                    select_.toggleOpen(true);
                });
                return false;
            });
            $(document).unbind('click').on('click', function (e) {
                apply_(function () {
                    select_.toggleOpen(false);
                });
            });
            $(document).on('keyup', function (e) {
                if( select_.isOpen ){
                    switch ( e.keyCode ){
                    //下
                    case 40:
                        if( !select_.hoverData.code ){
                            select_.hoverData = {
                                code: scope.data[0].code
                            };
                            select_.setHoverKey(0);
                            scope.$digest();
                        }else{
                            if( ( select_.hoverKey + 2 ) < scope.data.length ){
                                select_.hoverData = {
                                    code: scope.data[select_.hoverKey + 2].code
                                };
                                select_.setHoverKey(select_.hoverKey + 2);
                                scope.$digest();
                            }
                        }
                        break;
                    //上
                    case 38:
                        if( ( select_.hoverKey - 2 ) >= 0 ){
                            select_.hoverData = {
                                code: scope.data[select_.hoverKey - 2].code
                            };
                            select_.setHoverKey(select_.hoverKey - 2);
                            scope.$digest();
                        }
                        break;
                    //右
                    case 39:
                        if( ( select_.hoverKey + 1 ) < scope.data.length ){
                            select_.hoverData = {
                                code: scope.data[select_.hoverKey + 1].code
                            };
                            select_.setHoverKey(select_.hoverKey + 1);
                            scope.$digest();
                        }
                        break;
                    //左
                    case 37:
                        if( ( select_.hoverKey - 1 ) >= 0 ){
                            select_.hoverData = {
                                code: scope.data[select_.hoverKey - 1].code
                            };
                            select_.setHoverKey(select_.hoverKey - 1);
                            scope.$digest();
                        }
                        break;
                    //esc
                    case 27:
                        select_.toggleOpen(false);
                        scope.$digest();
                        break;
                    //enter
                    case 13:
                        if( select_.hoverKey >= 0 ){
                            apply_(function () {
                                select_.toggleActive(scope.data[select_.hoverKey], select_.hoverKey);
                            });
                            select_.submit();
                        }
                        break;
                    }
                }
            });
        }
    };
}
module.exports = Directive;
