function solve(arr) {
    let register = {};

    for (const line of arr) {
        if (line.includes(' -> ')) {
            let [gladiator, technique, score] = line.split(' -> ');
            score = Number(score);

            if (!register.hasOwnProperty(gladiator)) {
                register[gladiator] = {};
                register[gladiator][technique] = score;
                register[gladiator]['__total__'] = score;
            } else {
                if (!register[gladiator].hasOwnProperty(technique)) {
                    register[gladiator][technique] = score;
                    register[gladiator]['__total__'] += score;
                } else {
                    if (register[gladiator][technique] < score) {
                        register[gladiator]['__total__'] -= register[gladiator][technique];
                        register[gladiator]['__total__'] += score;
                        register[gladiator][technique] = score;
                    }
                }
            }
        } else if (line.includes(' vs ')) {
            let [gladiator1, gladiator2] = line.split(' vs ');

            if (register.hasOwnProperty(gladiator1) && register.hasOwnProperty(gladiator2)) {
                for (const g1Technique in register[gladiator1]) {
                    let g1Score = register[gladiator1][g1Technique];
                    let g2Score = register[gladiator2][g1Technique];

                    if (g1Score && g2Score && g1Technique !== '__total__') {
                        if (g1Score > g2Score) {
                            delete register[gladiator2];
                            break;
                        } else if (g1Score < g2Score) {
                            delete register[gladiator1];
                            break;
                        }
                    }
                }
            }
        } else {
            break;
        }
    }

    let sortedGladiators = Object.keys(register).sort((g1, g2) => {
        let diffInScore = register[g2]['__total__'] - register[g1]['__total__'];

        if (diffInScore === 0) {
            return g1.localeCompare(g2);
        }

        return diffInScore;
    });

    for (const gl of sortedGladiators) {
        console.log(`${gl}: ${register[gl]['__total__']} skill`);

        let sortedTechniques = Object.keys(register[gl])
            .filter(t => t !== '__total__')
            .sort((t1, t2) => {
                let diffInScore = register[gl][t2] - register[gl][t1];

                if (diffInScore === 0) {
                    t1.localeCompare(t2);
                }

                return diffInScore;
            });

        sortedTechniques.forEach(t => console.log(`- ${t} <!> ${register[gl][t]}`));
    }
}

solve([
    'Pesho -> Duck -> 400',
    'Julius -> Shield -> 150',
    'Gladius -> Heal -> 200',
    'Gladius -> Support -> 250',
    'Gladius -> Shield -> 250',
    'Pesho vs Gladius',
    'Gladius vs Julius',
    'Gladius vs Gosho',
    'Ave Cesar'
]);