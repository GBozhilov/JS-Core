function capitalizeWords(text) {
    let allWords = text.split(/\s+/);
    let capitalizeWords = [];

    for (let word of allWords) {
        word = word.toLowerCase();

        let firstLetter = word[0].toUpperCase();
        let restOfWord = word.substr(1);
        let capitalizeWord = firstLetter + restOfWord;

        capitalizeWords.push(capitalizeWord);
    }

    console.log(capitalizeWords.join(' '));
}

function solve(text) {
    return text
        .toLowerCase()
        .split(' ')
        .map(w => w[0].toUpperCase() + w.substring(1))
        .join(' ');
}

capitalizeWords('Was that Easy? tRY thIs onE for SiZe!');
console.log(solve('Was that Easy? tRY thIs onE for SiZe!'));