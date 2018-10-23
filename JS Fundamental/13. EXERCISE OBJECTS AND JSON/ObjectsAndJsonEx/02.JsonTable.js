function createTable(inputArr) {
    let html = '<table>\n';

    for (let line of inputArr) {
        let employee = JSON.parse(line);

        html += '\t<tr>\n';
        html += `\t\t<td>${employee['name']}</td>\n`;
        html += `\t\t<td>${employee['position']}</td>\n`;
        html += `\t\t<td>${employee['salary']}</td>\n`;
        html += '\t<tr>\n';
    }

    html += '</table>';

    console.log(html);

    // function htmlEscape(text) {
    //     let map = {
    //         '&': '&amp;',
    //         '<': '&lt;',
    //         '>': '&gt;',
    //         '"': '&quot;',
    //         "'": '&#39;'
    //     };
    //
    //     return text.replace(/[&<>"']/g, ch => map[ch]);
    // }
}

createTable([
    '{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}'
]);