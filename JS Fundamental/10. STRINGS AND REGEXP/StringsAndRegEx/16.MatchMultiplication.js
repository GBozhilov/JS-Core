function performMultiplications(text) {
    let pattern = /(-?\d+)\s*\*\s*(-?\d+(?:\.\d+)?)/, match;

    while (match = pattern.exec(text)) {
        let product = Number(match[1]) * Number(match[2]);

        text = text.replace(pattern, product);
    }

    console.log(text);
}

function solve(text) {
    text = text.replace(/(-?\d+)\s*\*\s*(-?\d+(\.\d+)?)/g,
        (match, num1, num2) => Number(num1) * Number(num2));

    console.log(text);
}

performMultiplications(
    'My bill: 2*2.50 (beer); 2* 1.20 (kepab); -2  * 0.5 (deposit).'
);