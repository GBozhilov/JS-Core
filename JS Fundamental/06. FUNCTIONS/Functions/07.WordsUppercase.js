function wordsUppercase(str) {
    let result = str
        .match(/(\w|\s)*\w(?=")|\w+/g)
        .map(x => x.toUpperCase())
        .join(', ');

    console.log(result);
}

wordsUppercase('Hi, how are you?');
wordsUppercase('hello');
