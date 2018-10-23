class Circle {
    constructor(radius) {
        this.radius = radius;
    }
}

function asCircle() {
    this.area = function () {
        return Math.PI * this.radius ** 2;
    };

    return this;
}

asCircle.call(Circle.prototype);

let circle = new Circle(5);
console.log(circle.area());
