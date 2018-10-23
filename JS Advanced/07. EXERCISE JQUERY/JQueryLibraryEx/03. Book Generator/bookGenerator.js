function createBook(selector, title, author, isbn) {
    let bookGenerator = (function () {
        let id = 1;

        return function (selector, title, author, isbn) {
            let container = $(selector);

            let bookContainer = $('<div>');
            bookContainer
                .attr('id', `book${id}`)
                .css('border', 'none');
            $(`<p class="title">${title}</p>`).appendTo(bookContainer);
            $(`<p class="author">${author}</p>`).appendTo(bookContainer);
            $(`<p class="isbn">${isbn}</p>`).appendTo(bookContainer);

            let selectBtn = $('<button>Select</button>')
                .appendTo(bookContainer);
            let deselectBtn = $('<button>Deselect</button>')
                .appendTo(bookContainer);

            selectBtn.on('click',
                () => bookContainer.css('border', '2px solid blue'));
            deselectBtn.on('click',
                () => bookContainer.css('border', 'none'));

            bookContainer.appendTo(container);
            id++;
        }
    }());

    bookGenerator(selector, title, author, isbn);
}