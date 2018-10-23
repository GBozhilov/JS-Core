function solve(inputArr) {
    let validSentences = [];
    let invalidSentences = [];

    let str = inputArr.shift().toLowerCase();
    let delimiter = inputArr.shift();
    let companies = str
        .split(delimiter)
        .filter(c => c !== '')
        .map(c => c.trim());
    let sentences = inputArr.map(e => e.toLowerCase());

    for (let sentence of sentences) {
        let isValidSentence = true;

        for (let company of companies) {
            company = regExpEscape(company);
            let regex = new RegExp(`${company}`);

            if (!regex.test(sentence)) {
                isValidSentence = false;
                break;
            }
        }

        if (isValidSentence) {
            validSentences.push(sentence);
        } else {
            invalidSentences.push(sentence);
        }
    }

    if (validSentences.length > 0) {
        console.log('ValidSentences');
        let count = 1;

        for (let sentence of validSentences) {
            console.log(`${count}. ${sentence}`);
            count++;
        }

        if (invalidSentences.length > 0) {
            console.log('='.repeat(30));
        }
    }

    if (invalidSentences.length > 0) {
        console.log('InvalidSentences');
        let count = 1;

        for (let sentence of invalidSentences) {
            console.log(`${count}. ${sentence}`);
            count++;
        }
    }

    function regExpEscape(str) {
        return str.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
    }
}