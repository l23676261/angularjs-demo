angular.module('system.util.http',[])
    .provider('http', httpProvider);

/** @ngInject */
function httpProvider( ) {
    let timeout = 30000;
    const formatStaticParams = (params) => {
        let str = '';
        for( let item in params ){
            str += `${item}/${params[item]}/`;
        }
        return str;
    };
    return {
        /** @ngInject */
        domain: '',
        setTimeOut( timeout_ = 30000 ) {
            timeout = timeout_;
        },
        $get($http, $q) {
            const http_ = (domain, isStatic, url, type, params, data, timeout_ = timeout) => {
                const defer_ = $q.defer();
                const promise_ = defer_.promise;
                const callbackSuccess = ( response ) => defer_.resolve( response );
                const callbackError = error => console.log(error);
                let domain_ =  domain ? domain : this.domain;
                let domain_url = !isStatic ? `${domain_}/${url}` : `${domain_}/${url}` + formatStaticParams(params);
                $http({
                    url: domain_url,
                    method: type,
                    params: !isStatic ? params : {},
                    data: data,
                    timeout: timeout_
                })
                    .success(callbackSuccess)
                    .error(callbackError);
                return promise_;
            };
            return (options) => {
                let {
                    domain = this.domain,
                    isStatic = false,
                    url,
                    type = 'get',
                    params = {},
                    data = {},
                    timeout = 30000
                } = options;
                return http_(domain, isStatic, url, type, params, data, timeout);
            };
        }
    };
}
