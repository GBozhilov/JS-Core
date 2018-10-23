function checkNumber(number) {
    if (number % 1 !== 0) {
        console.log('invalid');
    } else {
        console.log(number % 2 === 0 ? 'even' : 'odd');
    }
}

checkNumber(null);