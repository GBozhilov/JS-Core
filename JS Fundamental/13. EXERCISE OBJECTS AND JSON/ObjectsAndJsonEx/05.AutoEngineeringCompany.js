function solve(inputArr) {
    let cars = new Map();

    for (let line of inputArr) {
        let carTokens = line.split(' | ');

        let brand = carTokens[0];
        let model = carTokens[1];
        let producedCars = Number(carTokens[2]);

        if (!cars.has(brand)) {
            cars.set(brand, new Map());
        }

        if (!cars.get(brand).has(model)) {
            cars.get(brand).set(model, 0);
        }

        cars.get(brand).set(model, cars.get(brand).get(model) + producedCars);
    }

    for (let [brand, modelAndProducedCars] of cars) {
        console.log(brand);

        for (let [model, producedCars] of modelAndProducedCars) {
            console.log(`###${model} -> ${producedCars}`);
        }
    }
}

solve([
    'Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'
]);