function cityMarkets(inputArr) {
    let townsWithProducts = new Map();

    for (let line of inputArr) {
        let tokens = line
            .split(/[->:]+/)
            .map(t => t.trim());
        let town = tokens[0];
        let product = tokens[1];
        let amountOfSales = Number(tokens[2]);
        let priceForOneUnit = Number(tokens[3]);
        let income = amountOfSales * priceForOneUnit;

        if (!townsWithProducts.has(town)) {
            townsWithProducts.set(town, new Map());
        }

        let oldIncome = townsWithProducts.get(town).get(product);

        if (oldIncome) {
            income += oldIncome;
        }

        townsWithProducts.get(town).set(product, income);
    }

    let towns = Array.from(townsWithProducts.keys());

    for (let town of towns) {
        console.log('Town - ' + town);

        let productsAndIncome = townsWithProducts.get(town);

        for (let [product, income] of productsAndIncome) {
            console.log(`$$$${product} : ${income}`);
        }
    }
}

function solve(inputArr) {
    let townsWithProducts = new Map();

    for (let line of inputArr) {
        let tokens = line
            .split(/[->:]+/)
            .map(e => e.trim());
        let [town, product, quantity, price] = tokens;

        if (!townsWithProducts.has(town)) {
            townsWithProducts.set(town, new Map());
        }

        if (!townsWithProducts.get(town).has(product)) {
            townsWithProducts.get(town).set(product, 0)
        }

        let income = quantity * price;
        let oldSales = townsWithProducts.get(town).get(product);

        townsWithProducts.get(town).set(product, oldSales + income);
    }

    let towns = Array.from(townsWithProducts.keys());

    for (let [town, products] of townsWithProducts) {
        console.log(`Town - ${town}`);

        for (let [product, income] of products) {
            console.log(`$$$${product} : ${income}`);
        }
    }
}

solve([
    'Sofia -> Laptops HP -> 200 : 2000',
    'Sofia -> Raspberry -> 200000 : 1500',
    'Sofia -> Audi Q7 -> 200 : 100000',
    'Montana -> Portokals -> 200000 : 1',
    'Montana -> Qgodas -> 20000 : 0.2',
    'Montana -> Chereshas -> 1000 : 0.3',
    'Montana -> Chereshas -> 1000 : 0.3'
]);