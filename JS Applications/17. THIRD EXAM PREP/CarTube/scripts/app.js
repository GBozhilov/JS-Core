const appController = {};

$(() => {
    let app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', appController.displayWelcome);
        this.get('#/home', appController.displayWelcome);
        this.get('#', appController.displayWelcome);

        this.get('#/register', appController.displayRegister);
        this.post('#/register', appController.register);

        this.get('#/login', appController.displayLogin);
        this.post('#/login', appController.login);

        this.get('#/logout', appController.logout);

        this.get('#/catalog', appController.displayCatalog);

        this.get('#/create', appController.displayCreateListing);
        this.post('#/create', appController.createListing);

        this.get('#/edit/:id', appController.viewEditAd);
        this.post('#/edit/:id', appController.editAd);

        this.get('#/details/:id', appController.carDetails);

        this.get('#/delete/:id', appController.deleteAd);

        this.get('#/myListings', appController.displayMyListings);
    });

    app.run();
});