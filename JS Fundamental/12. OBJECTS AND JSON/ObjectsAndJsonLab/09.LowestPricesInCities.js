function lowestPrice(inputArr) {
    let products = new Map();

    for (let line of inputArr) {
        let productParams = line.split(' | ');
        let town = productParams[0];
        let product = productParams[1];
        let price = Number(productParams[2]);

        if (!products.has(product)) {
            products.set(product, new Map());
        }

        products.get(product).set(town, price);
    }

    for (let [product, townsAndPrices] of products) {
        let lowestPrice = Number.POSITIVE_INFINITY;
        let townLowestPrice = '';

        for (let [town, price] of townsAndPrices) {
            if (price < lowestPrice) {
                lowestPrice = price;
                townLowestPrice = town;
            }
        }

        console.log(`${product} -> ${lowestPrice} (${townLowestPrice})`);
    }
}

function solve(inputArr) {
    let products = new Map();

    for (let line of inputArr) {
        let productParams = line.split(' | ');

        let town = productParams[0];
        let product = productParams[1];
        let price = Number(productParams[2]);

        if (!products.has(product)) {
            products.set(product, new Map());
        }

        products.get(product).set(town, price);
    }

    for (let [product, townsAndPrices] of products) {
        let lowestPrice = Number.POSITIVE_INFINITY;
        let cheapestTown = '';

        for (let [town, price] of townsAndPrices) {
            if (price < lowestPrice) {
                lowestPrice = price;
                cheapestTown = town;
            }
        }

        console.log(`${product} -> ${lowestPrice} (${cheapestTown})`);
    }
}

solve([
    'Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10'
]);