function composeTag(arr) {
    let location = arr[0];
    let alternateText = arr[1];

    console.log(`<img src="${location}" alt="${alternateText}">`);
}

composeTag(['smiley.gif', 'Smiley Face']);