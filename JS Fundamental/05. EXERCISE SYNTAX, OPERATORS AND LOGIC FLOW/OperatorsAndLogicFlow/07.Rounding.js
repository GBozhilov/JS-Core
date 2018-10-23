function roundNumber(arr) {
    let number = Number(arr[0]);
    let precision = Number(arr[1]);

    if (precision > 15) {
        precision = 15;
    }

    let result = number.toFixed(precision);

    console.log(parseFloat(result));
}

roundNumber([3.1415926535897932384626433832795, 2]);