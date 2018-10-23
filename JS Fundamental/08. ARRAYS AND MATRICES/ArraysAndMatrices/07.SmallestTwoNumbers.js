function smallestTwoNumbers(numbers) {
    let sortedArr = sortArray(numbers);

    let firstTwo = sortedArr
        .slice(0, 2);
    //.filter((n, i) => i < 2);

    console.log(firstTwo.join(' '));

    function sortArray(numbers) {
        for (let i = 0; i < numbers.length - 1; i++) {
            let previous = numbers[i];
            let next = numbers[i + 1];

            if (previous > next) {
                numbers[i] = next;
                numbers[i + 1] = previous;
                i = -1;
            }
        }

        return numbers;
    }
}

smallestTwoNumbers([30, 15, 50, 5]);
smallestTwoNumbers([3, 0, 10, 4, 7, 3]);