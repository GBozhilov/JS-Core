function solve(str) {
    let objects = JSON.parse(str);

    let html = '<table>\n';
    html += '\t<tr><th>name</th><th>score</th></tr>\n';

    for (let obj of objects) {
        html += `\t<tr><td>${htmlEscape(obj['name'])}</td><td>${obj['score']}</td></tr>\n`;
    }

    html += '</table>';

    console.log(html);

    function htmlEscape(text) {
        let map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };

        return text.replace(/[&<>"']/g, ch => map[ch]);
    }
}

solve('[{"name":"Pesho","score":479},{"name":"Gosho","score":205}]');
solve('[{"name":"Pesho & Kiro","score":479},{"name":"Gosho, Maria & Viki","score":205}]');