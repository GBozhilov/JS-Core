function sort(colIndex, descending) {
    let table = $('#products');
    let body = table.find('tbody');
    let rows = body.find('tr').toArray();
    let sorter;

    if (colIndex === 0) {
        sorter = (a, b) => {
            a = $(a).find('td:nth-child(1)').text();
            b = $(b).find('td:nth-child(1)').text();
            return a.localeCompare(b);
        }
    } else {
        sorter = (a, b) => {
            a = Number($(a).find('td:nth-child(2)').text());
            b = Number($(b).find('td:nth-child(2)').text());
            return a - b;
        }
    }

    rows.sort(sorter);

    if (descending) {
        rows.reverse();
    }

    $(rows).each((i, e) => body.append(e));
}