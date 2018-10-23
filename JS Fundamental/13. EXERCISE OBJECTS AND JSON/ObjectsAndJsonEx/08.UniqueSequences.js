function uniqueSequences(inputArr) {
    let arraySet = [];

    for (let line of inputArr) {
        let arr = JSON.parse(line);
        arraySet.push(arr.sort().sort((a, b) => b - a));
    }

    for (let i = 0; i < arraySet.length; i++) {
        for (let j = i + 1; j < arraySet.length; j++) {
            if (compareArrays(arraySet[i], arraySet[j])) {
                arraySet.splice(j, 1);
                j--;
            }
        }
    }

    arraySet
        .sort((a, b) => a.length - b.length)
        .forEach(arr => console.log('[' + arr.join(', ') + ']'));


    function compareArrays(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }

        return true;
    }
}

uniqueSequences([
    '[-3,-2,-1,0,1,2,3,4]',
    '[10,1,-17,0,2,13]',
    '[4,-3,3,-2,2,-1,1,0]'
]);