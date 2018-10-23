class LineManager {
    constructor(stops) {
        this.stops = stops;
        this.currentStop = 0;
        this.delay = 0;
        this.duration = 0;
    }

    get duration() {
        return this._duration;
    }

    set duration(value) {
        this._duration = value;
    }

    get delay() {
        return this._delay;
    }

    set delay(value) {
        this._delay = value;
    }

    get stops() {
        return this._stops;
    }

    set stops(busStopsArr) {
        for (const stop of busStopsArr) {
            if (stop.name === '' ||
                stop.timeToNext < 0 ||
                typeof stop.name !== 'string' ||
                typeof stop.timeToNext !== 'number') {
                throw new Error('Invalid data!');
            }
        }

        this._stops = busStopsArr;
    }

    get currentStop() {
        return this._currentStop;
    }

    set currentStop(value) {
        this._currentStop = value;
    }

    get atDepot() {
        return this.currentStop === this.stops.length - 1;
    }

    get nextStopName() {
        if (this.atDepot) {
            return 'At depot.';
        }

        return this.stops[this.currentStop + 1].name;
    }

    get currentDelay() {
        return this.delay;
    }

    arriveAtStop(minutes) {
        if (minutes < 0) {
            throw new Error('Minutes can not be negative!');
        }

        if (this.atDepot) {
            throw new Error('Last stop reached!');
        }

        this.duration += minutes;
        this.delay += minutes - this.stops[this.currentStop].timeToNext;
        this.currentStop++;

        return !this.atDepot;
    }

    toString() {
        let line = this.atDepot ?
            '- Course completed\n' :
            `- Next stop: ${this.nextStopName}\n`;

        return 'Line summary\n' +
            line +
            `- Stops covered: ${this.currentStop}\n` +
            `- Time on course: ${this.duration} minutes\n` +
            `- Delay: ${this.delay} minutes`;
    }
}

const man = new LineManager([
    {name: 'Depot', timeToNext: 4},
    {name: 'Romanian Embassy', timeToNext: 2},
    {name: 'TV Tower', timeToNext: 3},
    {name: 'Interpred', timeToNext: 4},
    {name: 'Dianabad', timeToNext: 2},
    {name: 'Depot', timeToNext: 0},
]);

while (man.atDepot === false) {
    console.log(man.toString());
    man.arriveAtStop(4);
}

console.log(man.toString());