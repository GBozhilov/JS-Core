class Textbox {
    constructor(selector, regex) {
        this._elements = $(selector);
        this._value = $(this._elements[0]).val();
        this._invalidSymbols = regex;
        this.onInput();
    }

    get elements() {
        return this._elements;
    }

    set elements(value) {
        this._elements = value;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        for (let el of this._elements) {
            $(el).val(value);
        }
    }

    isValid() {
        return !this._invalidSymbols.test(this._value);
    }

    onInput() {
        this.elements.on('input', (event) => {
            this.value = $(event.target).val();
        });
    }
}

let textbox = new Textbox(".textbox", /[^a-zA-Z0-9]/);
let inputs = $('.textbox');

inputs.on('input', function () {
    console.log(textbox.value);
});
