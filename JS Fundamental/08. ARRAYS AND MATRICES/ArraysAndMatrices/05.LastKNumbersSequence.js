function findSequence(n, k) {
    let result = [1];

    for (let i = 1; i < n; i++) {
        let sum = 0;

        for (let j = i - k; j < i; j++) {
            j = Math.max(0, j);
            sum += result[j];
        }

        result.push(sum);
    }

    console.log(result.join(' '));
}

//findSequence(8, 2);
findSequence(6, 3);