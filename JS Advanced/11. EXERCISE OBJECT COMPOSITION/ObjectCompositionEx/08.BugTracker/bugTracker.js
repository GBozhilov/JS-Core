function result() {
    let id = 0;
    let allReports = new Map;
    let element = null;
    let module = {
        report: (author, description, isReproducible, severity) => {
            allReports.set(id++, {
                author,
                description,
                isReproducible,
                severity,
                status: 'Open'
            });
            module.output(element);
        },
        setStatus: (id, newStatus) => {
            allReports.get(id).status = newStatus;
            module.output(element);
        },
        remove: (id) => {
            allReports.delete(id);
            module.output(element);
        },
        sort: (criteria) => {
            allReports = [...allReports].sort((a, b) => {
                    if (criteria === 'ID' || !criteria) {
                        return a[0] - b[0];
                    } else if (criteria === 'severity') {
                        return a[1].severity - b[1].severity;
                    } else if (criteria === 'author') {
                        return a[1][criteria].localeCompare(b[1][criteria]);
                    }
                }
            );
            module.output(element);
        },
        output: (selector) => {
            element = $(selector);
            $(selector).empty();
            for (let [id, report] of [...allReports]) {
                let reportDiv = $('<div>')
                    .attr('id', `report_${id}`)
                    .addClass('report')
                    .append($('<div>')
                        .addClass('body')
                        .append($(`<p>`).text(`${report.description}`))
                        .append($('<div>')
                            .addClass('title')
                            .append($(`<span>`).addClass('author').text(`Submitted by: ${report.author}`))
                            .append($(`<span>`)
                                .addClass('status')
                                .text(`${report.status} | ${report.severity}`))
                        )
                    );
                $(selector).append(reportDiv);
            }
        }
    };
    return module;
}

let tracker = result();

tracker.output('#content');
tracker.report('guy', 'report content', true, 5);
tracker.report('second guy', 'report content 2', true, 3);
tracker.report('abv', 'report content three', true, 4);
tracker.sort('author');