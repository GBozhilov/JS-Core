function findBiggest(matrix) {
    let biggest = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < matrix.length; i++) {
        let innerArr = matrix[i];

        for (let j = 0; j < innerArr.length; j++) {
            let element = innerArr[j];

            if (element > biggest) {
                biggest = element;
            }
        }
    }

    console.log(biggest);
}

function getBiggest(matrix) {
    let biggestNum = Number.NEGATIVE_INFINITY;

    matrix
        .forEach(row => row.forEach(col => biggestNum = Math.max(biggestNum, col)));

    return biggestNum;
}

getBiggest([
    [20, 50, 10],
    [8, 33, 145]
]);

getBiggest([
    [3, 5, 7, 12],
    [-1, 4, 33, 2],
    [8, 3, 0, 4]
]);