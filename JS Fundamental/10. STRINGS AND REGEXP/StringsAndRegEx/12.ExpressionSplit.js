function expressionSplit(input) {
    let pattern = /[\s.();,]+/;

    let matches = input.split(pattern);

    matches.forEach(e => console.log(e));
}

//expressionSplit('let sum = 4 * 4,b = "wow";');
expressionSplit('let sum = 1 + 2;if(sum > 2){\tconsole.log(sum);}');