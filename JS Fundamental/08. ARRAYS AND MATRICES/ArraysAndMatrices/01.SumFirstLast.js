function sumFirstAndLast(arr) {
    let firstElement = Number(arr[0]);
    let lastElement = Number(arr[arr.length - 1]);

    return firstElement + lastElement;
}

console.log(sumFirstAndLast(['20']));;