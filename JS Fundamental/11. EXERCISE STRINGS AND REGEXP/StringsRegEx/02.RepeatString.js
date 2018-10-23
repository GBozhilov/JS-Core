function repeatString(text, n) {
    return text.repeat(n);
}

function solve(text, n) {
    let result = '';

    for (let i = 0; i < n; i++) {
        result += text;
    }

    return result;
}

console.log(repeatString('abc', 3));
console.log(solve('abc', 3));