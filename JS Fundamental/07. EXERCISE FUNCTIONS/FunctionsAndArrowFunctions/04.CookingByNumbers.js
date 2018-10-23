function solve(arr) {
    let number = Number(arr[0]);

    let chop = n => n / 2;
    let dice = n => Math.sqrt(n);
    let spice = n => ++n;
    let bake = n => n * 3;
    let fillet = n => n - 0.2 * n;

    for (let i = 1; i < arr.length; i++) {
        let operation = arr[i].toLowerCase();

        switch (operation) {
            case 'chop':
                number = chop(number);
                break;
            case 'dice':
                number = dice(number);
                break;
            case 'spice':
                number = spice(number);
                break;
            case 'bake':
                number = bake(number);
                break;
            case 'fillet':
                number = fillet(number);
                break;
        }

        console.log(number);
    }
}

solve([100, 'fillet']);