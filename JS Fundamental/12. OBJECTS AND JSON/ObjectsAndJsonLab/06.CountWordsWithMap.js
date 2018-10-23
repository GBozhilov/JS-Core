function countWords(inputArr) {
    let text = inputArr[0].toLowerCase();
    let words = text
        .split(/\W+/g)
        .filter(w => w !== '')
        .sort();

    let wordsCount = new Map();

    for (let word of words) {
        if (!wordsCount.has(word)) {
            wordsCount.set(word, 0);
        }

        wordsCount.set(word, wordsCount.get(word) + 1);
    }

    let allWords = Array.from(wordsCount.keys());

    allWords
        .forEach(w => console.log(`'${w}' -> ${wordsCount.get(w)} times`));
}

function solve(inputArr) {
    let text = inputArr[0].toLowerCase();
    let words = text
        .split(/\W+/g)
        .filter(w => w !== '')
        .sort();

    let wordsCount = new Map();

    for (let word of words) {
        wordsCount.has(word) ?
            wordsCount.set(word, wordsCount.get(word) + 1) :
            wordsCount.set(word, 1);
    }

    for (let [key, value] of wordsCount) {
        console.log(`'${key}' -> ${value} times`);
    }
}

solve(['JS devs use Node.js for server-side JS. JS devs use JS. -- JS for devs --']);