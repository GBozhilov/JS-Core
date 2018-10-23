function solve(keyWord, text) {
    let pattern = /(north|east)\D*(\d{2})[^,]*,\D*(\d{6})/gi;
    let messagePattern = new RegExp(`${keyWord}(.*?)${keyWord}`, 'g');
    let message = messagePattern.exec(text)[1];

    let match, longitude, latitude;

    while (match = pattern.exec(text)) {
        if (match[1].toLowerCase() === 'north') {
            latitude = `${match[2]}.${match[3]} N`;
        } else {
            longitude = `${match[2]}.${match[3]} E`;
        }
    }

    console.log(latitude);
    console.log(longitude);
    console.log(`Message: ${message}`);
}

solve('4ds', 'eaSt 19,432567noRt north east 53,123456north 43,3213454dsNot all those who wander are lost.4dsnorth 47,874532');

