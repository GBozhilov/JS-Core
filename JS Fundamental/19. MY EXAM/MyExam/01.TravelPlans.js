function solve(inputArr) {
    let specialized = [
        'Programming',
        'Hardware maintenance',
        'Cooking',
        'Translating',
        'Designing'
    ];
    let average = [
        'Driving',
        'Managing',
        'Fishing',
        'Gardening'
    ];
    let clumsy = [
        'Singing',
        'Accounting',
        'Teaching',
        'Exam-Making',
        'Acting',
        'Writing',
        'Lecturing',
        'Modeling',
        'Nursing'
    ];
    let totalGold = 0;
    let specializedClients = 0;
    let clumsyClients = 0;

    for (let element of inputArr) {
        let professionParams = element
            .split(' : ')
            .map(e => e.trim());
        let profession = professionParams[0];
        let goldOffered = Number(professionParams[1]);

        if (specialized.includes(profession)) {
            if (goldOffered < 200) {
                continue;
            }

            specializedClients++;

            if (specializedClients % 2 === 0) {
                totalGold += 200;
            }

            totalGold += goldOffered * 0.8;
        } else if (average.includes(profession)) {
            totalGold += goldOffered;
        } else if (clumsy.includes(profession)) {
            clumsyClients++;

            if (clumsyClients % 2 === 0) {
                goldOffered *= 0.95;
            } else if (clumsyClients % 3 === 0) {
                goldOffered *= 0.90;
            }

            totalGold += goldOffered;
        }
    }

    console.log(`Final sum: ${totalGold.toFixed(2)}`);

    if (totalGold < 1000) {
        let diff = (1000 - totalGold).toFixed(2);
        console.log(`Mariyka need to earn ${diff} gold more to continue in the next task.`);
    } else {
        let diff = (totalGold - 1000).toFixed(2);
        console.log(`Mariyka earned ${diff} gold more.`);
    }
}


solve([
    "Programming : 500",
    "Driving : 243.55",
    "Acting : 200",
    "Singing : 100",
    "Cooking : 199",
    "Hardware maintenance : 800",
    "Gardening : 700",
    "Programming : 500"
]);