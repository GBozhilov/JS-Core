function solve(goldShifts) {
    let [goldExRate, bitCoinExRate] = [67.51, 11949.16];
    let [bitCoins, dayFirstPurchase, totalMoney] = [0, 0, 0];
    let firstPurchase = false;

    for (let i = 0; i < goldShifts.length; i++) {
        let currentGold = Number(goldShifts[i]);
        let dailyMoney = currentGold * goldExRate;
        let day = i + 1;

        if (day % 3 === 0) {
            dailyMoney -= 0.3 * dailyMoney;
        }

        totalMoney += dailyMoney;

        if (totalMoney >= bitCoinExRate) {
            bitCoins += Math.floor(totalMoney / bitCoinExRate);
            totalMoney %= bitCoinExRate;

            if (!firstPurchase) {
                firstPurchase = true;
                dayFirstPurchase = day;
            }
        }
    }

    console.log(`Bought bitcoins: ${bitCoins}`);

    if (bitCoins !== 0) {
        console.log(`Day of the first purchased bitcoin: ${dayFirstPurchase}`);
    }

    console.log(`Left money: ${totalMoney.toFixed(2)} lv.`);
}

solve(['3124.15', '504.212', '2511.124']);