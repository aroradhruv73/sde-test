const _ = require("underscore");
const CommonMethods = require("./commonMethods");
const commonMethods = new CommonMethods();

class ParseRecords {
    constructor(inputData) {
        this.corporateRecords = _.filter(inputData.data, function (record) {
            return record.yield && record.type == 'corporate'
        });
        this.governmentRecords = _.filter(inputData.data, function (record) {
            return record.yield && record.type == 'government'
        });
    }

    validate = function () {
        // Check if corporate and government records has valid values
        if (this.corporateRecords.length == 0) {
            console.log("No corporate records found with valid yield")
            return false;
        }
        if (this.governmentRecords.length == 0) {
            console.log("No government records found with valid yield")
            return false;
        }
        return true;
    }

    process = function () {
        let outputArray = [];
        this.corporateRecords.forEach(corporateRecord => {
            const govRecord = commonMethods.findMin(this.governmentRecords, corporateRecord.tenor)
            const bps = commonMethods.calculateBps(corporateRecord.yield, govRecord.yield);
            outputArray.push({
                corporate_bond_id: corporateRecord.id,
                government_bond_id: govRecord.id,
                spread_to_benchmark: `${bps} bps`
            })
        });
        return outputArray;
    }
}
module.exports = ParseRecords;