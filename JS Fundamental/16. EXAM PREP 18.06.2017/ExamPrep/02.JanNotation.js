function solve(inputArr) {
    let operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    };

    let numbers = [];

    for (const numberOrOperator of inputArr) {
        if (Number.isInteger(numberOrOperator)) {
            numbers.push(numberOrOperator);
            continue;
        }

        let operator = numberOrOperator;

        if (numbers.length < 2) {
            return 'Error: not enough operands!';
        }

        let second = numbers.pop();
        let first = numbers.pop();
        let currentResult = operations[operator](first, second);

        numbers.push(currentResult);
    }

    return numbers.length === 1 ?
        numbers[0] : 'Error: too many operands!';
}

console.log(solve([-1, 1, '+', 101, '*', 18, '+', 3, '/']));
console.log(solve([31, 2, '+', 11, '/']));