function getInfo() {
    let baseServiceUrl = 'https://judgetests.firebaseio.com/businfo/';
    let busStopId = $('#stopId').val();
    $('#buses').empty();

    $.get(baseServiceUrl + busStopId + '.json')
        .then(loadBuses)
        .catch(displayError);

    function loadBuses(busStop) {
        $('#stopName').text(busStop.name);

        for (const bus in busStop['buses']) {
            let li = $('<li>')
                .text(`Bus ${bus} arrives in ${busStop['buses'][bus]} minutes`);
            $('#buses').append(li);
        }
    }

    function displayError() {
        $('#stopName').text('Error');
    }
}