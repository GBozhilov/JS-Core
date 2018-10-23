function helix(input) {
    let rows = Number(input);
    let sequence = 'ATCGTTAGGG';
    let currentIndex = 0;

    for (let i = 0; i < rows; i++) {
        let currentRow = i % 4;
        currentIndex %= sequence.length;

        if (currentRow === 0) {
            console.log('**' + sequence[currentIndex++] +
                sequence[currentIndex++] + '**');
        } else if (currentRow === 1 || currentRow === 3) {
            console.log('*' + sequence[currentIndex++] + '--' +
                sequence[currentIndex++] + '*');
        } else {
            console.log(sequence[currentIndex++] + '----' +
                sequence[currentIndex++]);
        }
    }
}

helix(10);