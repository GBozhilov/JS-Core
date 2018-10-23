function townsToJSON(inputArr) {
    let [firstProp, secondProp, thirdProp] = inputArr
        .shift()
        .split(/\s*\|\s*/)
        .filter(x => x !== '');

    let result = [];

    for (let line of inputArr) {
        let townParams = line
            .split(/\s*\|\s*/)
            .filter(x => x !== '');
        let townName = townParams.shift();
        let latitude = Number(townParams.shift());
        let longitude = Number(townParams.shift());

        let town = {};
        town[`${firstProp}`] = townName;
        town[`${secondProp}`] = latitude;
        town[`${thirdProp}`] = longitude;


        result.push(town);
    }

    console.log(JSON.stringify(result));
}

function solve(towns) {
    let result = [];

    for (let town of towns.slice(1)) {
        let [empty, towName, lat, lng] = town
            .split(/\s*\|\s*/);

        let obj = {
            Town: towName,
            Latitude: Number(lat),
            Longitude: Number(lng)
        };

        result.push(obj);
    }

    console.log(JSON.stringify(result));
}

solve([
    '| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |'
]);

townsToJSON([
    '| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |',
]);