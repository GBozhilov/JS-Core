function validityChecker(arr) {
    [x1, y1, x2, y2] = arr;

    function checkDistance(x1, y1, x2, y2) {
        let deltaX = x1 - x2;
        let deltaY = y1 - y2;

        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        console.log(distance % 1 === 0 ?
            `{${x1}, ${y1}} to {${x2}, ${y2}} is valid` :
            `{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
    }

    checkDistance(x1, y1, 0, 0);
    checkDistance(x2, y2, 0, 0);
    checkDistance(x1, y1, x2, y2);
}

validityChecker([3, 0, 0, 4]);
validityChecker([2, 1, 1, 1]);