function drawTriangle(n) {
    for (let row = 1; row <= n; row++) {
        let result = '';
        for (let col = 1; col <= row; col++) {
            result += '$';
        }
        console.log(result);
    }
}

function array(n) {
    for (let row = 1; row <= n; row++) {
        console.log(new Array(row + 1).join('$'));
    }
}

function repeat(n) {
    for (let row = 1; row <= n; row++) {
        console.log('$'.repeat(row));
    }
}

repeat(5);