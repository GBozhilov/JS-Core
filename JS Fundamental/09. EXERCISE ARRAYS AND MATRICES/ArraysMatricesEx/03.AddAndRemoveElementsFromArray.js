function manipulateArr(inputArr) {
    let result = [];
    let number = 1;

    for (let command of inputArr) {
        command === 'add' ?
            result.push(number) : result.pop();

        number++;
    }

    console.log(result.length !== 0 ?
        result.join('\n') : 'Empty');
}

//manipulateArr(['add', 'add', 'remove', 'add', 'add']);
manipulateArr(['remove', 'remove', 'remove', 'remove']);
//manipulateArr(['add', 'add', 'add', 'add']);