function createObject(arr) {
    [firstProperty, firstValue, secondProperty,
        secondValue, thirdProperty, thirdValue] = arr;

    let person = {};
    person[firstProperty] = firstValue;
    person[secondProperty] = secondValue;
    person[thirdProperty] = thirdValue;

    return person;
}

console.log(createObject(['name', 'Peter', 'age',
    '23', 'gender', 'male']));