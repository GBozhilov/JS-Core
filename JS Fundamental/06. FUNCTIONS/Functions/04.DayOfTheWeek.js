function getDayAsNumber(day) {
    let days = ['Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return days.indexOf(day) !== -1 ?
        days.indexOf(day) + 1 : 'error';
}

console.log(getDayAsNumber('Sunday'));