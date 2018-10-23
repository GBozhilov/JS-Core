function htmlEscape(input) {
    let forbidden = ['&', '<', '>', '"'];
    let allowed = ['&amp;', '&lt;', '&gt;', '&quot;'];

    let html = '<ul>\n';

    for (let line of input) {
        html += '\t<li>';

        for (let i in forbidden) {
            line = line
                .split(forbidden[i])
                .join(allowed[i]);
        }

        html += line + '</li>\n';
    }

    html += '</ul>';

    return html;
}

function htmlList(items) {
    return '<ul>\n' +
        items
            .map(htmlEscape)
            .map(item => `\t<li>${item}</li>`)
            .join('\n') + '\n</ul>';

    function htmlEscape(item) {
        let map = {
            '"': '&quot;',
            '&': '&amp;',
            "'": '&#39;',
            '<': '&lt;',
            '>': '&gt;'
        };

        return item.replace(/["&'<>]/g, ch => map[ch]);
    }
}

console.log(htmlEscape(['<b>unescaped text</b>', 'normal text']));
