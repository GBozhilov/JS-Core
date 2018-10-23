function aggregate(inputArr) {
    function reduce(numbers, func) {
        let result = numbers[0];

        for (const nextElement of numbers.slice(1)) {
            result = func(result, nextElement);
        }

        return result;
    }

    let sum = reduce(inputArr, (a, b) => a + b);
    let min = reduce(inputArr, (a, b) => Math.min(a, b));
    let max = reduce(inputArr, (a, b) => Math.max(a, b));
    let product = reduce(inputArr, (a, b) => a * b);
    let join = reduce(inputArr, (a, b) => a.toString() + b);

    console.log(`Sum = ${sum}`);
    console.log(`Min = ${min}`);
    console.log(`Max = ${max}`);
    console.log(`Product = ${product}`);
    console.log(`Join = ${join}`);
}

aggregate([2, 3, 10, 5]);