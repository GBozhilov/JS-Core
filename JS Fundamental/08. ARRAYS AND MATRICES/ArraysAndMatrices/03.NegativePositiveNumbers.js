function manipulateArray(arr) {
    let numbers = arr.map(Number);
    let result = [];

    for (let number of numbers) {
        if (number < 0) {
            result.unshift(number);
        } else {
            result.push(number);
        }
    }

    result.forEach(n => console.log(n))
}

function solve(arr) {
    let result = [];

    arr.forEach(e => e >= 0 ?
        result.push(e) :
        result.unshift(e));

    console.log(result.join('\n'));;
}

manipulateArray([7, -2, 8, 9]);
solve([7, -2, 8, 9]);
//manipulateArray([3, -2, 0, -1]);