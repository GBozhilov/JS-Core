function magicMatrices(matrix) {
    let allSums = [];

    for (let arr of matrix) {
        let rowSum = 0;

        for (let num of arr) {
            rowSum += num;
        }

        allSums.push(rowSum);
    }

    for (let col = 0; col < matrix[0].length; col++) {
        let colSum = 0;

        for (let row = 0; row < matrix.length; row++) {
            colSum += matrix[row][col];
        }

        allSums.push(colSum);
    }

    for (let i = 0; i < allSums.length - 1; i++) {
        if (allSums[i] !== allSums[i + 1]) {
            return false;
        }
    }

    return true;
}

function solve(matrix) {
    let sum = matrix[0].reduce((a, b) => a + b);

    for (let row = 1; row < matrix.length; row++) {
        let currentSum = matrix[row].reduce((a, b) => a + b);

        if (sum !== currentSum) {
            return false;
        }
    }

    for (let col = 0; col < matrix[0].length; col++) {
        let colSum = 0;

        for (let row = 0; row < matrix.length; row++) {
            colSum += matrix[row][col];
        }

        if (colSum !== sum) {
            return false;
        }
    }

    return true;
}

console.log(magicMatrices([
    [4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]]
));

console.log(magicMatrices([
    [11, 32, 45],
    [21, 0, 1],
    [21, 1, 1]
]));

console.log(magicMatrices([
    [1, 0, 0],
    [0, 0, 1],
    [0, 1, 0]]
));

console.log(solve([
    [4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]]
));

console.log(solve([
    [11, 32, 45],
    [21, 0, 1],
    [21, 1, 1]
]));

console.log(solve([
    [1, 0, 0],
    [0, 0, 1],
    [0, 1, 0]]
));