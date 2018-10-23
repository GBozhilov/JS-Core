function secretKnock() {
    const URL = 'https://baas.kinvey.com/appdata/kid_BJXTsSi-e/knock?query=';
    const USERNAME = 'guest';
    const PASSWORD = 'guest';
    const BASE_64 = btoa(USERNAME + ':' + PASSWORD);
    const AUTH = {'Authorization': 'Basic ' + BASE_64};

    let message = 'Knock Knock.';
    console.log(message);
    getNext(message);

    function getNext(message) {
        let request = {
            url: URL + message,
            method: 'GET',
            headers: AUTH
        };

        $.ajax(request).then(function (obj) {
            console.log(obj);
            if (obj['answer']) {
                console.log(obj['answer']);
            }

            if (obj['message']) {
                console.log(obj['message']);
                message = obj['message'];
                getNext(message);
            }
        });
    }
}