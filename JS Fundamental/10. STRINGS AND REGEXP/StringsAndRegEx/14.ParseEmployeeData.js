function parseEmployData(lines) {
    let pattern = /^([A-Z][A-Za-z]*) - ([1-9][0-9]*) - ([A-Za-z0-9 -]+)$/;

    for (let line of lines) {
        let match = pattern.exec(line);

        if (match) {
            console.log(`Name: ${match[1]}\n` +
                `Position: ${match[3]}\n` +
                `Salary: ${match[2]}`);
        }
    }
}

parseEmployData([
    'George - 1000 - CEO',
    'Ivan - 500 - Employee',
    'Peter - 500 - Employee'
]);