function solve(inputArr) {
    let commandProcessor = (function () {
        let list = [];

        return {
            add: (newItem) => list.push(newItem),
            remove: (item) => list = list.filter(x => x !== item),
            print: () => console.log('' + list)
        }
    })();

    for (let line of inputArr) {
        let [command, arg] = line.split(' ');
        commandProcessor[command](arg);
    }
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print']);
solve(['add pesho', 'add gosho', 'add pesho', 'remove pesho', 'print']);



