function solve(worker) {
    if (worker.handsShaking) {
        worker.bloodAlcoholLevel +=
            0.1 * worker.weight * worker.experience;
        worker.handsShaking = false;
    }

    return worker;
}

console.log(solve({
    weight: 120,
    experience: 20,
    bloodAlcoholLevel: 200,
    handsShaking: true
}));