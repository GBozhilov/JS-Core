function lookupChar(str, index) {
    if (typeof str !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }

    if (index < 0 || index >= str.length) {
        return 'Incorrect index';
    }

    return str.charAt(index);
}

module.exports = {lookupChar};