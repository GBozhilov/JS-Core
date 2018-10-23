function attachEvents() {
    $('#btnAdd').click(function() {
        let newItem = $('#newItem').val();
        if (newItem == '') return;
        $('#towns').append($('<option>').text(newItem));
        $('#newItem').val('');
    });
    $('#btnDelete').click(function() {
        $('#towns option:selected').remove();
    });
}