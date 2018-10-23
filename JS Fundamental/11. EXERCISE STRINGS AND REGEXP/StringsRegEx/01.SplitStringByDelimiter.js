function splitString(str, delimiter) {
    str
        .split(delimiter)
        .forEach(e => console.log(e));
}

splitString('One-Two-Three-Four-Five', '-');