function aggregateTable(lines) {
    let towns = [];
    let totalIncome = 0;

    for (let line of lines) {
        let tokens = line
            .split('|')
            .filter(t => t !== '')
            .map(t => t.trim());

        let town = tokens[0];
        let income = Number(tokens[1]);

        towns.push(town);
        totalIncome += income;
    }

    console.log(towns.join(', '));
    console.log(totalIncome);
}

aggregateTable([
    '| Sofia           | 300',
    '| Veliko Tarnovo  | 500',
    '| Yambol          | 275'
]);