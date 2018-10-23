function countOccurrences(target, text) {
    let index = text.indexOf(target);
    let count = 0;

    while (index !== -1) {
        count++;
        index = text.indexOf(target, index + 1);
    }

    console.log(count);
}

countOccurrences('the', 'The quick brown fox jumps over the lay dog.');
countOccurrences('ma', 'Marine mammal training is the training and ' +
    'caring for marine life such as, dolphins, killer whales, sea ' +
    'lions, walruses, and other marine mammals. It is also a duty ' +
    'of the trainer to do mental and physical exercises to keep the' +
    ' animal healthy and happy.'
);