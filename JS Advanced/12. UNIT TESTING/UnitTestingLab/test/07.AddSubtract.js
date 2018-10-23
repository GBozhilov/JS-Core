let expect = require('chai').expect;
let createCalculator = require('../07.AddSubtract').createCalculator;

describe('createCalculator()', function () {
    let calc;

    beforeEach(function () {
        calc = createCalculator();
    });

    it('should return 5 for {add 3; add 2}', function () {
        calc.add(3);
        calc.add(2);
        let value = calc.get();
        expect(value).to.be.equal(5);
    });

    it('should return -5 for {subtract 3; subtract 2}', function () {
        calc.subtract(3);
        calc.subtract(2);
        let value = calc.get();
        expect(value).to.be.equal(-5);
    });

    it('should return 4.2 for {add 5.3; subtract 1.1}', function () {
        calc.add(5.3);
        calc.subtract(1.1);
        let value = calc.get();
        expect(value).to.be.equal(5.3 - 1.1);
    });

    it('should return 2 for {add 10; subtract "7"; add -2; subtract -1}', function () {
        calc.add(10);
        calc.subtract('7');
        calc.add(-2);
        calc.subtract('-1');
        let value = calc.get();
        expect(value).to.be.equal(2);
    });

    it('should return 16 for {add 10; add "7"; add "-2"; add 1}', function () {
        calc.add(10);
        calc.add('7');
        calc.add('-2');
        calc.add(1);
        let value = calc.get();
        expect(value).to.be.equal(16);
    });

    it('should return NaN for {add "hello"}', function () {
        calc.add('hello');
        let value = calc.get();
        expect(value).to.be.NaN;
    });

    it('should return NaN for {subtract "hello"}', function () {
        calc.subtract('hello');
        let value = calc.get();
        expect(value).to.be.NaN;
    });
});