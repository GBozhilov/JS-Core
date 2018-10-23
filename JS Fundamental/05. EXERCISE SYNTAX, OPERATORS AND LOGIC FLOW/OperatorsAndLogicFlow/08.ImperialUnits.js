function convert(inches) {
    let feet = Math.floor(inches / 12);
    inches = inches % 12;

    console.log(`${feet}'-${inches}"`);
}

convert(55);