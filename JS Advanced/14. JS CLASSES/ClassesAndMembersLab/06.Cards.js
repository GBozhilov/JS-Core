let defineCards = (function () {
    let Faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let Suits = {
        CLUBS: "\u2663",    // ♣
        DIAMONDS: "\u2666", // ♦
        HEARTS: "\u2665",   // ♥
        SPADES: "\u2660"    // ♠
    };

    class Card {
        constructor(face, suit) {
            this.face = face;
            this.suit = suit;
        }

        get face() {
            return this._face;
        }
        set face(face) {
            if (!Faces.includes(face)) {
                throw new Error('Invalid card face: ' + face);
            }

            this._face = face;
        }

        get suit() {
            return this._suit;
        }
        set suit(suit) {
            if (!Array.from(Object.values(Suits)).includes(suit)) {
                throw new Error('Invalid card suit: ' + suit);
            }

            this._suit = suit;
        }

        toString() {
            return this.face + this.suit;
        }
    }

    return {Suits, Card};
})();

let Suits = defineCards.Suits;
let Card = defineCards.Card;

console.log('' + new Card('3', Suits.DIAMONDS));
console.log('' + new Card('J', '♠'));