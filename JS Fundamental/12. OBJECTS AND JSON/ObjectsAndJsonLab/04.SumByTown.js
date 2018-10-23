function sumByTown(input) {
    let towns = {};

    for (let i = 0; i < input.length; i += 2) {
        let town = input[i];
        let income = Number(input[i + 1]);

        if (!towns.hasOwnProperty(town)) {
            towns[town] = 0;
        }

        towns[town] += income;
    }

    console.log(JSON.stringify(towns));
}

function solve(input) {
    let sums = {};

    for (let i = 0; i < input.length; i += 2) {
        let [town, income] = [input[i], Number(input[i + 1])];

        if (sums[town] === undefined) {
            sums[town] = income;
        } else {
            sums[town] += income;
        }
    }

    console.log(JSON.stringify(sums));
}

solve(['Sofia', '20', 'Varna', '3', 'sofia', '5', 'varna', '4']);