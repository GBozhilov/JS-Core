function timer() {
    let time = 0, interval;

    let spanHours = $('#hours');
    let spanMinutes = $('#minutes');
    let spanSeconds = $('#seconds');

    let startBtn = $('#start-timer');
    let stopBtn = $('#stop-timer');

    startBtn.on('click', function () {
        if (!interval) {
            interval = setInterval(incrementTime, 1000);
        }
    });

    stopBtn.on('click', function () {
        clearInterval(interval);
        interval = undefined;
    });

    function incrementTime() {
        time++;

        let hours = Math.floor(time / 3600);
        let minutes = Math.floor(time / 60) % 60;
        let seconds = time % 60;


        spanHours.text(('0' + hours).slice(-2));
        spanMinutes.text(('0' + minutes).slice(-2));
        spanSeconds.text(('0' + seconds).slice(-2));
    }
}