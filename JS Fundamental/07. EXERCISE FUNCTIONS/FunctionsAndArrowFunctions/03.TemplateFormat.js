function printTemplate(input) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<quiz>\n';

    for (let i = 0; i < input.length; i += 2) {
        let question = input[i];
        let answer = input[i + 1];

        xml += '\t<question>\n';
        xml += `\t\t${question}\n`;
        xml += '\t</question>\n';

        xml += '\t<answer>\n';
        xml += `\t\t${answer}\n`;
        xml += '\t\t</answer>\n';
    }

    xml += '</quiz>';

    console.log(xml);
}

printTemplate([
    'Who was the forty-second president of the U.S.A.?',
    'William Jefferson Clinton'
]);