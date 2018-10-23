function juiceBottling(inputArr) {
    let bottles = {};
    let quantities = {};

    for (let line of inputArr) {
        let tokens = line.split(' => ');
        let fruit = tokens[0];
        let quantity = Number(tokens[1]);

        if (!quantities.hasOwnProperty(fruit)) {
            quantities[fruit] = 0;
        }

        quantities[fruit] += quantity;

        if (quantities[fruit] >= 1000) {
            bottles[fruit] = Math.floor(quantities[fruit] / 1000);
        }
    }

    Object.keys(bottles)
        .forEach(f => console.log(`${f} => ${bottles[f]}`));
}

function solve(inputArr) {
    let bottles = {};
    let quantities = {};

    for (let line of inputArr) {
        let juiceParams = line.split(' => ');
        let fruit = juiceParams[0];
        let quantity = Number(juiceParams[1]);

        if (!quantities.hasOwnProperty(fruit)) {
            quantities[fruit] = 0;
        }

        quantities[fruit] += quantity;

        if (quantities[fruit] >= 1000) {
            bottles[fruit] = Math.floor(quantities[fruit] / 1000);
        }
    }

    Object.keys(bottles).forEach(k => console.log(`${k} => ${bottles[k]}`));
}

solve([
    'Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789'
]);