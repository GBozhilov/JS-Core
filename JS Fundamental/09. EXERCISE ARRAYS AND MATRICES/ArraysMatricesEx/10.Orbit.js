function orbit([rows, cols, startRow, startCol]) {
    let matrix = [];

    for (let i = 0; i < rows; i++) {
        matrix.push([]);
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            matrix[row][col] =
                Math.max(Math.abs(row - startRow), Math.abs(col - startCol)) + 1;
        }
    }

    console.log(matrix
        .map(row => row.join(' '))
        .join('\n'));
}

orbit([4, 4, 0, 0]);
// orbit([5, 5, 2, 2]);
// orbit([3, 3, 2, 2]);