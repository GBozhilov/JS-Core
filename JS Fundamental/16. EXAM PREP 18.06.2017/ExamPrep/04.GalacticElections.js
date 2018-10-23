function solve(objectArr) {
    let systemMap = new Map();
    let totalVotes = 0;

    for (const obj of objectArr) {
        let [system, candidate, votes] =
            [obj.system, obj.candidate, obj.votes];

        if (!systemMap.has(system)) {
            systemMap.set(system, new Map());
        }

        if (!systemMap.get(system).has(candidate)) {
            systemMap.get(system).set(candidate, 0);
        }

        let oldVotes = systemMap.get(system).get(candidate);
        systemMap.get(system).set(candidate, oldVotes + votes);
        totalVotes += votes;
    }

    let systemWinners = [];
    let allFinalVotes = new Map();

    for (const [systemName, systemCandidates] of systemMap) {
        let sortedCandidates = new Map([...systemCandidates]
            .sort((a, b) => b[1] - a[1]));

        let currentWinner = [...sortedCandidates][0][0];
        let currentWinnerVotes = [...sortedCandidates.values()]
            .reduce((a, b) => a + b);

        let finalWinners = new Map();

        finalWinners.set(currentWinner, new Map());
        finalWinners.get(currentWinner).set(systemName, currentWinnerVotes);
        systemWinners.push(finalWinners);

        if (!allFinalVotes.has(currentWinner)) {
            allFinalVotes.set(currentWinner, currentWinnerVotes);
        } else {
            let oldVotes = allFinalVotes.get(currentWinner);
            allFinalVotes.set(currentWinner, oldVotes + currentWinnerVotes);
        }
    }

    allFinalVotes = [...allFinalVotes].sort((a, b) => b[1] - a[1]);

    systemWinners.sort((a, b) => {
        let aSort = Array.from(...a.values())[0][1];
        let bSort = Array.from(...b.values())[0][1];

        return bSort - aSort;
    });

    let winnerName = allFinalVotes[0][0];
    let winnerVotes = allFinalVotes[0][1];

    if (allFinalVotes.length === 1) {
        console.log(`${winnerName} wins with ${winnerVotes} votes`);
        console.log(`${winnerName} wins unopposed!`);
        return;
    }

    let secondName = allFinalVotes[1][0];
    let secondVotes = allFinalVotes[1][1];

    if (totalVotes / 2 < winnerVotes) {
        console.log(`${winnerName} wins with ${winnerVotes} votes`);
        console.log(`Runner up: ${secondName}`);

        for (const winners of systemWinners) {
            if (winners.has(secondName)) {
                let systemName = [...[...winners.entries()][0][1]][0][0];
                let winnerVote = [...[...winners.entries()][0][1]][0][1];

                console.log(`${systemName}: ${winnerVote}`);
            }
        }

        return;
    }

    let winnerPercent = Math.floor(winnerVotes / totalVotes * 100);
    let secondPercent = Math.floor(secondVotes / totalVotes * 100);

    console.log(`Runoff between ${winnerName} with ${winnerPercent}% and ${secondName} with ${secondPercent}%`);
}

// solve([
//     {system: 'Theta', candidate: 'Flying Shrimp', votes: 10},
//     {system: 'Sigma', candidate: 'Space Cow', votes: 200},
//     {system: 'Sigma', candidate: 'Flying Shrimp', votes: 120},
//     {system: 'Tau', candidate: 'Space Cow', votes: 15},
//     {system: 'Sigma', candidate: 'Space Cow', votes: 60},
//     {system: 'Tau', candidate: 'Flying Shrimp', votes: 150}
// ]);

solve([
    {system: 'Tau', candidate: 'Flying Shrimp', votes: 150},
    {system: 'Tau', candidate: 'Space Cow', votes: 100},
    {system: 'Theta', candidate: 'Space Cow', votes: 10},
    {system: 'Sigma', candidate: 'Space Cow', votes: 200},
    {system: 'Sigma', candidate: 'Flying Shrimp', votes: 75},
    {system: 'Omicron', candidate: 'Flying Shrimp', votes: 50},
    {system: 'Omicron', candidate: 'Octocat', votes: 75}
]);

// solve([
//     {system: 'Theta', candidate: 'Kim Jong Andromeda', votes: 10},
//     {system: 'Tau', candidate: 'Kim Jong Andromeda', votes: 200},
//     {system: 'Tau', candidate: 'Flying Shrimp', votes: 150}
// ]);