const Controller = require('./searchInput.controller.js');

/** @ngInject */
function Directive() {
    return {
        restrict : 'E',
        scope: {
            data: '=',
            activeData: '=',
            searchValue: '=',
            openCallback: '&',
            toggleActiveCallback: '&'
        },
        templateUrl: '../src/components/ui/searchInput/index.html',
        replace : true,
        controller: Controller,
        controllerAs: 'this_',
        link ( scope, elem, attrs, this_ ) {
            const apply_ = function (callback) {
                scope.$apply(callback);
            };
            const step = 3;
            let $elem = $(elem);
            $elem.find('.content').on('click', function () {
                apply_(function () {
                    this_.toggleOpen(true);
                    open();
                });
                return false;
            });
            $elem.click(function () {
                return false;
            });
            $elem.find('.input').on({
                focus: function(){
                    return false;
                },
                click: function () {
                    apply_(function () {
                        this_.toggleOpen(true);
                    });
                    return false;
                }
            });
            $(document).unbind('click').on('click', function (e) {
                apply_(function () {
                    this_.toggleOpen(false);
                });
            });
            $(document).on('keyup', function (e) {
                if( this_.isOpen ){
                    switch ( e.keyCode ){
                    //下
                    case 40:
                        if( !this_.hoverData.code ){
                            this_.hoverData = {
                                code: scope.data[0].code
                            };
                            this_.setHoverKey(0);
                        }else{
                            if( ( this_.hoverKey + step ) < scope.data.length ){
                                this_.hoverData = {
                                    code: scope.data[this_.hoverKey + step].code
                                };
                                this_.setHoverKey(this_.hoverKey + step);
                            }
                        }
                        scope.$digest();
                        break;
                    //上
                    case 38:
                        if( ( this_.hoverKey - step ) >= 0 ){
                            this_.hoverData = {
                                code: scope.data[this_.hoverKey - step].code
                            };
                            this_.setHoverKey(this_.hoverKey - step);
                            scope.$digest();
                        }
                        break;
                    //右
                    case 39:
                        if( !this_.hoverData.code ){
                            this_.hoverData = {
                                code: scope.data[0].code
                            };
                            this_.setHoverKey(0);
                            scope.$digest();
                        }else if( ( this_.hoverKey + 1 ) < scope.data.length ){
                            this_.hoverData = {
                                code: scope.data[this_.hoverKey + 1].code
                            };
                            this_.setHoverKey(this_.hoverKey + 1);
                            scope.$digest();
                        }
                        break;
                    //左
                    case 37:
                        if( ( this_.hoverKey - 1 ) >= 0 ){
                            this_.hoverData = {
                                code: scope.data[this_.hoverKey - 1].code
                            };
                            this_.setHoverKey(this_.hoverKey - 1);
                            scope.$digest();
                        }
                        break;
                    //esc
                    case 27:
                        this_.toggleOpen(false);
                        scope.$digest();
                        break;
                    //enter
                    case 13:
                        if( this_.hoverKey >= 0 ){
                            apply_(function () {
                                this_.toggleActive(scope.data[this_.hoverKey], this_.hoverKey);
                            });
                            this_.submit();
                        }
                        break;
                    }
                }
            });
            if( attrs.isOpen ){
                open();
            }
            function open() {
                $elem.addClass('open').find('.input').focus();
            }
        }
    };
}
module.exports = Directive;
