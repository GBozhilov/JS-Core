function convertGradsToDegrees(grads) {
    grads = grads % 400;

    if (grads < 0) {
        grads += 400;
    }

    let degrees = 0.9 * grads;

    console.log(degrees);
}

convertGradsToDegrees(-50);