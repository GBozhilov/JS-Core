function checkSpeed(arr) {
    let speed = arr[0];
    let zone = arr[1];

    let limit = getLimit(zone);
    let infraction = getInfraction(speed, limit);

    if (infraction) {
        console.log(infraction);
    }

    function getLimit(zone) {
        switch (zone) {
            case 'motorway':
                return 130;
            case 'interstate':
                return 90;
            case 'city':
                return 50;
            case 'residential':
                return 20;
        }
    }

    function getInfraction(speed, limit) {
        let overSpeed = speed - limit;

        if (overSpeed <= 0) {
            return false;
        } else if (overSpeed > 40) {
            return 'reckless driving';
        } else if (overSpeed > 20) {
            return 'excessive speeding';
        } else if (overSpeed > 0) {
            return 'speeding'
        }
    }
}

checkSpeed([40, 'city']);
checkSpeed([21, 'residential']);
checkSpeed([120, 'interstate']);
checkSpeed([200, 'motorway']);