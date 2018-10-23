function solve(base, increment) {
    let totalMarble = 0;
    let totalStone = 0;
    let totalLazuli = 0;

    let row = 0;
    let currentSize = base;

    while (currentSize > 2) {
        let marbleOrLazuli = 4 * currentSize - 4;
        let stone = currentSize * currentSize - marbleOrLazuli;

        totalStone += stone;
        row++;
        row % 5 !== 0 ? totalMarble += marbleOrLazuli : totalLazuli += marbleOrLazuli;
        currentSize -= 2;
    }

    row++;

    let totalGold = currentSize === 1 ? 1 : 4;
    let pyramidHeight = Math.floor(row * increment);

    totalStone = Math.ceil(totalStone * increment);
    totalMarble = Math.ceil(totalMarble * increment);
    totalLazuli = Math.ceil(totalLazuli * increment);
    totalGold = Math.ceil(totalGold * increment);

    return `Stone required: ${totalStone}\n` +
        `Marble required: ${totalMarble}\n` +
        `Lapis Lazuli required: ${totalLazuli}\n` +
        `Gold required: ${totalGold}\n` +
        `Final pyramid height: ${pyramidHeight}`;
}

console.log(solve(11, 0.75));