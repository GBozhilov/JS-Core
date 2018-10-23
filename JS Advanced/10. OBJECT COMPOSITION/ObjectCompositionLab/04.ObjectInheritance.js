function solve(input) {
    let commandExec = (function () {
        let result = {};

        function create(arr) {
            if (arr.length > 2) {
                result[arr[0]] = Object.create(result[arr[2]])
            } else {
                result[arr[0]] = {}
            }
        }

        function set(arr) {
            let name = arr[0];
            let key = arr[1];
            let value = arr[2];
            result[name][key] = value;
        }

        function print(arr) {
            let output = [];
            let obj = result[arr[0]];

            for (let key in obj) {
                output.push(key + ':' + obj[key])
            }

            console.log(output.join(', '))
        }

        return {create, set, print}
    }());

    for (let str of input) {
        let args = str.split(' ');
        let command = args.shift();
        commandExec[command](args)
    }
}

solve([
    'create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2'
]);