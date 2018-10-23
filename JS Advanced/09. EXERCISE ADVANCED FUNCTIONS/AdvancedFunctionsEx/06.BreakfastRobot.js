(() => {
    let elements = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    };

    return function (inputStr) {
        let prepOutput;

        function errorPrint(str) {
            prepOutput = `Error: not enough ${str} in stock`;
        }

        function prepare(q, protein, carb, fat, flavour) {
            if (protein * q > elements.protein) return errorPrint('protein');

            if (carb * q > elements.carbohydrate) return errorPrint('carbohydrate');

            if (fat * q > elements.fat) return errorPrint('fat');

            if (flavour * q > elements.flavour) return errorPrint('flavour');

            let [pr, c, ft, fl] = [0, 0, 0, 0];

            pr = q * protein;
            c = q * carb;
            ft = q * fat;
            fl = q * flavour;

            elements.protein -= pr;
            elements.carbohydrate -= c;
            elements.fat -= ft;
            elements.flavour -= fl;
            prepOutput = 'Success';
        }

        let recipes = {
            apple: (q) => prepare(q, 0, 1, 0, 2),
            coke: (q) => prepare(q, 0, 10, 0, 20),
            burger: (q) => prepare(q, 0, 5, 7, 3),
            omelet: (q) => prepare(q, 5, 0, 1, 1),
            cheverme: (q) => prepare(q, 10, 10, 10, 10)
        };

        let cmdArr = inputStr.split(' ');

        if (cmdArr.length === 1) {
            return `protein=${elements.protein} carbohydrate=${elements.carbohydrate} ` +
                `fat=${elements.fat} flavour=${elements.flavour}`;
        } else {
            let cmd = cmdArr[0];
            let quantity = cmdArr[2];

            switch (cmd) {
                case 'restock':
                    let element = cmdArr[1];
                    elements[element] += +quantity;
                    return 'Success';
                case 'prepare':
                    let recipe = cmdArr[1];
                    recipes[recipe](quantity);
                    return prepOutput;
            }
        }
    }
})();