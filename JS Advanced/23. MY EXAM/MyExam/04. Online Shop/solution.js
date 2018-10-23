function onlineShop(selector) {
    let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
    $(selector).html(form);

    function solve() {
        let firstField = $('.custom-select');
        let inputPrice = $('#price');
        let inputQuantity = $('#quantity');
        let button = $('#submit');
        let capacity = $('#capacity');
        let sum = $('#sum');
        let add = $('.display');
        let totalSum = 0;
        let totalCapacity = 0;

        firstField.on('keyup', function () {
            if (firstField.val() !== '') {
                button.prop('disabled', false);
            }
            else {
                button.prop('disabled', true);
            }
        });

        button.on('click', function () {
            totalCapacity += +inputQuantity.val();
            totalSum += +inputPrice.val();
            add.append($(`<li>Product: ${firstField.val()} Price: ${inputPrice.val()} Quantity: ${inputQuantity.val()}</li>`));

            if (totalCapacity >= 150) {
                capacity.val('full');
                capacity.addClass('fullCapacity');
                firstField.prop('disabled', true);
                inputPrice.prop('disabled', true);
                inputQuantity.prop('disabled', true);
            }
            else {
                capacity.val(totalCapacity);
            }

            sum.val(totalSum);
            firstField.val('');
            inputQuantity.val('1');
            inputPrice.val('1');
            button.prop('disabled', true);
        });

    }

    solve();
}