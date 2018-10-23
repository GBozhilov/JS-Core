function diagonalAttack(input) {
    let matrix = input.map(row => row
        .split(' ')
        .map(Number));

    let mainSum = 0, secondarySum = 0;

    for (let row = 0; row < matrix.length; row++) {
        mainSum += matrix[row][row];
        secondarySum += matrix[row][matrix[row].length - 1 - row];
    }

    if (mainSum === secondarySum) {
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                if (row === col || col === matrix[row].length - 1 - row) {
                    continue;
                }

                matrix[row][col] = mainSum;
            }
        }
    }

    console.log(matrix
        .map(row => row.join(' '))
        .join('\n'));
}

diagonalAttack([
    '5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1'
]);