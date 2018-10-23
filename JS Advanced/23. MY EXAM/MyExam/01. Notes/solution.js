function addSticker() {
    let inputTitle = $('.title');
    let inputContent = $('.content');
    let title = inputTitle.val();
    let content = inputContent.val();
    let container = $('#sticker-list');

    if (title !== '' && content !== '') {
        newSticker(title, content);
        inputTitle.val('');
        inputContent.val('');
    }

    function newSticker(title, content) {
        let sticker = $('<li>').addClass('note-content')
            .append($('<a>').addClass('button').text('x').on('click', () => sticker.remove()))
            .append($('<h2>').text(title))
            .append($('<hr>'))
            .append($('<p>').text(content));
        sticker.appendTo(container);
    }
}