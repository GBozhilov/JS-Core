let expect = require('chai').expect;
let isOddOrEven = require('../02.EvenOrOdd').isOddOrEven;

describe('isOddOrEven', function () {
    it('should return undefined for 5', function () {
        expect(isOddOrEven(5)).to.be.equal(undefined,
            'Function did not return the correct result!');
    });

    it('should return undefined for {length: 5}', function () {
        expect(isOddOrEven({length: 5})).to.be.equal(undefined,
            'Function did not return the correct result!');
    });

    it('should return "odd" for "Peter"', function () {
        expect(isOddOrEven('Peter')).to.be.equal('odd',
            'Function did not return the correct result!');
    });

    it('should return "even" for "Go"', function () {
        expect(isOddOrEven('Go')).to.be.equal('even',
            'Function did not return the correct result!');
    });

    it('with multiple consecutive checks, should return correct values', function () {
        expect(isOddOrEven('Hi')).to.be.equal('even',
            'Function did not return the correct result!');
        expect(isOddOrEven('Cat')).to.be.equal('odd',
            'Function did not return the correct result!');
        expect(isOddOrEven('Your')).to.be.equal('even',
            'Function did not return the correct result!');
        expect(isOddOrEven('Chair')).to.be.equal('odd',
            'Function did not return the correct result!');
    });
});