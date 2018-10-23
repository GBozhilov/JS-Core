function getEqualNeighbors(matrix) {
    let count = 0;

    for (let row = 0; row < matrix.length; row++) {

        for (let col = 0; col < matrix[row].length - 1; col++) {
            let leftElement = matrix[row][col];
            let rightElement = matrix[row][col + 1];

            if (leftElement === rightElement) {
                count++;
            }
        }
    }

    for (let row = 0; row < matrix.length - 1; row++) {

        for (let col = 0; col < matrix[row].length; col++) {
            let upperElement = matrix[row][col];
            let lowerElement = matrix[row + 1][col];

            if (upperElement === lowerElement) {
                count++;
            }
        }
    }

    return count;
}

console.log(getEqualNeighbors([
    ['2', '3', '4', '7', '0'],
    ['4', '0', '5', '3', '4'],
    ['2', '3', '5', '4', '2'],
    ['9', '8', '7', '5', '4']
]));

console.log(getEqualNeighbors([
    ['test', 'yes', 'yo', 'ho'],
    ['well', 'done', 'yo', '6'],
    ['not', 'done', 'yet', '5']
]));

console.log(getEqualNeighbors([
    [2, 3, 3, 7, 7],
    [4, 0, 5, 3, 4],
    [2, 3, 5, 4, 4],
    [9, 8, 7, 5, 4]
]));