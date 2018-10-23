function processOddNumbers(numbers) {
    numbers = numbers.map(Number);

    let result = [];

    for (let index = 1; index < numbers.length; index += 2) {
        let element = numbers[index];

        result.push(2 * element);
    }

    result.reverse();

    console.log(result.join(' '));
}

function solve(numbers) {
    numbers = numbers.map(Number);

    let result = [];

    for (let index = numbers.length - 1; index >= 0; index--) {
        let element = numbers[index];

        if (index % 2 !== 0) {
            result.push(2 * element);
        }
    }

    console.log(result.join(' '));
}

function anotherSolve(numbers) {
    return numbers
        .filter((n, i) => i % 2 !== 0)
        .map(n => 2 * n)
        .reverse()
        .join(' ');
}

processOddNumbers([10, 15, 20, 25]);
processOddNumbers([3, 0, 10, 4, 7, 3]);
solve([10, 15, 20, 25]);
solve([3, 0, 10, 4, 7, 3]);
console.log(anotherSolve([10, 15, 20, 25]));
console.log(anotherSolve([3, 0, 10, 4, 7, 3]));
