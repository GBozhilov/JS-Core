function calcSums(matrix) {
    let mainSum = 0, secondarySum = 0;

    for (let row = 0; row < matrix.length; row++) {
        mainSum += matrix[row][row];
        secondarySum += matrix[row][matrix.length - 1 - row];
    }

    return mainSum + ' ' + secondarySum;
}

console.log(calcSums([
    [20, 40],
    [10, 60]
]));

console.log(calcSums([
    [3, 5, 17],
    [-1, 7, 14],
    [1, -8, 89]
]));
