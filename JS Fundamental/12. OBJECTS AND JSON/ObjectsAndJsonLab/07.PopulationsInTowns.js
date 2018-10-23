function solve(lines) {
    let towns = new Map();

    for (let line of lines) {
        let townParams = line
            .split(/\s*<->\s*/)
            .filter(e => e !== '');
        let [town, population] = townParams;

        if (!towns.has(town)) {
            towns.set(town, 0);
        }

        towns.set(town, towns.get(town) + Number(population));
    }
  
    [...towns].forEach(([k, v]) => console.log(`${k} : ${v}`));
}

solve([
    'Istanbul <-> 100000',
    'Honk Kong <-> 2100004',
    'Jerusalem <-> 2352344',
    'Mexico City <-> 23401925',
    'Istanbul <-> 1000'
]);