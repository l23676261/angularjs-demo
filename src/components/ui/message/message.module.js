angular.module('system.components.ui.message',[
])
    .factory('$message', Factory);

/** @ngInject */
function Factory($timeout, $document) {
    const Message = function (options) {
        return new Message.fn.init(options);
    };
    const timer = 2000;
    let clear = null;
    Message.fn = Message.prototype = {
        constructor: Message,
        init({ type, msg }) {
            $timeout.cancel(clear);
            if( !$('#sys-message').length ){
                $('body').append(
                    `<div id="sys-message" class="${type}">${msg}</div>`
                );
            }else{
                $('#sys-message').removeClass('success').removeClass('error').addClass(type).removeClass('hide').html(msg);
            }
            clear = $timeout(function () {
                $('#sys-message').addClass('hide');
            }, timer);
        }
    };
    return {
        success(msg) {
            Message({
                type: 'success',
                msg: msg
            });
        },
        error(msg) {
            Message({
                type: 'error',
                msg: msg
            });
        }
    }
}
