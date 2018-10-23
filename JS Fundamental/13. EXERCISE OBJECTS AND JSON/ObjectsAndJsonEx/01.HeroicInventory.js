function heroesRegister(inputArr) {
    let register = [];

    for (let line of inputArr) {
        let [heroName, levelStr, itemsStr] = line.split(' / ');
        let items = [];

        if (itemsStr) {
            items = itemsStr.split(', ');
        }

        let hero = {
            name: heroName,
            level: Number(levelStr),
            items: items
        };

        register.push(hero);
    }

    console.log(JSON.stringify(register));
}

heroesRegister([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara',
    'Batman / 100'
]);