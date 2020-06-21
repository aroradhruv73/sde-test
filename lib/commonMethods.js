const _ = require("underscore");

class CommonMethods {
    calculateBps = function(cYield, gYield){
        const self = this;
        return Math.round(Math.abs(this.decimalOnly(cYield) - this.decimalOnly(gYield)) * 100);
    }
    decimalOnly = function(inputString){
        return parseFloat(inputString.match(/[\d\.]+/))
    }

    findMin = function(governmentRecords, corporateTenor) {
        const self = this;
        const inputTenor = self.decimalOnly(corporateTenor);
        const result = _.min(governmentRecords, function(record){ 
            return Math.abs(inputTenor - self.decimalOnly(record.tenor)); 
        });
        return result;
    }
}
module.exports = CommonMethods;

