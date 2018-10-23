function countWords(inputArr) {
    let wordsCount = {};
    let words = inputArr[0]
        .split(/\W+/)
        .filter(w => w !== '');

    for (let word of words) {
        if (!wordsCount.hasOwnProperty(word)) {
            wordsCount[word] = 0;
        }

        wordsCount[word]++;
    }

    console.log(JSON.stringify(wordsCount));
}

countWords(["Far too slow, you're far too slow."]);
countWords(["JS devs use Node.js for server-side JS.-- JS for devs."]);