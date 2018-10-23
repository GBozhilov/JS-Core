function solve(str) {
    let objects = JSON.parse(str);

    let html = '<table>\n';
    html += '\t<tr>';

    Object.keys(objects[0])
        .forEach(k => html += `<th>${k}</th>`);

    html += '</tr>\n';

    for (let obj of objects) {
        html += '\t<tr>';

        Object.values(obj)
            .forEach(v => html += `<td>${htmlEscape(v.toString())}</td>`);

        html += '</tr>\n';
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

function fromJSONToHTMLTable(str) {
    let objects = JSON.parse(str);

    let html = '<table>\n';
    html += '\t<tr>';

    for (let key of Object.keys(objects[0])) {
        html += `<th>${htmlEscape(key)}</th>`;
    }

    html += '</tr>\n';

    for (let obj of objects) {
        html += '\t<tr>';

        for (let value of Object.values(obj)) {
            html += `<td>${htmlEscape(value.toString())}</td>`;
        }

        html += '</tr>\n';
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

solve('[{"Name":"Tomatoes & Chips","Price":2.35},' +
    '{"Name":"J&B Chocolate","Price":0.96}]');