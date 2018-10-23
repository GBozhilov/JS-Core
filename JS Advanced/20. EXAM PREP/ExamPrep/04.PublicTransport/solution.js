class PublicTransportTable {
    constructor(townName) {
        this.changeHeaderName(townName);
        this.addEventListeners();
    }

    changeHeaderName(name) {
        $('caption').text(`${name}'s Public Transport`)
    }

    addVehicle(vehicle) {
        let tr = $(`<tr><td>${vehicle.type}</td><td>${vehicle.name}</td></tr>`);
        let button = $('<button>More Info</button>');
        let trExtra = $('<tr class="more-info"><td colspan="3"><table><tr>' +
            `<td>Route: ${vehicle.route}</td></tr><tr><td>Price: ${vehicle.price}</td></tr>` +
            `<tr><td>Driver: ${vehicle.driver}</td></tr></table></td></tr>`);

        button.on('click', function (event) {
            if ($(event.target).text() === 'More Info') {
                $(event.target).text('Less Info');
                trExtra.insertAfter(tr);
            } else {
                $(event.target).text('More Info');
                trExtra.remove();
            }
        });

        let td = $('<td>').append(button);
        tr.append(td);
        $('.vehicles-info').append(tr);
    }

    addEventListeners() {
        $('.search-btn').on('click', function () {
            let typeForm = $('input[name="type"]');
            let nameForm = $('input[name="name"]');
            let type = typeForm.val();
            let name = nameForm.val();

            if (name || type) {
                let rows = $('.vehicles-info > tr').not('.more-info');

                for (let row of rows) {
                    let firstChild = $(row).find('td').eq(0);
                    let secondChild = $(row).find('td').eq(1);

                    if (!firstChild.text().includes(type) || !secondChild.text().includes(name)) {
                        $(row).css('display', 'none');
                        let button = $(row).find('td').eq(2).find('button');

                        if (button.text() === 'Less Info') {
                            button.click()
                        }
                    } else {
                        $(row).css('display', '');
                    }
                }
            }
        });

        $('.clear-btn').on('click', function () {
            $('input[name="type"]').val('');
            $('input[name="name"]').val('');
            let rows = $('.vehicles-info > tr');

            for (const row of rows) {
                $(row).css('display', '');
            }
        });
    }
}