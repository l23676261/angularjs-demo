
let Base = function () {};
Base.prototype.attributeMap = {};
Base.prototype.hasMany = {};
Base.prototype.init = function (attributes = {}) {
    angular.forEach(this.attributeMap, (oldKey, newKey) => {
       if (this.hasMany[newKey]) {
           this[newKey] = [];
           if (angular.isArray(attributes[oldKey])) {
               angular.forEach(attributes[oldKey], (item) => {
                   this[newKey].push(new this.hasMany[newKey](item));
               });
           }
       } else {
           this[newKey] = attributes[oldKey];
       }
    });
    return this;
};
Base.prototype.toJson = function () {
    let result = {};
    angular.forEach(this.attributeMap, (oldKey, newKey) => {
        if (this.hasMany[newKey]) {
            result[oldKey] = [];
            angular.forEach(this[newKey], function (item) {
                result[oldKey].push(item instanceof Base ? item.toJson() : item);
            });
        } else {
            result[oldKey] = this[newKey];
        }
    });
    return result;
};
module.exports = Base;
