function solve(str) {
    return str
        .toUpperCase()
        .split(/\W+/)
        .filter(w => w !== '')
        .join(', ');
}

console.log(solve('Hi, how are you?'));
console.log(solve('hello'));