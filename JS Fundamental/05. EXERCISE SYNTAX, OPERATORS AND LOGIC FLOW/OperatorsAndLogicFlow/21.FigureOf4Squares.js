function drawFigure(n) {
    if (n === 2) {
        console.log("+".repeat(3));
        return;
    }

    console.log('+' + '-'.repeat(n - 2) + '+' + '-'.repeat(n - 2) + '+');

    let pipeRows = Math.floor((n - 3) / 2);

    for (let row = 0; row < pipeRows; row++) {
        console.log('|' + ' '.repeat(n - 2) + '|' + ' '.repeat(n - 2) + '|');
    }

    console.log('+' + '-'.repeat(n - 2) + '+' + '-'.repeat(n - 2) + '+');

    for (let row = 0; row < pipeRows; row++) {
        console.log('|' + ' '.repeat(n - 2) + '|' + ' '.repeat(n - 2) + '|');
    }

    console.log('+' + '-'.repeat(n - 2) + '+' + '-'.repeat(n - 2) + '+');
}

drawFigure(7);