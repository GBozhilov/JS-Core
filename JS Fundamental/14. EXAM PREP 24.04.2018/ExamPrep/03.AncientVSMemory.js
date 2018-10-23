function solve(inputArr) {
    let numArr = inputArr.join(' ').split(' ');

    for (let i = 0; i < numArr.length; i++) {
        if (numArr[i] === '32656') {
            let size = Number(numArr[i + 4]);
            let fragment = numArr
                .slice(i + 6, i + 6 + size)
                .map(Number);

            console.log(fragment
                .map(x => String.fromCharCode(x))
                .join(''));
        }
    }
}

// solve([
//     '32656 19759 32763 0 5 0 80 101 115 104 111 0 0 0 0 0 0 0 0 0 0 0',
//     '0 32656 19759 32763 0 7 0 83 111 102 116 117 110 105 0 0 0 0 0 0 0 0'
// ]);
solve([
    '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 32656 19759 32763 0',
    '5 0 71 111 115 104 111 0 0 0 0 0 0 0 0 0 32656 19759 32763 0 4 0',
    '75 105 114 111 0 0 0 0 0 0 0 0 0 0 32656 19759 32763 0 8 0 86 101',
    '114 111 110 105 107 97 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0'
]);