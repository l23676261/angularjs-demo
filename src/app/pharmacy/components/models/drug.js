const Base = require('./base');
function Drug (attributes) {
    Base.call(this);
    this.init(attributes);
}
(function(){
    let Super = function(){};
    Super.prototype = Base.prototype;
    Drug.prototype = new Super();
    Drug.prototype.constructor = Drug;
    Drug.prototype.attributeMap = {
        name: 'drugName',
        order: 'sortNo',
        group: 'combNo',
        quantity: 'quantity',
        dosage: 'dosage',
        companyName: 'manufacturer',
        price: 'unitPrice',
        total: 'totalCost'
    };
})();
module.exports = Drug;
