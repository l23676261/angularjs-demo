const config = require('../../config/app.config.js');
const Domain = config.dev ? 'http://10.9.248.121:8010' : '';
const API = {
    getNoons: 'v1/noons/',
    getDepartments: 'v1/opr/schemas/depts/',
    getDoctors: 'v1/opr/schemas/doctors/',
    getLevel: 'v1/regTypes',
    getPayKind: 'v1/payKinds',
    getSex: 'v1/sexs',
    getInvoice: 'v1/invoiceNo',
    getRecord: 'v1/genPatientId',
    getMonty: 'v1/regFee',
    submitRegister: 'v1/regInfo'
};
module.exports = { API, Domain };
