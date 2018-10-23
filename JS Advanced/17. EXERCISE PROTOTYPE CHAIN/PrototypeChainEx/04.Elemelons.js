function solve() {
    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError('Abstract class cannot be instantiated directly');
            }

            this.weight = +weight;
            this.melonSort = melonSort;
        }

        get elementIndex() {
            return this.weight * this.melonSort.length;
        }

        toString() {
            return `Sort: ${this.melonSort}\n` +
                `Element Index: ${this.elementIndex}`;
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = 'Water';
        }

        toString() {
            return `Element: ${this.element}\n` + super.toString();
        }
    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = 'Fire';
        }

        toString() {
            return `Element: ${this.element}\n` + super.toString();
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = 'Earth';
        }

        toString() {
            return `Element: ${this.element}\n` + super.toString();
        }
    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.element = 'Air';
        }

        toString() {
            return `Element: ${this.element}\n` + super.toString();
        }
    }

    class Melolemonmelon extends Watermelon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
            this.elements = ['Water', 'Fire', 'Earth', 'Air'];
            this.element = this.elements.shift();
        }

        morph() {
            this.elements.push(this.element);
            this.element = this.elements.shift();
        }
    }

    return {Melon, Watermelon, Firemelon, Earthmelon, Airmelon, Melolemonmelon};
}