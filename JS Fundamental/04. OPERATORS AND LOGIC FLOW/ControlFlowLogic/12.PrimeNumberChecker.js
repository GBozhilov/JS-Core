function primeCheck(n) {
    let isPrime = true;
    let maxDivisor = Math.sqrt(n);

    for (let divisor = 2; divisor <= maxDivisor; divisor++) {
        if (n % divisor === 0) {
            isPrime = false;
            break;
        }
    }

    return isPrime && n > 1;
}

console.log(primeCheck(-5));