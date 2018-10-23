function getTriangleArea(sideA, sideB, sideC) {
    let p = (sideA + sideB + sideC) / 2;
    let area = Math.sqrt(p * (p - sideA) * (p - sideB) * (p - sideC));
    return area;
}

console.log(getTriangleArea(2, 3.5, 4));