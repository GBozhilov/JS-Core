class LineManager {
    constructor(busStops) {
        this.busStops = busStops;
        this.currentStop = 0;
        this.delay = 0;
        this.totalDuration = 0
    }

    get busStops() {
        return this._busStops;
    }

    set busStops(busStops) {
        for (const stop of busStops) {
            if (stop.name === '' ||
                stop.timeToNext < 0 ||
                typeof stop.name !== 'string' ||
                typeof  stop.timeToNext !== 'number') {
                throw new Error('Invalid data');
            }
        }

        this._busStops = busStops;
    }

    get currentStop() {
        return this._currentStop;
    }

    set currentStop(value) {
        this._currentStop = value;
    }

    get delay() {
        return this._delay;
    }

    set delay(value) {
        this._delay = value;
    }

    get totalDuration() {
        return this._totalDuration;
    }

    set totalDuration(value) {
        this._totalDuration = value;
    }

    get atDepot() {
        return this.currentStop === this.busStops.length - 1;
    }

    get nextStopName() {
        if (this.atDepot) {
            return 'At depot.';
        }

        return this.busStops[this.currentStop + 1].name;
    }

    get currentDelay() {
        return this.delay;
    }

    arriveAtStop(minutes) {
        if (minutes < 0 || this.atDepot) {
            throw new Error('');
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
            `- Time on course: ${this.totalDuration} minutes\n` +
            `- Delay: ${this.delay} minutes`
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




