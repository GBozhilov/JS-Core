function checkStart(str, sub) {
    return str.startsWith(sub);
}

function solve(str, sub) {
    return str.substr(0, sub.length) === sub;
}

console.log(checkStart('how have you been ?', 'how'));
console.log(solve('how have you been ?', 'how'));