let expect = require('chai').expect;
let lookupChar = require('../03.CharLookup').lookupChar;

describe('lookupChar', function () {
    it('with non-string first parameter, should return undefined', function () {
        expect(lookupChar({}, 1)).to.be.undefined;
    });

    it('with non-string first parameter, should return undefined', function () {
        expect(lookupChar(1, 1)).to.be.undefined;
    });

    it('with non-string second parameter, should return undefined', function () {
        expect(lookupChar('Correct input', 'Wrong input')).to.be.undefined;
    });

    it('with non-string second parameter, should return undefined', function () {
        expect(lookupChar('Correct input', [])).to.be.undefined;
    });

    it('with a floating point number second parameter, should return undefined', function () {
        expect(lookupChar('String here', Math.PI)).to.be.undefined;
    });

    it('with negative index value, should return Incorrect index', function () {
        expect(lookupChar('Correct input', -1)).to.be.equal('Incorrect index');
    });

    it('with an index value equal to string length, should return Incorrect index', function () {
        expect(lookupChar('abc', 3)).to.be.equal('Incorrect index');
    });

    it('with bigger than the str.length index, should return Incorrect index', function () {
        expect(lookupChar('abc', 100)).to.be.equal('Incorrect index');
    });

    it('with correct parameters, should return correct value', function () {
        expect(lookupChar('abc', 0)).to.be.equal('a');
    });

    it('with correct parameters, should return correct value', function () {
        expect(lookupChar('George', 5)).to.be.equal('e');
    });
});