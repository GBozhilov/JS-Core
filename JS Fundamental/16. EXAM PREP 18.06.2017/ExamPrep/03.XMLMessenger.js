function solve(xml) {
    let pattern = /^<message(\s*[a-z]+="[A-Za-z\d .]+"\s*)+>([\s\S]+)<\/message>$/;
    let validationMatch = pattern.exec(xml);

    if (!validationMatch) {
        return 'Invalid message format';
    }

    let fromMatch = /\bfrom="([A-Za-z\d .]+)"/.exec(xml);
    let toMatch = /\bto="([A-Za-z\d .]+)"/.exec(xml);

    if (!fromMatch || !toMatch) {
        return 'Missing attributes';
    }

    let messageLines = validationMatch[2].split('\n');
    let indent = '  ';
    let html = '<article>\n' +
        indent + `<div>From: <span class="sender">${fromMatch[1]}</span></div>\n` +
        indent + `<div>To: <span class="recipient">${toMatch[1]}</span></div>\n` +
        indent + '<div>\n';

    for (const line of messageLines) {
        html += indent + indent + `<p>${line}</p>\n`;
    }

    html += indent + '</div>\n' +
        '</article>';

    return html;
}

console.log(solve(`<message to="Bob" from="Alice" timestamp="1497254092">Hey man, what's up?</message>`));