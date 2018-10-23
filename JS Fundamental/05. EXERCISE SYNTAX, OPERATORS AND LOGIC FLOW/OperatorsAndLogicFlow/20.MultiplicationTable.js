function multiplicationTable(n) {
    let html = '<table border="1">\n';
    html += '    <tr><th>x</th>';

    for (let i = 1; i <= n; i++) {
        html += `<th>${i}</th>`;
    }

    html += '</tr>\n';

    for (let row = 1; row <= n; row++) {
        html += `    <tr><th>${row}</th>`;

        for (let col = 1; col <= n; col++) {
            html += `<td>${row * col}</td>`
        }

        html += '</tr>\n';
    }

    html += '</table>';

    console.log(html);
}

multiplicationTable(5);