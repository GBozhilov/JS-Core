function restaurantBill(inputArr) {
    let items = inputArr
        .filter((x, i) => i % 2 === 0);
    let sum = inputArr
        .filter((x, i) => i % 2 !== 0)
        .map(Number)
        .reduce((a, b) => a + b);

    console.log(`You purchased ${items.join(', ')} for a total sum of ${sum}`);
}

restaurantBill(['Cola', '1.35', 'Pancakes', '2.88']);