function printArr(arr) {
    let delimiter = arr.pop();

    console.log(arr.join(delimiter));
}

function printArray(arr) {
    let delimiter = arr[arr.length - 1];
    arr.pop();

    let result = '';

    for (let i = 0; i < arr.length; i++) {
        result = i !== 0 ?
            result += delimiter + arr[i] : arr[0];
    }

    console.log(result);
}

printArr(['One', 'Two', 'Three', 'Four', 'Five', '-']);
printArray(['One', 'Two', 'Three', 'Four', 'Five', '-']);