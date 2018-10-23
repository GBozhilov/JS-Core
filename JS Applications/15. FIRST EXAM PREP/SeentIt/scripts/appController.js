function getPartials(section) {
    return {
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        menu: './templates/common/menu.hbs',
        section: `./templates/sections/${section}.hbs`
    }
}

function getUser(ctx) {
    ctx.user = sessionStorage.getItem('username');
}

function calcTime(dateIsoFormat) {
    let diff = new Date - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);

    function pluralize(value) {
        if (value !== 1) return 's';
        else return '';
    }
}

appController.displayWelcome = function () {
    getUser(this);

    this.loadPartials(getPartials('viewWelcome'))
        .then(function () {
            this.partial('./templates/common/main.hbs');
        });
};

appController.login = function () {
    let {username, password} = this.params;

    if (!username) {
        notifications.showError('Username can not be empty');
    } else if (!password) {
        notifications.showError('Password can not be empty');
    } else {
        auth.login(username, password)
            .then(userInfo => {
                auth.saveSession(userInfo);
                getUser(this);
                notifications.showInfo('Login successful.');
                this.redirect('#/catalog');
            })
            .catch(notifications.handleError);
    }
};

appController.register = function () {
    let {username, password, repeatPass} = this.params;

    if (!username) {
        return notifications.showError('Username can not be empty!');
    }

    if (!/^[A-Za-z]{3,}$/.test(username)) {
        return notifications.showError('Username should be at least 3 characters long and should contains only english alphabet letters!');
    }

    if (!password) {
        return notifications.showError('Password can not be empty!');
    }

    if (!/^[A-Za-z0-9]{6,}$/.test(password)) {
        return notifications.showError('Password should be at least 6 characters long and should contains only english alphabet letters and digits!');
    }

    if (password !== repeatPass) {
        return notifications.showError('Password should match!');
    }

    auth.register(username, password)
        .then(userInfo => {
            auth.saveSession(userInfo);
            notifications.showInfo('User registration successful.');
            this.redirect('#/catalog');
        })
        .catch(notifications.handleError);
};

appController.logout = function () {
    auth.logout()
        .then(() => {
            sessionStorage.clear();
            notifications.showInfo('Logout successful.');
            this.redirect('#/home')
        })
        .catch(notifications.handleError);
};

appController.displayCatalog = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);
    requester.get('appdata', 'posts?query={}&sort={"_kmd.ect": -1}')
        .then((posts) => {
            posts.forEach((p, i) => {
                p.i = i + 1;
                p.time = calcTime(p._kmd.lmt);
                p.isAuthor = p.author === this.user;
            });
            this.posts = posts;
            this.loadPartials(getPartials('viewCatalog'))
                .then(function () {
                    this.partial('./templates/common/main.hbs');
                });
        })
        .catch(notifications.handleError);
};

appController.displayCreatePost = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);
    this.loadPartials(getPartials('viewSubmit'))
        .then(function () {
            this.partial('./templates/common/main.hbs');
        });
};

appController.createPost = function () {
    getUser(this);
    let {url, title, image, comment} = this.params;
    if (!/^http/.test(url)) return notifications.showError('URL is not valid. URL should start with "http".');
    if (!title) return notifications.showError('Field Title is mandatory.');

    let postDetails = {
        author: this.user,
        title: title,
        description: comment,
        imageUrl: image,
        url: url
    };
    requester.post('appdata', 'posts', postDetails)
        .then(() => {
            notifications.showInfo('Post created.');
            this.redirect('#/catalog');
        })
        .catch(notifications.handleError);
};

appController.viewEditPost = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);
    let postId = this.params.id.slice(1);

    requester.get('appdata', 'posts/' + postId)
        .then(post => {
            this.post = post;
            this.loadPartials(getPartials('viewEdit'))
                .then(function () {
                    this.partial('./templates/common/main.hbs');
                });
        })
        .catch(notifications.handleError);
};

appController.editPost = function () {
    getUser(this);
    let postId = this.params.id.slice(1);
    let {url, title, image, description} = this.params;

    if (!/^http/.test(url)) {
        notifications.showError('URL is not valid. URL should start with "http".');
    }
    else if (!title) {
        notifications.showError('Field Title is mandatory.');
    }
    else {
        let postDetails = {
            author: this.user,
            title: title,
            url: url,
            imageUrl: image,
            description: description
        };

        requester.update('appdata', 'posts/' + postId, '', postDetails)
            .then(() => {
                notifications.showInfo('Post updated.');
                this.redirect('#/catalog');
            })
            .catch(notifications.handleError);
    }
};

appController.deletePost = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    let postId = this.params.id.slice(1);

    requester.remove('appdata', 'posts/' + postId,)
        .then(() => {
            notifications.showInfo('Post deleted.');
            this.redirect('#/catalog');
        })
        .catch(notifications.handleError);
};

appController.displayMyPosts = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);

    requester.get('appdata', `posts?query={"author":"${this.user}"}&sort={"_kmd.ect": -1}`)
        .then(posts => {
            posts.forEach((p, i) => {
                p.i = i + 1;
                p.time = calcTime(p._kmd.lmt);
            });
            this.posts = posts;
            this.loadPartials(getPartials('viewMyPosts'))
                .then(function () {
                    this.partial('./templates/common/main.hbs');
                });
        })
        .catch(notifications.handleError);
};

appController.postDetails = function () {
    if (!auth.isLoading()) {
        return this.redirect('#');
    }

    getUser(this);
    let postId = this.params.id.slice(1);

    Promise.all([
        requester.get('appdata', 'posts/' + postId),
        requester.get('appdata', `comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`)
    ])
        .then(([post, comments]) => {
            post.time = calcTime(post._kmd.lmt);
            post.isAuthor = post.author === this.user;
            this.post = post;
            comments.forEach((c) => {
                c.time = calcTime(c._kmd.lmt);
                c.isAuthor = c.author === this.user;
                c.postId = postId;
            });
            this.comments = comments;
            this.loadPartials(getPartials('viewComments'))
                .then(function () {
                    this.partial('./templates/common/main.hbs')
                });
        })
        .catch(notifications.handleError);
};

appController.createComment = function () {
    getUser(this);

    let commentDetails = {
        author: this.user,
        content: this.params.content,
        postId: this.params.id.slice(1)
    };

    requester.post('appdata', 'comments/', commentDetails)
        .then(() => {
            notifications.showInfo('Comment created.');
            this.redirect('#/details/:' + commentDetails.postId);
        })
        .catch(notifications.handleError);
};

appController.deleteComment = function () {
    let commentId = this.params.commentId.slice(1);
    let postId = this.params.postId.slice(1);

    requester.remove('appdata', 'comments/' + commentId)
        .then(() => {
            notifications.showInfo('Comment deleted.');
            this.redirect(`#/details/:${postId}`);
        })
        .catch(notifications.handleError);
};