function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) +
        separator +
        value.toFixed(2).substr(-2, 2);

    if (symbolFirst) {
        return symbol + ' ' + result;
    }

    return result + ' ' + symbol;
}

function getDollarFormat(formatter) {
    function dollarFormatter(value) {
        return formatter(',', '$', true, value);
    }

    return dollarFormatter;
}

function getEuroFormat(formatter) {
    function euroFormatter(value) {
        return formatter('.', 'EUR', false, value);
    }

    return euroFormatter;
}

let dollars = getDollarFormat(currencyFormatter);
let euros = getEuroFormat(currencyFormatter);

console.log(dollars(5345));
console.log(dollars(3.1429));
console.log(dollars(2.709));
console.log('-'.repeat(10));
console.log(euros(5345));
console.log(euros(3.1429));
console.log(euros(2.709));

