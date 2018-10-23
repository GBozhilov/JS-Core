function pointInRect(input) {
    [x, y, xMin, xMax, yMin, yMax] = input;
    let isInside = x >= xMin && x <= xMax && y >= yMin && y <= yMax;

    console.log(isInside ? 'inside' : 'outside');
}

pointInRect([8, -1, 2, 12, -3, 3]);
pointInRect([12.5, -1, 2, 12, -3, 3]);