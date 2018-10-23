function attachEvents() {
    const baseServiceUrl = 'https://judgetests.firebaseio.com/';
    $('#submit').on('click', getWeather);

    function getWeather() {
        $.get(baseServiceUrl + 'locations.json')
            .then(loadForecast)
            .catch(displayError);

        function loadForecast(locations) {
            let inputName = $('#location').val();
            let location = locations.filter(l => l.name === inputName)[0];
            let currentReq = `https://judgetests.firebaseio.com/forecast/today/${location.code}.json`;
            let upcomingReq = `https://judgetests.firebaseio.com/forecast/upcoming/${location.code}.json`;

            let todayForecast = $.get(currentReq);
            let upcomingForecast = $.get(upcomingReq);

            Promise.all([todayForecast, upcomingForecast])
                .then(displayForecast)
                .catch(displayError);
        }

        function displayForecast([today, upcoming]) {
            let weatherSymbols = {
                'Sunny': '&#x2600;',
                'Partly sunny': '&#x26C5;',
                'Overcast': '&#x2601;',
                'Rain': '&#x2614;',
            };
            let weather = today['forecast']['condition'];
            const degreeSymbol = '&#176;';
            let degreesInfo =
                today['forecast']['low'] +
                degreeSymbol + '/' +
                today['forecast']['high'] +
                degreeSymbol;
            let currentDiv = $('#current').empty();
            let upcomingDiv = $('#upcoming').empty();

            currentDiv
                .append($('<div>')
                    .addClass('label')
                    .text('Current conditions'))
                .append($('<span>')
                    .addClass('condition symbol')
                    .html(weatherSymbols[weather]))
                .append($('<span>')
                    .addClass('condition')
                    .append($('<span>')
                        .addClass('forecast-data')
                        .text(today['name']))
                    .append($('<span>')
                        .addClass('forecast-data')
                        .html(degreesInfo))
                    .append($('<span>')
                        .addClass('forecast-data')
                        .text(weather)));

            upcomingDiv
                .append($('<div>')
                    .addClass('label')
                    .text('Three-day forecast'));

            for (const day of upcoming['forecast']) {
                let weather = day['condition'];
                let degreesInfo =
                    day['low'] + degreeSymbol + '/' +
                    day['high'] + degreeSymbol;

                upcomingDiv
                    .append($('<span>')
                        .addClass('upcoming')
                        .append($('<span>')
                            .addClass('symbol')
                            .html(weatherSymbols[weather]))
                        .append($('<span>')
                            .addClass('forecast-data')
                            .html(degreesInfo))
                        .append($('<span>')
                            .addClass('forecast-data')
                            .text(weather)));
            }

            $('#forecast').css('display', 'block');
        }

        function displayError(err) {
            $('#forecast')
                .html('Error')
                .css('display', 'block');
        }
    }
}