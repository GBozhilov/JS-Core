function solve(n, k) {
    let sequence = [1];

    for (let current = 1; current < n; current++) {
        let start = Math.max(0, current - k);
        let end = current - 1;
        let sum = 0;

        for (let i = start; i <= end; i++) {
            sum += sequence[i];
        }

        sequence[current] = sum;
    }

    console.log(sequence.join(' '));
}

solve(6, 3);
solve(8, 2);