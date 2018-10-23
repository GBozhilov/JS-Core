const Calculator = require('./Calculator');
const expect = require('chai').expect;

describe('Testing Calculator', () => {
    let calc;

    beforeEach(() =>
        calc = new Calculator());

    describe('test create expenses', () => {
        it('should return object', () =>
            expect(typeof calc).to.equal('object'));
        it('should return empty str', () =>
            expect(calc.expenses.toString()).to.equal(''));
        it('should return num', () => {
            calc.add(5);
            expect(calc.expenses[0]).to.equal(5)
        });
        it('should return floating', () => {
            calc.add(3.14);
            expect(calc.expenses[0]).to.equal(3.14)
        });
        it('should return negative', () => {
            calc.add(-2);
            expect(calc.expenses[0]).to.equal(-2)
        });
        it('should return str', () => {
            calc.add('str');
            expect(calc.expenses[0]).to.equal('str')
        });
        it('should return array', () => {
            calc.add([]);
            expect(calc.expenses[0]).to.eql([])
        });
        it('should return obj', () => {
            calc.add({});
            expect(calc.expenses[0]).to.eql({})
        });
        it('should return function', () => {
            calc.add(() => {});
            expect(calc.expenses.toString()).to.eql('() => {}')
        });
        it('should return mix', () => {
            calc.add(5);
            calc.add(3.14);
            calc.add(-2);
            calc.add('str');
            calc.add([]);
            calc.add({});
            calc.add(() => {});
            expect(calc.expenses[0]).to.equal(5);
            expect(calc.expenses[1]).to.equal(3.14);
            expect(calc.expenses[2]).to.equal(-2);
            expect(calc.expenses[3]).to.equal('str');
            expect(calc.expenses[4]).to.eql([]);
            expect(calc.expenses[5]).to.eql({});
            expect(calc.expenses[6].toString()).to.eql('() => {}')
        });


    });
    describe('test create divideNums', () => {
        it('should return error', () => {
            expect(function () {
                calc.divideNums()
            }).throw(Error, "There are no numbers in the array!");
        });
        it('should return object', () => {
            calc.add(5);
            expect(calc.divideNums()).to.equal(5);
        });
        it('should return object', () => {
            calc.add(5);
            calc.add(5);
            expect(calc.divideNums()).to.equal(1);
        });
        it('should return error', () => {
            calc.add(5);
            calc.add(0);
            expect(calc.divideNums()).to.equal("Cannot divide by zero");
        });
        it('should return zero', () => {
            calc.add(0);
            expect(calc.divideNums()).to.equal(0);
        });
        it('should return zero', () => {
            calc.add(0);
            calc.add(5);
            expect(calc.divideNums()).to.equal(0);
        });
        it('should return num', () => {
            calc.add(5);
            calc.add(2);
            expect(calc.divideNums()).to.equal(2.5);
        });
        it('should return num', () => {
            calc.add(5.5);
            calc.add(2);
            expect(calc.divideNums()).to.equal(2.75);
        });
        it('should return num', () => {
            calc.add(-5);
            calc.add(2);
            expect(calc.divideNums()).to.equal(-2.5);
        });
        it('should return object', () => {
            calc.add(-5);
            calc.add(2);
            expect(calc.divideNums()).to.equal(-2.5);
        });
        it('should return object', () => {
            calc.add('str');
            calc.add(2);
            expect(calc.divideNums()).to.equal(2);
        });
        it('should return object', () => {
            calc.add('str');
            expect(function () {
                calc.divideNums()
            }).throw(Error, "There are no numbers in the array!");
        });
    });
    describe('test create toString', () => {
        it('should return empty array', () => {
            expect(calc.toString()).to.equal('empty array');
        });
        it('should return object', () => {
            calc.add(1);
            expect(calc.toString()).to.equal('1');
        });
        it('should return object', () => {
            calc.add(-1);
            expect(calc.toString()).to.equal('-1');
        });
        it('should return object', () => {
            calc.add(10);
            calc.add("Pesho");
            calc.add("5");
            expect(calc.toString()).to.equal('10 -> Pesho -> 5');
            calc.add(10);
            expect(calc.divideNums()).to.equal(1);
        });
    });
    describe('test create orderBy', () => {
        it('should return empty array', () => {
            expect(calc.orderBy()).to.equal('empty');
        });
        it('should return str', () => {
            calc.add(1);
            expect(calc.orderBy()).to.equal('1');
        });
        it('should return str', () => {
            calc.add(1);
            calc.add(2);
            expect(calc.orderBy()).to.equal('1, 2');
        });
        it('should return object', () => {
            calc.add(10);
            calc.add("Pesho");
            calc.add("5");
            calc.add(10);
            expect(calc.orderBy()).to.equal('10, 10, 5, Pesho');
        });
    });
});