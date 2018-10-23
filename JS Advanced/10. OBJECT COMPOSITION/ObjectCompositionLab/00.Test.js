function solve(inputArr) {
    let processCommands = (function () {
        let map = new Map();

        function create([name, inherits, parent]) {
            parent = parent ? map.get(parent) : null;
            let newObj = Object.create(parent);
            map.set(name, newObj);
        }

        function set([name, key, value]) {
            let obj = map.get(name);
            obj[key] = value;
        }

        function print([name]) {
            let result = [];
            let obj = map.get(name);

            for (let key in obj) {
                result.push(key + ':' + obj[key]);
            }

            console.log(result.join(', '));
        }

        return {create, set, print}
    })();

    for (let commandLine of inputArr) {
        let commandParams = commandLine.split(' ');
        let command = commandParams.shift();
        processCommands[command](commandParams);
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