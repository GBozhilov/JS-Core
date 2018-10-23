function addProduct() {
    let sectionAdd = $('#add-product');
    let productInput = sectionAdd.find('input[type="text"]');
    let priceInput = sectionAdd.find('input[type="number"]');
    let product = productInput.val();
    let price = priceInput.val();

    if (!product || !price) {
        return;
    }

    let priceOutput = $('#bill tfoot tr td:nth-child(2)');
    let sum = Number(priceOutput.text());
    priceOutput.text(sum + Number(price));

    let tr = $('<tr>')
        .append($(`<td>${product}</td>`))
        .append($(`<td>${price}</td>`));
    $('#product-list')
        .append(tr);

    productInput.val('');
    priceInput.val('');
}
