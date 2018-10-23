function attachEvents() {
    const URL = 'https://baas.kinvey.com/';
    const ID = 'kid_BJ_Ke8hZg';
    const USERNAME = 'guest';
    const PASSWORD = 'pass';
    const BASE_64 = btoa(USERNAME + ':' + PASSWORD);
    const AUTH = {
        'Authorization': 'Basic ' + BASE_64,
        'Content-type': 'application/json'
    };

    $('#getVenues').on('click', loadVenues);

    function loadVenues() {
        let date = $('#venueDate').val();
        let request = {
            url: `${URL}rpc/${ID}/custom/calendar?query=${date}`,
            method: 'POST',
            headers: AUTH
        };

        $.ajax(request).then(getVenue);
    }

    function getVenue(venueIds) {
        for (const id of venueIds) {
            let request = {
                url: `${URL}appdata/${ID}/venues/${id}`,
                method: 'GET',
                headers: AUTH
            };

            $.ajax(request).then(displayVenue);
        }
    }

    function displayVenue(data) {
        $('#venue-info')
            .append($('<div>').addClass('venue').attr('id', data._id)
                .append($('<span>').addClass('venue-name').text(data.name)
                    .prepend($('<input>').addClass('info').attr('type', 'button').val('More info').on('click', showInfo)))
                .append($('<div>').addClass('venue-details').css('display', 'none')
                    .append($('<table>')
                        .append($('<tr>')
                            .append($('<th>').text('Ticket Price'))
                            .append($('<th>').text('Quantity'))
                            .append($('<th>')))
                        .append($('<tr>')
                            .append($('<td>').addClass('venue-price').text(`${data.price} lv`))
                            .append($('<td>')
                                .append($('<select>').addClass('quantity')
                                    .append($('<option>').val('1').text('1'))
                                    .append($('<option>').val('2').text('2'))
                                    .append($('<option>').val('3').text('3'))
                                    .append($('<option>').val('4').text('4'))
                                    .append($('<option>').val('5').text('5'))))
                            .append($('<td>')
                                .append($('<input>').addClass('purchase').attr('type', 'button').val('Purchase').on('click', purchase)))))
                    .append($('<span>').addClass('head').text('Venue description:'))
                    .append($('<p>').addClass('description').text(data.description))
                    .append($('<p>').addClass('description').text(`Starting time: ${data.startingHour}`))));
    }

    function showInfo() {
        $('.venue-details').hide();
        $(this).parent().parent().find('.venue-details').show();
    }

    function purchase() {
        let id = $(this).parent().parent().parent().parent().parent().attr('id');
        let name = $(this).parent().parent().parent().parent().parent().find(".venue-name").text();
        let qty = Number($(this).parent().parent().find(".quantity").val());
        let price = Number($(this).parent().parent().find(".venue-price").text().substring(0, $(this).parent().parent().find(".venue-price").text().length - 2));

        $('#venue-info').html(`<span class="head">Confirm purchase</span>
<div class="purchase-info">
  <span>${name}</span>
  <span>${qty} x ${price}</span>
  <span>Total: ${qty * price} lv</span>
  <input type="button" value="Confirm">
</div>
`);

        $('#venue-info input').on('click', function () {
            let request = {
                method: 'POST',
                url: `${URL}rpc/${ID}/custom/purchase?venue=${id}&qty=${qty}`,
                headers: AUTH
            };

            $.ajax(request).then(function (data) {
                $('#venue-info').html('You may print this page as your ticket' + data.html);
            })
        })
    }
}