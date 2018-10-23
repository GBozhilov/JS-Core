function algorithm(a, b) {
    return b === 0 ? a : algorithm(b, a % b);
}