function printLastDay(arr) {
    let month = arr[1] - 1;
    let year = arr[2];

    let date = new Date(year, month, 0);

    console.log(date.getDate());
}

printLastDay([13, 12, 2004]);