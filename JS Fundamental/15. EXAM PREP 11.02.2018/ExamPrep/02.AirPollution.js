function solve(matrixArr, forcesArr) {
    let matrix = [];

    matrixArr.forEach(x => matrix.push(x.split(' ').map(Number)));

    for (const forceLine of forcesArr) {
        let tokens = forceLine.split(' ');
        let force = tokens[0];

        if (force === 'breeze') {
            let row = Number(tokens[1]);

            for (let col = 0; col < 5; col++) {
                matrix[row][col] -= 15;

                if (matrix[row][col] < 0) {
                    matrix[row][col] = 0;
                }
            }
        } else if (force === 'gale') {
            let col = Number(tokens[1]);

            for (let row = 0; row < 5; row++) {
                matrix[row][col] -= 20;

                if (matrix[row][col] < 0) {
                    matrix[row][col] = 0;
                }
            }
        } else { // force === 'smog'
            let value = Number(tokens[1]);

            for (let row = 0; row < 5; row++) {
                for (let col = 0; col < 5; col++) {
                    matrix[row][col] += value;
                }
            }
        }
    }

    let pollutedBlocks = [];

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (matrix[row][col] >= 50) {
                pollutedBlocks.push(`[${row}-${col}]`);
            }
        }
    }

    console.log(pollutedBlocks.length ?
        `Polluted areas: ${pollutedBlocks.join(', ')}` :
        'No polluted areas'
    );
}

solve([
        '5 7 2 14 4',
        '21 14 2 5 3',
        '3 16 7 42 12',
        '2 20 8 39 14',
        '7 34 1 10 24'
    ],
    ['breeze 1', 'gale 2', 'smog 35']
);