function calcDistance(arr) {
    let v1 = Number(arr[0]); // km/h
    let v2 = Number(arr[1]); // km/h
    let time = Number(arr[2]); // sec

    let firstSpeed = v1 * 5 / 18; // m/s
    let secondSpeed = v2 * 5 / 18; // m/s

    let firstDistance = firstSpeed * time;
    let secondDistance = secondSpeed * time;

    let result = Math.abs(firstDistance - secondDistance);

    console.log(result);
}

calcDistance([5, -5, 40]);