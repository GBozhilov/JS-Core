function tripLength(arr) {
    let [x1, y1, x2, y2, x3, y3] = arr.map(Number);

    let distance = (x1, y1, x2, y2) =>
        Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

    let distance123 = distance(x1, y1, x2, y2) + distance(x2, y2, x3, y3);
    let distance132 = distance(x1, y1, x3, y3) + distance(x3, y3, x2, y2);
    let distance213 = distance(x2, y2, x1, y1) + distance(x1, y1, x3, y3);

    let shortestDistance = Math.min(distance123, distance132, distance213);

    if (shortestDistance === distance123) {
        return `1->2->3: ${shortestDistance}`;
    } else if (shortestDistance === distance132) {
        return `1->3->2: ${shortestDistance}`;
    } else {
        return `2->1->3: ${shortestDistance}`;
    }
}

console.log(tripLength([0, 0, 2, 0, 4, 0]));
console.log(tripLength([5, 1, 1, 1, 5, 4]));
console.log(tripLength([-1, -2, 3.5, 0, 0, 2]));