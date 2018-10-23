function solve(text) {
    let surveyPattern = /<svg>[\s\S]*<\/svg>/;

    if (!surveyPattern.test(text)) {
        console.log('No survey found');
        return;
    }

    let pattern = /<svg>.*?<cat>.*?<text>.*?\[(.+)].*?<\/text>.*?<\/cat>.*?<cat>(.+)<\/cat><\/svg>/;
    let match = pattern.exec(text);

    if (!pattern.test(text)) {
        console.log('Invalid format');
        return;
    }

    let label = match[1];
    let matches = text.match(/<g><val>(-?[0-9]+)<\/val>(-?[0-9]+)<\/g>/gm);

    let votesCount = 0;
    let totalVotes = 0;

    for (const line of matches) {
        let currentVote = /<val>(-?[0-9]+)<\/val>(-?[0-9]+)/gm.exec(line);
        let value = Number(currentVote[1]);
        let count = Number(currentVote[2]);

        if (value < 1 || value > 10 || count < 0) {
            continue;
        }

        totalVotes += value * count;
        votesCount += count;
    }

    let average = precisionRound(totalVotes / votesCount, 2);

    console.log(`${label}: ${average}`);

    function precisionRound(number, precision) {
        let factor = Math.pow(10, precision);

        return Math.round(number * factor) / factor;
    }
}

solve('<svg><cat><text>How do you rate the special menu? [Food - Special]</text></cat> <cat><g><val>1</val>5</g><g><val>5</val>13</g><g><val>10</val>22</g></cat></svg>');
solve('<p>Some random text</p><svg><cat><text>How do you rate our food? [Food - General]</text></cat><cat><g><val>1</val>0</g><g><val>2</val>1</g><g><val>3</val>3</g><g><val>4</val>10</g><g><val>5</val>7</g></cat></svg><p>Some more random text</p>');