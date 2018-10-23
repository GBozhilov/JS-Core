function modifyAverage(number) {
    function getAverage(numAsStr) {
        let length = numAsStr.length;
        let sumOfDigits = 0;
        let digits = Number(numAsStr);

        while (digits > 0) {
            sumOfDigits += digits % 10;
            digits = Math.floor(digits / 10);
        }

        return sumOfDigits / length;
    }

    let numAsStr = number.toString();
    let average = getAverage(numAsStr);
    let append = x => x + '9';

    while (average <= 5) {
        numAsStr = append(numAsStr);
        average = getAverage(numAsStr);
    }

    return numAsStr;
}

console.log(modifyAverage(101));
console.log(modifyAverage(5835));