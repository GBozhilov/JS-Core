function startApp() {
    const kinveyBaseUrl = 'https://baas.kinvey.com/';
    const kinveyAppKey = 'kid_HytuClQ8Q';
    const kinveyAppSecret = '35500bf4a2c54cf4990618ed04ae9cce';
    const kinveyAppAuthHeaders = {
        Authorization: 'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
    };

    $('#linkHome').on('click', showHomeView);
    $('#linkLogin').on('click', showLoginView);
    $('#linkRegister').on('click', showRegisterView);
    $('#linkListAds').on('click', listAds);
    $('#linkCreateAd').on('click', showCreateAdView);
    $('#linkLogout').on('click', logoutUser);

    $('#buttonLoginUser').on('click', loginUser);
    $('#buttonRegisterUser').on('click', registerUser);
    $('#buttonCreateAd').on('click', createAd);
    $('#buttonEditAd').on('click', editAd);

    $('#infoBox, #errorBox').on('click', function () {
        $(this).fadeOut();
    });

    $(document).on({
        ajaxStart: function () {
            $('#loadingBox').show();
        },
        ajaxStop: function () {
            $('#loadingBox').hide();
        }
    });

    sessionStorage.clear();
    showHideMenuLinks();
    showView('viewHome');

    function showView(viewName) {
        $('main > section').hide();
        $('#' + viewName).show();
    }

    function showHideMenuLinks() {
        $('#linkHome').show();

        if (sessionStorage.getItem('authToken')) {
            $('#linkLogin').hide();
            $('#linkRegister').hide();
            $('#linkListAds').show();
            $('#linkCreateAd').show();
            $('#linkLogout').show();
            $('#loggedInUser').show();
        } else {
            $('#linkLogin').show();
            $('#linkRegister').show();
            $('#linkListAds').hide();
            $('#linkCreateAd').hide();
            $('#linkLogout').hide();
        }
    }

    function showHomeView() {
        showView('viewHome');
    }

    function showLoginView() {
        showView('viewLogin');
        $('#formLogin').trigger('reset');
    }

    function showRegisterView() {
        showView('viewRegister');
        $('#formRegister').trigger('reset');
    }

    function showCreateAdView() {
        showView('viewCreateAd');
        $('#formCreateAd').trigger('reset');
    }

    function showInfo(msg) {
        let infoBox = $('#infoBox')
            .text(msg)
            .show();
        setTimeout(function () {
            infoBox.fadeOut();
        }, 3000);
    }

    function showError(errorMsg) {
        let errorBox = $('#errorBox')
            .text('Error: ' + errorMsg)
            .show();
    }

    function saveAuthInSession(userInfo) {
        sessionStorage.setItem('authToken', userInfo['_kmd']['authtoken']);
        sessionStorage.setItem('userId', userInfo['_id']);
        $('#loggedInUser').text('Welcome, ' + userInfo['username'] + '!');
    }

    function registerUser() {
        let username = $('#formRegister input[name="username"]').val();
        let password = $('#formRegister input[name="passwd"]').val();
        let request = {
            method: 'POST',
            url: kinveyBaseUrl + 'user/' + kinveyAppKey + '/',
            headers: kinveyAppAuthHeaders,
            data: {username, password}
        };

        $.ajax(request)
            .then(registerSuccess)
            .catch(handleAjaxError);

        function registerSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            listAds();
            showInfo('User registration successful.');
        }
    }

    function loginUser() {
        let username = $('#formLogin input[name=username]').val();
        let password = $('#formLogin input[name=passwd]').val();
        let request = {
            method: 'POST',
            url: kinveyBaseUrl + 'user/' + kinveyAppKey + '/login',
            headers: kinveyAppAuthHeaders,
            data: {username, password}
        };

        $.ajax(request)
            .then(loginSuccess)
            .catch(handleAjaxError);

        function loginSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            listAds();
            showInfo('Login successful.')
        }
    }

    function logoutUser() {
        sessionStorage.clear();
        $('#loggedInUser').text('');
        showHideMenuLinks();
        showView('viewHome');
        showInfo('Logout successful.');
    }

    function createAd() {
        const kinveyUserUrl = kinveyBaseUrl + 'user/' +
            kinveyAppKey + '/' + sessionStorage.getItem('userId');
        let request = {
            method: 'GET',
            url: kinveyUserUrl,
            headers: getKinveyUserAuthHeaders(),
        };

        $.ajax(request)
            .then(afterPublisherRequest)
            .catch(handleAjaxError);

        function afterPublisherRequest(publisher) {
            let adData = {
                title: $('#formCreateAd input[name=title]').val(),
                description: $('#formCreateAd textarea[name=description]').val(),
                publisher: publisher.username,
                datePublished: $('#formCreateAd input[name=datePublished]').val(),
                price: Number($('#formCreateAd input[name=price]').val()).toFixed(2),
                image: $('#formCreateAd input[name=image]').val()
            };

            let request = {
                method: 'POST',
                url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/adverts',
                headers: getKinveyUserAuthHeaders(),
                data: adData,
            };

            $.ajax(request)
                .then(createAdSuccess)
                .catch(handleAjaxError);

            function createAdSuccess(res) {
                listAds();
                showInfo('Ad created.');
            }
        }
    }

    function listAds() {
        $('#ads').empty();
        showView('viewAds');

        let request = {
            method: 'GET',
            url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/adverts',
            headers: getKinveyUserAuthHeaders(),
        };

        $.ajax(request)
            .then(loadAdsSuccess)
            .catch(handleAjaxError);

        function loadAdsSuccess(ads) {
            if (ads.length === 0) {
                $('#ads').text('No books in the library.');
            } else {
                let adsTable = $('<table>')
                    .append($('<tr>')
                        .append($('<th>').text('Title'))
                        .append($('<th>').text('Description'))
                        .append($('<th>').text('Publisher'))
                        .append($('<th>').text('Date Published'))
                        .append($('<th>').text('Price'))
                        .append($('<th>').text('Actions')));

                for (let ad of ads) {
                    appendAdRow(ad, adsTable);
                }

                $('#ads').append(adsTable);
            }

            function appendAdRow(ad, adsTable) {
                let links = [];

                if (ad['_acl']['creator'] === sessionStorage.getItem('userId')) {
                    let deleteLink = $('<a href="#">[Delete]</a>')
                        .on('click', function () {
                            deleteAd(ad);
                        });
                    let editLink = $('<a href="#">[Edit]</a>')
                        .on('click', function () {
                            loadAdForEdit(ad);
                        });

                    links = [deleteLink, ' ', editLink];
                }

                let readMoreLink = $('<a href="#">[Read More]</a>')
                    .on('click', function () {
                        displayAdvert(ad);
                    });

                links.unshift(' ');
                links.unshift(readMoreLink);

                adsTable
                    .append($('<tr>')
                        .append($('<td>').text(ad.title))
                        .append($('<td>').text(ad.description))
                        .append($('<td>').text(ad.publisher))
                        .append($('<td>').text(ad.datePublished))
                        .append($('<td>').text(ad.price))
                        .append($('<td>').append(links)));
            }
        }
    }

    function editAd() {
        let adData = {
            title: $('#formEditAd input[name=title]').val(),
            description: $('#formEditAd textarea[name=description]').val(),
            publisher: $('#formEditAd input[name=publisher]').val(),
            datePublished: $('#formEditAd input[name=datePublished]').val(),
            price: Number($('#formEditAd input[name=price]').val()).toFixed(2),
            image: $('#formEditAd input[name=image]').val()
        };

        let request = {
            method: 'PUT',
            url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/adverts/' + $('#formEditAd input[name=id]').val(),
            headers: getKinveyUserAuthHeaders(),
            data: adData,
        };

        $.ajax(request)
            .then(function (res) {
                listAds();
                showInfo('Ad edited.');
            })
            .catch(handleAjaxError);

        function editAdSuccess(res) {
            listAds();
            showInfo('Ad edited.');
        }
    }

    function deleteAd(ad) {
        let request = {
            method: 'DELETE',
            url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/adverts/' + ad._id,
            headers: getKinveyUserAuthHeaders(),
        };

        $.ajax(request)
            .then(function (res) {
                listAds();
                showInfo('Ad deleted.');
            })
            .catch(handleAjaxError);
    }

    function loadAdForEdit(ad) {
        let request = {
            method: 'GET',
            url: kinveyBaseUrl + 'appdata/' + kinveyAppKey + '/adverts/' + ad._id,
            headers: getKinveyUserAuthHeaders(),
        };

        $.ajax(request)
            .then(loadAdForEditSuccess)
            .catch(handleAjaxError);

        function loadAdForEditSuccess(ad) {
            $('#formEditAd input[name=id]').val(ad._id);
            $('#formEditAd input[name=publisher]').val(ad.publisher);
            $('#formEditAd input[name=title]').val(ad.title);
            $('#formEditAd textarea[name=description]').val(ad.description);
            $('#formEditAd input[name=datePublished]').val(ad.datePublished);
            $('#formEditAd input[name=price]').val(ad.price);
            $('#formEditAd input[name=image]').val(ad.image);

            showView('viewEditAd');
        }
    }

    function displayAdvert(ad) {
        $('#viewAdDetails').html($('<div>').append(
            $('<img>').attr('src', ad.image),
            $('<br>'),
            $('<label>').text('Title:'),
            $('<h1>').text(ad.title),
            $('<label>').text('Description:'),
            $('<p>').text(ad.description),
            $('<label>').text('Publisher:'),
            $('<div>').text(ad.publisher),
            $('<label>').text('Date:'),
            $('<div>').text(ad.datePublished)
        ));

        showView('viewAdDetails');
    }

    function getKinveyUserAuthHeaders() {
        return {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        };
    }

    function handleAjaxError(response) {
        let errorMsg = JSON.stringify(response);

        if (response.readyState === 0) {
            errorMsg = 'Cannot connect due to network error.';
        }

        if (response.responseJSON && response.responseJSON.description) {
            errorMsg = response.responseJSON.description;
        }

        showError(errorMsg);
    }
}