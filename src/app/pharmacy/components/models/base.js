function Base () {}
Base.prototype.attributeMap = {};
Base.prototype.hasMany = {};

Base.prototype.init = function (attributes = {}, callback) {
    angular.forEach(this.attributeMap, (oldKey, newKey) => {
       if (this.hasMany[newKey]) {
           this[newKey] = [];
           if (angular.isArray(attributes[oldKey])) {
               angular.forEach(attributes[oldKey], (item) => {
                   this[newKey].push(new this.hasMany[newKey](item, (child) => {
                       child.$parent = this;
                   }));
               });
           }
       } else {
           this[newKey] = attributes[oldKey];
       }
    });

    callback (this);
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
