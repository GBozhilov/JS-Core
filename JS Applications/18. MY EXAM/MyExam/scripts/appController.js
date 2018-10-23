function getPartials(view) {
    return {
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        view: `./templates/views/${view}.hbs`
    }
}

function getUser(ctx) {
    ctx.user = sessionStorage.getItem('username');
    ctx.userId = sessionStorage.getItem('userId');
    ctx.email = sessionStorage.getItem('email');
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

function verifyInputFields(input) {
    getUser(this);

    let {title, description, imageUrl} = input;

    if (!title || !description || !imageUrl) {
        return 'Empty field!'
    }

    if (title.length > 33) {
        return 'The title length must not exceed 33 characters!'
    }

    if (description.length < 30 || description.length > 450) {
        return 'The description length must not exceed 450 characters and should be at least 30!'
    }

    if (!/^http/.test(imageUrl)) {
        return 'Image url should start with "http"!'
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
        imageUrl: escapeHtml(imageUrl),
        creator: escapeHtml(this.user)
    };
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
    let {username, password, repeatPass, email, avatarUrl} = this.params;

    let validation = validateUsernameAndPassword(username, password, repeatPass);

    if (validation) {
        notifier.showError(validation);
        return;
    }

    auth.register(username, password, email, avatarUrl)
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

    requester.get('appdata', 'memes?query={}&sort={"_kmd.ect": -1}')
        .then((memes) => {
            memes.forEach(f => {
                f.isAuthor = f.creator === this.user;
            });
            this.memes = memes;
            this.loadPartials(getPartials('viewCatalog'))
                .then(function () {
                    this.partial('./templates/common/main.hbs')
                });
        })
        .catch(notifier.handleError);
};

appController.displayCreateMeme = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    this.loadPartials(getPartials('viewCreateMeme'))
        .then(function () {
            this.partial('./templates/common/main.hbs');
        });
};

appController.createMeme = function () {

    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    let memeDetails = verifyInputFields(this.params);

    if (typeof memeDetails === 'string') {
        notifier.showError(memeDetails);
        return;
    }

    requester.post('appdata', 'memes', memeDetails)
        .then(() => {
            notifier.showInfo('Meme created.');
            this.redirect('#/catalog');
        })
        .catch(notifier.handleError);
};

appController.viewEditMeme = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    let memeId = this.params.id.slice(1);

    requester.get('appdata', 'memes/' + memeId)
        .then(meme => {
            this.meme = meme;
            this.loadPartials(getPartials('viewEditMeme'))
                .then(function () {
                    this.partial('./templates/common/main.hbs')
                });
        })
        .catch(notifier.handleError);
};

appController.editMeme = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    let memeId = this.params.id.slice(1);

    let memeDetails = verifyInputFields(this.params);
    let oldTitle = this.params.title;

    if (typeof memeDetails === 'string') {
        notifier.showError(memeDetails);
        return;
    }

    requester.update('appdata', 'memes/' + memeId, memeDetails)
        .then(() => {
            notifier.showInfo(`Meme ${oldTitle} updated.`);
            this.redirect('#/catalog');
        })
        .catch(notifier.handleError);
};

appController.deleteMeme = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    let memeId = this.params.id.slice(1);

    requester.remove('appdata', 'memes/' + memeId,)
        .then(() => {
            notifier.showInfo('Meme deleted.');
            this.redirect('#/catalog');
        })
        .catch(notifier.handleError);
};

appController.memeDetails = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    let memeId = this.params.id.slice(1);

    requester.get('appdata', 'memes/' + memeId)
        .then(meme => {
            meme.isAuthor = this.user === meme.creator;
            this.meme = meme;
            this.loadPartials(getPartials('viewMemeDetails'))
                .then(function () {
                    this.partial('./templates/common/main.hbs');
                });
        })
        .catch(notifier.handleError);
};

appController.displayMyProfile = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    requester.get('appdata', `memes?query={"creator":"${this.user}"}&sort={"_kmd.ect": -1}`)
        .then(memes => {
            this.memes = memes;
            this.loadPartials(getPartials('viewUserProfile'))
                .then(function () {
                    this.partial('./templates/common/main.hbs');
                });
        })
        .catch(notifier.handleError);
};

appController.deleteUser = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    let userId = sessionStorage.getItem('userId');
    let appId = "kid_HkcpZnwvX";
    let url = `https://baas.kinvey.com/user/${appId}/${userId}/`;
    let request = {
        method: 'DELETE',
        url: url,
        headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authtoken')}
    };

    $.ajax(request)
        .then(function () {
            sessionStorage.clear();
            notifier.showInfo('User deleted.');
        })
        .catch(notifier.handleError);
};

// appController.getMyProfile = function () {
//     if (!auth.isLoading()) {
//         return this.redirect('#');
//     }
//
//     getUser(this);
//
//     let userId = this.userId;
//     let kinveyAppKey = "kid_HkcpZnwvX";
//     let url = `https://baas.kinvey.com/user/${kinveyAppKey}/${userId}/`;
//     let request = {
//         method: 'GET',
//         url: url,
//         headers: {Authorization: 'Kinvey ' + sessionStorage.getItem('authtoken')}
//     };
//
//     $.ajax(request)
//         .then(function (userInfo) {
//             getUser(this);
//             this.userInfo = userInfo;
//
//             this.loadPartials(getPartials('viewUserProfile'))
//                 .then(function () {
//                     this.partial('./templates/common/main.hbs');
//                 });
//         })
//         .catch(notifier.handleError);
//
//     // requester.get('appdata', 'cars/' + carId)
//     //     .then(car => {
//     //         car.isAuthor = this.user === car.seller;
//     //         this.car = car;
//     //         this.loadPartials(getPartials('viewUserProfile'))
//     //             .then(function () {
//     //                 this.partial('./templates/common/main.hbs');
//     //             });
//     //     })
//     //     .catch(notifier.handleError);
// };

// function validateUsernameAndPassword(username, password, repeatPass) {
//     if (username.length < 3) {
//         return 'Username should be at least 3 characters long!';
//     }
//
//     if (!/^[A-Za-z]+$/.test(username)) {
//         return 'Username should contain only english alphabet letters!';
//     }
//
//     if (password.length < 6) {
//         return 'Password should be at least 6 characters long!';
//     }
//
//     if (!/^[A-Za-z0-9]+$/.test(password)) {
//         return 'Password should contain only english alphabet letters and digits!';
//     }
//
//     if (repeatPass && (password !== repeatPass)) {
//         return 'Passwords must match!';
//     }
// }
//
// appController.displayWelcome = function () {
//     getUser(this);
//
//     this.loadPartials(getPartials('viewWelcome'))
//         .then(function () {
//             this.partial('./templates/common/main.hbs');
//         });
// };
//
// appController.displayRegister = function () {
//     getUser(this);
//
//     this.loadPartials(getPartials('viewRegister'))
//         .then(function () {
//             this.partial('./templates/common/main.hbs')
//         });
// };
//
// appController.register = function () {
//     let {username, password, repeatPass} = this.params;
//
//     let validation = validateUsernameAndPassword(username, password, repeatPass);
//
//     if (validation) {
//         notifier.showError(validation);
//         return;
//     }
//
//     auth.register(username, password)
//         .then(userInfo => {
//             auth.saveSession(userInfo);
//             notifier.showInfo('User registration successful.');
//             this.redirect('#/catalog');
//         })
//         .catch(notifier.handleError);
// };
//
// appController.displayLogin = function () {
//     getUser(this);
//
//     this.loadPartials(getPartials('viewLogin'))
//         .then(function () {
//             this.partial('./templates/common/main.hbs')
//         });
// };
//
// appController.login = function () {
//     let {username, password} = this.params;
//
//     let validation = validateUsernameAndPassword(username, password);
//
//     if (validation) {
//         notifier.showError(validation);
//         return;
//     }
//
//     auth.login(username, password)
//         .then(userInfo => {
//             auth.saveSession(userInfo);
//             getUser(this);
//             notifier.showInfo('Login successful.');
//             this.redirect('#/home');
//         })
//         .catch(notifier.handleError);
// };
//
// appController.logout = function () {
//     auth.logout()
//         .then(() => {
//             sessionStorage.clear();
//             notifier.showInfo('Logout successful.');
//             this.redirect('#/login')
//         })
//         .catch(notifier.handleError);
// };
//
// appController.displayCatalog = function () {
//     if (!auth.isLoading()) {
//         return this.redirect('#');
//     }
//
//     getUser(this);
//
//     requester.get('appdata', 'cars?query={}&sort={"_kmd.ect": -1}')
//         .then((cars) => {
//             cars.forEach(f => {
//                 f.isAuthor = f.seller === this.user;
//             });
//             this.cars = cars;
//             this.loadPartials(getPartials('viewCatalog'))
//                 .then(function () {
//                     this.partial('./templates/common/main.hbs')
//                 });
//         })
//         .catch(notifier.handleError);
// };
//
// appController.displayAddFlight = function () {
//     if (!auth.isLoading()) {
//         return this.redirect('#');
//     }
//
//     getUser(this);
//
//     this.loadPartials(getPartials('viewAddFlight'))
//         .then(function () {
//             this.partial('./templates/common/main.hbs');
//         });
// };
//
// appController.displayCreateListing = function () {
//     if (!auth.isLoading()) {
//         return this.redirect('#');
//     }
//
//     getUser(this);
//
//     this.loadPartials(getPartials('viewCreateListing'))
//         .then(function () {
//             this.partial('./templates/common/main.hbs');
//         });
// };
//
// appController.createListing = function () {
//     if (!auth.isLoading()) {
//         return this.redirect('#');
//     }
//
//     getUser(this);
//
//     let carDetails = verifyInputFields(this.params);
//
//     if (typeof carDetails === 'string') {
//         notifier.showError(carDetails);
//         return;
//     }
//
//     requester.post('appdata', 'cars', carDetails)
//         .then(() => {
//             notifier.showInfo('Listing created.');
//             this.redirect('#/catalog');
//         })
//         .catch(notifier.handleError);
//
// };
//
// appController.viewEditAd = function () {
//     if (!auth.isLoading()) {
//         return this.redirect('#');
//     }
//
//     getUser(this);
//
//     let carId = this.params.id.slice(1);
//
//     requester.get('appdata', 'cars/' + carId)
//         .then(car => {
//             this.car = car;
//             this.loadPartials(getPartials('viewEditAd'))
//                 .then(function () {
//                     this.partial('./templates/common/main.hbs')
//                 });
//         })
//         .catch(notifier.handleError);
// };
//
// appController.editAd = function () {
//     if (!auth.isLoading()) {
//         return this.redirect('#');
//     }
//
//     getUser(this);
//
//     let carId = this.params.id.slice(1);
//
//     let carDetails = verifyInputFields(this.params);
//
//     if (typeof carDetails === 'string') {
//         notifier.showError(carDetails);
//         return;
//     }
//
//     requester.update('appdata', 'cars/' + carId, carDetails)
//         .then(() => {
//             notifier.showInfo(`Listing ${carDetails.title} updated.`);
//             this.redirect('#/catalog');
//         })
//         .catch(notifier.handleError);
// };
//
// appController.carDetails = function () {
//     if (!auth.isLoading()) {
//         return this.redirect('#');
//     }
//
//     getUser(this);
//
//     let carId = this.params.id.slice(1);
//
//     requester.get('appdata', 'cars/' + carId)
//         .then(car => {
//             car.isAuthor = this.user === car.seller;
//             this.car = car;
//             this.loadPartials(getPartials('viewCarDetails'))
//                 .then(function () {
//                     this.partial('./templates/common/main.hbs');
//                 });
//         })
//         .catch(notifier.handleError);
// };
//
// appController.deleteAd = function () {
//     if (!auth.isLoading()) {
//         return this.redirect('#');
//     }
//
//     let carId = this.params.id.slice(1);
//
//     requester.remove('appdata', 'cars/' + carId,)
//         .then(() => {
//             notifier.showInfo('Listing deleted');
//             this.redirect('#/catalog');
//         })
//         .catch(notifier.handleError);
// };
//
// appController.displayMyListings = function () {
//     if (!auth.isLoading()) {
//         return this.redirect('#');
//     }
//
//     getUser(this);
//
//     // `cars?query={"author":"${this.user}"}&sort={"_kmd.ect": -1}`
//     // `cars?query={"seller":"${this.user}"}&sort={"_kmd.ect": -1}`
//     requester.get('appdata', `cars?query={"seller":"${this.user}"}&sort={"_kmd.ect": -1}`)
//         .then(cars => {
//             this.cars = cars;
//             this.loadPartials(getPartials('viewMyListings'))
//                 .then(function () {
//                     this.partial('./templates/common/main.hbs');
//                 });
//         })
//         .catch(notifier.handleError);
// };