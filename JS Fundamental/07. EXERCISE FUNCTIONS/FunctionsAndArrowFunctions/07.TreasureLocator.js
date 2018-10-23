function treasureLocator(inputArr) {
    function getLocation(x, y) {
        let location = '';

        let onTokelau = x >= 8 && x <= 9 && y >= 0 && y <= 1;
        let onTuvalu = x >= 1 && x <= 3 && y >= 1 && y <= 3;
        let onSamoa = x >= 5 && x <= 7 && y >= 3 && y <= 6;
        let onTonga = x >= 0 && x <= 2 && y >= 6 && y <= 8;
        let onCook = x >= 4 && x <= 9 && y >= 7 && y <= 8;

        if (onTokelau) {
            location = 'Tokelau';
        } else if (onTuvalu) {
            location = 'Tuvalu';
        } else if (onSamoa) {
            location = 'Samoa';
        } else if (onTonga) {
            location = 'Tonga';
        } else if (onCook) {
            location = 'Cook';
        } else {
            location = 'On the bottom of the ocean';
        }

        return location;
    }

    for (let i = 0; i < inputArr.length; i += 2) {
        let x = inputArr[i];
        let y = inputArr[i + 1];

        let location = getLocation(x, y);

        console.log(location);
    }
}

treasureLocator([4, 2, 1.5, 6.5, 1, 3]);
treasureLocator([6, 4]);