function result() {
    let summary = {};

    for (const argument of arguments) {
        let type = typeof argument;
        console.log(type + ': ' + argument);

        if (!summary.hasOwnProperty(type)) {
            summary[type] = 0;
        }

        summary[type]++;
    }

    let sortedTypes = [];

    for (const type in summary) {
        sortedTypes.push([type, summary[type]]);
    }

    sortedTypes
        .sort((a, b) => b[1] - a[1])
        .forEach(arr => console.log(arr[0] + ' = ' + arr[1]));
}

function solve() {
    let typeCounts = {};

    for (const argument of arguments) {
        let type = typeof argument;
        console.log(type + ': ' + argument);

        if (!typeCounts.hasOwnProperty(type)) {
            typeCounts[type] = 1;
        } else {
            typeCounts[type]++;
        }
    }

    Object.keys(typeCounts)
        .sort((a, b) => typeCounts[b] - typeCounts[a])
        .forEach(t => console.log(t + ' = ' + typeCounts[t]));
}

result('cat', 42, function () {
    console.log('Hello world!');
});