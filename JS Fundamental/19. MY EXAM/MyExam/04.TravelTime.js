function solve(inputArr) {
    let countries = new Map();

    for (let line of inputArr) {
        let tokens = line
            .split(' > ');
        let currentPrice = +tokens.pop();
        let [country, city] = tokens;

        let cityLetters = city.split('');
        cityLetters[0] = cityLetters[0].toUpperCase();
        city = cityLetters.join('');

        if (!countries.has(country)) {
            countries.set(country, new Map());
        }

        if (!countries.get(country).has(city)) {
            countries.get(country).set(city, Number.POSITIVE_INFINITY);
        }

        let oldPrice = countries.get(country).get(city);

        if (currentPrice < oldPrice) {
            countries.get(country).set(city, currentPrice)
        }
    }

    let sortedCountries = [...countries.keys()]
        .sort((a, b) => a.localeCompare(b));
    let result = '';

    for (let country of sortedCountries) {
        result += `${country} ->`;

        let citiesAndPrices = [...countries.get(country)]
            .sort((a, b) => a[1] - b[1]);

        for (const [city, price] of citiesAndPrices) {
            result += ` ${city} -> ${price}`;
        }

        result += '\n';
    }

    console.log(result);
}

solve([
    "Bulgaria > Sofia > 500",
    "Bulgaria > Sopot > 800",
    "France > Paris > 2000",
    "Albania > Tirana > 1000",
    "Bulgaria > Sofia > 200"
]);