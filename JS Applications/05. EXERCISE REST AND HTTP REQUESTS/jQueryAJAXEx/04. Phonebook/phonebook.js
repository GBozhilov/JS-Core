function attachEvents() {
    let baseServiceUrl = 'https://phonebook-nakov.firebaseio.com/phonebook';
    $('#btnCreate').on('click', createContact);
    $('#btnLoad').on('click', loadContacts);

    function loadContacts() {
        $.get(baseServiceUrl + '.json')
            .then(displayContacts)
            .catch(displayError);
    }

    function createContact() {
        let personInput = $('#person');
        let phoneInput = $('#phone');

        let data = {
            person: personInput.val(),
            phone: phoneInput.val(),
        };

        personInput.val('');
        phoneInput.val('');

        $.post(baseServiceUrl + '.json', JSON.stringify(data))
            .then(loadContacts)
            .catch(displayError);
    }

    function displayContacts(contacts) {
        let ul = $('#phonebook').empty();

        for (const key in contacts) {
            let name = contacts[key]['person'];
            let phone = contacts[key]['phone'];
            let li = $('<li>').text(name + ': ' + phone + ' ');
            let button = $('<button>')
                .text('Delete')
                .on('click', () => deleteContact(key));
            button.appendTo(li);
            li.appendTo(ul);
        }
    }

    function deleteContact(key) {
        let request = {
            url: baseServiceUrl + '/' + key + '.json',
            method: 'DELETE'
        };

        $.ajax(request)
            .then(loadContacts)
            .catch(displayError);
    }

    function displayError() {
        let list = $('#phonebook').empty();
        list.append('<li style="color: red">Error</li>');
    }
}