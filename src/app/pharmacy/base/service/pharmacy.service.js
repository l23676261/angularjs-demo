const API = require('../../api');
const Patient = require('../../components/models/patient');
/** @ngInject */
function Service (http, $q) {
    /**
     * @description 读取配置信息
     * @return       {Promise<any>}
     */
    this.getConfig  = () => {
        let defer = $q.defer();
        defer.resolve({
            drugWindowCode: '01',
            reLoadInterval: 30,
            activeRules: [
                {
                    type: '3',
                    name: '处方号'
                },
                {
                    type: '4',
                    name: '身份证号'
                }
            ]
        });
        return defer.promise;
        // return getData(API.getApi('config'));
    };

    /**
     * @description 查询未发药患者列表
     * @param        {String}         window      发药窗口id
     * @param        {String}         type        查询类型 1: 未发药, 3: 已发药, 4: 推迟发药
     * @return       {Promise<any>}
     */
    this.getRecipes = ({window = '', type = ''}) => {
        let params = {
            drugWindowCode: window,
            bookState: type
        };
        let api = API.getApi('recipes');
        api.params = params;
        return _getData(api, function (data) {
            let result = [];
            angular.forEach(data, function (item) {
                result.push(new Patient(item));
            });
            return result;
        });
    };

    /**
     * @description  根据条件查询患者列表
     * @param        {String}     window       发药窗口id
     * @param        {String}     type         查询类型 1: 未发药, 3: 已发药, 4: 推迟发药
     * @param        {String}     searchType   搜索数据类型 1: 就诊卡号, 2: 发票号, 3: 处方号, 4: 结算号, 5: 科室, 6: 队列号, 7: 电子码, 8: 身份证号
     * @param        {String}     searchValue  搜索数据
     * @return       {Promise<any>}
     */
    // 根据条件查询患者列表
    this.searchRecipes = ({window = '', type = '', searchType = '', searchValue = '' }) => {
        let params = {
            drugWindowCode: window,
            bookState: type,
            searchType: searchType,
            queryCriteria: searchValue
        };
        let api = API.getApi('search');
        api.params = params;
        return _getData(api, function (data) {
            return data ? new Patient(data) : null;
        });
    };

    /**
     * @description  查询患者详细信息
     * @param        {String}      window      窗口 id
     * @param        {String}      type        查询类型 1: 未发药, 3: 已发药, 4: 推迟发药
     * @param        {String}      patientId   患者 id
     * @return       {Promise<any>}
     */
    this.getDetail = ({window = '', type  = '', patientId = ''}) => {
        let params = {
            drugWindowCode: window,
            bookState: type,
            patientId: patientId
        };
        let api = API.getApi('detail');
        api.params = params;
        return _getData(api, function (data) {
            return new Patient(data);
        });
    };

    /**
     * @description 确认发药
     * @param        {Array}        array    处方id 的数组
     * @return       {Promise<any>}
     */
    this.confirmRecipes = (array = []) => {
        let api = API.getApi('confirm');
        api.params = {recipeNoArr: array};
        return _getData(api);
    };

    /**
     * @description  取消发药
     * @param        {Array}        array    处方id 的数组
     * @return       {Promise<any>}
     */
    this.cancelRecipes = (array = []) => {
        let api = API.getApi('cancel');
        api.params = {recipeNoArr: array};
        return _getData(api);
    };

    /**
     * @description  推迟发药
     * @param        {Array}        array    处方id 的数组
     * @return       {Promise<any>}
     */
    this.delayRecipes = (array = []) => {
        let api = API.getApi('delay');
        api.params = {recipeNoArr: array};
        return _getData(api);
    };

    /**
     * @access private
     * @param  {Object}   options   url options
     * @param  {Function} callback  response data callback
     * */
    function _getData (options = {}, callback) {
        let defer = $q.defer();
        let promise = defer.promise;
        http(options).then((response) => {
            let data = response.data;
            if (callback) {
                data = callback (data);
            }
            defer.resolve(data, response.status, response);
        });
        return promise;
    }
}

module.exports = Service;
