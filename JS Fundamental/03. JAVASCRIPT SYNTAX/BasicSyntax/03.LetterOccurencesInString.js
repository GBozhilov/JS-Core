function countLetters(str, letter) {
    let len = str.length, count = 0;

    while (len--) {
        if (letter === str.charAt(len)) {
            count++;
        }
    }

    console.log(count);
}

function countLetter(str, letter) {
    let count = 0;

    for (let i = 0; i < str.length; i++)
        if (str[i] == letter) {
            count++;
        }

    console.log(count);
    ;
}

countLetter('hello', 'l');