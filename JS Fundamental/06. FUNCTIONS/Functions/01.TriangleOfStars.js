function printTriangle(n) {
    for (let row = 1; row <= n; row++) {
        printStars(row);
    }

    for (let row = n - 1; row > 0; row--) {
        printStars(row);
    }

    function printStars(row) {
        console.log('*'.repeat(row));
    }
}

printTriangle(2);