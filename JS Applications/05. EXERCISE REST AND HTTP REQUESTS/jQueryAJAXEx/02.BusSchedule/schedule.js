function schedule() {
    let nextStopId = 'depot';
    let currentStop;

    function depart() {
        $('#depart').prop('disabled', true);
        $('#arrive').prop('disabled', false);
        let url = `https://judgetests.firebaseio.com/schedule/${nextStopId}.json`;
        let request = {
            url: url,
            success: nextStop,
            error: displayError
        };
        $.ajax(request);
    }

    function arrive() {
        $('.info').text('Arriving at ' + currentStop);
        $('#arrive').prop('disabled', true);
        $('#depart').prop('disabled', false);
    }

    function nextStop(nextStop) {
        $('.info').text('Next stop ' + nextStop.name);
        nextStopId = nextStop.next;
        currentStop = nextStop.name;
    }

    function displayError() {
        $('.info').text('Error');
        $('#depart').prop('disabled', 'true');
        $('#arrive').prop('disabled', 'true');
    }

    return {
        depart,
        arrive
    };
}