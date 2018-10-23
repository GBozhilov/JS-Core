function cardDeckBuilder(selector) {
    return {
        addCard: function (face, suit) {
            //\u2663  ♣	\u2666  ♦	\u2665  ♥	\u2660  ♠
            let suits = {C: '\u2663', D: '\u2666', H: '\u2665', S: '\u2660'};

            let mainDiv = $(selector);
            let cardDiv = $('<div>')
                .addClass('card')
                .text(face + ' ' + suits[suit])
                .click(reverseCards);
            mainDiv.append(cardDiv);

            function reverseCards() {
                let reversedCards = $(selector + ' div')
                    .toArray()
                    .reverse();
                mainDiv.empty();

                reversedCards
                    .forEach(card => mainDiv
                        .append($(card)
                            .click(reverseCards)));
            }
        }
    }
}