function getPartials(view) {
    return {
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        view: `./templates/views/${view}.hbs`
    }
}

function getUser(ctx) {
    ctx.user = sessionStorage.getItem('username')
}

function verifyInputFields(input) {
    getUser(this);

    let {title, description, brand, model, year, imageUrl, fuelType, price} = input;

    if (!title || !description || !brand || !model
        || !year || !imageUrl || !fuelType || !price) {
        return 'Empty field!'
    }

    if (title.length > 33) {
        return 'The title length must not exceed 33 characters!'
    }

    if (description.length < 30 || description.length > 450) {
        return 'The description length must not exceed 450 characters and should be at least 30!'
    }

    if (brand.length > 11 || fuelType.length > 11 || model.length > 11) {
        return 'Brand, Model or Fuel length must not exceed 11 characters!'
    }

    if (model.length < 4) {
        return 'The Model length should be at least 4 characters!'
    }

    if (year.length !== 4) {
        return 'The Year must be exactly 4 characters long!';
    }

    if (!/^http/.test(imageUrl)) {
        return 'Image link should start with "http"!'
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    return {
        title: escapeHtml(title),
        description: escapeHtml(description),
        brand: escapeHtml(brand),
        model: escapeHtml(model),
        year: escapeHtml(year),
        imageUrl: escapeHtml(imageUrl),
        fuel: escapeHtml(fuelType),
        price: escapeHtml(price),
        seller: escapeHtml(this.user)
    };
}

function validateUsernameAndPassword(username, password, repeatPass) {
    if (username.length < 3) {
        return 'Username should be at least 3 characters long!';
    }

    if (!/^[A-Za-z]+$/.test(username)) {
        return 'Username should contain only english alphabet letters!';
    }

    if (password.length < 6) {
        return 'Password should be at least 6 characters long!';
    }

    if (!/^[A-Za-z0-9]+$/.test(password)) {
        return 'Password should contain only english alphabet letters and digits!';
    }

    if (repeatPass && (password !== repeatPass)) {
        return 'Passwords must match!';
    }
}

appController.displayWelcome = function () {
    getUser(this);

    this.loadPartials(getPartials('viewWelcome'))
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
    let {username, password, repeatPass} = this.params;

    let validation = validateUsernameAndPassword(username, password, repeatPass);

    if (validation) {
        notifier.showError(validation);
        return;
    }

    auth.register(username, password)
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
    let {username, password} = this.params;

    let validation = validateUsernameAndPassword(username, password);

    if (validation) {
        notifier.showError(validation);
        return;
    }

    auth.login(username, password)
        .then(userInfo => {
            auth.saveSession(userInfo);
            getUser(this);
            notifier.showInfo('Login successful.');
            this.redirect('#/home');
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

    requester.get('appdata', 'cars?query={}&sort={"_kmd.ect": -1}')
        .then((cars) => {
            cars.forEach(f => {
                f.isAuthor = f.seller === this.user;
            });
            this.cars = cars;
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

appController.displayCreateListing = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    this.loadPartials(getPartials('viewCreateListing'))
        .then(function () {
            this.partial('./templates/common/main.hbs');
        });
};

appController.createListing = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    let carDetails = verifyInputFields(this.params);

    if (typeof carDetails === 'string') {
        notifier.showError(carDetails);
        return;
    }

    requester.post('appdata', 'cars', carDetails)
        .then(() => {
            notifier.showInfo('Listing created.');
            this.redirect('#/catalog');
        })
        .catch(notifier.handleError);

};

appController.viewEditAd = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    let carId = this.params.id.slice(1);

    requester.get('appdata', 'cars/' + carId)
        .then(car => {
            this.car = car;
            this.loadPartials(getPartials('viewEditAd'))
                .then(function () {
                    this.partial('./templates/common/main.hbs')
                });
        })
        .catch(notifier.handleError);
};

appController.editAd = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    let carId = this.params.id.slice(1);

    let carDetails = verifyInputFields(this.params);

    if (typeof carDetails === 'string') {
        notifier.showError(carDetails);
        return;
    }

    requester.update('appdata', 'cars/' + carId, carDetails)
        .then(() => {
            notifier.showInfo(`Listing ${carDetails.title} updated.`);
            this.redirect('#/catalog');
        })
        .catch(notifier.handleError);
};

appController.carDetails = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    let carId = this.params.id.slice(1);

    requester.get('appdata', 'cars/' + carId)
        .then(car => {
            car.isAuthor = this.user === car.seller;
            this.car = car;
            this.loadPartials(getPartials('viewCarDetails'))
                .then(function () {
                    this.partial('./templates/common/main.hbs');
                });
        })
        .catch(notifier.handleError);
};

appController.deleteAd = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    let carId = this.params.id.slice(1);

    requester.remove('appdata', 'cars/' + carId,)
        .then(() => {
            notifier.showInfo('Listing deleted');
            this.redirect('#/catalog');
        })
        .catch(notifier.handleError);
};

appController.displayMyListings = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    // `cars?query={"author":"${this.user}"}&sort={"_kmd.ect": -1}`
    // `cars?query={"seller":"${this.user}"}&sort={"_kmd.ect": -1}`
    requester.get('appdata', `cars?query={"seller":"${this.user}"}&sort={"_kmd.ect": -1}`)
        .then(cars => {
            this.cars = cars;
            this.loadPartials(getPartials('viewMyListings'))
                .then(function () {
                    this.partial('./templates/common/main.hbs');
                });
        })
        .catch(notifier.handleError);
};