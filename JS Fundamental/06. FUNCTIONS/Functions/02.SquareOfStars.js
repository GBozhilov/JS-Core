function printSquare(n = 5) {
    function printStars() {
        console.log('*' + ' *'.repeat(n - 1));
    }

    for (let row = 1; row <= n; row++) {
        printStars();
    }
}

printSquare(4);