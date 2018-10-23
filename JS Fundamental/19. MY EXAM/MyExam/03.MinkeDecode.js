function solve(inputArr) {
    let start = +inputArr.shift();
    let end = +inputArr.shift();

    let replaced = inputArr.shift();
    let countryPattern = /\b[A-Z]\w*[A-Z]\b/;
    let text = inputArr.join('');
    let country = countryPattern.exec(text)[0];

    let codesPattern = /\d{3}(\.\d+)?/g;
    let codes = text.match(codesPattern)
        .map(s => Math.ceil(Number(s)));

    let city = '';
    codes.forEach(c => city += String.fromCharCode(c));
    let firstLetter = city[0].toUpperCase();
    city = city.split('');
    city[0] = firstLetter;
    city = city.join('');

    country = replaceIt(country, start, end, replaced);

    let lastIndex = country.length - 1;
    let lastLetter = country.slice(-1).toLowerCase();

    country = country.substring(0, lastIndex) + lastLetter;

    console.log(`${country} => ${city}`);

    function replaceIt(text, start, end, replaced) {
        return text.substring(0, start) + replaced + text.substring(end + 1);
    }
}

solve([
    "3",
    "5",
    "gar",
    "114 sDfia 1, riDl10 confin$4%#ed117 likewise it humanity aTe114.223432 BultoriA - Varnd railLery101 an unpacked as he"
]);

solve([
    "1",
    "4",
    "loveni",
    "SerbiA 67 – sDf1d17ia aTe 1, 108 confin$4%#ed likewise it humanity  Bulg35aria - VarnA railLery1a0s1 111 an unpacked as 109 he"
]);