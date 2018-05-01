const Base = require('./base');
const Recipe = require('./recipe');
function Patient (attributes) {
    Base.call(this);
    this.init(attributes);
    angular.forEach(this.recipes, (recipe) => {
       recipe.patient = this;
    });
}
(function(){
    let Super = function(){};
    Super.prototype = Base.prototype;
    Patient.prototype = new Super();
    Patient.prototype.constructor = Patient;
    Patient.prototype.attributeMap = {
        id: 'patientId',
        name: 'patientName',
        birthday: 'birthday',
        age: 'age',
        gender: 'sex',
        allergy: 'anaphylaxis',
        height: 'height',
        weight: 'weight',
        recipes: 'recipeList',
    };
    Patient.prototype.hasMany = {
        recipes: Recipe
    };
})();
module.exports = Patient;
