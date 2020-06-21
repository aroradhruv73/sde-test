const chai = require('chai');
const sinon = require('sinon');

const ParseRecords = require("../../lib/parseRecords");


const should = chai.should();

let sandbox;
describe('parseRecords', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('@validate', () => {
        it('should return false when only government type records are present', () => {

            const inputRecords = {
                "data": [{
                    "id": "g1",
                    "type": "government",
                    "tenor": "9.4 years",
                    "yield": "3.70%",
                    "amount_outstanding": 2500000
                }]
            };

            const parseRecords = new ParseRecords(inputRecords);
            // Act
            const result = parseRecords.validate();

            // Assert
            should.exist(result);
            result.should.eql(false);
        });
        it('should return false when only corporate type records are present', () => {

            const inputRecords = {
                "data": [{
                    "id": "c1",
                    "type": "corporate",
                    "tenor": "10.3 years",
                    "yield": "5.30%",
                    "amount_outstanding": 1200000
                }]
            };

            const parseRecords = new ParseRecords(inputRecords);
            // Act
            const result = parseRecords.validate();

            // Assert
            should.exist(result);
            result.should.eql(false);
        });

        it('should return true when more than one corporate and one government type records are present', () => {

            const inputRecords = {
                "data": [{
                    "id": "c1",
                    "type": "corporate",
                    "tenor": "10.3 years",
                    "yield": "5.30%",
                    "amount_outstanding": 1200000
                },
                {
                    "id": "g1",
                    "type": "government",
                    "tenor": "9.4 years",
                    "yield": "3.70%",
                    "amount_outstanding": 2500000
                }]
            };

            const parseRecords = new ParseRecords(inputRecords);
            // Act
            const result = parseRecords.validate();

            // Assert
            should.exist(result);
            result.should.eql(true);
        });

        it('should return false when yield type is null', () => {

            const inputRecords = {
                "data": [{
                    "id": "c1",
                    "type": "corporate",
                    "tenor": "10.3 years",
                    "yield": null,
                    "amount_outstanding": 1200000
                },
                {
                    "id": "g1",
                    "type": "government",
                    "tenor": "9.4 years",
                    "yield": "3.70%",
                    "amount_outstanding": 2500000
                }]
            };

            const parseRecords = new ParseRecords(inputRecords);
            // Act
            const result = parseRecords.validate();

            // Assert
            should.exist(result);
            result.should.eql(false);
        });
    });
});
