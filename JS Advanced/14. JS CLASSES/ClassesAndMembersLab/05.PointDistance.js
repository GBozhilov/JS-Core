class Point {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.sqrt(dx ** 2 + dy ** 2);
    }
}

let p1 = new Point(5, 5);
let p2 = new Point(10, 10);

console.log(Point.distance(p1, p2));
