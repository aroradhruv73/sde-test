const chai = require('chai');
const sinon = require('sinon');

const CommonMethods = require("../../lib/commonMethods");

const commonMethods = new CommonMethods();

const should = chai.should();

let sandbox;
describe('commonMethods', () => {
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('@decimalOnly', () => {
    it('should return decimal only value', () => {
        // Act
      const result = commonMethods.decimalOnly('123.0 abc');

      // Assert
      should.exist(result);
      result.should.eql(123.0);
    });
  });
  describe('@findMin', () => {
    it('should return min value based on governmentRecords when tenor is greater than corporateTenor', () => {

     const governmentRecords = [{
        "id": "g1",
        "type": "government",
        "tenor": "9.4 years",
        "yield": "3.70%",
        "amount_outstanding": 2500000
    },
    {
        "id": "g2",
        "type": "government",
        "tenor": "10.2 years",
        "yield": "1.70%",
        "amount_outstanding": 2000
    },
    {
        "id": "g3",
        "type": "government",
        "tenor": "9.6 years",
        "yield": "3.70%",
        "amount_outstanding": 1200000
    }];
     const corporateTenor = "10.3 years";
        // Act
      const result = commonMethods.findMin(governmentRecords, corporateTenor);

      // Assert
      should.exist(result);
      result.should.eql(governmentRecords[1]);
    });


    it('should return min value based on governmentRecords when tenor is nearest less than corporateTenor', () => {

      const governmentRecords = [{
         "id": "g1",
         "type": "government",
         "tenor": "9.4 years",
         "yield": "3.70%",
         "amount_outstanding": 2500000
     },
     {
         "id": "g2",
         "type": "government",
         "tenor": "10.2 years",
         "yield": "1.70%",
         "amount_outstanding": 2000
     },
     {
         "id": "g3",
         "type": "government",
         "tenor": "9.6 years",
         "yield": "3.70%",
         "amount_outstanding": 1200000
     }];
      const corporateTenor = "10.3 years";
         // Act
       const result = commonMethods.findMin(governmentRecords, corporateTenor);
 
       // Assert
       should.exist(result);
       result.should.eql(governmentRecords[1]);
     });
  });
});
