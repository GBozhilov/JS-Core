function getPartials(section) {
    return {
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        section: `./templates/sections/${section}.hbs`
    }
}

function getUser(ctx) {
    ctx.user = sessionStorage.getItem('username')
}

function convertDates(str) {
    const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let d = new Date(str);
    return d.getDate() + ' ' + monthName[d.getMonth()];
}

function verifyInputFields(input) {
    getUser(this);

    let {destination, origin, departureDate, departureTime, seats, cost, img, public} = input;

    if (!destination) return notifier.showError('Destination can not be empty!');
    if (!origin) return notifier.showError('Origin can not be empty!');
    if (!seats || +seats < 0) return notifier.showError('Seats should be positive number!');
    if (!cost || +cost < 0) return notifier.showError('Cost should be positive number!');

    return {
        destination,
        origin,
        departureDate,
        departureTime,
        seats,
        cost,
        imgUrl: img,
        isPublic: (public === 'on').toString(),
        author: this.user
    };
}

appController.displayWelcome = function () {
    getUser(this);

    this.loadPartials(getPartials('viewCatalog'))
        .then(function () {
            this.partial('./templates/common/main.hbs');
        });
};

appController.displayRegister = function () {
    getUser(this);

    this.loadPartials(getPartials('viewRegister'))
        .then(function () {
            this.partial('./templates/common/main.hbs')
        });
};

appController.register = function () {
    let {username, pass, checkPass} = this.params;

    if (username.length < 5) {
        return notifier.showError('Username should be at least 5 characters long!');
    }

    if (!pass || !checkPass) {
        return notifier.showError('Passwords input fields should not be empty!');
    }

    if (pass !== checkPass) {
        return notifier.showError('Passwords must match!');
    }

    auth.register(username, pass)
        .then(userInfo => {
            auth.saveSession(userInfo);
            notifier.showInfo('User registration successful.');
            this.redirect('#/catalog');
        })
        .catch(notifier.handleError);
};

appController.displayLogin = function () {
    getUser(this);

    this.loadPartials(getPartials('viewLogin'))
        .then(function () {
            this.partial('./templates/common/main.hbs')
        });
};

appController.login = function () {
    let {username, pass} = this.params;

    if (username.length < 5) {
        return notifier.showError('Username should be at least 5 characters long!');
    }

    if (!pass) {
        return notifier.showError('Password input field should not be empty!');
    }

    auth.login(username, pass)
        .then(userInfo => {
            auth.saveSession(userInfo);
            getUser(this);
            notifier.showInfo('Login successful.');
            this.redirect('#/catalog');
        })
        .catch(notifier.handleError);
};

appController.logout = function () {
    auth.logout()
        .then(() => {
            sessionStorage.clear();
            notifier.showInfo('Logout successful.');
            this.redirect('#/login')
        })
        .catch(notifier.handleError);
};

appController.displayCatalog = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    requester.get('appdata', 'flights?query={"isPublic":"true"}')
        .then((flights) => {
            flights.forEach(f => f.date = convertDates(f.departureDate));
            this.flights = flights;
            this.loadPartials(getPartials('viewCatalog'))
                .then(function () {
                    this.partial('./templates/common/main.hbs')
                });
        })
        .catch(notifier.handleError);
};

appController.displayAddFlight = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    this.loadPartials(getPartials('viewAddFlight'))
        .then(function () {
            this.partial('./templates/common/main.hbs');
        });
};

appController.addFlight = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    let flightDetails = verifyInputFields(this.params);

    if (flightDetails) {
        requester.post('appdata', 'flights', flightDetails)
            .then(() => {
                notifier.showInfo('Created flight.');
                this.redirect('#/catalog');
            })
            .catch(notifier.handleError);
    }
};

appController.flightDetails = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    let flightId = this.params.id.slice(1);

    requester.get('appdata', 'flights/' + flightId)
        .then(flight => {
            flight.date = convertDates(flight.departureDate);
            flight.isAuthor = this.user === flight.author;
            this.flight = flight;
            this.loadPartials(getPartials('viewFlightDetails'))
                .then(function () {
                    this.partial('./templates/common/main.hbs');
                });
        })
        .catch(notifier.handleError);
};

appController.viewEditFlight = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    let flightId = this.params.id.slice(1);

    requester.get('appdata', 'flights/' + flightId)
        .then(flight => {
            if (this.user !== flight.author) return this.redirect('#');
            this.flight = flight;
            this.loadPartials(getPartials('viewEditFlight'))
                .then(function () {
                    this.partial('./templates/common/main.hbs')
                });
        })
        .catch(notifier.handleError);
};

appController.editFlight = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    let flightId = this.params.id.slice(1);

    let flightDetails = verifyInputFields(this.params);

    if (flightDetails) {
        requester.update('appdata', 'flights/' + flightId, flightDetails)
            .then(() => {
                notifier.showInfo('Successfully edited flight.');
                this.redirect('#/details/:' + flightId);
            })
            .catch(notifier.handleError);
    }
};

appController.displayMyFlights = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);
    let userId = sessionStorage.getItem('userId');

    // `flights?query={"author":"${this.user}"}&sort={"_kmd.ect": -1}`
    requester.get('appdata', `flights?query={"_acl.creator":"${userId}"}`)
        .then(flights => {
            flights.forEach((f, i) => {
                f.date = convertDates(f.departureDate);
            });
            this.flights = flights;
            this.loadPartials(getPartials('viewMyFlights'))
                .then(function () {
                    this.partial('./templates/common/main.hbs');
                });
        })
        .catch(notifier.handleError);
};

appController.deleteFlight = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    let flightId = this.params.id.slice(1);

    requester.remove('appdata', 'flights/' + flightId,)
        .then(() => {
            notifier.showInfo('Flight deleted.');
            this.redirect('#/myFlights');
        })
        .catch(notifier.handleError);
};