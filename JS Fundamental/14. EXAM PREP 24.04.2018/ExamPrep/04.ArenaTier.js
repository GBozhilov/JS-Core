function solve(inputArr) {
    let register = new Map();

    for (const commandLine of inputArr) {
        if (commandLine === 'Ave Cesar') break;

        if (commandLine.includes(' -> ')) {
            addAndUpgrade(commandLine);
        }

        if (commandLine.includes(' vs ')) {
            compareGladiators(commandLine);
        }
    }

    let gladiatorsSorted = Array.from(register.keys())
        .sort((g1, g2) => sortGladiators(g1, g2));
    
    for (const gladiator of gladiatorsSorted) {
        let totalSkill = Array.from(register.get(gladiator).values())
            .reduce((a, b) => a + b);

        console.log(`${gladiator}: ${totalSkill} skill`);

        let techniquesSorted = Array.from(register.get(gladiator).keys())
            .sort((t1, t2) => sortTechniques(gladiator, t1, t2));

        techniquesSorted
            .forEach(t => console.log(`- ${t} <!> ${register.get(gladiator).get(t)}`));
    }

    function sortTechniques(gladiator, t1, t2) {
        let a = register.get(gladiator).get(t1);
        let b = register.get(gladiator).get(t2);

        if (a !== b) {
            return b - a;
        }

        return t1.localeCompare(t2);
    }

    function sortGladiators(g1, g2) {
        let firstTotal = Array.from(register.get(g1).values())
            .reduce((a, b) => a + b);
        let secondTotal = Array.from(register.get(g2).values())
            .reduce((a, b) => a + b);

        if (firstTotal !== secondTotal) {
            return secondTotal - firstTotal;
        }

        return g1.localeCompare(g2);
    }

    function addAndUpgrade(commandLine) {
        let gladiatorParams = commandLine.split(' -> ');

        let gladiator = gladiatorParams[0];
        let technique = gladiatorParams[1];
        let skill = Number(gladiatorParams[2]);

        if (!register.has(gladiator)) {
            register.set(gladiator, new Map())
        }

        if (!register.get(gladiator).has(technique)) {
            register.get(gladiator).set(technique, 0);
        }

        let oldSkill = register.get(gladiator).get(technique);

        if (skill > oldSkill) {
            register.get(gladiator).set(technique, skill);
        }
    }

    function compareGladiators(commandLine) {
        let [firstGladiator, secondGladiator] = commandLine.split(' vs ');

        if (register.has(firstGladiator) && register.has(secondGladiator)) {
            let firstGladTechs = Array.from(register.get(firstGladiator).keys());
            let secondGladTechs = Array.from(register.get(secondGladiator).keys());

            if (firstGladTechs.some(t => secondGladTechs.includes(t)) &&
                secondGladTechs.some(t => firstGladTechs.includes(t))) {
                let firstTotal = 0;
                let secondTotal = 0;

                firstGladTechs
                    .forEach(t => firstTotal += register.get(firstGladiator).get(t));
                secondGladTechs
                    .forEach(t => secondTotal += register.get(secondGladiator).get(t));

                if (firstTotal > secondTotal) {
                    register.delete(secondGladiator);
                } else if (firstTotal < secondTotal) {
                    register.delete(firstGladiator);
                }
            }
        }
    }
}

solve([
    'Pesho -> BattleCry -> 400',
    'Gosho -> PowerPunch -> 300',
    'Stamat -> Duck -> 200',
    'Stamat -> Tiger -> 250',
    'Ave Cesar'
]);