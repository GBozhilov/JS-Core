function solve(input) {
    input
        .sort(sortByLength)
        .forEach(e => console.log(e));

    function sortByLength(a, b) {
        return a.length - b.length || sortByName(a, b);
    }

    function sortByName(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    }
}

function sortArray(input) {
    let sorted = input
        .sort()
        .sort((a, b) => a.length - b.length);

    console.log(sorted.join('\n'));
}

//sortArray(['alpha', 'beta', 'gamma']);

// solve([
//     'Isacc',
//     'Theodor',
//     'Jack',
//     'Harrison',
//     'George'
// ]);

sortArray([
    'test',
    'Deny',
    'omen',
    'Default'
]);