function solve(inputStr) {
    let dailyYield = Number(inputStr);
    let [total, days] = [0, 0];

    while (dailyYield >= 100) {
        days++;
        total += dailyYield;
        dailyYield -= 10;
        total -= 26;
    }

    total -= 26;

    if (total < 0) {
        total = 0;
    }

    console.log(days);
    console.log(total);
}

solve('111');