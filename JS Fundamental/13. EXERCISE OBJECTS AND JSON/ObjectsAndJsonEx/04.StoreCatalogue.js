function storeCatalogue(inputArr) {
    let catalogue = new Map();

    for (let line of inputArr) {
        let [product, price] = line.split(' : ');

        catalogue.set(product, Number(price));
    }

    let initials = new Set();

    Array.from(catalogue.keys())
        .sort()
        .forEach(p => initials.add(p[0]));

    for (let letter of initials) {
        console.log(letter);

        let sortedProducts = Array.from(catalogue.keys()).sort();

        for (let product of sortedProducts) {
            if (product.startsWith(letter)) {
                console.log(`  ${product}: ${catalogue.get(product)}`);
            }
        }
    }
}

storeCatalogue([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'
]);