function matchAllWords(text) {
    let pattern = /\w+/g;

    let allWords = text.match(pattern);

    console.log(allWords.join('|'));
}

matchAllWords('_(Underscores) are also word characters');