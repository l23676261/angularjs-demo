const { API, Domain } = require('../../api.js');

/** @ngInject */
function registerService(http, $q) {
    //获取午别
    this.getNoons = () => (
        http({
            domain: Domain,
            url: `${API.getNoons}`
        })
    );
    //获取科室
    this.getDepartments = ({ date = '', noonCode = '' }) => (
        http({
            domain: Domain,
            url: `${API.getDepartments}`,
            isStatic: true,
            params: {
                date: date,
                noonCode: noonCode
            }
        })
    );
    //获取医生
    this.getDoctors = ({ date = '', noonCode = '' }) => (
        http({
            domain: Domain,
            url: `${API.getDoctors}`,
            isStatic: true,
            params: {
                date: date,
                noonCode: noonCode
            }
        })
    );
    //获取挂号级别
    this.getLevel = () => (
        http({
            domain: Domain,
            url: `${API.getLevel}`
        })
    );
    //获取结算类别
    this.getPayKind = () => (
        http({
            domain: Domain,
            url: `${API.getPayKind}`
        })
    );
    //获取性别
    this.getSexs = () => (
        http({
            domain: Domain,
            url: `${API.getSex}`
        })
    );
    //获取发票号
    this.getInvoice = () => (
        http({
            domain: Domain,
            url: `${API.getInvoice}`
        })
    );
    //生成档案号
    this.getRecord = () => (
        http({
            domain: Domain,
            url: `${API.getRecord}`
        })
    );
    //提交
    this.save = (params) => {
        return http({
            domain: Domain,
            url: `${API.submitRegister}`,
            type: 'post',
            data: params
        });
    };
    //获取无联动的所有， 包含（午别, 挂号级别, 结算类别, 性别）
    this.getAllOptions = () => {
        return $q.all([
            this.getNoons(),
            this.getLevel(),
            this.getPayKind(),
            this.getSexs(),
            this.getInvoice()
        ]);
    };
    //统一获取科室， 医生 列表
    this.getAllInformation = (options) => {
        return $q.all([
            this.getDepartments(options),
            this.getDoctors(options)
        ]);
    };
}
module.exports = registerService;
