const config = require('../../config/app.config.js');
const domain = config.dev ? 'http://localhost:8301' : '';
// const domain = config.dev ? 'http://10.101.37.21:8301' : '';
// const domain = config.dev ? 'http://10.9.248.97:8301' : '';

/**
 * @constant
 * @description api 服务库
 */
const services = {
    drug: 'distributeDrug'
};

/**
 * @constant
 * @description api 版本库
 */
const versions = {
    v1: 'v1'
};

/**
 * @constant
 * @description api 接口库
 */
const store = {
    drug: {
        config: {
          method: 'GET',
          url: 'config'
        },
        recipes: {
            method: 'GET',
            url: 'recipe/list'
        },
        search: {
          method: 'GET',
          url: 'recipe'
        },
        detail: {
            method: 'GET',
            url: 'recipe/detail'
        },
        confirm: {
            method: 'PUT',
            url: 'recipe/confirm'
        },
        cancel: {
            method: 'PUT',
            url: 'recipe/cancel'
        },
        delay: {
            method: 'PUT',
            url: 'recipe/delay'
        }
    }
};

/**
 * @param {String} api Key in API store
 * @param {String} version Api version default: v1
 * @param {String} service Api service default: drug
 * @return {Object} Api object includes methods and url
 */
function _getApi (api, version = 'v1', service = 'drug') {
    if (!services[service]) throw `Can't find ${service} in services`;
    if (!versions[version]) throw `Can't find ${version} in versions`;
    if (!store[service]||!store[service][api]) throw `Can't find ${api} in store`;
    return {
        domain: domain,
        type: store[service][api]['method'],
        url: `${services[service]}/${versions[version]}/${store[service][api]['url']}`
    };
}

const API = {
    getApi: _getApi,
};

module.exports = API;
