function solve(sentences) {
    let uniqueWords = new Set();

    let text = sentences
        .join('\n')
        .toLowerCase();
    let words = text
        .split(/\W+/)
        .filter(w => w !== '');

    words.forEach(w => uniqueWords.add(w));

    console.log([...uniqueWords].join(', '));
}

function extractUniqueWords(sentences) {
    let uniqueWords = new Set();
    let wordPattern = /\w+/g;

    for (let sentence of sentences) {
        let words = sentence
            .toLowerCase()
            .match(wordPattern);

        words.forEach(w => uniqueWords.add(w));
    }

    console.log([...uniqueWords].join(', '));
}

extractUniqueWords([
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis hendrerit dui.',
    'Quisque fringilla est urna, vitae efficitur urna vestibulum fringilla.',
    'Vestibulum dolor diam, dignissim quis varius non, fermentum non felis.',
    'Vestibulum ultrices ex massa, sit amet faucibus nunc aliquam ut.',
    'Morbi in ipsum varius, pharetra diam vel, mattis arcu.',
    'Integer ac turpis commodo, varius nulla sed, elementum lectus.',
    'Vivamus turpis dui, malesuada ac turpis dapibus, congue egestas metus.',
]);