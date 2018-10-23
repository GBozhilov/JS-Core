function aggregateElements(arr) {
    function aggregate(arr, initialVal, func) {
        let result = initialVal;

        for (let i = 0; i < arr.length; i++) {
            result = func(result, arr[i]);
        }

        console.log(result);
    }

    aggregate(arr, 0, (a, b) => a + b);
    aggregate(arr, 0, (a, b) => a + 1 / b);
    aggregate(arr, '', (a, b) => a + b);
}

aggregateElements([2, 4, 8, 16]);

