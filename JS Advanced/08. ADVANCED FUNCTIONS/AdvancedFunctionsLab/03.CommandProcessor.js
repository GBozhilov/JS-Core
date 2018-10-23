function processCommands(commands) {
    let commandProcessor = function () {
        let text = '';

        return {
            append: (newText) => text += newText,
            removeStart: (index) => text = text.substr(index),
            removeEnd: (index) => text = text.substr(0, text.length - index),
            print: () => console.log(text)
        }
    }();

    for (const line of commands) {
        let [cmd, arg] = line.split(' ');
        commandProcessor[cmd](arg);
    }
}

processCommands([
    'append hello',
    'append again',
    'removeStart 3',
    'removeEnd 4',
    'print'
]);