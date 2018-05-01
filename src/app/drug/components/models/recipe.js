const Base = require('./base');
const Drug = require('./drug');
function Recipe (attributes) {
    Base.call(this);
    this.init(attributes);
    angular.forEach(this.drugs, (drug) => {
        drug.recipe = this;
    });
}
(function(){
    let Super = function(){};
    Super.prototype = Base.prototype;
    Recipe.prototype = new Super();
    Recipe.prototype.constructor = Recipe;
    Recipe.prototype.attributeMap = {
        id: 'recipeNo',
        type: 'recipeType',
        departmentName: 'seeDeptname',
        doctorName: 'seeDocname',
        diagnose: 'icdName',
        total: 'totalAmount',
        drugs: 'drugList'
    };
    Recipe.prototype.hasMany = {
        drugs: Drug
    };
})();
module.exports = Recipe;
