function concatenateAndReverse(arr) {
    let allStrings = arr.join('');
    let chars = Array.from(allStrings);
    let revChars = chars.reverse();
    let revStr = revChars.join('');

    console.log(revStr);
}

function solve(arr) {
    return arr
        .join('')
        .split('')
        .reverse()
        .join('');
}

concatenateAndReverse(['I', 'am', 'student']);
concatenateAndReverse(['race', 'car']);
console.log(solve(['I', 'am', 'student']));