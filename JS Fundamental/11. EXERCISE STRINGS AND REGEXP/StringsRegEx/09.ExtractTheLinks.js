function extractLinks(sentences) {
    let pattern = /www\.[a-zA-Z\d-]+(\.[a-z]+)+/g;

    for (let sentence of sentences) {
        let matches = sentence.match(pattern);

        if (matches) {
            console.log(matches.join('\n'));
        }
    }
}

function solve(inputArr) {
    let match, pattern = /www\.[a-zA-Z\d-]+(\.[a-z]+)+/g;

    for (let sentence of inputArr) {
        while (match = pattern.exec(sentence)) {
            console.log(match[0]);
        }
    }
}

solve([
    'Need information about cheap hotels in London?',
    'You can check us at www.london-hotels.co.uk!',
    'We provide the best services in London.',
    'Here are some reviews in some blogs:',
    '"London Hotels are awesome!" - www.indigo.bloggers.com',
    '"I am very satisfied with their services" - ww.ivan.bg',
    '"Best Hotel Services!" - www.rebel21.sedecrem.moc'
]);