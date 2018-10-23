function printRandomNumber() {
    let num = Math.floor(Math.random() * 100) + 1; // 1-100
    document.body.innerHTML += `<div>${num}</div>`;
}