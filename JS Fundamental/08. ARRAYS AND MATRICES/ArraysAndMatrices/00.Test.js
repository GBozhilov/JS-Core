let matrix = [
    [4, -6, 3, 0, 100],
    [2, 1, -2],
    [-5, 17],
    [7, 3, 18, -9, 12]
];

let biggest = -Infinity;

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
