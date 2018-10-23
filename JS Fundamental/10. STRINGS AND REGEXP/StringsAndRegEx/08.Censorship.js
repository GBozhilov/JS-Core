function solve(text, words) {
    let censored = text;

    for (let word of words) {
        censored = censored
            .split(word)
            .join('-'.repeat(word.length));
    }

    console.log(censored);
}

function censor(text, words) {
    for (let word of words) {
        let replaced = '-'.repeat(word.length);

        while (text.indexOf(word) > -1) {
            text = text.replace(word, replaced);
        }
    }

    console.log(text);
}

censor(
    'roses are red, roses blue violets are blue',
    ['roses', 'blue']
);