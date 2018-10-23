function attachEvents() {
    const URL = 'https://baas.kinvey.com/appdata/kid_ry7OgWJrX/biggestCatches';
    const USERNAME = 'guest';
    const PASSWORD = 'guest';
    const BASE_64 = btoa(USERNAME + ":" + PASSWORD);
    const AUTH = {
        'Authorization': 'Basic ' + BASE_64,
        'Content-type': 'application/json'
    };

    $('.load').on('click', loadCatches);
    $('.add').on('click', addCatch);

    function loadCatches() {
        let request = {
            url: URL,
            method: 'GET',
            headers: AUTH
        };

        $.ajax(request)
            .then(displayCatches)
            .catch(displayError);
    }

    function displayCatches(catches) {
        let catchesDiv = $('#catches').empty();

        for (let grab of catches) {
            catchesDiv
                .append($('<div>').addClass('catch').attr('data-id', grab['_id'])
                    .append($('<label>').text('Angler'))
                    .append($('<input>').attr('type', 'text').addClass('angler').val(grab['angler']))
                    .append($('<label>').text('Weight'))
                    .append($('<input>').attr('type', 'number').addClass('weight').val(grab['weight']))
                    .append($('<label>').text('Species'))
                    .append($('<input>').attr('type', 'text').addClass('species').val(grab['species']))
                    .append($('<label>').text('Location'))
                    .append($('<input>').attr('type', 'text').addClass('location').val(grab['location']))
                    .append($('<label>').text('Bait'))
                    .append($('<input>').attr('type', 'text').addClass('bait').val(grab['bait']))
                    .append($('<label>').text('Capture Time'))
                    .append($('<input>').attr('type', 'number').addClass('captureTime').val(grab['captureTime']))
                    .append($('<button>').addClass('update').text('Update').on('click', updateCatch))
                    .append($('<button>').addClass('delete').text('Delete').on('click', deleteCatch)));
        }
    }

    function updateCatch() {
        let inputs = $(this).parent().find('input');
        let catchId = $(this).parent().attr('data-id');
        let dataObj = {
            'angler': $(inputs[0]).val(),
            'weight': Number($(inputs[1]).val()),
            'species': $(inputs[2]).val(),
            'location': $(inputs[3]).val(),
            'bait': $(inputs[4]).val(),
            'captureTime': Number($(inputs[5]).val()),
        };
        let request = {
            url: URL + '/' + catchId,
            method: 'PUT',
            headers: AUTH,
            data: JSON.stringify(dataObj)
        };

        $.ajax(request)
            .then(loadCatches)
            .catch(displayError);
    }

    function deleteCatch() {
        let catchId = $(this).parent().attr('data-id');
        let request = {
            url: URL + '/' + catchId,
            method: 'DELETE',
            headers: AUTH,
        };

        $.ajax(request)
            .then(loadCatches)
            .catch(displayError);
    }

    function addCatch() {
        let inputs = $('#aside input');
        let dataObj = {
            'angler': $(inputs[0]).val(),
            'weight': Number($(inputs[1]).val()),
            'species': $(inputs[2]).val(),
            'location': $(inputs[3]).val(),
            'bait': $(inputs[4]).val(),
            'captureTime': Number($(inputs[5]).val()),
        };

        let request = {
            url: URL,
            method: 'POST',
            headers: AUTH,
            data: JSON.stringify(dataObj)
        };

        $.ajax(request)
            .then(loadCatches)
            .catch(displayError);

        for (const input of inputs) {
            $(input).val('');
        }
    }

    function displayError() {
        alert('Error');
    }
}