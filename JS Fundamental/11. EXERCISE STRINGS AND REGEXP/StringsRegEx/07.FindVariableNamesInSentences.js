function solve(str) {
    let variables = [];
    let pattern = /\b_([a-zA-Z\d]+\b)/g;
    let match = pattern.exec(str);

    while (match) {
        variables.push(match[1]);
        match = pattern.exec(str);
    }

    console.log(variables.join(','));
}

function findNames(inputStr) {
    return inputStr
        .match(/\b_[a-zA-Z\d]+\b/g)
        .map(m => m.substr(1))
        .join(',');
}

solve('The _id and _age variables are both integers.');
findNames('Calculate the _area of the _perfectRectangle object.');
findNames('__invalidVariable _evenMoreInvalidVariable_ _validVariable');