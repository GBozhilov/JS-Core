function concatNumbers(str) {
    let n = Number(str);
    let result = '';

    for (let i = 1; i <= n ; i++) {
        result += i;
    }

    console.log(result);
}

concatNumbers('11');