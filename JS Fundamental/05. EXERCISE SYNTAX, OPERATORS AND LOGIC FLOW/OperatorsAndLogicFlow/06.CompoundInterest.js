function calcCompoundInterest(arr) {
    [principal, interestRate, compoundingPeriod, timeSpan] =
        arr.map(Number);

    let compoundInterest = principal *
        Math.pow(1 + interestRate / (100 * (12 / compoundingPeriod)),
            12 / compoundingPeriod * timeSpan);

    console.log(compoundInterest.toFixed(2));
}

calcCompoundInterest([100000, 5, 12, 25]);