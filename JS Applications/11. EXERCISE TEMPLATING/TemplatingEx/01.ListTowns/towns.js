function attachEvents() {
    const fldTowns = $('#towns');
    const resultDiv = $('#root');
    const context = {};
    const template = Handlebars.compile($('#towns-template').html());

    $('#btnLoadTowns').on('click', () => {
        context.towns = fldTowns.val()
            .split(', ')
            .map(town => ({name: town}));
        resultDiv.html(template(context));
        fldTowns.val('');
    });
}