function findOccurrences(sentence, word) {
    let pattern = new RegExp(`\\b${word}\\b`, 'gi');
    let match, count = 0;

    while (match = pattern.exec(sentence)) {
        count++;
    }

    console.log(count);
}

findOccurrences('How do you plan on achieving that? How? How can you even think of that?', 'how');
findOccurrences('There was one. Therefore I bought it. I wouldn’t buy it otherwise.', 'there');