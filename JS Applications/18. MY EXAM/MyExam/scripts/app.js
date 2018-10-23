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

        this.get('#/create', appController.displayCreateMeme);
        this.post('#/create', appController.createMeme);

        this.get('#/edit/:id', appController.viewEditMeme);
        this.post('#/edit/:id', appController.editMeme);

        this.get('#/delete/:id', appController.deleteMeme);

        this.get('#/details/:id', appController.memeDetails);

        this.get('#/myProfile', appController.displayMyProfile);

        this.get('#/deleteUser', appController.deleteUser);
    });

    app.run();
});