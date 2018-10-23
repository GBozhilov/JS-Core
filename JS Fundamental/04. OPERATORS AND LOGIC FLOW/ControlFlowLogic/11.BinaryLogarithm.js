function calcBinaryLogarithm(numbers) {
    for (let number of numbers) {
        let log = Math.log2(number);
        console.log(log);
    }
}

calcBinaryLogarithm([1024, 1048576, 256, 1, 2]);