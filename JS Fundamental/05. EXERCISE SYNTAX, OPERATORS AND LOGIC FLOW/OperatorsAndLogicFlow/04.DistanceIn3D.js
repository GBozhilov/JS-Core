function calcDistance(arr) {
    let x1 = Number(arr[0]);
    let y1 = Number(arr[1]);
    let z1 = Number(arr[2]);

    let x2 = Number(arr[3]);
    let y2 = Number(arr[4]);
    let z2 = Number(arr[5]);

    let x = Math.pow(x1 - x2, 2);
    let y = Math.pow(y1 - y2, 2);
    let z = Math.pow(z1 - z2, 2);

    let distance = Math.sqrt(x + y + z);

    console.log(distance);
}

calcDistance([3.5, 0, 1, 0, 2, -1]);