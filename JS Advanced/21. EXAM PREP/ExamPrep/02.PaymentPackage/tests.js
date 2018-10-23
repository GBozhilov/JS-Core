const expect = require("chai").expect;
const PaymentPackage = require("./PaymentPackage");

describe('PaymentPackage tests', function () {
    describe('constructor', function () {
        it('should create an instance', function () {
            let pack = new PaymentPackage('HR Services', 1500);
            expect(pack.name).to.equal('HR Services');
            expect(pack.value).to.equal(1500);
            expect(pack instanceof PaymentPackage).to.be.true;
        });

        it('should create an instance with correct parameters', function () {
            let pack = new PaymentPackage('Services', 800);
            expect(pack.hasOwnProperty('_name')).to.be.true;
            expect(pack.hasOwnProperty('_value')).to.be.true;
            expect(pack.hasOwnProperty('_VAT')).to.be.true;
            expect(pack.hasOwnProperty('_active')).to.be.true;
            expect(pack.name).to.equal('Services');
            expect(pack.value).to.equal(800);
        });

        it('should create an instance with float value', function () {
            let pack = new PaymentPackage('Services', 800);
            pack.value = 0.1 + 0.1 + 0.1;
            expect(pack.value).to.be.closeTo(0.3, 0.000001);
            expect(pack.active).to.be.true;
            expect(pack.VAT).to.be.equal(20);
            pack.value = 800;
            expect(pack.value).to.be.greaterThan(700);
            expect(pack.value).to.be.lessThan(1000);
            expect(pack.VAT).to.be.greaterThan(18);
            expect(pack.VAT).to.be.lessThan(20.1);
            expect(pack._active).to.be.true;
            expect(pack._VAT).to.be.equal(20);
        });

        it('should throw error when initialised with incorrect values', function () {
            let p = null;
            expect(() => new PaymentPackage()).to.throw(Error);
            expect(() => new PaymentPackage(123, 123)).to.throw(Error);
            expect(() => new PaymentPackage('HR Services', {})).to.throw(Error);
            expect(() => new PaymentPackage('HR Services', 'abc')).to.throw(Error);
            expect(() => new PaymentPackage([], 123)).to.throw(Error);
            expect(() => new PaymentPackage(false, 123)).to.throw(Error);
            expect(() => new PaymentPackage('HR Services', true)).to.throw(Error);
            expect(() => new PaymentPackage('HR Services')).to.throw(Error);
            expect(() => new PaymentPackage('HR Services', -123)).to.throw(Error);
            expect(() => new PaymentPackage('HR Services', -12.3)).to.throw(Error);
            expect(() => new PaymentPackage('HR Services', null)).to.throw(Error);
            expect(() => new PaymentPackage('', 12.3)).to.throw(Error);
            expect(() => new PaymentPackage("Go", new Date(2010, 10, 10))).to.throw(Error);
            expect(() => new PaymentPackage(null, null)).to.throw(Error);
            expect(() => new PaymentPackage(undefined, undefined)).to.throw(Error);
            expect(() => new PaymentPackage('', 12.3)).to.throw(Error);
            expect(() => new PaymentPackage(23, '')).to.throw(Error);

        });
    });

    describe('name', function () {
        it('should create instance with correct parameters', function () {
            let p = new PaymentPackage('abc', 10);
            expect(p.name).to.be.equal('abc');
            expect(p._name).to.be.equal('abc');
            expect(p.hasOwnProperty('_name')).to.be.true;
        });

        it('should create instance with correct parameters', function () {
            let p = new PaymentPackage('Service', 100);
            expect(p.name).to.be.equal('Service');
            expect(p._name).to.be.equal('Service');
            expect(p.hasOwnProperty('_name')).to.be.true;
        });

        it('should throw Error with incorrect parameters', function () {
            let p = null;
            expect(() => new PaymentPackage(12, 12)).to.throw(Error);
            expect(() => new PaymentPackage('', 12)).to.throw(Error);
            expect(() => new PaymentPackage([1, 1], 12)).to.throw(Error);
            expect(() => new PaymentPackage({a: 5, b: 6}, 12)).to.throw(Error);
            expect(() => new PaymentPackage({}, 12)).to.throw(Error);
            expect(() => new PaymentPackage([], 12)).to.throw(Error);
        });
    });

    describe('value', function () {
        it('should create instance with correct parameters', function () {
            let p = new PaymentPackage('abc', 10);
            expect(p.value).to.be.equal(10);
            expect(p._value).to.be.equal(10);
            expect(p.hasOwnProperty('_value')).to.be.true;
            p.value = 20;
            expect(p.value).to.be.equal(20);
            expect(p._value).to.be.equal(20);
            expect(p.hasOwnProperty('_value')).to.be.true;
        });

        it('should create instance with float values', function () {
            let p = new PaymentPackage('Service', 0.1 + 0.1 + 0.1);
            expect(p.value).to.be.closeTo(0.3, 0.00001);
            expect(p._value).to.be.closeTo(0.3, 0.00001);
            expect(p.hasOwnProperty('_value')).to.be.true;
        });
    });

    describe('active', function () {
        let p = null;

        beforeEach(function () {
            p = new PaymentPackage('abc', 10);
        });

        it('should change value correct', function () {
            expect(p.active).to.be.true;
            expect(p._active).to.be.true;
            expect(p.hasOwnProperty('_active')).to.be.true;
            p.active = false;
            expect(p.active).to.be.false;
            expect(p._active).to.be.false;
            expect(p.hasOwnProperty('_active')).to.be.true;
            p.active = true;
            expect(p.active).to.be.true;
            expect(p._active).to.be.true;
            expect(p.hasOwnProperty('_active')).to.be.true;
            p.active = false;
            p.active = true;
            p.active = false;
            expect(p.active).to.be.false;
            expect(p._active).to.be.false;
            expect(p.hasOwnProperty('_active')).to.be.true;
        });

        it('throw Error with incorrect params', function () {
            expect(() => p.active = 5).to.throw(Error);
            expect(() => p.active = -0.1).to.throw(Error);
            expect(() => p.active = -0.0001).to.throw(Error);
            expect(() => p.active = '').to.throw(Error);
            expect(() => p.active = [1, 2]).to.throw(Error);
            expect(() => p.active = {}).to.throw(Error);
            expect(() => p.active = NaN).to.throw(Error);
            expect(() => p.active = null).to.throw(Error);
            expect(p.active).to.be.true;
            expect(p._active).to.be.true;
            expect(p.hasOwnProperty('_active')).to.be.true;
        });
    });

    describe('toString', function () {
        let p;

        beforeEach(function () {
            p = new PaymentPackage('HR Services', 1500);
        });

        it('should print correct result', function () {
            let expectedText = [
                `Package: ${p.name}`,
                `- Value (excl. VAT): ${p.value}`,
                `- Value (VAT ${p.VAT}%): ${p.value * (1 + p.VAT / 100)}`
            ].join('\n');
            expect(p.toString()).to.be.equal(expectedText);
        });


        it('should print correct result', function () {
            p.active = false;
            p.active = true;
            p.active = false;
            let expectedText = [
                `Package: ${p.name}` + ' (inactive)',
                `- Value (excl. VAT): ${p.value}`,
                `- Value (VAT ${p.VAT}%): ${p.value * (1 + p.VAT / 100)}`
            ].join('\n');
            expect(p.toString()).to.be.equal(expectedText);
            p.active = true;
            expectedText = [
                `Package: ${p.name}`,
                `- Value (excl. VAT): ${p.value}`,
                `- Value (VAT ${p.VAT}%): ${p.value * (1 + p.VAT / 100)}`
            ].join('\n');
            expect(p.toString()).to.be.equal(expectedText);
        });

        it('should return correct value for ("0", 0) inactive', function () {
            let p = new PaymentPackage('0', 0);
            p.active = false;
            p.active = true;
            p.active = false;
            let expectedText = [
                `Package: ${p.name}` + ' (inactive)',
                `- Value (excl. VAT): ${p.value}`,
                `- Value (VAT ${p.VAT}%): ${p.value * (1 + p.VAT / 100)}`
            ].join('\n');
            let actualText = p.toString();

            expect(actualText).to.be.equal(expectedText);
        });
    });
});
