function getCircleArea(r) {
    //let area = Math.PI * Math.pow(r, 2);
    let area = Math.PI * r * r;
    let areaRounded = Math.round(area * 100) / 100
    console.log(area);
    console.log(areaRounded);
}

getCircleArea(5);