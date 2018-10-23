let expect = require('chai').expect;
let mathEnforcer = require('../04.MathEnforcer').mathEnforcer;

describe('mathEnforcer', function () {
    describe('addFive', function () {
        it('should return undefined for "10"', function () {
            expect(mathEnforcer.addFive('10')).to.be.undefined;
        });

        it('should return undefined for "abc"', function () {
            expect(mathEnforcer.addFive('abc')).to.be.undefined;
        });

        it('should return undefined for []', function () {
            expect(mathEnforcer.addFive([])).to.be.undefined;
        });

        it('should return undefined for {}', function () {
            expect(mathEnforcer.addFive({})).to.be.undefined;
        });

        it('should return 10 for 5', function () {
            expect(mathEnforcer.addFive(5)).to.be.equal(10);
        });

        it('should return 5 for 0', function () {
            expect(mathEnforcer.addFive(0)).to.be.equal(5);
        });

        it('should return -5 for -10', function () {
            expect(mathEnforcer.addFive(-10)).to.be.equal(-5);
        });

        it('should work with fractions', function () {
            expect(mathEnforcer.addFive(Math.PI)).to.be.equal(Math.PI + 5);
        });

        it('should work with fractions', function () {
            expect(mathEnforcer.addFive(0.1)).to.be.closeTo(5.1, 0.0001);
        });
    });

    describe('subtractTen', function () {
        it('should return undefined for "10"', function () {
            expect(mathEnforcer.subtractTen('10')).to.be.undefined;
        });

        it('should return undefined for "abc"', function () {
            expect(mathEnforcer.subtractTen('abc')).to.be.undefined;
        });

        it('should return undefined for []', function () {
            expect(mathEnforcer.subtractTen([])).to.be.undefined;
        });

        it('should return undefined for {}', function () {
            expect(mathEnforcer.subtractTen({})).to.be.undefined;
        });

        it('should return 0 for 10', function () {
            expect(mathEnforcer.subtractTen(10)).to.be.equal(0);
        });

        it('should return 10 for 20', function () {
            expect(mathEnforcer.subtractTen(20)).to.be.equal(10);
        });

        it('should return -40 for -30', function () {
            expect(mathEnforcer.subtractTen(-30)).to.be.equal(-40);
        });

        it('should work with fractions', function () {
            expect(mathEnforcer.subtractTen(15.3)).to.be.closeTo(5.3, 0.00001);
        });
    });

    describe('sum', function () {
        it('with non-number first parameter should return undefined', function () {
            expect(mathEnforcer.sum('abc', 3)).to.be.undefined;
        });

        it('with non-number first parameter should return undefined', function () {
            expect(mathEnforcer.sum({}, 7)).to.be.undefined;
        });

        it('with non-number second parameter should return undefined', function () {
            expect(mathEnforcer.sum(3.14, {})).to.be.undefined;
        });

        it('with non-number second parameter should return undefined', function () {
            expect(mathEnforcer.sum(0, [])).to.be.undefined;
        });

        it('with non-number second parameter should return undefined', function () {
            expect(mathEnforcer.sum(0.1, 'Go')).to.be.undefined;
        });

        it('should rework with fractions', function () {
            expect(mathEnforcer.sum(0.1, 0.2)).to.be.closeTo(0.3, 0.000001);
        });
    });
});