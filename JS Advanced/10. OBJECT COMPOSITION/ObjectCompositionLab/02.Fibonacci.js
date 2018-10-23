function getFibonacci() {
    let fib1 = 0;
    let fib2 = 1;

    return function () {
        let fibNext = fib1 + fib2;
        fib1 = fib2;
        fib2 = fibNext;

        return fib1;
    }
}

let fib = getFibonacci();

console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());