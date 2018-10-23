function captureTheNumbers(lines) {
    let pattern = /\d+/g;
    let numbers = [];

    for (let line of lines) {
        let matches = line.match(pattern);

        if (matches) {
            numbers = numbers.concat(matches);
        }
    }

    console.log(numbers.join(' '));
}

function solve(lines) {
    let numbers = [];
    let text = lines.toString();
    let regex = /\d+/g;
    let match = regex.exec(text);

    while (match) {
        numbers.push(match[0]);
        match = regex.exec(text);
    }

    console.log(numbers.join(' '));
}

function captureNumbers(lines) {
    let text = lines.join('');
    let numbers = text.match(/\d+/g);

    console.log(numbers.join(' '));
}

captureNumbers([
    'The300',
    'What is that?',
    'I think it’s the 3rd movie.',
    'Lets watch it at 22:45'
]);

captureNumbers([
    '123a456',
    '789b987',
    '654c321',
    '0'
]);