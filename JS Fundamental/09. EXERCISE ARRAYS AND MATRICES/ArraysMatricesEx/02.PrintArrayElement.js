function printArrByGivenStep(arr) {
    let step = Number(arr.pop());

    for (let i = 0; i < arr.length; i += step) {
        console.log(arr[i]);
    }
}

function solve(input) {
    let step = input.pop();

    input
        .filter((e, i) => i % step === 0)
        .forEach(e => console.log(e))
}

//printArrByGivenStep([5, 20, 31, 4, 20, 2]);
//printArrByGivenStep([1, 2, 3, 4, 5, 6]);
solve([5, 20, 31, 4, 20, 2]);
