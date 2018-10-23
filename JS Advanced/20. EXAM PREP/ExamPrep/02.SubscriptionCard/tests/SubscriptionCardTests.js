let expect = require('chai').expect;
let SubscriptionCard = require('../SubscriptionCard');

describe('SubscriptionCard', function () {
    describe('Constructor tests', function () {
        it('Testing the initialization of the constructor', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            expect(card.firstName).to.be.equal('Pesho');
            expect(card.lastName).to.be.equal('Petrov');
            expect(card.SSN).to.be.equal('00000000');
            expect(card._blocked).to.be.false;
        });
    });

    describe('isBlocked() tests', function () {
        it('should return false for new object', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            expect(card.isBlocked).to.be.false;
        });

        it('should return true for blocked card', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.block();
            expect(card.isBlocked).to.be.true;
        });

        it('should return false for unblocked card', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.block();
            card.unblock();
            expect(card.isBlocked).to.be.false;
        });

        it('should return false for unblocked card', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.unblock();
            expect(card.isBlocked).to.be.false;
        });

        it('should return true for unblocked and blocked card', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.unblock();
            card.block();
            expect(card.isBlocked).to.be.true;
        });
    });

    describe('addSubscription() tests', function () {
        it('Add correctly subscription empty _subscriptions', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            expect(card._subscriptions.length).to.be.equal(0);
            expect(card._subscriptions[0]).to.be.undefined;
            expect(card._subscriptions).to.be.eql([]);
        });

        it('Add correctly subscription', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card._subscriptions.length).to.be.equal(1);
            expect(card._subscriptions[0].line).to.be.equal('120');
            expect(card._subscriptions[0].startDate).to.be.eql(new Date('2018-04-22'));
            expect(card._subscriptions[0].endDate).to.be.eql(new Date('2018-05-21'));
        });

        it("Add correctly subscription *", function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card._subscriptions.length).to.be.equal(1);
            card.addSubscription('*', new Date('2018-05-25'), new Date('2018-06-24'));
            expect(card._subscriptions.length).to.be.equal(2);
            expect(card._subscriptions[0].line).to.be.equal('120');
            expect(card._subscriptions[0].startDate).to.be.eql(new Date('2018-04-22'));
            expect(card._subscriptions[0].endDate).to.be.eql(new Date('2018-05-21'));
            expect(card._subscriptions[1].line).to.be.equal('*');
            expect(card._subscriptions[1].startDate).to.be.eql(new Date('2018-05-25'));
            expect(card._subscriptions[1].endDate).to.be.eql(new Date('2018-06-24'));
        })
    });

    describe('isValid() tests', function () {
        it('empty card', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            expect(card.isValid('120', new Date('2018-04-22'))).to.be.false;
        });

        it('One day before', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-04-21'))).to.be.false;
        });

        it('On start date', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-04-22'))).to.be.true;
        });

        it('Between start and end date', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-04-23'))).to.be.true;
        });

        it('On end date', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-05-21'))).to.be.true;
        });

        it('One day after', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-05-22'))).to.be.false;
        });

        it('One day before', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('121', new Date('2018-04-21'))).to.be.false;
        });

        it('On start date', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('121', new Date('2018-04-22'))).to.be.false;
        });

        it('Between start and end date', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('121', new Date('2018-04-23'))).to.be.false;
        });

        it('On endDate', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('121', new Date('2018-05-21'))).to.be.false;
        });

        it('One day after', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('121', new Date('2018-05-21'))).to.be.false;
        });

        it('One day before', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('111', new Date('2018-04-21'))).to.be.false;
        });

        it('On start date', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('121', new Date('2018-04-22'))).to.be.true;
        });

        it('Between start and end date', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('604', new Date('2018-04-24'))).to.be.true;
            expect(card.isValid('111', new Date('2018-04-25'))).to.be.true;
            expect(card.isValid('280', new Date('2018-04-26'))).to.be.true;
        });

        it('On endDate', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('111', new Date('2018-05-21'))).to.be.true;
        });

        it('One day after', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            expect(card.isValid('120', new Date('2018-05-22'))).to.be.false;
        });

        it('Blocked card', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
            card.block();
            expect(card.isValid('120', new Date('2018-04-24'))).to.be.false;
            card.unblock();
            expect(card.isValid('120', new Date('2018-04-24'))).to.be.true;
        })
    });

    describe('Should not change fields', function () {
        it('Should not change fields', function () {
            const card = new SubscriptionCard('Pesho', 'Petrov', '00000000');
            card.firstName = 'Gogo';
            card.lastName = 'Ivanov';
            card.SSN = '11111111';
            expect(card.firstName).to.be.equal('Pesho');
            expect(card.lastName).to.be.equal('Petrov');
            expect(card.SSN).to.be.equal('00000000');
        });
    });
});