function extractSubSequence(numbers) {
    let result = [];
    let biggestNumber = Number.NEGATIVE_INFINITY;

    for (let num of numbers) {
        if (num >= biggestNumber) {
            result.push(num);
            biggestNumber = num;
        }
    }

    result.forEach(n => console.log(n))
}

(arr, biggestNumber = -Infinity) =>
    arr.filter(e => ([ret, biggestNumber] = [parseInt(e) >= biggestNumber, Math.max(biggestNumber, e)])[0]).join('\n');

//extractSubSequence([1, 3, 8, 4, 10, 12, 3, 2, 24]);
//extractSubSequence([1, 2, 3, 4]);
extractSubSequence([20, 1, 2, 3, 4]);