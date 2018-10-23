function aggregateElements(inputArr) {
    let sum = inputArr.reduce(add, 0);

    function add(a, b) {
        return a + b;
    }

    let inverseSum = 0;

    for (let x of inputArr) {
        inverseSum += 1 / x;
    }

    console.log(sum);
    console.log(inverseSum);
    console.log(inputArr.join(''));
}

aggregateElements([2, 4, 8, 16]);