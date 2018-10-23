function solve(arr) {
    let rectangles = [];

    arr.forEach(x => rectangles.push(createRect(x)));

    return rectangles
        .sort((r1, r2) => r1.compareTo(r2));

    function createRect([width, height]) {
        let rect = {
            width: width,
            height: height,
            area: () => rect.width * rect.height,
            compareTo: function (other) {
                let result = other.area() - rect.area();
                return result || (other.width - rect.width);
            }
        };

        return rect;
    }
}

console.log(solve([[5, 12], [10, 5], [10, 6]]));
